import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { cloudinary } from '../../../lib/cloudinary';

export async function POST(request) {
  if (cookies().get('africsis_admin')?.value !== 'authenticated') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ error: 'No file provided.' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const fileName = file.name || 'africsis-upload';
    const resourceType = file.type.startsWith('video/') ? 'video' : 'image';

    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: resourceType,
          folder: 'africsis',
          public_id: `${Date.now()}-${fileName.replace(/\.[^/.]+$/, '')}`,
          overwrite: false,
        },
        (error, uploadResult) => {
          if (error) reject(error);
          else resolve(uploadResult);
        }
      );

      uploadStream.end(buffer);
    });

    return NextResponse.json({
      success: true,
      url: result.secure_url,
      resourceType,
      publicId: result.public_id,
    });
  } catch (error) {
    console.error('Cloudinary upload failed:', error);
    return NextResponse.json(
      { error: 'Upload failed. Please verify Cloudinary configuration.' },
      { status: 500 }
    );
  }
}
