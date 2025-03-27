import { NextResponse } from 'next/server';
import dbUtils, { sql, poolPromise } from '../../../conect';

export async function POST(request, { params }) {
    const { id } = params;
    
    try {
        // Lấy dữ liệu từ request body
        const { currentPassword, newPassword } = await request.json();
        
        // Kiểm tra dữ liệu đầu vào
        if (!currentPassword || !newPassword) {
            return NextResponse.json(
                { message: "Vui lòng cung cấp đầy đủ mật khẩu hiện tại và mật khẩu mới" }, 
                { status: 400 }
            );
        }
        
        // Kiểm tra độ dài mật khẩu mới
        if (newPassword.length < 6) {
            return NextResponse.json(
                { message: "Mật khẩu mới phải có ít nhất 6 ký tự" }, 
                { status: 400 }
            );
        }
        
        // Kết nối đến database
        const pool = await poolPromise;
        
        // Kiểm tra người dùng tồn tại và mật khẩu hiện tại đúng
        const userResult = await pool.request()
            .input('id', sql.Int, id)
            .query("SELECT * FROM dbo.users WHERE id = @id");
        
        if (userResult.recordset.length === 0) {
            return NextResponse.json(
                { message: "Không tìm thấy người dùng" }, 
                { status: 404 }
            );
        }
        
        const user = userResult.recordset[0];
        
        // Kiểm tra mật khẩu hiện tại
        if (user.password !== currentPassword) {
            return NextResponse.json(
                { message: "Mật khẩu hiện tại không đúng" }, 
                { status: 401 }
            );
        }
        
        // Cập nhật mật khẩu mới
        await pool.request()
            .input('newPassword', sql.NVarChar, newPassword)
            .input('id', sql.Int, id)
            .query("UPDATE dbo.users SET password = @newPassword WHERE id = @id");
        
        return NextResponse.json({ 
            message: "Thay đổi mật khẩu thành công" 
        });
        
    } catch (error) {
        console.error('Error changing password:', error);
        return NextResponse.json(
            { message: "Lỗi khi thay đổi mật khẩu", error: error.message }, 
            { status: 500 }
        );
    }
}
