"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const DetailPage = () => {
  const params = useParams();
  const { id } = params;
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/imagebooking/${id}`);
        
        if (!response.ok) {
          throw new Error('Không thể tải thông tin sản phẩm');
        }
        
        const data = await response.json();
        setProduct(data);
        setActiveImage(data.images); // Mặc định hiển thị ảnh chính
      } catch (err) {
        console.error('Error fetching product details:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      fetchProductDetail();
    }
  }, [id]);

  // Hàm xử lý khi click vào ảnh nhỏ
  const handleThumbnailClick = (imageUrl) => {
    setActiveImage(imageUrl);
  };

  if (loading) {
    return (
      <div className="container mx-auto py-12 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto py-12">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Lỗi! </strong>
          <span className="block sm:inline">{error || 'Không tìm thấy ản '}</span>
        </div>
        <div className="mt-4">
          <Link href="/" className="text-blue-500 hover:underline">
            ← Quay lại trang chủ
          </Link>
        </div>
      </div>
    );
  }

  // Xác định mô tả hiển thị dựa trên ảnh đang active
  const getActiveDescription = () => {
    if (activeImage === product.images) {
      return product.description;
    } else if (activeImage === product.image2) {
      return product.description2;
    } else if (activeImage === product.image3) {
      return product.description3;
    } else if (activeImage === product.image4) {
      return product.description4;
    }
    return product.description;
  };

  return (
  



<div className="bg-gray-50 min-h-screen">
  {/* Hero section với ảnh lớn */}
  <div className="relative h-[50vh] md:h-[60vh] w-full">
    <Image 
      src={product.images} 
      alt={product.title} 
      fill
      className="object-cover"
      priority
    />
    <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent">
      <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-12">
        <div className="text-white max-w-3xl">
          <div className="mb-2 flex items-center">
            <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">Điểm tham quan</span>
            <span className="ml-3 text-sm opacity-80">Ninh Bình, Việt Nam</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{product.title}</h1>
          <p className="text-lg opacity-90 max-w-2xl">
            Khám phá vẻ đẹp tâm linh và kiến trúc độc đáo của một trong những quần thể chùa lớn nhất Việt Nam
          </p>
        </div>
      </div>
    </div>
  </div>

  <div className="container mx-auto px-4 py-12">
    {/* Breadcrumb */}
    <div className="flex items-center text-sm text-gray-500 mb-8">
      <Link href="/" className="hover:text-red-500">Trang chủ</Link>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
      <Link href="/" className="hover:text-red-500">Điểm tham quan</Link>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
      <span className="text-gray-700 font-medium">{product.title}</span>
    </div>

    <div className="flex flex-col lg:flex-row gap-8">
      {/* Cột nội dung chính - kiểu bài báo */}
      <div className="lg:w-3/3">
        <article className="prose prose-lg max-w-none">
          {/* Phần giới thiệu */}
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Giới thiệu</h2>
          <p className="text-gray-700 mb-6">{product.description}</p>
          
          {/* Ảnh 1 và mô tả 1 */}
          <div className="my-8">
            <div className="relative h-96 w-full rounded-lg overflow-hidden mb-4">
              <Image 
                src={product.images} 
                alt={product.title} 
                fill
                className="object-cover"
              />
            </div>
            <p className="text-sm text-gray-500 italic text-center mb-6">Toàn cảnh khu du lịch văn hóa tâm linh Bái Đính từ trên cao</p>
            
            <p className="text-gray-700 mb-6">{product.description}</p>
          </div>
          
          {/* Ảnh 2 và mô tả 2 */}
          {product.image2 && (
            <div className="my-8">
             
              <div className="relative h-96 w-full rounded-lg overflow-hidden mb-4">
                <Image 
                  src={product.image2} 
                  alt="Kiến trúc" 
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-sm text-gray-500 italic text-center mb-6">Kiến trúc độc đáo của chùa Bái Đính</p>
              
              <p className="text-gray-700 mb-6">{product.description2 || "Chùa Bái Đính nổi tiếng với lối kiến trúc độc đáo, kết hợp giữa truyền thống và hiện đại. Công trình được xây dựng với quy mô lớn, sử dụng các vật liệu cao cấp như đá, gỗ quý và đồng. Điểm nổi bật trong kiến trúc của chùa là sự hài hòa giữa cảnh quan thiên nhiên và công trình tôn giáo, tạo nên một không gian tâm linh trang nghiêm nhưng không kém phần thoáng đãng."}</p>
            </div>
          )}
          
          {/* Ảnh 3 và mô tả 3 */}
          {product.image3 && (
            <div className="my-8">
              
              <div className="relative h-96 w-full rounded-lg overflow-hidden mb-4">
                <Image 
                  src={product.image3} 
                  alt="Tượng Phật" 
                  fill
                  className="object-cover"
                />
              </div>
             
              
             
            </div>
          )}
          
          {/* Ảnh 4 và mô tả 4 */}
          {product.image4 && (
            <div className="my-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Hành lang La Hán</h3>
              <div className="relative h-96 w-full rounded-lg overflow-hidden mb-4">
                <Image 
                  src={product.image4} 
                  alt="Hành lang La Hán" 
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-sm text-gray-500 italic text-center mb-6">Hành lang với 500 tượng La Hán được chạm khắc tinh xảo</p>
              
              <p className="text-gray-700 mb-6">{product.description4 || "Hành lang La Hán là một trong những công trình đặc sắc nhất tại chùa Bái Đính. Với 500 tượng La Hán được chạm khắc từ đá, mỗi tượng mang một nét mặt và tư thế khác nhau, thể hiện sự đa dạng trong cảm xúc và tính cách. Đi dọc hành lang, du khách có thể chiêm ngưỡng từng tượng La Hán và cảm nhận được sự tĩnh lặng, thanh bình nơi cửa Phật."}</p>
            </div>
          )}
          
          {/* Thông tin chi tiết */}
          <div className="bg-white p-6 rounded-lg shadow-sm my-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Thông tin chi tiết</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-500 mb-2">Địa điểm</h3>
                <p className="text-gray-800">Xã Gia Sinh, huyện Gia Viễn, tỉnh Ninh Bình</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-500 mb-2">Thời gian mở cửa</h3>
                <p className="text-gray-800">7:00 - 18:00 (Hàng ngày)</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-500 mb-2">Giá vé</h3>
                <p className="text-gray-800">100.000 VNĐ/người</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-500 mb-2">Liên hệ</h3>
                <p className="text-gray-800">0123 456 789</p>
              </div>
            </div>
          </div>
          
          {/* Mẹo du lịch */}
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 my-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Mẹo khi tham quan</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Nên mặc trang phục lịch sự khi vào các khu vực tâm linh</li>
              <li>Mang theo nước uống và kem chống nắng vào mùa hè</li>
              <li>Nên thuê hướng dẫn viên để hiểu rõ hơn về lịch sử và ý nghĩa của các công trình</li>
              <li>Thời điểm lý tưởng để tham quan là buổi sáng sớm hoặc chiều muộn để tránh đông đúc</li>
            </ul>
          </div>
        </article>
      </div>
      
      {/* Sidebar */}
      {/* Sidebar */}

    </div>
  </div>
</div>
  );
};

export default DetailPage;
