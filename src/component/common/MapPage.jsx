"use client";

import React, { useState } from 'react'
import Image from 'next/image'

const MapPage = () => {
  const [isImageOpen, setIsImageOpen] = useState(false);

  const openImage = () => {
    setIsImageOpen(true);
  };

  const closeImage = () => {
    setIsImageOpen(false);
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <h2 className="text-center text-3xl font-bold mb-10 text-[#800000]">
        Bản đồ tham quan chùa Bái Đính  
      </h2>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Phần ảnh bản đồ bên trái */}
        <div className="md:w-1/2 flex flex-col">
          <div 
            className="relative w-full h-0 pb-[56.25%] cursor-pointer flex-grow" 
            onClick={openImage}
          >
            <Image 
              src="/images/so-do-bd-chuan_b-n-xe-trung-tam.jpg" 
              alt="Bản đồ tham quan chùa Bái Đính"
              fill
              className="object-cover rounded-lg shadow-md"
              priority
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
              <span className="bg-black bg-opacity-50 text-white px-3 py-1 rounded-md">
                Chi tiết
              </span>
            </div>
          </div>
        </div>
        
        {/* Phần video YouTube bên phải */}
        <div className="md:w-1/2 mt-6 md:mt-0">
          <div className="relative w-full h-0 pb-[56.25%]">
            <iframe 
              className="absolute top-0 left-0 w-full h-full rounded-lg shadow-md"
              src="https://www.youtube.com/embed/gPT0x6ex9I8" 
              title="Video giới thiệu chùa Bái Đính"
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>

      {/* Modal phóng to hình ảnh */}
      {isImageOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80" onClick={closeImage}>
          <div className="relative w-[90%] h-[90%] max-w-6xl">
            <button 
              className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg"
              onClick={(e) => {
                e.stopPropagation();
                closeImage();
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="w-full h-full relative">
              <Image 
                src="/images/so-do-bd-chuan_b-n-xe-trung-tam.jpg" 
                alt="Bản đồ tham quan chùa Bái Đính"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MapPage