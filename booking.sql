-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th3 26, 2025 lúc 01:37 AM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `booking`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `contact`
--

CREATE TABLE `contact` (
  `id` int(225) NOT NULL,
  `email` varchar(2250) NOT NULL,
  `name` varchar(2250) NOT NULL,
  `phone` varchar(2250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `imagebooking`
--

CREATE TABLE `imagebooking` (
  `id` int(225) NOT NULL,
  `images` varchar(2250) NOT NULL,
  `description` varchar(2250) NOT NULL,
  `title` mediumtext NOT NULL,
  `image2` varchar(2252) NOT NULL,
  `image3` varchar(2250) NOT NULL,
  `image4` varchar(2250) NOT NULL,
  `description2` mediumtext NOT NULL,
  `description3` mediumtext NOT NULL,
  `description4` mediumtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `imagebooking`
--

INSERT INTO `imagebooking` (`id`, `images`, `description`, `title`, `image2`, `image3`, `image4`, `description2`, `description3`, `description4`) VALUES
(7, '/uploads/7b87e757-ff82-4782-a2e1-f101253e9ecf_lahan.jpg', 'Thưa quý khách, từ vị trí cổng Tam Quan hướng tầm mắt sang 2 bên quý khách sẽ thấy 2 dãy hành lang la hán. Hành lang được thiết kế hoàn toàn bằng gỗ với số lượng khoảng 3.500m khối gỗ tròn. Dọc hai hành lang tả, hữu đặt 500 pho tương La Hán, mỗi tượng cao khoảng 2.5m và nặng khoảng 4 tấn, chất liệu bằng đá, do các nghệ nhân làng nghề đá Ninh Vân( Hoa Lư) chế tác. Vì vậy hành lang còn gọi là La Hán Đường. La Hán Đường gồm hai dãy, mỗi dãy 117 gian, dài 1700m. được xác lập kỷ lục là hành lang la hán dài nhất Châu Á.', 'Hành Lang La Hán ', '/uploads/7eb80537-d2c6-4c2c-98cf-f273e50c1eb3_baothap.jpg', '/uploads/01a6305c-2f43-4a0e-8fbe-e47785afabf8_baothap.jpg', '', 'La Hán là các đệ tử của Phật Thích Ca, họ chưa thành Phật nên gọi là La Hán. Vì vậy quý khách thấy, La Hán đường chỉ được sắp đặt từ tam quan đến gần điện Pháp chủ, đây cũng là con đường tượng trưng cho con đường đến với cõi Phật. Mỗi vị La Hán đều có tên và ý nghĩa riêng.\r\n\r\nQuý khách có biết Tại sao các vị La Hán lại được thờ ở hành lang? Vì ở vị trí này, họ thường xuyên gần gũi, giáo dưỡng, dìu dắt chúng sinh. Trên con đường này, nếu để ý hai bên, chúng ta thấy rất nhiều những cây mít được trồng. Tại sao vậy? Trong đạo Phật mít là Paramita. Âm Hán Việt là Ba-la-mật-đa, nghĩa là đáo bỉ ngạn(đến bờ giác ngộ). Ý nghĩa của cây mít là đại giác ngộ, đỉnh cao của giải thoát. Vì thế, cây mít là cây thiêng, gắn với Phật đạo(gỗ mít dùng làm mõ chùa, làm tượng Phật, lá mít dùng đặt oản lễ Phật…). Thực ra, mít nó không mang yếu tố đơn thuần là chất liệu với những gân xoắn biểu hiện nghệ thuật, cao hơn, nó biểu hiện của loài cây thoát tục.\r\n\r\nSau đây xin kính mời quý khách đến điểm thăm quan thứ 2 của chùa: Điện Giáo Chủ.', 'gfgfgfgfgf', ''),
(8, '/uploads/0c352aea-4a90-425a-96e6-3863c5ee677f_thapchuong.jpg', 'Chùa Bái Đính được coi là quần thể chùa lớn nhất Việt Nam sở hữu nhiều kỷ lục quốc gia, nơi đây luôn thu hút đông đảo du khách tới thăm quan mỗi năm. Tháp chuông nơi treo “Đại Hồng Chung” của chùa Bái Đính là một trong những công trình đã được Trung tâm sách kỷ lục Việt Nam cấp bằng Xác nhận kỷ lục là quả chuông đồng lớn nhất Việt Nam vào ngày 12/12/2007.', 'Tháp Chuông ', '/uploads/28d41896-406e-4424-a262-a75639b52dd8_thapchuong2.jpg', '/uploads/1fd3a7d2-4053-4833-941e-1e437365576a_thapchuong3.jpg', '', 'Tháp chuông chùa Bái Đính được xây dựng bằng bê tông cốt thép giả gỗ, kiến trúc theo kiểu tháp chuông cổ. Tháp chuông có 3 tầng với 3 mái cong hẹp dần được lợp bằng ngói men ống Bát Tràng màu nâu sẫm. Mỗi tầng có 8 mái ghép lại, tổng cộng là 24 mái với 24 đầu đao cong vút lên. Kiến trúc của tháp chuông hình bát giác, mái đao theo kiểu hoa lá dây, biểu tượng cho sự sinh sôi nảy nở, trường tồn. Mỗi mái đao 1,65m. Dưới mái đao đắp các con bài họa tiết cao 2,3m để đỡ chân đao. Trên cùng của tháp chuông là chóp tháp hình búp sen cao 3,5m. Trong tháp chuông mỗi tầng có 16 cột, gồm 8 cột cái và 8 cột con. Ở tầng một, cột cái cao 16m, đường kính 0,8m; cột trung cao 8m, đường kính 0,7m. .', 'Tháp chuông chùa Bái Đính treo một quả chuông đồng nặng 36 tấn. Trong tháp chuông của chùa có cầu thang đi lên sàn ở tám phía có độ cao 6,9m, du khách có thể đi xung quanh ngắm nhìn chuông. ', ''),
(9, '/uploads/ac291225-79cc-47e2-b093-b02c0393cef7_giengngoc.jpg', 'Giếng ngọc chùa Bái Đính cổ nằm gần chân núi Bái Đính, tương truyền rằng cách đây gần 1000 năm Thiền sư Nguyễn Minh Không đã lấy nước để sắc thuốc chữa bệnh cho dân và chữa bệnh cho Thái tử Dương Hoán. Giếng ngọc chùa Bái Đính mới xây dựng lại hình mặt nguyệt, rất rộng, có đường kính gần 30m, độ sâu của nước là 6m. Miệng giếng xây lan can đá. Khu đất xung quanh giếng hình vuông có diện tích 6000m2, 4 góc là 4 lầu bát giác. Sân giếng ngọc chùa Bái Đính lát đá. Muốn xuống giếng phải qua một cổng đá đẹp. ', 'Giếng Ngọc ', '/uploads/eb016f3e-ecdb-485e-ad8a-c3dbf397378b_giengngoc3.jpg', '/uploads/df6af0f3-1a7c-4006-8327-4115daf603b9_giengngoc2.jpg', '', 'Điều kỳ lạ nhất của giếng ngọc chùa Bái Đính là từ xa xưa chỉ là một giếng đất nhỏ không bao giờ cạn nước, nước giếng trong vắt, xanh mát quanh năm, uống vào thấy khoan khoái dễ chịu. Nước giếng được dùng làm nước cúng lễ ở chùa. Bây giờ xây dựng lại, giếng rất rộng nhưng nước lúc nào cũng trong và nhiều.', 'Năm 2007 Giếng Ngọc mang về một kỷ lục cho chùa Bái Đính là: “Ngôi chùa có giếng lớn nhất Việt Nam\".\r\nMiệng giếng hình mặt nguyệt. Đường kính mặt giếng lên tới 30m. Độ sâu của nước là 6m. Giếng không khi nào hết nước, nước có màu xanh trong như mặt trăng non huyền diệu.', ''),
(10, '/uploads/80656c97-ccad-4cd4-9629-ebe1641a1dc2_tuongdilac.jpg', 'Bức tượng tạo hình Phật bằng đồng, nặng 80 tấn, cao 10 m, an vị trên ngọn đồi của chùa Bái Đính được Trung tâm sách kỷ lục Việt Nam - Vietkings công nhận là tượng Di Lặc lớn nhất nước.', 'Tượng phật Di Lặc', '/uploads/a87b4ad4-f60a-4c13-82ba-fbabc55821bb_chua-bai-dinh-tuong-phat-di-lac.png', '/uploads/35836e9e-4254-4744-8312-51d045609b92_tuong-phat-di-lac_2.jpg', '', 'Bức tượng tạo hình Phật bằng đồng, nặng 80 tấn, cao 10 m, an vị trên ngọn đồi của chùa Bái Đính được Trung tâm sách kỷ lục Việt Nam - Vietkings công nhận là tượng Di Lặc lớn nhất nước.\r\n\r\nKỷ lục nói trên là một trong 5 kỷ lục mới mà chùa Bái Đính, Ninh Bình nhận được vào dịp Hội ngộ kỷ lục Phật giáo Việt Nam lần thứ 7, diễn ra trong thời gian sắp tới.', '', ''),
(11, '/uploads/2e61759b-9327-4766-b107-1c3060ecea9b_DUH00013.JPG', 'Chùa Bái Đính, tọa lạc tại tỉnh Ninh Bình, không chỉ nổi tiếng là một quần thể chùa lớn nhất Đông Nam Á mà còn sở hữu những bảo vật quý giá, trong đó đáng chú ý nhất là đại hồng chung bằng đồng – một kiệt tác nghệ thuật mang ý nghĩa tâm linh sâu sắc.', 'Chuông Gió ', '/uploads/0ea8c934-2d26-402a-8036-486c0b4e7da0_DSC03112.JPG', '', '', 'Chùa Bái Đính, tọa lạc tại tỉnh Ninh Bình, không chỉ nổi tiếng là một quần thể chùa lớn nhất Đông Nam Á mà còn sở hữu những bảo vật quý giá, trong đó đáng chú ý nhất là đại hồng chung bằng đồng – một kiệt tác nghệ thuật mang ý nghĩa tâm linh sâu sắc.', '', '');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user`
--

CREATE TABLE `user` (
  `id` int(225) NOT NULL,
  `username` varchar(2250) NOT NULL,
  `password` varchar(2250) NOT NULL,
  `email` varchar(2255) NOT NULL,
  `level` varchar(2252) NOT NULL,
  `avatar` varchar(2252) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `email`, `level`, `avatar`) VALUES
(1, 'admin', '123456', 'admin@gmail.com', 'admin', '/uploads/avatar_1_1742626817263.png'),
(3, 'Đinh Tuấn Hải ', '24062001', 'Haimoba@gmail.com', '', '/uploads/avatar_3_1742626508257.jpg'),
(4, 'Nguyễn Văn Bốn ', '123456', 'Bon@gmail.com', 'user', 'data:image/jpeg;base64,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'),
(5, 'luyenle123', '123456', 'levanluyen@gmail.com', 'user', '');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `contact`
--
ALTER TABLE `contact`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `imagebooking`
--
ALTER TABLE `imagebooking`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `contact`
--
ALTER TABLE `contact`
  MODIFY `id` int(225) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `imagebooking`
--
ALTER TABLE `imagebooking`
  MODIFY `id` int(225) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT cho bảng `user`
--
ALTER TABLE `user`
  MODIFY `id` int(225) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
