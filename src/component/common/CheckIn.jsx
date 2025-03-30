import React from "react";
import Image from "next/image";

const locations = [
  { id: 7, name: "Tam Quan Nội", desc: "Internal Three Gates" },
  { id: 8, name: "Hành Lang La Hán", desc: "Arhat Corridor" },
  { id: 9, name: "Gác Chuông", desc: "Bell Tower" },
  { id: 10, name: "Điện Quán Âm", desc: "The Kuan-yin Hall" },
  { id: 12, name: "Điện Giáo Chủ", desc: "The Buddha Sakyamuni Hall" },
  { id: 14, name: "Điện Tam Thế", desc: "The Three Periods Hall" },
  { id: 16, name: "Tượng Phật Di Lặc", desc: "Maitreya Buddha Statue" },
  { id: 17, name: "Tháp Bảo Thiên", desc: "Bao Thien Stupa" },
  { id: 22, name: "Cafe Chuông Gió", desc: "Wind Chimes Coffee" },
  { id: 28, name: "Giếng Ngọc", desc: "Pearl Well" },
  { id: 34, name: "Tháp Tứ Ân", desc: "Four Graces Tower" },
  { id: 36, name: "Thủy Đình", desc: "Water Pavilion" },
  { id: 37, name: "Bến Xe Điện Bãi Chính", desc: "Farewell Electric Car Station" },
];

const CheckIn = () => {
  return (
    <div className="w-full bg-[#f8f8f8] p-6 rounded-lg shadow-lg max-w-screen-xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-[#800000] uppercase tracking-wide">
        Sơ đồ Check-in Chùa Bái Đính
      </h2>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Hình ảnh bản đồ */}
        <div className="md:w-2/3">
          <Image
            src="/images/sodo.jpg" // Thay bằng ảnh bạn đã tải lên
            alt="Sơ đồ check-in chùa Bái Đính"
            width={900}
            height={700}
            className="w-full h-auto rounded-lg border-4 border-[#800000]"
          />
        </div>

        {/* Danh sách địa điểm */}
        <div className="md:w-1/3 p-6 bg-white rounded-lg shadow-md border border-gray-200 max-h-[600px] overflow-y-auto">
          <h3 className="text-xl font-semibold mb-4 text-[#800000] text-center">Danh sách điểm check-in</h3>

          <ul className="space-y-3">
            {locations.map((location) => (
              <li
                key={location.id}
                className="p-3 bg-gray-100 rounded-lg border-l-4 border-[#800000] hover:bg-gray-200 transition"
              >
                <a href="#" className="block text-[#800000] font-bold text-lg">
                  {location.id}. {location.name}
                </a>
                <p className="text-gray-600 text-sm italic">{location.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CheckIn;