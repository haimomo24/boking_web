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
  // Giảm số lượng item trên mỗi trang xuống 2 cho màn hình điện thoại
  const [itemsPerPage, setItemsPerPage] = useState(4);
  
  // Sử dụng useEffect để điều chỉnh số lượng item dựa trên kích thước màn hình
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(2); // Hiển thị 2 item trên màn hình điện thoại
      } else {
        setItemsPerPage(4); // Hiển thị 4 item trên màn hình lớn hơn
      }
    };
    
    // Thiết lập ban đầu
    handleResize();
    
    // Thêm event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Fetch data from API when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/imagebooking');
        
        if (!response.ok) {
          throw new Error('Network response was not ok: ' + response.statusText);
        }
        
        const data = await response.json();
        
        // Kiểm tra cấu trúc dữ liệu trả về
        if (Array.isArray(data)) {
          setSeasons(data);
        } else if (data.recordset && Array.isArray(data.recordset)) {
          // Nếu API trả về dạng { recordset: [...] }
          setSeasons(data.recordset);
        } else {
          console.error('Unexpected data format:', data);
          setSeasons([]);
        }
        
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
      // Cuộn lên đầu phần nội dung khi chuyển trang trên mobile
      if (window.innerWidth < 768) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };
  
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      // Cuộn lên đầu phần nội dung khi chuyển trang trên mobile
      if (window.innerWidth < 768) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  // Hàm xử lý khi click vào ảnh
  const handleImageClick = (id) => {
    router.push(`/detail/${id}`);
  };

  // Hàm xử lý lỗi ảnh
  const handleImageError = (e) => {
    e.target.onerror = null; // Tránh vòng lặp vô hạn
    e.target.src = '/placeholder.jpg'; // Thay thế bằng ảnh mặc định
  };

  // Loading state với hiệu ứng skeleton
  if (loading) {
    return (
      <div className="max-w-6xl mx-auto py-8 px-4 sm:py-12">
        <div className="text-center mb-8">
          <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="bg-gray-200 rounded-lg overflow-hidden h-64 animate-pulse">
              <div className="h-full w-full"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="max-w-6xl mx-auto py-8 px-4 sm:py-12">
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
      <div className="max-w-6xl mx-auto py-8 px-4 sm:py-12">
        <div className="text-center py-10">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
          <p className="text-center text-gray-500">Không có dữ liệu để hiển thị</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="max-w-6xl mx-auto py-8 px-4 sm:py-12">
        <h2 className="text-center text-xl sm:text-2xl font-semibold mb-6 px-2">
          Trải nghiệm KDL VHTL Bái Đính <span className="text-red-500"></span>
        </h2>
        
        {/* Grid layout với responsive columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {currentItems.map((season, index) => (
            <div 
              key={index} 
              className="relative group overflow-hidden rounded-lg shadow-md cursor-pointer transform transition duration-300 hover:scale-[1.02] active:scale-[0.98]"
              onClick={() => handleImageClick(season.id)}
            >
              {/* Ảnh với aspect ratio cố định */}
              <div className="relative w-full h-0 pb-[75%]">
                {/* Sử dụng thẻ img thông thường thay vì Image component để xử lý lỗi tốt hơn */}
                <img 
                  src={season.images} 
                  alt={season.title || 'Hình ảnh'} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  onError={handleImageError}
                />
              </div>
              
              {/* Tiêu đề luôn hiển thị */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 sm:p-4">
                <h3 className="text-lg sm:text-xl font-semibold text-white line-clamp-2">{season.title}</h3>
              </div>
              
              {/* Phần thông tin chỉ hiển thị khi hover/tap */}
              <div className="absolute inset-0 bg-black/70 flex flex-col justify-center items-center p-3 sm:p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 text-center">{season.title}</h3>
                {season.time && <p className="text-white text-sm italic mb-2">{season.time}</p>}
                <p className="text-white text-center text-sm sm:text-base line-clamp-3">
                  {season.description && season.description.length > 80 
                    ? `${season.description.substring(0, 80)}...` 
                    : season.description}
                </p>
                <div className="w-10 h-1 bg-red-500 mt-3"></div>
                <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-medium transform transition hover:bg-red-600 active:scale-95">
                  Xem chi tiết
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Phân trang với thiết kế tối ưu cho mobile */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8">
            <nav className="flex items-center bg-white rounded-lg shadow px-2 py-1">
              <button 
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className={`p-2 mx-1 rounded-full flex items-center justify-center ${
                  currentPage === 1 
                    ? 'text-gray-400 cursor-not-allowed' 
                    : 'text-gray-700 hover:bg-gray-100 active:bg-gray-200'
                }`}
                aria-label="Previous page"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              
              {/* Hiển thị thông tin trang hiện tại */}
              <span className="mx-2 text-sm font-medium text-gray-700">
                {currentPage} / {totalPages}
              </span>
              
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`p-2 mx-1 rounded-full flex items-center justify-center ${
                  currentPage === totalPages
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-700 hover:bg-gray-100 active:bg-gray-200'
                }`}
                aria-label="Next page"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
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
