"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        // Kiểm tra xem người dùng đã đăng nhập chưa
        const userData = localStorage.getItem('user');
        if (!userData) {
            // Nếu chưa đăng nhập, chuyển hướng về trang login
            router.push('/login');
            return;
        }
        
        // Nếu đã đăng nhập, lưu thông tin người dùng vào state
        setUser(JSON.parse(userData));
    }, [router]);

    // Hiển thị loading khi chưa lấy được thông tin người dùng
    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Quản trị viên </h1>
            <p className="mb-4">Chào mừng <span className="font-semibold">{user.username}</span> đến với trang quản trị</p>
            <div className="bg-white p-4 rounded-lg shadow">
                <h2 className="text-lg font-semibold mb-2">Thông tin tài khoản</h2>
                <p><span className="font-medium">Email:</span> {user.email}</p>
                <p><span className="font-medium">Cấp độ:</span> {user.level}</p>
            </div>
        </div>
    );
}