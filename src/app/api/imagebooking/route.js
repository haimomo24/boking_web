import { NextResponse } from 'next/server';
import dbUtils, { sql, poolPromise } from '../conect';

export async function GET() {
  try {
    // Kết nối đến database
    const pool = await poolPromise;
    
    // Thực hiện truy vấn với tên bảng đầy đủ dbo.imagebooking
    const result = await pool.request()
      .query('SELECT * FROM dbo.imagebooking');
    
    // Trả về dữ liệu
    return NextResponse.json(result.recordset);
    
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { 
        error: 'Lỗi server', 
        message: error.message,
        stack: process.env.NODE_ENV !== 'production' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}
