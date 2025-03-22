import pool from "../../conect";

export async function GET(req, { params }) {
  const { id } = params;
  
  try {
    const [rows] = await pool.query(
      "SELECT id, title, images, description, image2, image3, image4, description2, description3, description4 FROM imagebooking WHERE id = ?", 
      [id]
    );
    
    if (rows.length === 0) {
      return Response.json({ message: "Không tìm thấy sản phẩm" }, { status: 404 });
    }
    
    return Response.json(rows[0]);
  } catch (error) {
    console.error("Error fetching product details:", error);
    return Response.json({ message: "Lỗi truy vấn dữ liệu", error: error.message }, { status: 500 });
  }
}
