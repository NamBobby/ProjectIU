-- Drop tables in correct order due to foreign key constraints
DROP TABLE IF EXISTS `chats`;
DROP TABLE IF EXISTS `otps`;
DROP TABLE IF EXISTS `users`;


-- Table: users
CREATE TABLE `users` (
  `userId` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `avatarPath` VARCHAR(255) DEFAULT NULL,
  `password` VARCHAR(255) NOT NULL,
  `dateOfBirth` DATE NOT NULL,
  `gender` ENUM('Man', 'Woman', 'Something else', 'Prefer not to say') NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`userId`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Insert sample accounts
INSERT INTO `users` VALUES 
(1,'Nam Bobby','lethpnam27@gmail.com','avatars/1736613049069-31dfb4e202fb.png','$2a$10$DaPqxIGDcsxpkFSjR62AdeGv99A/oXfLt5VBYuz/Fkll9IVFV8c5G','2001-05-02','Man','2025-01-11 23:29:23','2025-01-11 23:29:23');

-- Table: otps
CREATE TABLE `otps` (
  `otpId` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) NOT NULL,
  `otp` VARCHAR(255) NOT NULL,
  `status` TINYINT(1) NOT NULL DEFAULT '1',
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  `userId` INT NOT NULL,
  PRIMARY KEY (`otpId`, `userId`),
  CONSTRAINT `otps_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Table: chats (updated with sentiment column)
CREATE TABLE `chats` (
  `chatId` INT NOT NULL AUTO_INCREMENT,
  `userId` INT NOT NULL,
  `sender` ENUM('User', 'Bot') NOT NULL,
  `message` TEXT NOT NULL,
  `intent` VARCHAR(255) NOT NULL,
  `sentiment` ENUM('Positive', 'Negative', 'Neutral') DEFAULT NULL,
  `conversationId` VARCHAR(255) DEFAULT NULL COMMENT 'Optional: Used to group messages into a chat session',
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`chatId`),
  KEY `userId` (`userId`),
  CONSTRAINT `chats_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


