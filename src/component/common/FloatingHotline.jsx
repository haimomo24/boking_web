"use client";

import Link from 'next/link';
import React, { useState } from 'react';
import { FaPhone, FaTimes, FaFacebookMessenger } from 'react-icons/fa';
import { SiZalo } from 'react-icons/si';

const FloatingHotline = () => {
  const [isPhoneOpen, setIsPhoneOpen] = useState(false);
  const [isZaloOpen, setIsZaloOpen] = useState(false);
  const [isFacebookOpen, setIsFacebookOpen] = useState(false);
  
  const phoneNumber = "1900966909"; 
  const zaloNumber = "0123456789"; 
  const facebookLink = "https://www.facebook.com/chuabaidinh35"; 

  const togglePhone = () => {
    setIsPhoneOpen(!isPhoneOpen);
    if (isZaloOpen) setIsZaloOpen(false);
    if (isFacebookOpen) setIsFacebookOpen(false);
  };

  const toggleZalo = () => {
    setIsZaloOpen(!isZaloOpen);
    if (isPhoneOpen) setIsPhoneOpen(false);
    if (isFacebookOpen) setIsFacebookOpen(false);
  };

  const toggleFacebook = () => {
    setIsFacebookOpen(!isFacebookOpen);
    if (isPhoneOpen) setIsPhoneOpen(false);
    if (isZaloOpen) setIsZaloOpen(false);
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-3">
      {/* Popup hiển thị số điện thoại */}
      {isPhoneOpen && (
        <div className="hotline-popup absolute bottom-40 right-0 bg-white rounded-lg shadow-lg p-3 mb-2 w-56">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-gray-800 text-sm">Hotline hỗ trợ</h3>
            <button 
              onClick={togglePhone}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <FaTimes className="text-sm" />
            </button>
          </div>
          <p className="text-gray-600 mb-2 text-xs">Gọi ngay để được tư vấn:</p>
          <Link 
            href={`tel:${phoneNumber.replace(/\s/g, '')}`}
            className="block w-full bg-red-500 hover:bg-red-600 text-white text-center py-2 rounded-lg font-bold transition-colors text-sm"
          >
            {phoneNumber}
          </Link>
        </div>
      )}

      {/* Popup hiển thị Zalo */}
      {isZaloOpen && (
        <div className="hotline-popup absolute bottom-40 right-0 bg-white rounded-lg shadow-lg p-3 mb-2 w-56">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-gray-800 text-sm">Zalo hỗ trợ</h3>
            <button 
              onClick={toggleZalo}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <FaTimes className="text-sm" />
            </button>
          </div>
          <p className="text-gray-600 mb-2 text-xs">Nhắn tin Zalo để được tư vấn:</p>
          <a 
            href={`https://zalo.me/${zaloNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-blue-500 hover:bg-blue-600 text-white text-center py-2 rounded-lg font-bold transition-colors text-sm"
          >
            Chat với Zalo
          </a>
        </div>
      )}

      {/* Popup hiển thị Facebook */}
      {isFacebookOpen && (
        <div className="hotline-popup absolute bottom-40 right-0 bg-white rounded-lg shadow-lg p-3 mb-2 w-56">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-gray-800 text-sm">Facebook hỗ trợ</h3>
            <button 
              onClick={toggleFacebook}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <FaTimes className="text-sm" />
            </button>
          </div>
          <p className="text-gray-600 mb-2 text-xs">Nhắn tin Facebook để được tư vấn:</p>
          <Link 
            href={facebookLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-[#0084ff] hover:bg-[#0070db] text-white text-center py-2 rounded-lg font-bold transition-colors text-sm"
          >
            Chat với Facebook
          </Link>
        </div>
      )}

      {/* Nút Facebook với animation */}
      <button
        onClick={toggleFacebook}
        className="facebook-button bg-[#0084ff] hover:bg-[#0070db] text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg transition-transform"
      >
        <FaFacebookMessenger className="text-lg" />
      </button>

      {/* Nút Zalo với animation */}
      <button
        onClick={toggleZalo}
        className="zalo-button bg-blue-500 hover:bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg transition-transform"
      >
        <SiZalo className="text-lg" />
      </button>

      {/* Nút hotline với animation */}
      <button
        onClick={togglePhone}
        className="hotline-button bg-red-500 hover:bg-red-600 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg transition-transform"
      >
        <FaPhone className="text-lg" />
      </button>
    </div>
  );
};

export default FloatingHotline;
