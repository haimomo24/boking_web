import pool from "../conect";

export async function GET(req) {
    try {
        const [rows] = await pool.query("SELECT id, username, email, level, avatar FROM user");
        return Response.json(rows);
    } catch (error) {
        return Response.json({ message: "Lỗi truy vấn dữ liệu", error }, { status: 500 });
    }
}
