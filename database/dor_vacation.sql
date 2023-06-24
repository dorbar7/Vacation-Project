-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 22, 2023 at 06:31 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dor_vacation`
--
CREATE DATABASE IF NOT EXISTS `dor_vacation` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `dor_vacation`;

-- --------------------------------------------------------

--
-- Table structure for table `followers`
--

CREATE TABLE `followers` (
  `followersId` int(11) NOT NULL,
  `followerFirstName` varchar(20) NOT NULL,
  `followerLastName` varchar(20) NOT NULL,
  `destination` varchar(50) NOT NULL,
  `userId` int(11) NOT NULL,
  `vacationId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `followers`
--

INSERT INTO `followers` (`followersId`, `followerFirstName`, `followerLastName`, `destination`, `userId`, `vacationId`) VALUES
(1, 'Dor', 'Bari', 'Thailand', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `userFirstName` varchar(20) NOT NULL,
  `userLastName` varchar(20) NOT NULL,
  `username` varchar(30) NOT NULL,
  `userPassword` varchar(40) NOT NULL,
  `userRole` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `userFirstName`, `userLastName`, `username`, `userPassword`, `userRole`) VALUES
(1, 'Dori', 'Bari', 'dor777', 'dor1111', 'user');

-- --------------------------------------------------------

--
-- Table structure for table `vacation`
--

CREATE TABLE `vacation` (
  `vacationId` int(11) NOT NULL,
  `destination` varchar(25) NOT NULL,
  `dateStart` date NOT NULL,
  `dateEnd` date NOT NULL,
  `description` text NOT NULL,
  `price` int(11) NOT NULL,
  `photo` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vacation`
--

INSERT INTO `vacation` (`vacationId`, `destination`, `dateStart`, `dateEnd`, `description`, `price`, `photo`) VALUES
(1, 'Thailand', '2023-12-01', '2023-12-17', 'Best place to see wildlife and landscape is Thailand\'s most impressive nature reserve is just a few hours from Bangkok, but elephants, monkeys, gibbons, bears, horns, bats and some of Thailand\'s last wild tigers hide in the dense, dripping jungles. Rainforest hikes pass through an area strewn with vines and orchids. The must-visit places in Thailand are Bangkok (the capital), Chiang Mai, Phuket and Koh Phi Phi.', 10000, 'Thailand.jpg'),
(2, 'South Italy', '2023-06-25', '2023-07-03', 'southern Italy , the most popular place for your summer vacation, is full of amazing beaches, breathtaking views and indescribable food.\r\nStretching along the coast and each town more beautiful then the last one , you should take minimum 8 days to see everything. ', 5000, 'Italy.jpg'),
(3, 'Greece', '0000-00-00', '0000-00-00', 'Greece is a country in southeast Europe on the southern part of the Balkan \r\nand Greek can be used to describe things related to Greece.', 5000, '426b3fe5-489e-4f9d-bbf5-a'),
(4, 'Greece', '2023-07-13', '2023-07-20', 'Greece is a country in southeast Europe on the southern part of the Balkan peninsula and including . especially Athens and Sparta, that reached their peak in the fifth century. It is also influenced by the cultures of Classical Greece, the Byzantine Empire, and the Ottoman Turkish rule. The adjectives Grecian and Greek can be used to describe things related to Greece.', 5000, 'f775d9d8-eef0-49bc-a939-2');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `followers`
--
ALTER TABLE `followers`
  ADD PRIMARY KEY (`followersId`),
  ADD KEY `userId` (`userId`),
  ADD KEY `vacationId` (`vacationId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`);

--
-- Indexes for table `vacation`
--
ALTER TABLE `vacation`
  ADD PRIMARY KEY (`vacationId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `followers`
--
ALTER TABLE `followers`
  MODIFY `followersId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `vacation`
--
ALTER TABLE `vacation`
  MODIFY `vacationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `followers`
--
ALTER TABLE `followers`
  ADD CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`vacationId`) REFERENCES `vacation` (`vacationId`),
  ADD CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
