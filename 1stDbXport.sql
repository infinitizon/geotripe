SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

CREATE SCHEMA IF NOT EXISTS `geotripe` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;
USE `geotripe` ;

-- -----------------------------------------------------
-- Table `geotripe`.`AuthView`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `geotripe`.`AuthView` (
  `AuthView_Id` BIGINT NOT NULL,
  `Name` VARCHAR(200) NULL,
  `ViewPath` VARCHAR(200) NULL,
  `description` VARCHAR(255) NULL,
  PRIMARY KEY (`AuthView_Id`))
ENGINE = InnoDB
AUTO_INCREMENT = 13072016;


-- -----------------------------------------------------
-- Table `geotripe`.`PartyType`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `geotripe`.`PartyType` (
  `PartyType_Id` INT NOT NULL,
  `Name` VARCHAR(200) NULL,
  `description` VARCHAR(255) NULL,
  PRIMARY KEY (`PartyType_Id`))
ENGINE = InnoDB
AUTO_INCREMENT = 201607130;


-- -----------------------------------------------------
-- Table `geotripe`.`Country`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `geotripe`.`Country` (
  `Country_Id` BIGINT NOT NULL,
  `Name` VARCHAR(45) NULL,
  `CountryCode` VARCHAR(45) NULL,
  PRIMARY KEY (`Country_Id`))
ENGINE = InnoDB
AUTO_INCREMENT = 20160713;


-- -----------------------------------------------------
-- Table `geotripe`.`State`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `geotripe`.`State` (
  `State_Id` BIGINT NOT NULL,
  `Name` VARCHAR(45) NULL,
  `State_Country_Id` BIGINT NOT NULL,
  PRIMARY KEY (`State_Id`),
  INDEX `fk_State_Country1_idx` (`State_Country_Id` ASC),
  CONSTRAINT `fk_State_Country1`
    FOREIGN KEY (`State_Country_Id`)
    REFERENCES `geotripe`.`Country` (`Country_Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `geotripe`.`BusinessType`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `geotripe`.`BusinessType` (
  `BusinessType_Id` BIGINT NOT NULL,
  `Name` VARCHAR(200) NULL,
  `description` VARCHAR(255) NULL,
  PRIMARY KEY (`BusinessType_Id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `geotripe`.`PartyStatus`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `geotripe`.`PartyStatus` (
  `PartyStatus_Id` BIGINT NOT NULL,
  `Name` VARCHAR(200) NULL,
  `description` VARCHAR(255) NULL,
  PRIMARY KEY (`PartyStatus_Id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `geotripe`.`Party`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `geotripe`.`Party` (
  `Party_Id` BIGINT NOT NULL,
  `Party_PartyType_Id` INT NOT NULL,
  `AddressCity` VARCHAR(100) NULL,
  `AddressLine1` VARCHAR(255) NULL,
  `AddressLine2` VARCHAR(255) NULL,
  `PostalCode` VARCHAR(45) NULL,
  `ContactPhoneNumber` VARCHAR(45) NULL,
  `Name` VARCHAR(45) NULL,
  `EmailAddress` VARCHAR(45) NULL,
  `Party_Country_Id` BIGINT NOT NULL,
  `Party_State_Id` BIGINT NOT NULL,
  `ClientId` VARCHAR(45) NULL,
  `IsActive` BIT NULL,
  `ContacLastname` VARCHAR(100) NULL,
  `ContacFirstname` VARCHAR(100) NULL,
  `ContacPersonTitle` VARCHAR(100) NULL,
  `ContacMiddlename` VARCHAR(100) NULL,
  `YearEstablished` INT NULL,
  `Party_BusinessType_Id` BIGINT NOT NULL,
  `OtherTypeOfBusiness` VARCHAR(555) NULL,
  `MajorBusinessActivity` VARCHAR(455) NULL,
  `TermConditionAccepted` BIT NULL,
  `PartyStatus_PartyStatus_Id` BIGINT NOT NULL,
  PRIMARY KEY (`Party_Id`),
  INDEX `fk_Party_PartyType1_idx` (`Party_PartyType_Id` ASC),
  INDEX `fk_Party_Country1_idx` (`Party_Country_Id` ASC),
  INDEX `fk_Party_State1_idx` (`Party_State_Id` ASC),
  INDEX `fk_Party_BusinessType1_idx` (`Party_BusinessType_Id` ASC),
  INDEX `fk_Party_PartyStatus1_idx` (`PartyStatus_PartyStatus_Id` ASC),
  CONSTRAINT `fk_Party_PartyType1`
    FOREIGN KEY (`Party_PartyType_Id`)
    REFERENCES `geotripe`.`PartyType` (`PartyType_Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Party_Country1`
    FOREIGN KEY (`Party_Country_Id`)
    REFERENCES `geotripe`.`Country` (`Country_Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Party_State1`
    FOREIGN KEY (`Party_State_Id`)
    REFERENCES `geotripe`.`State` (`State_Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Party_BusinessType1`
    FOREIGN KEY (`Party_BusinessType_Id`)
    REFERENCES `geotripe`.`BusinessType` (`BusinessType_Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Party_PartyStatus1`
    FOREIGN KEY (`PartyStatus_PartyStatus_Id`)
    REFERENCES `geotripe`.`PartyStatus` (`PartyStatus_Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 20161307;


-- -----------------------------------------------------
-- Table `geotripe`.`User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `geotripe`.`User` (
  `User_Id` BIGINT NOT NULL AUTO_INCREMENT,
  `Firstname` VARCHAR(200) NOT NULL,
  `MiddleName` VARCHAR(200) NULL,
  `LastName` VARCHAR(200) NOT NULL,
  `WorkPhoneNumber` VARCHAR(45) NULL,
  `ContactPhoneNumber` VARCHAR(45) NULL,
  `User_Party_Id` BIGINT NOT NULL,
  `IsAuthorizedPerson` BIT NULL,
  `Username` VARCHAR(100) NULL,
  `EmailAddress` VARCHAR(100) NULL,
  `Password` VARCHAR(200) NOT NULL,
  `token` VARCHAR(200) NULL,
  `Enabled` BIT NULL,
  `AccountLocked` BIT NULL,
  `AccountExpirationTime` DATETIME NULL,
  `CredentialsExpirationTime` DATETIME NULL,
  `DateCreated` DATETIME NULL,
  `DateModified` DATETIME NULL,
  PRIMARY KEY (`User_Id`),
  INDEX `fk_User_Party1_idx` (`User_Party_Id` ASC),
  CONSTRAINT `fk_User_Party1`
    FOREIGN KEY (`User_Party_Id`)
    REFERENCES `geotripe`.`Party` (`Party_Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 20160713;


-- -----------------------------------------------------
-- Table `geotripe`.`LoginDetail`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `geotripe`.`LoginDetail` (
  `LoginDetail_Id` BIGINT NOT NULL,
  `Username` VARCHAR(200) NOT NULL,
  `RemoteAddress` VARCHAR(45) NULL,
  `LoginDate` DATETIME NOT NULL,
  `LoginSuccessful` BIT NOT NULL,
  `FailureReason` VARCHAR(500) NULL,
  `LoginDetail_User_Id` BIGINT NOT NULL,
  PRIMARY KEY (`LoginDetail_Id`),
  INDEX `fk_LoginDetail_User1_idx` (`LoginDetail_User_Id` ASC),
  CONSTRAINT `fk_LoginDetail_User1`
    FOREIGN KEY (`LoginDetail_User_Id`)
    REFERENCES `geotripe`.`User` (`User_Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `geotripe`.`QuoteStatus`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `geotripe`.`QuoteStatus` (
  `QuoteStatus_Id` BIGINT NOT NULL,
  `Name` VARCHAR(200) NULL,
  `description` VARCHAR(255) NULL,
  PRIMARY KEY (`QuoteStatus_Id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `geotripe`.`QuoteDirection`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `geotripe`.`QuoteDirection` (
  `QuoteDirection_Id` BIGINT NOT NULL,
  `Name` VARCHAR(200) NULL,
  `description` VARCHAR(255) NULL,
  PRIMARY KEY (`QuoteDirection_Id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `geotripe`.`Currency`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `geotripe`.`Currency` (
  `Currency_Id` BIGINT NOT NULL,
  `Name` VARCHAR(200) NULL,
  `description` VARCHAR(255) NULL,
  PRIMARY KEY (`Currency_Id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `geotripe`.`PurchaseOrderStatus`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `geotripe`.`PurchaseOrderStatus` (
  `PurchaseOrderStatus_Id` BIGINT NOT NULL,
  `Name` VARCHAR(200) NULL,
  `description` VARCHAR(255) NULL,
  PRIMARY KEY (`PurchaseOrderStatus_Id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `geotripe`.`PurchaseOrder`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `geotripe`.`PurchaseOrder` (
  `PurchaseOrder_Id` BIGINT NOT NULL,
  `PurchaseOrder_PurchaseOrderStatus_Id` BIGINT NOT NULL,
  `EntryDate` DATETIME NULL,
  `DateOfExcetuion` DATETIME NULL,
  `PurchasePrice` DECIMAL(19,2) NULL,
  PRIMARY KEY (`PurchaseOrder_Id`),
  INDEX `fk_PurchaseOrder_PurchaseOrderStatus1_idx` (`PurchaseOrder_PurchaseOrderStatus_Id` ASC),
  CONSTRAINT `fk_PurchaseOrder_PurchaseOrderStatus1`
    FOREIGN KEY (`PurchaseOrder_PurchaseOrderStatus_Id`)
    REFERENCES `geotripe`.`PurchaseOrderStatus` (`PurchaseOrderStatus_Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `geotripe`.`Product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `geotripe`.`Product` (
  `Product_Id` BIGINT NOT NULL,
  `Name` VARCHAR(200) NULL,
  `description` VARCHAR(255) NULL,
  PRIMARY KEY (`Product_Id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `geotripe`.`Quote`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `geotripe`.`Quote` (
  `Quote_Id` BIGINT NOT NULL,
  `Quote_Status_Id` BIGINT NOT NULL,
  `Quote_QuoteDirection_Id` BIGINT NOT NULL,
  `QuoteAmount` DECIMAL(19,2) NULL,
  `Quote_Currency_Id` BIGINT NOT NULL,
  `EntryDate` DATETIME NULL,
  `ApproveDate` DATETIME NULL,
  `Quote_EnteredBy_Id` BIGINT NOT NULL,
  `BidPrice` DECIMAL(19,2) NULL,
  `AskPrice` DECIMAL(19,2) NULL,
  `Quote_PurchaseOrder_Id` BIGINT NOT NULL,
  `Strike` DECIMAL(19,2) NULL,
  `Description` VARCHAR(1000) NULL,
  `Quantity` VARCHAR(45) NULL,
  `Quote_Product_Id` BIGINT NOT NULL,
  `ExpiryDate` DATETIME NULL,
  `Quote_ApprovedBy_Id` BIGINT NOT NULL,
  `SpecificationAndRequirement` VARCHAR(2000) NULL,
  PRIMARY KEY (`Quote_Id`),
  INDEX `fk_Quote_QuoteStatus1_idx` (`Quote_Status_Id` ASC),
  INDEX `fk_Quote_QuoteDirection1_idx` (`Quote_QuoteDirection_Id` ASC),
  INDEX `fk_Quote_Currency1_idx` (`Quote_Currency_Id` ASC),
  INDEX `fk_Quote_User1_idx` (`Quote_EnteredBy_Id` ASC),
  INDEX `fk_Quote_PurchaseOrder1_idx` (`Quote_PurchaseOrder_Id` ASC),
  INDEX `fk_Quote_Product1_idx` (`Quote_Product_Id` ASC),
  INDEX `fk_Quote_User2_idx` (`Quote_ApprovedBy_Id` ASC),
  CONSTRAINT `fk_Quote_QuoteStatus1`
    FOREIGN KEY (`Quote_Status_Id`)
    REFERENCES `geotripe`.`QuoteStatus` (`QuoteStatus_Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Quote_QuoteDirection1`
    FOREIGN KEY (`Quote_QuoteDirection_Id`)
    REFERENCES `geotripe`.`QuoteDirection` (`QuoteDirection_Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Quote_Currency1`
    FOREIGN KEY (`Quote_Currency_Id`)
    REFERENCES `geotripe`.`Currency` (`Currency_Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Quote_User1`
    FOREIGN KEY (`Quote_EnteredBy_Id`)
    REFERENCES `geotripe`.`User` (`User_Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Quote_PurchaseOrder1`
    FOREIGN KEY (`Quote_PurchaseOrder_Id`)
    REFERENCES `geotripe`.`PurchaseOrder` (`PurchaseOrder_Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Quote_Product1`
    FOREIGN KEY (`Quote_Product_Id`)
    REFERENCES `geotripe`.`Product` (`Product_Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Quote_User2`
    FOREIGN KEY (`Quote_ApprovedBy_Id`)
    REFERENCES `geotripe`.`User` (`User_Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `geotripe`.`Document`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `geotripe`.`Document` (
  `Document_Id` BIGINT NOT NULL,
  `Document_Quote_Id` BIGINT NOT NULL,
  `DocumentName` VARCHAR(45) NULL,
  `DocumentMimeType` VARCHAR(45) NULL,
  `DocumentBlob` BLOB NULL,
  PRIMARY KEY (`Document_Id`),
  INDEX `fk_Document_Quote1_idx` (`Document_Quote_Id` ASC),
  CONSTRAINT `fk_Document_Quote1`
    FOREIGN KEY (`Document_Quote_Id`)
    REFERENCES `geotripe`.`Quote` (`Quote_Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `geotripe`.`BankAccountDetail`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `geotripe`.`BankAccountDetail` (
  `BankAccountDetail_Id` BIGINT NOT NULL,
  `BankAccountDetail_Party_Id` BIGINT NOT NULL,
  `BankName` VARCHAR(45) NULL,
  `BankAccountDetail_Currency_Id` BIGINT NOT NULL,
  `AccountName` VARCHAR(100) NULL,
  `AccountReference` VARCHAR(100) NULL,
  `SWIFTCode` VARCHAR(45) NULL,
  `IBAN` VARCHAR(45) NULL,
  `NUBAN` VARCHAR(45) NULL,
  `BankAccountDetail_Country_Id` BIGINT NOT NULL,
  `BankAccountDetail_State_Id` BIGINT NOT NULL,
  PRIMARY KEY (`BankAccountDetail_Id`),
  INDEX `fk_BankAccountDetail_Party1_idx` (`BankAccountDetail_Party_Id` ASC),
  INDEX `fk_BankAccountDetail_Currency1_idx` (`BankAccountDetail_Currency_Id` ASC),
  INDEX `fk_BankAccountDetail_Country1_idx` (`BankAccountDetail_Country_Id` ASC),
  INDEX `fk_BankAccountDetail_State1_idx` (`BankAccountDetail_State_Id` ASC),
  CONSTRAINT `fk_BankAccountDetail_Party1`
    FOREIGN KEY (`BankAccountDetail_Party_Id`)
    REFERENCES `geotripe`.`Party` (`Party_Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_BankAccountDetail_Currency1`
    FOREIGN KEY (`BankAccountDetail_Currency_Id`)
    REFERENCES `geotripe`.`Currency` (`Currency_Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_BankAccountDetail_Country1`
    FOREIGN KEY (`BankAccountDetail_Country_Id`)
    REFERENCES `geotripe`.`Country` (`Country_Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_BankAccountDetail_State1`
    FOREIGN KEY (`BankAccountDetail_State_Id`)
    REFERENCES `geotripe`.`State` (`State_Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `geotripe`.`User_AuthView`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `geotripe`.`User_AuthView` (
  `AuthView_AuthView_Id` INT NOT NULL,
  `User_User_Id` BIGINT NOT NULL,
  `ius_yn` BIT NULL,
  INDEX `fk_user_authView_AuthView1_idx` (`AuthView_AuthView_Id` ASC),
  INDEX `fk_user_authView_User1_idx` (`User_User_Id` ASC),
  PRIMARY KEY (`AuthView_AuthView_Id`, `User_User_Id`),
  CONSTRAINT `fk_user_authView_AuthView1`
    FOREIGN KEY (`AuthView_AuthView_Id`)
    REFERENCES `geotripe`.`AuthView` (`AuthView_Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_authView_User1`
    FOREIGN KEY (`User_User_Id`)
    REFERENCES `geotripe`.`User` (`User_Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
