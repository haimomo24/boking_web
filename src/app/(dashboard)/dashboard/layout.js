import HeaderDashboard from "@/component/dashboard/HeaderDashboard";
import SideBar from "@/component/dashboard/SideBar";

export default function DashboardLayout({ children }) {
    return (
        <div className="flex flex-col h-screen bg-gray-100">
            {/* Header phía trên cùng */}
            <HeaderDashboard />
            
            {/* Container chứa sidebar và nội dung chính */}
            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar bên trái */}
                <SideBar />

                {/* Nội dung chính */}
                <main className="flex-1 p-4 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
