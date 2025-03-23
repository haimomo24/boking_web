import pool from "../../conect";
import { NextResponse } from 'next/server';

// Método GET - obtener un producto por ID
export async function GET(req, { params }) {
  const { id } = params;
  
  try {
    const [rows] = await pool.query(
      "SELECT id, title, images, description, image2, image3, image4, description2, description3, description4 FROM imagebooking WHERE id = ?", 
      [id]
    );
    
    if (rows.length === 0) {
      return NextResponse.json({ message: "Không tìm thấy sản phẩm" }, { status: 404 });
    }
    
    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error("Error fetching product details:", error);
    return NextResponse.json({ message: "Lỗi truy vấn dữ liệu", error: error.message }, { status: 500 });
  }
}

// Método PUT - actualizar un producto existente
export async function PUT(req, { params }) {
  const { id } = params;
  
  try {
    const body = await req.json();
    const { title, description, images, image2, image3, image4, description2, description3, description4 } = body;
    
    // Verificar si el producto existe
    const [checkRows] = await pool.query("SELECT id FROM imagebooking WHERE id = ?", [id]);
    
    if (checkRows.length === 0) {
      return NextResponse.json({ message: "Không tìm thấy sản phẩm để cập nhật" }, { status: 404 });
    }
    
    // Actualizar el producto
    await pool.query(
      `UPDATE imagebooking SET 
        title = ?, 
        description = ?, 
        images = ?,
        image2 = ?,
        image3 = ?,
        image4 = ?,
        description2 = ?,
        description3 = ?,
        description4 = ?
      WHERE id = ?`,
      [title, description, images, image2 || '', image3 || '', image4 || '', description2 || '', description3 || '', description4 || '', id]
    );
    
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
    // Verificar si el producto existe
    const [checkRows] = await pool.query("SELECT id FROM imagebooking WHERE id = ?", [id]);
    
    if (checkRows.length === 0) {
      return NextResponse.json({ message: "Không tìm thấy sản phẩm để xóa" }, { status: 404 });
    }
    
    // Eliminar el producto
    await pool.query("DELETE FROM imagebooking WHERE id = ?", [id]);
    
    return NextResponse.json({ message: "Xóa sản phẩm thành công", id });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json({ message: "Lỗi xóa sản phẩm", error: error.message }, { status: 500 });
  }
}
