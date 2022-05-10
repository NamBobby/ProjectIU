-- MySQL dump 10.13  Distrib 8.0.21, for macos10.15 (x86_64)
--
-- Host: 127.0.0.1    Database: banking
-- ------------------------------------------------------
-- Server version	5.7.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Accounts`
--

DROP TABLE IF EXISTS `Accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Accounts` (
  `AccountId` int(11) NOT NULL AUTO_INCREMENT,
  `FirstName` varchar(20) NOT NULL,
  `LastName` varchar(20) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Username` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `PhoneNumber` int(11) NOT NULL,
  `IdentifyCard` bigint(20) DEFAULT NULL,
  `DateOfBirth` date DEFAULT NULL,
  `Address` varchar(255) DEFAULT NULL,
  `Role` enum('User','Admin') NOT NULL,
  PRIMARY KEY (`AccountId`),
  KEY `IDX_b75d091a78ec94a9e7e47f79f3` (`Role`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Accounts`
--

LOCK TABLES `Accounts` WRITE;
/*!40000 ALTER TABLE `Accounts` DISABLE KEYS */;
INSERT INTO `Accounts` VALUES (1,'Tran Minh Ngoc','Nguyen','NTMNgoc@gmail.com','Ngoc_Nguyen24','$2a$10$cGzUDdjcoA2J93Sd6oalgeB/yPiojsq9B/0l0WeeFNTXiJOgmDTWO',979812677,155933832952,'1999-08-18','454C Tan Son Nhi, Quan Tan Phu, Tp.HCM','User'),(2,'Quoc Hy','Tran','TranQH111@gmail.com','HyTran111','$2a$10$grydiEGPSTHrXsAYPnn60u5WkCButdDbfqid9k3guxn8WWNr/wEzm',866754263,584612692127,'1982-12-15','37 Dang Van Ngu, Quan Phu Nhuan, Tp.HCM','User'),(3,'Truc Nhi','Ha','Nhi1215@gmail.com','HaNhi1122','$2a$10$rr.lI5dIlgntXv4CVAdAbOYz.liPrViCd5HqNEgqhaVEBkccbg/9y',998564372,982563147527,'1972-02-15','12 Hoa Binh, Tp. Thu Duc, Tp.HCM','User'),(4,'Hai Quan','Hoang','HaiQuanHoang@gmail.com','Quan.work','$2a$10$2SrfzWvBb64BJK/Mg.QIEuEdFQdlJYzEWjeiKG6gGquojR7nbjkE2',865234519,695231482571,'1998-02-14','6/12 Dong Den, Quan Tan Binh, Tp.HCM','User'),(5,'Van Dat','Nguyen','nguyendatvtvn39@gmail.com','datvtvn69','$2a$10$2RbpoQDEa50Ecu7vW0hW1.R03ZFIrmpkO9FgqxS4hUbrAy1thDC92',948353812,778394471824,'2001-09-06','Ki Tuc Xa Khu B, Linh Trung, Thu Duc, Tp.HCM','User'),(6,'Ngoc Mai','Pham Nguyen','ngocmai304934@gmail.com','ngocmai2571','$2a$10$0znWborvmRF2.h29M8/Aqe8QNa.nTWWDPcrXYf5HnxgGvM1XAhSDC',938473859,977384928342,'2001-07-25','243 Truong Chinh, Q 12, Tp.HCM','User'),(13,'Bao Uyen','Truong','UyenTruong123@gmail.com','UyenTruong3324','$2a$10$ZFQ3Pg3U3jempbcO3SpZse2re2St1Q3ATSGILFhbNcbmHNFyt08JC',394857345,884937738456,'1996-11-14','85 Thao Dien, Quan 2, Tp.HCM','User'),(14,'Tan Tai','Tran','sarahphan2314@gmail.com','trantai4934','$2a$10$pRFZwTtD3XQNF.NlXgUe9upFl0r79GQlQJycKgOv8/PfeDq6yOvqy',384958471,448739928452,'1995-11-17','78 Ba Huyen Thanh Quan, Phuong 7, Vung Tau','User'),(15,'Anh Viet','Vo','vietanhvo@gmail.com','VoAnhViet21321','$2a$10$gHDWjqRB0rg3BFAA5dkaaO5EwA8sYng2Lx8tOjVvCJmYSijxW41D6',384958462,884739357313,'1974-10-11','32 Ba Cu, Phuong7, Vung Tau','User'),(19,'Laughing','Nguyen','hcmiuseadmin1@gmail.com','LaughingAdmin1','$2a$10$RkKtP4ZFeb5bRK1UTVSLzuxpI2.rOu9l9YWLl9xmVdBp/g2uhyUDC',495826461,NULL,NULL,NULL,'Admin');
/*!40000 ALTER TABLE `Accounts` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-12-05 19:33:35
