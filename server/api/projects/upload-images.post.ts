import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

export default defineEventHandler(async (event) => {
  try {
    const form = await readMultipartFormData(event);
    
    if (!form || !form.length) {
      throw createError({
        statusCode: 400,
        message: 'No files uploaded',
      });
    }

    // Create uploads directory if it doesn't exist
    const uploadsDir = join(process.cwd(), 'public', 'uploads', 'projects');
    await mkdir(uploadsDir, { recursive: true });

    const uploadedFiles = [];

    for (const file of form) {
      if (!file.filename || !file.data) continue;

      // Generate unique filename
      const timestamp = Date.now();
      const random = Math.random().toString(36).substring(7);
      const extension = file.filename.split('.').pop();
      const filename = `project_${timestamp}_${random}.${extension}`;
      const filepath = join(uploadsDir, filename);

      // Save file
      await writeFile(filepath, file.data);

      uploadedFiles.push({
        filename,
        originalName: file.filename,
        url: `/uploads/projects/${filename}`,
        size: file.data.length,
        type: file.type,
      });
    }

    return {
      files: uploadedFiles,
      count: uploadedFiles.length,
    };
  } catch (error: any) {
    console.error('Error uploading images:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to upload images',
    });
  }
});