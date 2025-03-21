import HeaderDashboard from "@/component/dashboard/HeaderDashboard";
import SideBar from "@/component/dashboard/SideBar";


export default function DashboardLayout({ children }) {
    return (
        <div className="flex h-screen bg-gray-100">
        {/* Sidebar bên trái */}
        <SideBar />

        {/* Khu vực nội dung chính */}
        <div className="flex-1 flex flex-col">
            {/* Header phía trên */}
            <HeaderDashboard />

            {/* Nội dung chính */}
            <main className="flex-1 p-4">
                {children}
            </main>
        </div>
    </div>
    );
}
