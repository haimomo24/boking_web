import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

// Cấu hình kết nối MySQL
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'booking'
};

export async function GET() {
  try {
    // Tạo kết nối đến MySQL
    const connection = await mysql.createConnection(dbConfig);
    
    // Thực hiện truy vấn
    const [rows] = await connection.execute('SELECT * FROM contact');
    
    // Đóng kết nối
    await connection.end();
    
    // Trả về dữ liệu dạng JSON
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json(
      { error: 'Không thể lấy dữ liệu liên hệ' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    // Lấy dữ liệu từ request body
    const data = await request.json();
    
    // Kiểm tra dữ liệu
    if (!data.name || !data.phone) {
      return NextResponse.json(
        { error: 'Tên và số điện thoại là bắt buộc' },
        { status: 400 }
      );
    }
    
    // Tạo kết nối đến MySQL
    const connection = await mysql.createConnection(dbConfig);
    
    // Thực hiện truy vấn thêm dữ liệu
    const [result] = await connection.execute(
      'INSERT INTO contact (name, phone, email) VALUES (?, ?, ?)',
      [data.name, data.phone, data.email || '']
    );
    
    // Đóng kết nối
    await connection.end();
    
    return NextResponse.json({ 
      success: true, 
      id: result.insertId,
      message: 'Thêm liên hệ thành công'
    });
  } catch (error) {
    console.error('Error adding contact:', error);
    return NextResponse.json(
      { error: 'Không thể thêm liên hệ' },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    // Lấy ID từ URL
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop();
    
    // Tạo kết nối đến MySQL
    const connection = await mysql.createConnection(dbConfig);
    
    // Thực hiện truy vấn xóa
    await connection.execute('DELETE FROM contact WHERE id = ?', [id]);
    
    // Đóng kết nối
    await connection.end();
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting contact:', error);
    return NextResponse.json(
      { error: 'Không thể xóa liên hệ' },
      { status: 500 }
    );
  }
}
