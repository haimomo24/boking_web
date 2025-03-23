import React from 'react'
import { FaFacebookF, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const FooterPage = () => {
  return (
    <div>
         <footer className="bg-[#1e3d37] text-white py-10 px-5 md:px-20">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center md:items-start">
        {/* Phần thông tin bên trái */}
        <div className="md:w-1/2">
          <img src="/images/logo1.jpg" alt="Trang An Logo" className="w-20 mb-3" />
          
          <p className="mb-3 text-lg">
            Khu du lịch VHTL Bái Đính được UNESCO công nhận là di sản thế giới kép từ 2014
          </p>
          <p className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-lg" /> Khu Du Lịch VHTL Bái Đính, Xã Gia Sinh, Huyện Gia Viễn, Ninh Bình
          </p>
          <p className="flex items-center gap-2 mt-2">
            <FaEnvelope className="text-lg" /> sales@disantrangan.com
          </p>
          <p className="flex items-center gap-2 mt-2">
            <FaPhoneAlt className="text-lg" /> 19009251
          </p>
          <p className="flex items-center gap-2 mt-2">
            <FaFacebookF className="text-lg" /> Fanpage KDL VHTL Bái Đính
          </p>
        </div>

        {/* Phần form bên phải */}
        <div className="md:w-1/2 bg-opacity-50 p-5 rounded-lg">
          <h3 className="text-xl font-semibold mb-3">Để lại thông tin và nhận tư vấn</h3>
          <input
            type="text"
            placeholder="Họ và tên"
            className="w-full p-3 rounded-md mb-3 text-black bg-white"
          />
          <input
            type="text"
            placeholder="Số điện thoại"
            className="w-full p-3 rounded-md mb-3 text-black bg-white"
          />
          <input
            type="email"
            placeholder="Email (không bắt buộc)"
            className="w-full p-3 rounded-md mb-3 text-black bg-white"
          />
          <div className="flex items-center gap-2 mb-3">
            <input type="checkbox" id="terms" />
            <label htmlFor="terms" className="text-sm">
              Tôi đồng ý với các <a href="#" className="text-blue-400">điều khoản & điều kiện</a>
            </label>
          </div>
          <button className="bg-pink-500 text-white px-5 py-2 rounded-lg hover:bg-pink-600">
            Gửi thông tin →
          </button>
        </div>
      </div>

      {/* Phần cuối */}
      <div className="text-center text-sm mt-10 opacity-80">
        Khu du Lịch VHTL Bái Đính. Tất cả quyền được bảo lưu.
      </div>
    </footer>
    </div>
  )
}

export default FooterPage