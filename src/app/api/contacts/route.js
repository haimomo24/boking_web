import { NextResponse } from 'next/server';
import dbUtils, { sql, poolPromise } from '../conect';

export async function GET() {
  try {
    // Kết nối đến SQL Server
    const pool = await poolPromise;
    
    // Thực hiện truy vấn
    const result = await pool.request()
      .query('SELECT * FROM dbo.contact');
    
    // Trả về dữ liệu dạng JSON
    return NextResponse.json(result.recordset);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json(
      { error: 'Không thể lấy dữ liệu liên hệ', message: error.message },
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
    
    // Kết nối đến SQL Server
    const pool = await poolPromise;
    
    // Thực hiện truy vấn thêm dữ liệu với các trường mới title và status
    const result = await pool.request()
      .input('name', sql.NVarChar, data.name)
      .input('phone', sql.NVarChar, data.phone)
      .input('email', sql.NVarChar, data.email || '')
      .input('title', sql.NVarChar, data.title || '') // Thêm trường title
      .input('status', sql.NVarChar, data.status || 'new') // Thêm trường status với giá trị mặc định là 'new'
      .query(`
        INSERT INTO dbo.contact (name, phone, email, title, status)
        VALUES (@name, @phone, @email, @title, @status);
        SELECT SCOPE_IDENTITY() AS id;
      `);
    
    return NextResponse.json({ 
      success: true, 
      id: result.recordset[0].id,
      message: 'Thêm liên hệ thành công'
    });
  } catch (error) {
    console.error('Error adding contact:', error);
    return NextResponse.json(
      { error: 'Không thể thêm liên hệ', message: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    // Lấy ID từ URL
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'ID là bắt buộc' },
        { status: 400 }
      );
    }
    
    // Kết nối đến SQL Server
    const pool = await poolPromise;
    
    // Thực hiện truy vấn xóa
    await pool.request()
      .input('id', sql.Int, id)
      .query('DELETE FROM dbo.contact WHERE id = @id');
    
    return NextResponse.json({ 
      success: true,
      message: 'Xóa liên hệ thành công'
    });
  } catch (error) {
    console.error('Error deleting contact:', error);
    return NextResponse.json(
      { error: 'Không thể xóa liên hệ', message: error.message },
      { status: 500 }
    );
  }
}

export async function PATCH(request) {
  try {
    // Lấy ID từ URL
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    
    // Kiểm tra ID
    if (!id) {
      return NextResponse.json(
        { error: 'ID là bắt buộc' },
        { status: 400 }
      );
    }
    
    // Lấy dữ liệu cập nhật từ request body
    const data = await request.json();
    console.log('Received data for update:', data); // Log dữ liệu nhận được
    
    // Kiểm tra dữ liệu status
    if (data.status === undefined) {
      return NextResponse.json(
        { error: 'Trạng thái là bắt buộc' },
        { status: 400 }
      );
    }
    
    // Kết nối đến SQL Server
    const pool = await poolPromise;
    
    // Thực hiện truy vấn cập nhật đơn giản
    await pool.request()
      .input('id', sql.Int, parseInt(id))
      .input('status', sql.NVarChar, data.status)
      .query('UPDATE dbo.contact SET status = @status WHERE id = @id');
    
    return NextResponse.json({ 
      success: true,
      message: 'Cập nhật trạng thái liên hệ thành công'
    });
  } catch (error) {
    console.error('Error updating contact:', error);
    return NextResponse.json(
      { error: 'Không thể cập nhật liên hệ', message: error.message },
      { status: 500 }
    );
  }
}