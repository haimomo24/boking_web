import { NextResponse } from 'next/server';
import pool from '../../conect';
import { writeFile } from 'fs/promises';
import path from 'path';
import { mkdir } from 'fs/promises';

// Phương thức GET để lấy thông tin người dùng theo ID
export async function GET(request, context) {
    const id = context.params.id;
    
    try {
        const [rows] = await pool.query(
            "SELECT id, username, email, level, avatar FROM user WHERE id = ?", 
            [id]
        );
        
        if (rows.length === 0) {
            return NextResponse.json(
                { message: "Không tìm thấy người dùng" }, 
                { status: 404 }
            );
        }
        
        return NextResponse.json(rows[0]);
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
        
        // Kiểm tra người dùng tồn tại
        const [userCheck] = await pool.query("SELECT * FROM user WHERE id = ?", [id]);
        if (userCheck.length === 0) {
            return NextResponse.json(
                { message: "Không tìm thấy người dùng" }, 
                { status: 404 }
            );
        }
        
        let avatarUrl = userCheck[0].avatar; // Giữ nguyên avatar cũ nếu không có file mới
        
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
            
            // Cập nhật URL avatar
            avatarUrl = `/uploads/${filename}`;
        }
        
        // Xây dựng câu truy vấn SQL dựa trên các trường được cập nhật
        let sql = "UPDATE user SET username = ?, email = ?, level = ?";
        let params = [username, email, level];
        
        // Thêm password vào câu truy vấn nếu có
        if (password) {
            sql += ", password = ?";
            params.push(password);
        }
        
        // Thêm avatar vào câu truy vấn nếu có
        if (avatarUrl) {
            sql += ", avatar = ?";
            params.push(avatarUrl);
        }
        
        // Thêm điều kiện WHERE
        sql += " WHERE id = ?";
        params.push(id);
        
        // Thực hiện truy vấn cập nhật
        await pool.query(sql, params);
        
        return NextResponse.json({ 
            message: "Cập nhật thông tin người dùng thành công",
            avatar: avatarUrl
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
        // Kiểm tra xem người dùng có phải là admin không
        const [user] = await pool.query("SELECT level FROM user WHERE id = ?", [id]);
        
        if (user.length === 0) {
            return NextResponse.json({ message: "Người dùng không tồn tại" }, { status: 404 });
        }
        
        if (user[0].level === 'admin') {
            return NextResponse.json({ message: "Không thể xóa tài khoản admin" }, { status: 403 });
        }
        
        // Tiến hành xóa người dùng
        await pool.query("DELETE FROM user WHERE id = ?", [id]);
        
        return NextResponse.json({ message: "Xóa người dùng thành công" });
    } catch (error) {
        console.error('Error deleting user:', error);
        return NextResponse.json({ message: "Lỗi khi xóa người dùng", error: error.message }, { status: 500 });
    }
}
