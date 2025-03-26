"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const menuItems = [
    { name: "Trang quản trị ", path: "/dashboard" },
    { name: "Quản lý tài khoản", path: "/dashboard/user" },
    { name: "Quản lý hình ảnh", path: "/dashboard/imagebooking" },
    { name: "Danh sách hình ảnh  ", path: "/dashboard/listimage" },
    { name: "Danh sách nhận tư vấn  ", path: "/dashboard/contact" },
    { name: "Home", path: "/" },
];

export default function Sidebar() {
    const pathname = typeof window !== "undefined" ? usePathname() : "";
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("user");
        window.location.href = "/login";
    };

    const getAvatarUrl = (username) => {
        return `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=random&color=fff&size=200`;
    };

    return (
        <aside className="w-64 h-screen bg-green-700 text-white flex flex-col">
            {/* User profile */}
            <div className="flex flex-col items-center py-6 border-b border-green-600">
                {/* Avatar */}
                <div className="w-24 h-24  rounded-full border-2 border-white overflow-hidden flex items-center justify-center">
                    <img
                        src={user?.avatar || getAvatarUrl(user?.username || "Admin User")}
                        alt="User Avatar"
                        className="w-24 h-24 object-cover rounded-full"
                    />
                </div>
                <h3 className="text-lg font-medium mt-2">{user?.username || "Admin User"}</h3>
                <p className="text-sm text-gray-300">{user?.email || "admin@example.com"}</p>

                {/* Nút đăng xuất */}
                <button
                    onClick={handleLogout}
                    className="mt-3 px-4 py-1 bg-red-600 text-white text-sm rounded-full hover:bg-red-700 transition-colors"
                >
                    Đăng xuất
                </button>
            </div>

            {/* Admin panel title */}
            <div className="px-5 py-4 border-b border-green-600">
                <h2 className="text-xl font-bold"></h2>
            </div>

            {/* Navigation menu */}
            <nav className="flex-1 px-3 py-4 overflow-y-auto">
                <ul className="space-y-1">
                    {menuItems.map((item) => (
                        <li key={item.path}>
                            <Link
                                href={item.path}
                                className={`
                                    flex items-center px-4 py-3 rounded-lg transition-colors
                                    ${
                                        pathname === item.path
                                            ? "bg-white text-gray-700"
                                            : "text-white hover:bg-green-600"
                                    }
                                `}
                            >
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Footer */}
            <div className="px-5 py-3 border-t border-green-600 text-center">
                <p className="text-sm">© 2023 Bái Đính Booking</p>
            </div>
        </aside>
    );
}
