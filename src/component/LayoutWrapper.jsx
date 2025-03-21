"use client"; // Bắt buộc để sử dụng usePathname()

import { usePathname } from "next/navigation";
import HeaderPage from "@/component/common/HeaderPage";
import FooterPage from "@/component/common/FooterPage";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");

  return (
    <>
      {!isDashboard && <HeaderPage />}
      {children}
      {!isDashboard && <FooterPage />}
    </>
  );
}
