"use client";

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { FaFacebookF, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaEye } from "react-icons/fa";

const FooterPage = () => {
  // Khai báo tất cả state ở đầu component
  const [visitorCount, setVisitorCount] = useState(0);
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactTitle, setContactTitle] = useState('');
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
          title: contactTitle || '',
          status: 'new'
        }),
      });
      
      if (!response.ok) {
        throw new Error('Có lỗi xảy ra khi gửi thông tin');
      }
      
      // Reset form
      setContactName('');
      setContactPhone('');
      setContactEmail('');
      setContactTitle('');
      setAcceptTerms(false);
      
      setSubmitStatus({
        type: 'success',
        message: 'Gửi thông tin thành công!'
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
    const storedCount = localStorage.getItem('visitorCount');
    
    if (storedCount) {
      const newCount = parseInt(storedCount) + 1;
      localStorage.setItem('visitorCount', newCount.toString());
      setVisitorCount(newCount);
    } else {
      localStorage.setItem('visitorCount', '1');
      setVisitorCount(1);
    }
  }, []);

  return (
    <footer className="bg-[#1e3d37] text-white py-6 px-4 md:px-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between gap-6">
        {/* Phần thông tin bên trái - thu gọn */}
        <div className="md:w-1/2 flex flex-col space-y-2">
          <div className="flex items-center gap-2">
            <img src="/images/logopage.png" alt="Trang An Logo" className="w-12 h-12" />
            <span className="text-sm md:text-base">Khu du lịch VHTL Bái Đính - Di sản thế giới UNESCO</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <p className="flex items-center gap-1">
              <FaMapMarkerAlt className="text-xs" /> KDL VHTL Bái Đính, Gia Sinh, Gia Viễn, Ninh Bình
            </p>
            <p className="flex items-center gap-1">
              <FaEnvelope className="text-xs" />infor@trangangroup.com
            </p>
            <p className="flex items-center gap-1">
              <FaPhoneAlt className="text-xs" /> 1900966909
            </p>
            <p className="flex items-center gap-1">
              <FaFacebookF className="text-xs" /><Link href="https://www.facebook.com/chuabaidinh35">Fanpage KDL VHTL Bái Đính</Link> 
            </p>
          </div>
          
          <div className=" p-2 rounded-lg inline-flex items-center gap-1">
            <FaEye className="text-xs text-yellow-300" />
            <p className="text-xs font-bold text-yellow-300">{visitorCount.toLocaleString()} lượt truy cập</p>
          </div>
        </div>

        {/* Phần form bên phải - thu gọn */}
        <div className="md:w-1/2">
          <h3 className="text-base font-semibold mb-2">Để lại thông tin và nhận tư vấn</h3>
          <form onSubmit={handleSubmitContact} className="space-y-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="Họ và tên"
                className="w-full p-2 rounded-md text-black text-sm bg-white"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Số điện thoại"
                className="w-full p-2 rounded-md text-black text-sm bg-white"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <input
                type="email"
                placeholder="Email (không bắt buộc)"
                className="w-full p-2 rounded-md text-black text-sm bg-white"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
              />
              <input
                type="text"
                placeholder="Nội dung cần tư vấn"
                className="w-full p-2 rounded-md text-black text-sm bg-white"
                value={contactTitle}
                onChange={(e) => setContactTitle(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <input 
                  type="checkbox" 
                  id="terms" 
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  required
                />
                <label htmlFor="terms" className="text-xs">
                  Đồng ý với <a href="#" className="text-blue-400">điều khoản & điều kiện</a>
                </label>
              </div>
              <button 
                type="submit"
                className="bg-pink-500 text-white px-3 py-1 text-sm rounded-lg hover:bg-pink-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Đang gửi...' : 'Gửi thông tin →'}
              </button>
            </div>
            {submitStatus && (
              <div className={`p-1 text-xs rounded ${submitStatus.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {submitStatus.message}
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Phần cuối */}
      <div className="text-center text-xs mt-4 opacity-80">
        Khu du Lịch VHTL Bái Đính. Tất cả quyền được bảo lưu.
      </div>
    </footer>
  );
};

export default FooterPage;
