"use client"
import React, { useState } from "react";
import { Accordion, AccordionSummary, AccordionDetails, Typography } from "@mui/material";
import { ExpandMore, ExpandLess } from "@mui/icons-material";

const faqData = [
  {
    question: "Chính sách hoàn hủy, đổi, chuyển nhượng vé",
    answer: (
      <ul className="list-disc pl-5">
        <li>Vé điện tử không được hoàn hủy và thay đổi khi giao dịch đã thành công.</li>
        <li>Quý khách cần kiểm tra kỹ lưỡng thông tin đặt vé trước khi xác nhận thanh toán.</li>
        <li>Trường hợp lỗi do khách hàng, Ban Quản Lý không hỗ trợ hoàn tiền.</li>
      </ul>
    ),
  },
  {
    question: "Thời gian mở cửa khu du lịch",
    answer: (
      <div>
        <p> Từ 7h00  17h00 hàng ngày</p>
        <p className="text-sm text-gray-500">
          * Trong điều kiện có thiên tai, Ban Quản lý sẽ tạm dừng bán vé và có thông báo chính thức.
        </p>
      </div>
    ),
  },
  {
    question: "Những thông tin quan trọng",
    answer: (
      <ul className="list-disc pl-5">
        <li>Du khách nên mang theo ô hoặc áo mưa trước khi xuống thuyền.</li>
        <li>Du khách mặc áo phao trong suốt thời gian ngồi trên thuyền khám phá để đảm bảo an toàn.</li>
        <li>Du khách không hút thuốc, không đốt lửa.</li>
        <li>Du khách không mặc quần áo, váy ngắn khi vào đền, chùa.</li>
        <li>Du khách không phát nhạc bằng bất cứ thiết bị gì tại khu du lịch.</li>
        <li>Tất cả các điểm tham quan đều có nhà vệ sinh phục vụ du khách.</li>
      </ul>
    ),
  },
  {
    question: "Kinh nghiệm du lịch Bái Đính: Đi tuyến 1,2,3 hay 4",
    answer: <p>Hướng dẫn chọn tuyến du lịch phù hợp...</p>,
  },
];

const QuestionPage = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="max-w-3xl mx-auto py-10">
      <h2 className="text-center text-[#800000] text-2xl font-semibold mb-6">
        <span className="text-pink-500">Câu Hỏi</span> Thường Gặp
      </h2>
      {faqData.map((item, index) => (
        <Accordion
          key={index}
          expanded={openIndex === index}
          onChange={() => setOpenIndex(openIndex === index ? null : index)}
        >
          <AccordionSummary expandIcon={openIndex === index ? <ExpandLess /> : <ExpandMore />}>
            <Typography variant="subtitle1" className="font-semibold">
              {index + 1}. {item.question}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div>{item.answer}</div>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default QuestionPage;
