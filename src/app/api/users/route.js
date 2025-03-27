import { NextResponse } from 'next/server';
import dbUtils, { sql, poolPromise } from '../conect';

export async function GET(req) {
    try {
        // Kết nối đến SQL Server
        const pool = await poolPromise;
        
        // Thực hiện truy vấn
        const result = await pool.request()
            .query("SELECT id, username, email, level, avatar FROM dbo.users");
        
        // Trả về kết quả
        return NextResponse.json(result.recordset);
    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.json(
            { message: "Lỗi truy vấn dữ liệu", error: error.message },
            { status: 500 }
        );
    }
}
