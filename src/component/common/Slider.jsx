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
            src="https://muave.disantrangan.vn/images/slider2.jpg"
            className="slide-image"
            alt="Slider image 1"
          />
        </div>
        
        {/* Item 2 */}
        <div className="slide-item">
          <img
            src="https://muave.disantrangan.vn/images/slider3.jpg"
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
            src="https://placehold.co/1200x600?text=Slide+4"
            className="slide-image"
            alt="Slider image 4"
          />
        </div>
        
        {/* Item 5 */}
        <div className="slide-item">
          <img
            src="https://placehold.co/1200x600?text=Slide+5"
            className="slide-image"
            alt="Slider image 5"
          />
        </div>
      </Slider>
      
      <style jsx>{`
        .slider-container {
          width: 100%;
          margin: 0 auto;
        }
        
        /* Thiết lập chiều cao 600px cho slide */
        :global(.slide-item) {
          height: 600px;
        }
        
        :global(.slide-image) {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        /* Tùy chỉnh màu sắc của dots */
        :global(.slick-dots) {
          bottom: 25px;
        }
        
        :global(.slick-dots li button:before) {
          color: #fff;
          opacity: 0.5;
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
        }
      `}</style>
    </div>
  );
};

export default SliderComponent;