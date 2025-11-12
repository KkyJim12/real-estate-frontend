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
    ensureUploadDir();

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

    // Generate unique filename
    const timestamp = Date.now();
    const ext = path.extname(file.filename);
    const filename = `${timestamp}${ext}`;
    const filepath = path.join(uploadsDir, filename);

    // Save file
    fs.writeFileSync(filepath, file.data);

    // Return URL
    return {
      success: true,
      url: `/uploads/${filename}`,
      filename: filename,
    };
  } catch (error: any) {
    console.error('Upload error:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to upload image',
    });
  }
});
