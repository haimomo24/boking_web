-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th3 21, 2025 lúc 10:39 AM
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
-- Cấu trúc bảng cho bảng `imagebooking`
--

CREATE TABLE `imagebooking` (
  `id` int(225) NOT NULL,
  `images` varchar(2250) NOT NULL,
  `description` varchar(2250) NOT NULL,
  `title` mediumtext NOT NULL,
  `image2` varchar(2252) NOT NULL,
  `image3` varchar(2250) NOT NULL,
  `image4` varchar(2250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `imagebooking`
--

INSERT INTO `imagebooking` (`id`, `images`, `description`, `title`, `image2`, `image3`, `image4`) VALUES
(1, 'data:image/jpeg;base64,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', 'Du khách sẽ thỏa mình vào những lễ hội đầu Xuân...', 'Điện Tam Thế', '', '', '');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user`
--

CREATE TABLE `user` (
  `id` int(225) NOT NULL,
  `username` varchar(2250) NOT NULL,
  `password` varchar(2250) NOT NULL,
  `email` varchar(2255) NOT NULL,
  `level` varchar(2252) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `email`, `level`) VALUES
(1, 'admin', '123456', 'admin@gmail.com', 'admin');

--
-- Chỉ mục cho các bảng đã đổ
--

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
-- AUTO_INCREMENT cho bảng `imagebooking`
--
ALTER TABLE `imagebooking`
  MODIFY `id` int(225) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `user`
--
ALTER TABLE `user`
  MODIFY `id` int(225) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
