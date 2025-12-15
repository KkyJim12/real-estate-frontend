import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

export default defineEventHandler(async (event) => {
  try {
    const form = await readMultipartFormData(event);
    
    if (!form || !form.length) {
      throw createError({
        statusCode: 400,
        message: 'No file uploaded',
      });
    }

    const file = form[0];
    if (!file.filename || !file.data) {
      throw createError({
        statusCode: 400,
        message: 'Invalid file data',
      });
    }

    // Create uploads directory if it doesn't exist
    const uploadsDir = join(process.cwd(), 'public', 'uploads', 'brochures');
    await mkdir(uploadsDir, { recursive: true });

    // Generate unique filename
    const timestamp = Date.now();
    const extension = file.filename.split('.').pop();
    const filename = `brochure_${timestamp}.${extension}`;
    const filepath = join(uploadsDir, filename);

    // Save file
    await writeFile(filepath, file.data);

    return {
      filename,
      originalName: file.filename,
      url: `/uploads/brochures/${filename}`,
      size: file.data.length,
      type: file.type,
    };
  } catch (error: any) {
    console.error('Error uploading brochure:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to upload brochure',
    });
  }
});