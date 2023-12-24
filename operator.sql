-- MySQL dump 10.13  Distrib 8.1.0, for Linux (aarch64)
--
-- Host: localhost    Database: operator
-- ------------------------------------------------------
-- Server version	8.1.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `checkpoint`
--

DROP TABLE IF EXISTS `checkpoint`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `checkpoint` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `checkpoint`
--

LOCK TABLES `checkpoint` WRITE;
/*!40000 ALTER TABLE `checkpoint` DISABLE KEYS */;
INSERT INTO `checkpoint` VALUES (1,'Checkpoint 16',1),(2,'Checkpoint 2',1),(7,'Jakarta',1);
/*!40000 ALTER TABLE `checkpoint` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `history_checkpoint`
--

DROP TABLE IF EXISTS `history_checkpoint`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `history_checkpoint` (
  `id` int NOT NULL AUTO_INCREMENT,
  `robot_id` int NOT NULL,
  `checkpoint_id` int NOT NULL,
  `created_at` datetime NOT NULL,
  `created_by` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_checkpoint_history` (`checkpoint_id`),
  KEY `fk_robot_history` (`robot_id`),
  KEY `fk_user_history` (`created_by`),
  CONSTRAINT `fk_checkpoint_history` FOREIGN KEY (`checkpoint_id`) REFERENCES `checkpoint` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_robot_history` FOREIGN KEY (`robot_id`) REFERENCES `robot` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_user_history` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `history_checkpoint`
--

LOCK TABLES `history_checkpoint` WRITE;
/*!40000 ALTER TABLE `history_checkpoint` DISABLE KEYS */;
INSERT INTO `history_checkpoint` VALUES (1,1,1,'2023-12-22 13:33:57',9),(2,1,2,'2023-12-22 14:03:30',9),(3,3,1,'2023-12-22 14:23:56',9),(4,3,2,'2023-12-22 14:23:59',9),(5,1,7,'2023-12-22 14:28:25',9);
/*!40000 ALTER TABLE `history_checkpoint` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `robot`
--

DROP TABLE IF EXISTS `robot`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `robot` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `battery` int NOT NULL,
  `series_number` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `robot`
--

LOCK TABLES `robot` WRITE;
/*!40000 ALTER TABLE `robot` DISABLE KEYS */;
INSERT INTO `robot` VALUES (1,'Robot D1','Robot Mesin Pembangunan',75,'robot-d'),(3,'Robot E1','Robot Produksi',100,'robot-e');
/*!40000 ALTER TABLE `robot` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` text,
  `birthdate` date DEFAULT NULL,
  `address` text,
  `type` enum('admin','operator') DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','password','2000-09-12','Alamat admin','admin','Admin'),(9,'operator','password','2000-04-17','Test alamat operator','operator','Operator');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-22 14:41:45
