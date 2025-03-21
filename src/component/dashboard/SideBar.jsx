"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const menuItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Quản lý tài khoản", path: "/dashboard/user" },
    { name: "Quản lý hình ảnh", path: "/dashboard/images" },
    { name: "Quản lý sản phẩm", path: "/dashboard/products" },
    { name: "Quản lý đơn hàng", path: "/dashboard/orders" },
    { name: "Cài đặt", path: "/dashboard/settings" },
];

export default function Sidebar() {
    const pathname = typeof window !== "undefined" ? usePathname() : "";

    return (
        <aside className="w-64 h-screen bg-green-700 text-white flex flex-col">
            {/* User profile section */}
            <div className="flex flex-col items-center py-6 border-b border-green-600">
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white mb-3">
                    {/* Placeholder image - replace with dynamic user image later */}
                    <Image 
                        src="/placeholder-avatar.png" 
                        alt="User Avatar" 
                        width={80} 
                        height={80}
                        className="object-cover w-full h-full"
                        onError={(e) => {
                            e.target.src = "https://via.placeholder.com/80";
                        }}
                    />
                </div>
                <h3 className="text-lg font-medium">Admin User</h3>
                <p className="text-sm text-gray-300">admin@example.com</p>
            </div>
            
            {/* Admin panel title */}
            <div className="px-5 py-4 border-b border-green-600">
                <h2 className="text-xl font-bold">Admin Panel</h2>
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
                                    ${pathname === item.path 
                                        ? "bg-white text-gray-700" 
                                        : "text-white hover:bg-green-600"}
                                `}
                            >
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
            
            {/* Footer section */}
            <div className="px-5 py-3 border-t border-green-600 text-center">
                <p className="text-sm">© 2023 Bái Đính Booking</p>
            </div>
        </aside>
    );
}
