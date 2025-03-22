import { NextResponse } from 'next/server';
import pool from '../../conect';
import { writeFile } from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const title = formData.get('title');
    const description = formData.get('description');
    const description2 = formData.get('description2');
    const description3 = formData.get('description3');
    const description4 = formData.get('description4');
    const mainImage = formData.get('mainImage');
    const image2 = formData.get('image2') || null;
    const image3 = formData.get('image3') || null;
    const image4 = formData.get('image4') || null;

    if (!title || !description || !mainImage) {
      return NextResponse.json(
        { message: 'Thiếu thông tin bắt buộc' },
        { status: 400 }
      );
    }

    // Xử lý lưu ảnh chính
    const mainImagePath = await saveImage(mainImage);
    
    // Xử lý lưu các ảnh phụ
    const image2Path = image2 ? await saveImage(image2) : '';
    const image3Path = image3 ? await saveImage(image3) : '';
    const image4Path = image4 ? await saveImage(image4) : '';

    // Lưu vào database
    const [result] = await pool.query(
      `INSERT INTO imagebooking (title, description,description2,description3,description4, images, image2, image3, image4) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [title, description,description2, description3, description4 , mainImagePath, image2Path, image3Path, image4Path]
    );

    return NextResponse.json(
      { 
        message: 'Thêm sản phẩm thành công', 
        id: result.insertId 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error in POST /api/imagebooking/add:', error);
    return NextResponse.json(
      { message: 'Lỗi khi thêm sản phẩm', error: error.message },
      { status: 500 }
    );
  }
}

async function saveImage(file) {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Tạo tên file duy nhất
  const fileName = `${uuidv4()}_${file.name}`;
  
  // Đường dẫn lưu file
  const publicDir = path.join(process.cwd(), 'public');
  const uploadDir = path.join(publicDir, 'uploads');
  const filePath = path.join(uploadDir, fileName);
  
  // Đảm bảo thư mục uploads tồn tại
  try {
    await writeFile(filePath, buffer);
    return `/uploads/${fileName}`;
  } catch (error) {
    console.error('Error saving image:', error);
    throw new Error('Không thể lưu hình ảnh');
  }
}
