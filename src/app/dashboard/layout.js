
import React from 'react'

const LayoutDashboard = ({children}) => {
  return (
    <div>
    <div className="flex flex-col md:flex-row h-[1500px]">
        {/* Phần Header bên trái cho màn hình lớn, bên trên cho màn hình nhỏ */}
        {/* <HeaderDashboard />   */}

        {/* Phần Layout bên phải, chiếm toàn bộ chiều rộng trên mobile, chiếm phần còn lại trên máy tính bảng và máy tính */}
        <div className="flex-1 bg-gray-100 h-full p-4">
            {/* Nội dung của layout */}
            {children}
            {/* Thêm các phần tử khác vào đây */}
        </div>
    </div>  
    
   

</div>
  )
}

export default LayoutDashboard