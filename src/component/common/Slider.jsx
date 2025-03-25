"use client";

import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const SliderComponent = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
        }
      }
    ]
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {/* Item 1 */}
        <div className="slide-item">
          <img
            src="https://storage-vnportal.vnpt.vn/nbh-ubnd/2824/Baidinh/bd-toan-canh.jpg"
            className="slide-image"
            alt="Slider image 1"
          />
        </div>
        
        {/* Item 2 */}
        <div className="slide-item">
          <img
            src="/images/DJI_0616.JPG"
            className="slide-image"
            alt="Slider image 2"
          />
        </div>
        
        {/* Item 3 */}
        <div className="slide-item">
          <img
            src="https://muave.disantrangan.vn/images/slider1.jpg"
            className="slide-image"
            alt="Slider image 3"
          />
        </div>
        
        {/* Item 4 */}
        <div className="slide-item">
          <img
            src="https://muave.disantrangan.vn/images/slider4.jpg"
            className="slide-image"
            alt="Slider image 4"
          />
        </div>
      </Slider>
      
      <style jsx>{`
        .slider-container {
          width: 100%;
          margin: 0 auto;
          overflow: hidden;
        }
        
        /* Thiết lập chiều cao cho slide */
        :global(.slide-item) {
          height: 600px;
          
          /* Điều chỉnh chiều cao cho mobile */
          @media (max-width: 768px) {
            height: 300px;
          }
          
          @media (max-width: 480px) {
            height: 250px;
          }
        }
        
        :global(.slide-image) {
          width: 100%;
          height: 100%;
          object-fit: cover;
          
          /* Đảm bảo ảnh hiển thị đầy đủ trên mobile */
          @media (max-width: 768px) {
            object-position: center;
          }
        }
        
        /* Tùy chỉnh màu sắc của dots */
        :global(.slick-dots) {
          bottom: 25px;
          
          /* Điều chỉnh vị trí dots trên mobile */
          @media (max-width: 768px) {
            bottom: 10px;
          }
        }
        
        :global(.slick-dots li button:before) {
          color: #fff;
          opacity: 0.5;
          font-size: 8px;
          
          /* Tăng kích thước dots trên mobile để dễ nhấn */
          @media (max-width: 768px) {
            font-size: 10px;
          }
        }
        
        :global(.slick-dots li.slick-active button:before) {
          color: #fff;
          opacity: 1;
        }
        
        /* Tùy chỉnh nút prev/next */
        :global(.slick-prev), :global(.slick-next) {
          z-index: 10;
          width: 40px;
          height: 40px;
        }
        
        :global(.slick-prev) {
          left: 10px;
        }
        
        :global(.slick-next) {
          right: 10px;
        }
        
        :global(.slick-prev:before), :global(.slick-next:before) {
          font-size: 40px;
          
          /* Điều chỉnh kích thước nút trên mobile */
          @media (max-width: 768px) {
            font-size: 30px;
          }
        }
        
        /* Đảm bảo slider không bị tràn ra ngoài màn hình */
        :global(.slick-slider) {
          overflow: hidden;
          width: 100%;
        }
        
        /* Đảm bảo slide hiển thị đúng */
        :global(.slick-track) {
          display: flex !important;
        }
        
        :global(.slick-slide) {
          height: inherit !important;
          display: flex !important;
          justify-content: center;
          align-items: center;
        }
        
        :global(.slick-slide > div) {
          width: 100%;
          height: 100%;
        }
      `}</style>
    </div>
  );
};

export default SliderComponent;
