import { NextResponse } from 'next/server';

export function middleware(request) {
  const path = request.nextUrl.pathname;
  
  // Các route cần xác thực
  const isAuthRequired = path.startsWith('/dashboard');
  
  // Các route công khai
  const isPublicPath = path === '/login' || path === '/' || path.startsWith('/api');
  
  // Lấy cookie để kiểm tra đăng nhập
  const userCookie = request.cookies.get('user')?.value;
  
  // Nếu đang truy cập route cần xác thực nhưng chưa đăng nhập
  if (isAuthRequired && !userCookie) {
    // Chuyển hướng đến trang đăng nhập
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  // Nếu đã đăng nhập và đang truy cập trang đăng nhập
  if (userCookie && path === '/login') {
    // Chuyển hướng đến trang dashboard
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  return NextResponse.next();
}

// Chỉ áp dụng middleware cho các route cụ thể
export const config = {
  matcher: ['/dashboard/:path*', '/login'],
};
