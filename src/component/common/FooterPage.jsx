"use client";

import React, { useState, useEffect } from 'react';
import { FaFacebookF, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaEye } from "react-icons/fa";

const FooterPage = () => {
  // Khai báo tất cả state ở đầu component
  const [visitorCount, setVisitorCount] = useState(0);
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Hàm xử lý gửi form liên hệ
  const handleSubmitContact = async (e) => {
    e.preventDefault();
    
    if (!acceptTerms) {
      setSubmitStatus({
        type: 'error',
        message: 'Vui lòng đồng ý với điều khoản và điều kiện'
      });
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: contactName,
          phone: contactPhone,
          email: contactEmail || '',
        }),
      });
      
      if (!response.ok) {
        throw new Error('Có lỗi xảy ra khi gửi thông tin');
      }
      
      // Reset form
      setContactName('');
      setContactPhone('');
      setContactEmail('');
      setAcceptTerms(false);
      
      setSubmitStatus({
        type: 'success',
        message: 'Gửi thông tin thành công! Chúng tôi sẽ liên hệ với bạn sớm.'
      });
    } catch (error) {
      console.error('Lỗi khi gửi form:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Không thể gửi thông tin. Vui lòng thử lại sau.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    // Kiểm tra xem đã có số lượt truy cập trong localStorage chưa
    const storedCount = localStorage.getItem('visitorCount');
    
    if (storedCount) {
      // Nếu đã có, tăng thêm 1 và cập nhật
      const newCount = parseInt(storedCount) + 1;
      localStorage.setItem('visitorCount', newCount.toString());
      setVisitorCount(newCount);
    } else {
      // Nếu chưa có, khởi tạo với giá trị 1
      localStorage.setItem('visitorCount', '1');
      setVisitorCount(1);
    }
  }, []);

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
            
            {/* Thêm phần hiển thị số lượt truy cập */}
            <div className="mt-4 bg-[#2a4d47] p-3 rounded-lg inline-flex items-center gap-2">
              <FaEye className="text-lg text-yellow-300" />
              <div>
                <p className="font-bold text-yellow-300">{visitorCount.toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Phần form bên phải */}
          <div className="md:w-1/2 bg-opacity-50 p-5 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">Để lại thông tin và nhận tư vấn</h3>
            <form onSubmit={handleSubmitContact}>
              <input
                type="text"
                placeholder="Họ và tên"
                className="w-full p-3 rounded-md mb-3 text-black bg-white"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Số điện thoại"
                className="w-full p-3 rounded-md mb-3 text-black bg-white"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Email (không bắt buộc)"
                className="w-full p-3 rounded-md mb-3 text-black bg-white"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
              />
              <div className="flex items-center gap-2 mb-3">
                <input 
                  type="checkbox" 
                  id="terms" 
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  required
                />
                <label htmlFor="terms" className="text-sm">
                  Tôi đồng ý với các <a href="#" className="text-blue-400">điều khoản & điều kiện</a>
                </label>
              </div>
              <button 
                type="submit"
                className="bg-pink-500 text-white px-5 py-2 rounded-lg hover:bg-pink-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Đang gửi...' : 'Gửi thông tin →'}
              </button>
              {submitStatus && (
                <div className={`mt-3 p-2 rounded ${submitStatus.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {submitStatus.message}
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Phần cuối */}
        <div className="text-center text-sm mt-10 opacity-80">
          Khu du Lịch VHTL Bái Đính. Tất cả quyền được bảo lưu.
        </div>
      </footer>
    </div>
  );
};

export default FooterPage;
