-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema experience
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema experience
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `experience` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `experience` ;

-- -----------------------------------------------------
-- Table `experience`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `experience`.`users` (
  `userID` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`userID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `experience`.`experience`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `experience`.`experience` (
  `eID` INT NOT NULL AUTO_INCREMENT,
  `userID` INT NULL DEFAULT NULL,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT NOT NULL,
  `location` VARCHAR(100) NOT NULL,
  `date` DATE NOT NULL,
  `image_url` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`eID`),
  INDEX `userID` (`userID` ASC) VISIBLE,
  CONSTRAINT `experience_ibfk_1`
    FOREIGN KEY (`userID`)
    REFERENCES `experience`.`users` (`userID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `experience`.`sharedexperiences`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `experience`.`sharedexperiences` (
  `experienceID` INT NOT NULL AUTO_INCREMENT,
  `userID` INT NULL DEFAULT NULL,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT NULL DEFAULT NULL,
  `location` VARCHAR(100) NULL DEFAULT NULL,
  `date` DATE NULL DEFAULT NULL,
  `image_url` VARCHAR(255) NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`experienceID`),
  INDEX `userID` (`userID` ASC) VISIBLE,
  CONSTRAINT `sharedexperiences_ibfk_1`
    FOREIGN KEY (`userID`)
    REFERENCES `experience`.`users` (`userID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
