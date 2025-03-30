import { NextResponse } from 'next/server';
import dbUtils, { sql, poolPromise } from '../../conect';

// Método GET - obtener un producto por ID
export async function GET(req, { params }) {
  const { id } = params;
  
  try {
    // Kết nối đến database
    const pool = await poolPromise;
    
    // Thực hiện truy vấn với tên bảng đầy đủ dbo.imagebooking
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query("SELECT id, title, images, description, image2, image3, image4, description2, description3, description4, looking FROM dbo.imagebooking WHERE id = @id");
    
    if (result.recordset.length === 0) {
      return NextResponse.json({ message: "Không tìm thấy sản phẩm" }, { status: 404 });
    }
    
    return NextResponse.json(result.recordset[0]);
  } catch (error) {
    console.error("Error fetching product details:", error);
    return NextResponse.json({ message: "Lỗi truy vấn dữ liệu", error: error.message }, { status: 500 });
  }
}

// Thêm API endpoint để cập nhật lượt xem - đã sửa để đảm bảo xử lý số nguyên
export async function PATCH(req, { params }) {
  const { id } = params;
  
  try {
    // Kết nối đến database
    const pool = await poolPromise;
    
    // Kiểm tra sản phẩm tồn tại
    const checkResult = await pool.request()
      .input('id', sql.Int, id)
      .query("SELECT id, looking FROM dbo.imagebooking WHERE id = @id");
    
    if (checkResult.recordset.length === 0) {
      return NextResponse.json({ message: "Không tìm thấy sản phẩm" }, { status: 404 });
    }
    
    // Lấy giá trị looking hiện tại và đảm bảo nó là số nguyên
    let currentLooking = checkResult.recordset[0].looking;
    
    // Chuyển đổi sang số nguyên nếu là null hoặc không phải số
    currentLooking = typeof currentLooking === 'number' ? currentLooking : 0;
    
    // Tăng giá trị lên 1
    const newLooking = currentLooking + 1;
    
    // Cập nhật lượt xem với kiểu dữ liệu số nguyên
    await pool.request()
      .input('id', sql.Int, id)
      .input('looking', sql.Int, newLooking)
      .query("UPDATE dbo.imagebooking SET looking = @looking WHERE id = @id");
    
    return NextResponse.json({ 
      message: "Cập nhật lượt xem thành công", 
      id, 
      looking: newLooking 
    });
  } catch (error) {
    console.error("Error updating view count:", error);
    return NextResponse.json({ message: "Lỗi cập nhật lượt xem", error: error.message }, { status: 500 });
  }
}

// Método PUT - actualizar un producto existente
export async function PUT(req, { params }) {
  const { id } = params;
  
  try {
    const body = await req.json();
    const { title, description, images, image2, image3, image4, description2, description3, description4, looking } = body;
    
    // Kết nối đến database
    const pool = await poolPromise;
    
    // Verificar si el producto existe - sử dụng dbo.imagebooking
    const checkResult = await pool.request()
      .input('id', sql.Int, id)
      .query("SELECT id FROM dbo.imagebooking WHERE id = @id");
    
    if (checkResult.recordset.length === 0) {
      return NextResponse.json({ message: "Không tìm thấy sản phẩm để cập nhật" }, { status: 404 });
    }
    
    // Đảm bảo looking là số nguyên
    const lookingValue = typeof looking === 'number' ? looking : 0;
    
    // Actualizar el producto - sử dụng dbo.imagebooking
    await pool.request()
      .input('id', sql.Int, id)
      .input('title', sql.NVarChar, title)
      .input('description', sql.NVarChar, description)
      .input('images', sql.NVarChar, images)
      .input('image2', sql.NVarChar, image2 || '')
      .input('image3', sql.NVarChar, image3 || '')
      .input('image4', sql.NVarChar, image4 || '')
      .input('description2', sql.NVarChar, description2 || '')
      .input('description3', sql.NVarChar, description3 || '')
      .input('description4', sql.NVarChar, description4 || '')
      .input('looking', sql.Int, lookingValue)
      .query(`
        UPDATE dbo.imagebooking SET 
          title = @title, 
          description = @description, 
          images = @images,
          image2 = @image2,
          image3 = @image3,
          image4 = @image4,
          description2 = @description2,
          description3 = @description3,
          description4 = @description4,
          looking = @looking
        WHERE id = @id
      `);
    
    return NextResponse.json({ message: "Cập nhật sản phẩm thành công", id });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json({ message: "Lỗi cập nhật sản phẩm", error: error.message }, { status: 500 });
  }
}

// Método DELETE - eliminar un producto
export async function DELETE(req, { params }) {
  const { id } = params;
  
  try {
    // Kết nối đến database
    const pool = await poolPromise;
    
    // Verificar si el producto existe - sử dụng dbo.imagebooking
    const checkResult = await pool.request()
      .input('id', sql.Int, id)
      .query("SELECT id FROM dbo.imagebooking WHERE id = @id");
    
    if (checkResult.recordset.length === 0) {
      return NextResponse.json({ message: "Không tìm thấy sản phẩm để xóa" }, { status: 404 });
    }
    
    // Eliminar el producto - sử dụng dbo.imagebooking
    await pool.request()
      .input('id', sql.Int, id)
      .query("DELETE FROM dbo.imagebooking WHERE id = @id");
    
    return NextResponse.json({ message: "Xóa sản phẩm thành công", id });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json({ message: "Lỗi xóa sản phẩm", error: error.message }, { status: 500 });
  }
}
