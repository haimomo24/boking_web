import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json(
        { error: 'Không có file nào được tải lên' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Tạo tên file duy nhất
    const fileName = `${uuidv4()}_${file.name.replace(/\s+/g, '_')}`;
    
    // Xác định đường dẫn lưu file
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    
    // Kiểm tra và tạo thư mục nếu chưa tồn tại
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    const filePath = path.join(uploadDir, fileName);
    
    // Lưu file
    await writeFile(filePath, buffer);
    
    // Trả về URL của file
    const fileUrl = `/uploads/${fileName}`;

    console.log('File uploaded successfully:', fileUrl);

    return NextResponse.json({ 
      message: 'Tải lên file thành công',
      url: fileUrl
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { error: 'Lỗi khi tải lên file', details: error.message },
      { status: 500 }
    );
  }
}

// Cấu hình kích thước tối đa
export const config = {
  api: {
    bodyParser: false,
    responseLimit: '10mb',
  },
};
