import { put } from '@vercel/blob';
import fs from 'fs';
import path from 'path';

const uploadsDir = path.join(process.cwd(), 'public', 'uploads');

const ensureUploadDir = () => {
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
};

export default defineEventHandler(async (event) => {
  try {
    const form = await readMultipartFormData(event);

    if (!form || form.length === 0) {
      throw createError({
        statusCode: 400,
        message: 'No file uploaded',
      });
    }

    const file = form[0];

    if (!file.filename || !file.data) {
      throw createError({
        statusCode: 400,
        message: 'Invalid file',
      });
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type || '')) {
      throw createError({
        statusCode: 400,
        message: 'Invalid file type. Only images are allowed.',
      });
    }

    // Validate file size (max 5MB)
    if (file.data.length > 5 * 1024 * 1024) {
      throw createError({
        statusCode: 400,
        message: 'File size must be less than 5MB',
      });
    }

    // Generate unique filename
    const timestamp = Date.now();
    const ext = path.extname(file.filename);
    const filename = `${timestamp}${ext}`;

    // Check if Vercel Blob is configured
    const blobToken = process.env.BLOB_READ_WRITE_TOKEN;

    if (blobToken) {
      // Use Vercel Blob
      console.log('Uploading to Vercel Blob...');
      const blob = await put(filename, file.data, {
        access: 'public',
        contentType: file.type,
      });

      return {
        success: true,
        url: blob.url,
        filename: filename,
        storage: 'vercel-blob',
      };
    } else {
      // Fallback to local storage
      console.log('Uploading to local storage...');
      ensureUploadDir();
      const filepath = path.join(uploadsDir, filename);
      fs.writeFileSync(filepath, file.data);

      return {
        success: true,
        url: `/uploads/${filename}`,
        filename: filename,
        storage: 'local',
      };
    }
  } catch (error: any) {
    console.error('Upload error:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to upload image',
    });
  }
});
