"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const locations = [
  { id: 7, name: "Tam Quan Nội", desc: "Internal Three Gates", link: "/detail/3 " },
  { id: 8, name: "Hành Lang La Hán", desc: "Arhat Corridor", link: "/detail/5 " },
  { id: 9, name: "Tháp Chuông", desc: "Bell Tower", link: "/detail/3" },
  { id: 10, name: "Điện Quán Âm", desc: "The Kuan-yin Hall", link: "/location/dien-quan-am" },
  { id: 12, name: "Điện Giáo Chủ", desc: "The Buddha Sakyamuni Hall", link: "/location/dien-giao-chu" },
  { id: 14, name: "Điện Tam Thế", desc: "The Three Periods Hall", link: "/location/dien-tam-the" },
  { id: 16, name: "Tượng Phật Di Lặc", desc: "Maitreya Buddha Statue", link: "/location/tuong-phat-di-lac" },
  { id: 17, name: "Tháp Bảo Thiên", desc: "Bao Thien Stupa", link: "/location/thap-bao-thien" },
  { id: 22, name: "Cafe Chuông Gió", desc: "Wind Chimes Coffee", link: "/detail/8 " },
  { id: 28, name: "Giếng Ngọc", desc: "Pearl Well", link: "/detail/4 " },
  { id: 34, name: "Tháp Tứ Ân", desc: "Four Graces Tower", link: "/location/thap-tu-an" },
  { id: 36, name: "Thủy Đình", desc: "Water Pavilion", link: "/location/thuy-dinh" },
  { id: 37, name: "Bến Xe Điện Bãi Chính", desc: "Farewell Electric Car Station", link: "/location/ben-xe-dien-bai-chinh" },
];

const CheckIn = () => {
  const imageRef = useRef(null);
  const [listHeight, setListHeight] = useState('auto');

  useEffect(() => {
    const updateHeight = () => {
      if (imageRef.current) {
        const imageHeight = imageRef.current.clientHeight;
        setListHeight(`${imageHeight}px`);
      }
    };

    // Cập nhật chiều cao khi component mount
    updateHeight();
    
    // Cập nhật chiều cao khi cửa sổ thay đổi kích thước
    window.addEventListener('resize', updateHeight);
    
    // Cleanup listener khi component unmount
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  return (
    <div className="w-full bg-[#f8f8f8] p-6 rounded-lg shadow-lg max-w-screen-xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-[#800000] ">
        Sơ đồ Check-in Chùa Bái Đính
      </h2>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Hình ảnh bản đồ */}
        <div className="md:w-3/4" ref={imageRef}>
          <Image
            src="/images/sodo.jpg"
            alt="Sơ đồ check-in chùa Bái Đính"
            width={900}
            height={700}
            className="w-full h-auto rounded-lg border-4 border-[#800000]"
            style={{ objectFit: 'contain' }}
          />
        </div>

        {/* Danh sách địa điểm */}
        <div 
          className="md:w-1/4 bg-white border border-gray-200 rounded-lg flex flex-col"
          style={{ height: listHeight }}
        >
          <h3 className="text-xl font-semibold py-2 text-[#800000] text-center border-b border-gray-200">Danh sách điểm check-in</h3>

          <div className="grid grid-cols-1 gap-1.5 p-3 overflow-y-auto flex-grow">
            {locations.map((location) => (
              <Link 
                key={location.id} 
                href={location.link} 
                className="block p-1.5 bg-gray-100 rounded border-l-2 border-[#800000] hover:bg-gray-200 transition"
              >
                <div className="text-[#800000] font-medium text-xs">
                  {location.id}. {location.name}
                </div>
                <p className="text-gray-600 text-[10px] italic">{location.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckIn;
