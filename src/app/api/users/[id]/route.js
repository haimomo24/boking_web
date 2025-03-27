import { NextResponse } from 'next/server';
import dbUtils, { sql, poolPromise } from '../../conect';
import { writeFile } from 'fs/promises';
import path from 'path';
import { mkdir } from 'fs/promises';

// Phương thức GET để lấy thông tin người dùng theo ID
export async function GET(request, context) {
    const id = context.params.id;
    
    try {
        // Kết nối đến database
        const pool = await poolPromise;
        
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query("SELECT id, username, email, level FROM dbo.users WHERE id = @id");
        
        if (result.recordset.length === 0) {
            return NextResponse.json(
                { message: "Không tìm thấy người dùng" }, 
                { status: 404 }
            );
        }
        
        // Thêm trường avatar trống
        const user = {
            ...result.recordset[0],
            avatar: ''
        };
        
        return NextResponse.json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        return NextResponse.json(
            { message: "Lỗi khi truy vấn dữ liệu", error: error.message }, 
            { status: 500 }
        );
    }
}

// Phương thức PUT để cập nhật thông tin người dùng
export async function PUT(request, context) {
    const id = context.params.id;
    
    try {
        const formData = await request.formData();
        const username = formData.get('username');
        const email = formData.get('email');
        const password = formData.get('password');
        const level = formData.get('level');
        const avatarFile = formData.get('avatar');
        
        // Kết nối đến database
        const pool = await poolPromise;
        
        // Kiểm tra người dùng tồn tại
        const userCheckResult = await pool.request()
            .input('id', sql.Int, id)
            .query("SELECT * FROM dbo.users WHERE id = @id");
            
        if (userCheckResult.recordset.length === 0) {
            return NextResponse.json(
                { message: "Không tìm thấy người dùng" }, 
                { status: 404 }
            );
        }
        
        let avatarUrl = ''; // Mặc định là chuỗi rỗng vì bảng không có cột avatar
        
        // Xử lý upload avatar nếu có
        if (avatarFile && avatarFile.size > 0) {
            const buffer = Buffer.from(await avatarFile.arrayBuffer());
            const filename = `avatar_${id}_${Date.now()}${path.extname(avatarFile.name)}`;
            
            // Tạo thư mục uploads nếu chưa tồn tại
            try {
                await mkdir(path.join(process.cwd(), 'public/uploads'), { recursive: true });
            } catch (err) {
                if (err.code !== 'EEXIST') throw err;
            }
            
            // Lưu file vào thư mục public/uploads
            await writeFile(
                path.join(process.cwd(), 'public/uploads', filename),
                buffer
            );
            
            // Cập nhật URL avatar (chỉ lưu trong response, không lưu vào DB)
            avatarUrl = `/uploads/${filename}`;
        }
        
        // Xây dựng câu truy vấn SQL với tham số
        const updateRequest = pool.request()
            .input('id', sql.Int, id)
            .input('username', sql.NVarChar, username)
            .input('email', sql.NVarChar, email)
            .input('level', sql.Int, parseInt(level)); // Chuyển level thành số
        
        let sqlQuery = "UPDATE dbo.users SET username = @username, email = @email, level = @level";
        
        // Thêm password vào câu truy vấn nếu có
        if (password) {
            sqlQuery += ", password = @password";
            updateRequest.input('password', sql.NVarChar, password);
        }
        
        // Thêm điều kiện WHERE
        sqlQuery += " WHERE id = @id";
        
        // Thực hiện truy vấn cập nhật
        await updateRequest.query(sqlQuery);
        
        return NextResponse.json({ 
            message: "Cập nhật thông tin người dùng thành công",
            avatar: avatarUrl // Trả về URL avatar nếu có upload
        });
    } catch (error) {
        console.error('Error updating user:', error);
        return NextResponse.json(
            { message: "Lỗi khi cập nhật thông tin người dùng", error: error.message }, 
            { status: 500 }
        );
    }
}

// Phương thức DELETE để xóa người dùng
export async function DELETE(request, context) {
    const id = context.params.id;
    
    try {
        // Kết nối đến database
        const pool = await poolPromise;
        
        // Kiểm tra xem người dùng có phải là admin không
        const userResult = await pool.request()
            .input('id', sql.Int, id)
            .query("SELECT level FROM dbo.users WHERE id = @id");
        
        if (userResult.recordset.length === 0) {
            return NextResponse.json({ message: "Người dùng không tồn tại" }, { status: 404 });
        }
        
        const userLevel = userResult.recordset[0].level;
        if (userLevel === 10) {
            return NextResponse.json({ message: "Không thể xóa tài khoản admin" }, { status: 403 });
        }
        
        // Tiến hành xóa người dùng
        await pool.request()
            .input('id', sql.Int, id)
            .query("DELETE FROM dbo.users WHERE id = @id");
        
        return NextResponse.json({ message: "Xóa người dùng thành công" });
    } catch (error) {
        console.error('Error deleting user:', error);
        return NextResponse.json({ message: "Lỗi khi xóa người dùng", error: error.message }, { status: 500 });
    }
}
