import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

// Check if Cloudinary is configured
const isCloudinaryConfigured = 
  !!(process.env.CLOUDINARY_CLOUD_NAME && 
  process.env.CLOUDINARY_API_KEY && 
  process.env.CLOUDINARY_API_SECRET);

if (isCloudinaryConfigured) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file provided' }, { status: 400 });
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    if (isCloudinaryConfigured) {
      console.log('[Upload API] Uploading to Cloudinary...');
      // Upload to Cloudinary using upload_stream
      const uploadResult: any = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: 'miriam_mall',
            resource_type: 'auto',
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        );
        stream.end(buffer);
      });

      return NextResponse.json({
        success: true,
        url: uploadResult.secure_url,
        public_id: uploadResult.public_id,
      });
    } else {
      console.log('[Upload API] Cloudinary not configured. Uploading to local disk...');
      
      // Ensure the upload directory exists
      const uploadDir = join(process.cwd(), 'public', 'uploads');
      try {
        await mkdir(uploadDir, { recursive: true });
      } catch (err) {
        // Directory already exists or can't be created
      }

      // Generate a unique filename
      const fileExt = file.name.split('.').pop() || 'jpg';
      const uniqueName = `upload-${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
      const filePath = join(uploadDir, uniqueName);

      // Write the file to public/uploads
      await writeFile(filePath, buffer);

      console.log(`[Upload API] Successfully saved to local folder: /uploads/${uniqueName}`);
      return NextResponse.json({
        success: true,
        url: `/uploads/${uniqueName}`,
        public_id: uniqueName,
      });
    }
  } catch (error: any) {
    console.error('[Upload API] Upload error:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to upload image'
    }, { status: 500 });
  }
}
