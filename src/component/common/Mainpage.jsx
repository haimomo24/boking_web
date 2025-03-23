"use client";

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation';

const Mainpage = () => {
  const router = useRouter();
  const [seasons, setSeasons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  
  // Fetch data from API when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/imagebooking');
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        setSeasons(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        console.error('Error fetching data:', err);
      }
    };
    
    fetchData();
  }, []);
  
  // Tính toán tổng số trang
  const totalPages = Math.ceil(seasons.length / itemsPerPage);
  
  // Lấy các mục cho trang hiện tại
  const currentItems = seasons.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  // Hàm xử lý khi chuyển trang
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Hàm xử lý khi click vào ảnh
  const handleImageClick = (id) => {
    router.push(`/detail/${id}`);
  };

  // Loading state
  if (loading) {
    return (
      <div className="max-w-6xl mx-auto py-12 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="max-w-6xl mx-auto py-12">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Lỗi! </strong>
          <span className="block sm:inline">Không thể tải dữ liệu. {error}</span>
        </div>
      </div>
    );
  }

  // Empty data state
  if (seasons.length === 0) {
    return (
      <div className="max-w-6xl mx-auto py-12">
        <p className="text-center text-gray-500">Không có dữ liệu để hiển thị</p>
      </div>
    );
  }

  return (
    <div>
      <div className="max-w-6xl mx-auto py-12">
        <h2 className="text-center text-2xl font-semibold mb-6">
          Trải nghiệm KDL VHTL Bái Đính <span className="text-red-500"></span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentItems.map((season, index) => (
            <div 
              key={index} 
              className="relative group overflow-hidden rounded-lg shadow-md cursor-pointer"
              onClick={() => handleImageClick(season.id)}
            >
              {/* Ảnh */}
              <div className="relative h-64 w-full">
                <Image 
                  src={season.images} 
                  alt={season.title} 
                  fill 
                  className="object-cover transition-transform duration-300 group-hover:scale-110" 
                />
              </div>
              
              {/* Tiêu đề luôn hiển thị */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <h3 className="text-xl font-semibold text-white">{season.title}</h3>
              </div>
              
              {/* Phần thông tin chỉ hiển thị khi hover */}
             {/* Phần thông tin chỉ hiển thị khi hover */}
<div className="absolute inset-0 bg-black/70 flex flex-col justify-center items-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
  <h3 className="text-xl font-semibold text-white mb-2">{season.title}</h3>
  <p className="text-white text-sm italic mb-3">{season.time}</p>
  <p className="text-white text-center">
    {season.description && season.description.length > 100 
      ? `${season.description.substring(0, 100)}...` 
      : season.description}
  </p>
  <div className="w-10 h-1 bg-red-500 mt-3"></div>
 
</div>

            </div>
          ))}
        </div>
        
        {/* Phân trang chỉ với 2 mũi tên */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8">
            <nav className="flex items-center">
              <button 
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className={`px-4 py-2 mx-2 rounded-md flex items-center ${
                  currentPage === 1 
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              
              </button>
              
              {/* Hiển thị thông tin trang hiện tại */}
              <span className="mx-4 text-gray-700">
                Trang {currentPage} / {totalPages}
              </span>
              
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 mx-2 rounded-md flex items-center ${
                  currentPage === totalPages
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
             
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </nav>
          </div>
        )}
      </div>
    </div>
  )
}

export default Mainpage
