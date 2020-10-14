SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';


-- -----------------------------------------------------
-- Table `geotripe`.`AuthView`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `geotripe`.`AuthView` (
  `AuthView_Id` BIGINT NOT NULL AUTO_INCREMENT,
  `parent_id` BIGINT NULL DEFAULT 0,
  `Name` VARCHAR(200) NULL,
  `ViewPath` VARCHAR(200) NULL,
  `parentViewPath` VARCHAR(100) NULL,
  `description` VARCHAR(255) NULL,
  `css_class` VARCHAR(100) NULL,
  `roles` VARCHAR(500) NULL,
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
  `Country_Id` BIGINT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(255) NULL,
  `CountryCode` VARCHAR(45) NULL,
  PRIMARY KEY (`Country_Id`))
ENGINE = InnoDB
AUTO_INCREMENT = 20160713;


-- -----------------------------------------------------
-- Table `geotripe`.`State`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `geotripe`.`State` (
  `State_Id` BIGINT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(255) NULL,
  `State_Country_Id` BIGINT NOT NULL,
  PRIMARY KEY (`State_Id`),
  INDEX `fk_State_Country1_idx` (`State_Country_Id` ASC),
  CONSTRAINT `fk_State_Country1`
    FOREIGN KEY (`State_Country_Id`)
    REFERENCES `geotripe`.`Country` (`Country_Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 67784783;


-- -----------------------------------------------------
-- Table `geotripe`.`BusinessType`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `geotripe`.`BusinessType` (
  `BusinessType_Id` BIGINT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(200) NULL,
  `description` VARCHAR(255) NULL,
  PRIMARY KEY (`BusinessType_Id`))
ENGINE = InnoDB
AUTO_INCREMENT = 20310741;


-- -----------------------------------------------------
-- Table `geotripe`.`PartyStatus`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `geotripe`.`PartyStatus` (
  `PartyStatus_Id` BIGINT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(200) NULL,
  `description` VARCHAR(255) NULL,
  PRIMARY KEY (`PartyStatus_Id`))
ENGINE = InnoDB
AUTO_INCREMENT = 1011257;


-- -----------------------------------------------------
-- Table `geotripe`.`Party`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `geotripe`.`Party` (
  `Party_Id` BIGINT NOT NULL AUTO_INCREMENT,
  `Party_PartyType_Id` INT NOT NULL,
  `AddressCity` VARCHAR(100) NULL,
  `AddressLine1` VARCHAR(255) NULL,
  `AddressLine2` VARCHAR(255) NULL,
  `PostalCode` VARCHAR(45) NULL,
  `ContactPhoneNumber` VARCHAR(45) NULL,
  `Name` VARCHAR(45) NULL,
  `EmailAddress` VARCHAR(45) NULL,
  `Party_Country_Id` BIGINT NULL,
  `Party_State_Id` BIGINT NULL,
  `ClientId` VARCHAR(45) NULL,
  `IsActive` BIT NULL,
  `ContactLastname` VARCHAR(100) NULL,
  `ContactFirstname` VARCHAR(100) NULL,
  `ContactPersonTitle` VARCHAR(100) NULL,
  `ContactMiddlename` VARCHAR(100) NULL,
  `YearEstablished` INT NULL,
  `Party_BusinessType_Id` BIGINT NULL,
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
-- Table `geotripe`.`Users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `geotripe`.`Users` (
  `User_Id` BIGINT NOT NULL AUTO_INCREMENT,
  `Firstname` VARCHAR(200) NOT NULL,
  `MiddleName` VARCHAR(200) NULL,
  `LastName` VARCHAR(200) NOT NULL,
  `WorkPhoneNumber` VARCHAR(45) NULL,
  `ContactPhoneNumber` VARCHAR(45) NULL,
  `User_Party_Id` BIGINT NOT NULL,
  `IsAuthorizedPerson` TINYINT(1) NULL,
  `Username` VARCHAR(100) NULL,
  `Email` VARCHAR(100) NULL,
  `Password` VARCHAR(200) NOT NULL,
  `token` VARCHAR(200) NULL,
  `Enabled` TINYINT(1) NULL,
  `AccountLocked` TINYINT(1) NULL,
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
  `LoginDetail_Id` BIGINT NOT NULL AUTO_INCREMENT,
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
    REFERENCES `geotripe`.`Users` (`User_Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 11223456;


-- -----------------------------------------------------
-- Table `geotripe`.`QuoteStatus`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `geotripe`.`QuoteStatus` (
  `QuoteStatus_Id` BIGINT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(200) NULL,
  `description` VARCHAR(255) NULL,
  PRIMARY KEY (`QuoteStatus_Id`))
ENGINE = InnoDB
AUTO_INCREMENT = 235366754;


-- -----------------------------------------------------
-- Table `geotripe`.`Currency`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `geotripe`.`Currency` (
  `currency_id` BIGINT NOT NULL AUTO_INCREMENT,
  `code` VARCHAR(200) NULL,
  `description` VARCHAR(255) NULL,
  `decimalHTML` VARCHAR(10) NULL,
  `hexHTML` VARCHAR(10) NULL,
  `unicode` VARCHAR(10) NULL,
  PRIMARY KEY (`currency_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 19123589;


-- -----------------------------------------------------
-- Table `geotripe`.`Quote`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `geotripe`.`Quote` (
  `quote_Id` BIGINT NOT NULL AUTO_INCREMENT,
  `subject` VARCHAR(200) NULL COMMENT 'You can give any subject you want',
  `rfq_no` VARCHAR(45) NULL COMMENT 'Request Number',
  `Party_Party_Id` BIGINT NOT NULL,
  `Quote_Status_Id` BIGINT NOT NULL,
  `Quote_Currency_Id` BIGINT NOT NULL,
  `PublishDate` DATETIME NULL,
  `DueDate` DATETIME NULL,
  `EntryDate` DATETIME NULL,
  `EventOwner` VARCHAR(200) NULL,
  `Users_User_Id` BIGINT NULL,
  `ApproveDate` DATETIME NULL,
  `Quote_EnteredBy_Id` BIGINT NOT NULL,
  `Description` VARCHAR(1000) NULL,
  `Quote_ApprovedBy_Id` BIGINT NULL,
  `SpecificationAndRequirement` VARCHAR(2000) NULL,
  `po_no` VARCHAR(45) NULL,
  `po_is_split` TINYINT(1) NULL,
  PRIMARY KEY (`quote_Id`),
  INDEX `fk_Quote_QuoteStatus1_idx` (`Quote_Status_Id` ASC),
  INDEX `fk_Quote_Currency1_idx` (`Quote_Currency_Id` ASC),
  INDEX `fk_Quote_User1_idx` (`Quote_EnteredBy_Id` ASC),
  INDEX `fk_Quote_User2_idx` (`Quote_ApprovedBy_Id` ASC),
  INDEX `fk_Quote_Party1_idx` (`Party_Party_Id` ASC),
  INDEX `fk_Quote_Users1_idx` (`Users_User_Id` ASC),
  CONSTRAINT `fk_Quote_QuoteStatus1`
    FOREIGN KEY (`Quote_Status_Id`)
    REFERENCES `geotripe`.`QuoteStatus` (`QuoteStatus_Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Quote_Currency1`
    FOREIGN KEY (`Quote_Currency_Id`)
    REFERENCES `geotripe`.`Currency` (`currency_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Quote_User1`
    FOREIGN KEY (`Quote_EnteredBy_Id`)
    REFERENCES `geotripe`.`Users` (`User_Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Quote_User2`
    FOREIGN KEY (`Quote_ApprovedBy_Id`)
    REFERENCES `geotripe`.`Users` (`User_Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Quote_Party1`
    FOREIGN KEY (`Party_Party_Id`)
    REFERENCES `geotripe`.`Party` (`Party_Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Quote_Users1`
    FOREIGN KEY (`Users_User_Id`)
    REFERENCES `geotripe`.`Users` (`User_Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 20160809;


-- -----------------------------------------------------
-- Table `geotripe`.`DocumentTypes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `geotripe`.`DocumentTypes` (
  `documentType_id` BIGINT NOT NULL AUTO_INCREMENT,
  `documentType` VARCHAR(45) NULL,
  `documentTypeDesc` VARCHAR(255) NULL,
  PRIMARY KEY (`documentType_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 113525552;


-- -----------------------------------------------------
-- Table `geotripe`.`Document`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `geotripe`.`Document` (
  `doc_id` BIGINT NOT NULL AUTO_INCREMENT,
  `doc_quote_id` BIGINT NOT NULL,
  `docName` VARCHAR(300) NULL,
  `docMimeType` VARCHAR(300) NULL,
  `docPath` VARCHAR(255) NULL,
  `docBlob` LONGBLOB NULL,
  `docSize` INT NULL,
  `docCreateDate` DATETIME NULL,
  `documentType_id` BIGINT NULL,
  `docPathThumb` VARCHAR(255) NULL,
  PRIMARY KEY (`doc_id`),
  INDEX `fk_Document_Quote1_idx` (`doc_quote_id` ASC),
  INDEX `fk_Document_DocumentTypes1_idx` (`documentType_id` ASC),
  CONSTRAINT `fk_Document_Quote1`
    FOREIGN KEY (`doc_quote_id`)
    REFERENCES `geotripe`.`Quote` (`quote_Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Document_DocumentTypes1`
    FOREIGN KEY (`documentType_id`)
    REFERENCES `geotripe`.`DocumentTypes` (`documentType_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 24257886;


-- -----------------------------------------------------
-- Table `geotripe`.`BankAccountDetail`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `geotripe`.`BankAccountDetail` (
  `BankAccountDetail_Id` BIGINT NOT NULL AUTO_INCREMENT,
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
    REFERENCES `geotripe`.`Currency` (`currency_id`)
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
ENGINE = InnoDB
AUTO_INCREMENT = 20081611;


-- -----------------------------------------------------
-- Table `geotripe`.`User_AuthView`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `geotripe`.`User_AuthView` (
  `AuthView_AuthView_Id` INT NOT NULL,
  `User_User_Id` BIGINT NOT NULL,
  `ius_yn` TINYINT(1) NULL,
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
    REFERENCES `geotripe`.`Users` (`User_Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `geotripe`.`MailType`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `geotripe`.`MailType` (
  `mail_type_id` BIGINT NOT NULL,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`mail_type_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `geotripe`.`Mail`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `geotripe`.`Mail` (
  `mail_id` INT NOT NULL AUTO_INCREMENT,
  `mail_type_id` BIGINT NOT NULL,
  `mail_to` VARCHAR(45) NULL,
  `mail_from` VARCHAR(45) NULL,
  `mail_subj` VARCHAR(45) NULL,
  `mail_body` TEXT NULL,
  `status` TINYINT(1) NULL,
  `create_date` DATETIME NULL,
  `modified_date` DATETIME NULL,
  `timestamp` BIGINT NULL,
  PRIMARY KEY (`mail_id`),
  INDEX `fk_Mail_MailType1_idx` (`mail_type_id` ASC),
  CONSTRAINT `fk_Mail_MailType1`
    FOREIGN KEY (`mail_type_id`)
    REFERENCES `geotripe`.`MailType` (`mail_type_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 45636744;


-- -----------------------------------------------------
-- Table `geotripe`.`logs`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `geotripe`.`logs` (
  `log_id` BIGINT NOT NULL AUTO_INCREMENT,
  `users_user_id` BIGINT NOT NULL,
  `log_table` VARCHAR(45) NULL,
  `log_table_key` VARCHAR(45) NULL,
  `log_changes` TEXT NULL,
  `log_date` DATETIME NULL,
  PRIMARY KEY (`log_id`),
  INDEX `fk_logs_Users1_idx` (`users_user_id` ASC),
  CONSTRAINT `fk_logs_Users1`
    FOREIGN KEY (`users_user_id`)
    REFERENCES `geotripe`.`Users` (`User_Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 36785984;


-- -----------------------------------------------------
-- Table `geotripe`.`UnitOfMeasure`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `geotripe`.`UnitOfMeasure` (
  `unitofmeasure_id` BIGINT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(45) NULL,
  `description` VARCHAR(45) NULL,
  PRIMARY KEY (`unitofmeasure_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 20160923;


-- -----------------------------------------------------
-- Table `geotripe`.`QuoteDetail`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `geotripe`.`QuoteDetail` (
  `Quote_quote_Id` BIGINT NOT NULL,
  `QuoteDetail_Id` BIGINT NOT NULL AUTO_INCREMENT,
  `partNo_modelNo` VARCHAR(200) NULL,
  `description` VARCHAR(500) NULL,
  `oem_description` VARCHAR(500) NULL,
  `quantity` INT NULL,
  `unitofmeasure` BIGINT NULL,
  `oem_unitprice` DECIMAL(19,2) NULL,
  `unitprice` DECIMAL(19,2) NULL,
  `detail_notes` VARCHAR(255) NULL,
  `crossrrate` INT NULL,
  `unit_price_usd` DECIMAL(19,2) NULL,
  `mfr_total` VARCHAR(45) NULL,
  `certOfOrigin` VARCHAR(45) NULL,
  `weight` INT NULL,
  `g_f` INT NULL,
  `packaging` VARCHAR(45) NULL,
  `int_f` INT NULL,
  `ins` INT NULL,
  `cif` INT NULL,
  `custom` INT NULL,
  `surch` INT NULL,
  `ciss` INT NULL,
  `etls` INT NULL,
  `vat` INT NULL,
  `nafdac_soncap` INT NULL,
  `clearing` INT NULL,
  `sub_total` INT NULL,
  `goods_in_transit` INT NULL,
  `lt_onne` INT NULL,
  `bch` INT NULL,
  `f_r` INT NULL,
  `cof` INT NULL,
  `total1` INT NULL,
  `mk_up` INT NULL,
  `nlcf` INT NULL,
  `total3` INT NULL,
  `u_p` INT NULL,
  `quote_is_po` TINYINT(1) NULL,
  `split_po_no` VARCHAR(45) NULL,
  `submitted` TINYINT(1) NULL,
  `tq` TINYINT(1) NULL,
  PRIMARY KEY (`QuoteDetail_Id`),
  INDEX `fk_QuoteDetail_Quote1_idx` (`Quote_quote_Id` ASC),
  INDEX `fk_QuoteDetail_unitofmeasure1_idx` (`unitofmeasure` ASC),
  CONSTRAINT `fk_QuoteDetail_Quote1`
    FOREIGN KEY (`Quote_quote_Id`)
    REFERENCES `geotripe`.`Quote` (`quote_Id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_QuoteDetail_unitofmeasure1`
    FOREIGN KEY (`unitofmeasure`)
    REFERENCES `geotripe`.`UnitOfMeasure` (`unitofmeasure_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 235366754;


-- -----------------------------------------------------
-- Table `geotripe`.`QuoteDetail_Manufacturer`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `geotripe`.`QuoteDetail_Manufacturer` (
  `QuoteDetail_QuoteDetail_Id` BIGINT NOT NULL,
  `Party_Party_Id` BIGINT NOT NULL,
  INDEX `fk_QuoteDetail_Manufacturer_QuoteDetail1_idx` (`QuoteDetail_QuoteDetail_Id` ASC),
  PRIMARY KEY (`QuoteDetail_QuoteDetail_Id`, `Party_Party_Id`),
  INDEX `fk_QuoteDetail_Manufacturer_Party1_idx` (`Party_Party_Id` ASC),
  CONSTRAINT `fk_QuoteDetail_Manufacturer_QuoteDetail1`
    FOREIGN KEY (`QuoteDetail_QuoteDetail_Id`)
    REFERENCES `geotripe`.`QuoteDetail` (`QuoteDetail_Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_QuoteDetail_Manufacturer_Party1`
    FOREIGN KEY (`Party_Party_Id`)
    REFERENCES `geotripe`.`Party` (`Party_Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 45636744;


-- -----------------------------------------------------
-- Table `geotripe`.`AuthRoles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `geotripe`.`AuthRoles` (
  `AuthRoles_Id` BIGINT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(200) NOT NULL,
  `description` VARCHAR(255) NULL,
  PRIMARY KEY (`AuthRoles_Id`),
  UNIQUE INDEX `Name_UNIQUE` (`Name` ASC))
ENGINE = InnoDB
AUTO_INCREMENT = 13072016;


-- -----------------------------------------------------
-- Table `geotripe`.`User_AuthRole`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `geotripe`.`User_AuthRole` (
  `Users_User_Id` BIGINT NOT NULL,
  `AuthRoles_AuthRoles_Id` BIGINT NOT NULL,
  PRIMARY KEY (`Users_User_Id`, `AuthRoles_AuthRoles_Id`),
  INDEX `fk_User_AuthRole_AuthRoles1_idx` (`AuthRoles_AuthRoles_Id` ASC),
  CONSTRAINT `fk_User_AuthRole_Users1`
    FOREIGN KEY (`Users_User_Id`)
    REFERENCES `geotripe`.`Users` (`User_Id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_User_AuthRole_AuthRoles1`
    FOREIGN KEY (`AuthRoles_AuthRoles_Id`)
    REFERENCES `geotripe`.`AuthRoles` (`AuthRoles_Id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `geotripe`.`PODetails`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `geotripe`.`PODetails` (
  `po_details_id` BIGINT NOT NULL AUTO_INCREMENT,
  `po_no` VARCHAR(45) NULL,
  `currency` BIGINT NULL,
  `wire_transfer_fee` DECIMAL(19,2) NULL,
  `cost_of_certs` DECIMAL(19,2) NULL,
  `ground_freight` DECIMAL(19,2) NULL,
  `int_freight` DECIMAL(19,2) NULL,
  `packaging_cost` DECIMAL(19,2) NULL,
  `harzardous_cost` DECIMAL(19,2) NULL,
  `other_cost` DECIMAL(19,2) NULL,
  `Quote_quote_Id` BIGINT NULL,
  PRIMARY KEY (`po_details_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 20161215;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `geotripe`.`AuthView`
-- -----------------------------------------------------
START TRANSACTION;
USE `geotripe`;
INSERT INTO `geotripe`.`AuthView` (`AuthView_Id`, `parent_id`, `Name`, `ViewPath`, `parentViewPath`, `description`, `css_class`, `roles`) VALUES (13072016, 0, 'Dashboard', 'app.home', NULL, 'Shows the dashboard on login', 'fa fa-tachometer', 'SUPPORT_ADMIN');
INSERT INTO `geotripe`.`AuthView` (`AuthView_Id`, `parent_id`, `Name`, `ViewPath`, `parentViewPath`, `description`, `css_class`, `roles`) VALUES (13072017, 0, 'Procurement', 'javascript:;', 'app.procurement', 'Monitors Procurement Lifecycle', 'fa fa-cart-plus', 'RFQ_OFFICER,RFQ_SUPERVISOR,RFQ_ADMIN,SUPPORT_ADMIN');
INSERT INTO `geotripe`.`AuthView` (`AuthView_Id`, `parent_id`, `Name`, `ViewPath`, `parentViewPath`, `description`, `css_class`, `roles`) VALUES (13072018, 0, 'Logistics', 'javascript:;', 'app.logistics', 'Monitors Logistics Lifecycle', 'fa fa-files-o', 'SUPPORT_ADMIN');
INSERT INTO `geotripe`.`AuthView` (`AuthView_Id`, `parent_id`, `Name`, `ViewPath`, `parentViewPath`, `description`, `css_class`, `roles`) VALUES (13072019, 13072018, 'Create PO', 'app.logistics.list', NULL, NULL, NULL, 'SUPPORT_ADMIN');
INSERT INTO `geotripe`.`AuthView` (`AuthView_Id`, `parent_id`, `Name`, `ViewPath`, `parentViewPath`, `description`, `css_class`, `roles`) VALUES (13072020, 13072018, 'View PO', 'app.logistics.view', NULL, NULL, NULL, 'SUPPORT_ADMIN');
INSERT INTO `geotripe`.`AuthView` (`AuthView_Id`, `parent_id`, `Name`, `ViewPath`, `parentViewPath`, `description`, `css_class`, `roles`) VALUES (13072021, 0, 'Setup', 'javascript:;', 'app.setup', 'Admin Setup page', 'fa fa-cogs', 'SUPPORT_ADMIN');
INSERT INTO `geotripe`.`AuthView` (`AuthView_Id`, `parent_id`, `Name`, `ViewPath`, `parentViewPath`, `description`, `css_class`, `roles`) VALUES (13072022, 13072021, 'Clients', 'app.setup.clients', NULL, 'Under Setup, allows you to setup clients', NULL, 'SUPPORT_ADMIN');
INSERT INTO `geotripe`.`AuthView` (`AuthView_Id`, `parent_id`, `Name`, `ViewPath`, `parentViewPath`, `description`, `css_class`, `roles`) VALUES (13072023, 13072021, 'Users', 'app.setup.users', NULL, 'Under Setup, allows you to setup Users', NULL, 'SUPPORT_ADMIN');
INSERT INTO `geotripe`.`AuthView` (`AuthView_Id`, `parent_id`, `Name`, `ViewPath`, `parentViewPath`, `description`, `css_class`, `roles`) VALUES (13072024, 13072017, 'Create/Edit RFQ', 'app.procurement.clients', NULL, NULL, NULL, NULL);

COMMIT;


-- -----------------------------------------------------
-- Data for table `geotripe`.`PartyType`
-- -----------------------------------------------------
START TRANSACTION;
USE `geotripe`;
INSERT INTO `geotripe`.`PartyType` (`PartyType_Id`, `Name`, `description`) VALUES (201607130, 'Internal Organisation', NULL);
INSERT INTO `geotripe`.`PartyType` (`PartyType_Id`, `Name`, `description`) VALUES (201607131, 'Client', NULL);
INSERT INTO `geotripe`.`PartyType` (`PartyType_Id`, `Name`, `description`) VALUES (201607132, 'Manufacturers', NULL);
INSERT INTO `geotripe`.`PartyType` (`PartyType_Id`, `Name`, `description`) VALUES (201607133, 'Suppliers', NULL);

COMMIT;


-- -----------------------------------------------------
-- Data for table `geotripe`.`Country`
-- -----------------------------------------------------
START TRANSACTION;
USE `geotripe`;
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160713, 'Afghanistan', 'AFG');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160714, 'Aland Islands', 'ALA');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160715, 'Albania', 'ALB');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160716, 'Algeria', 'DZA');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160717, 'American Samoa', 'ASM');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160718, 'Andorra', 'AND');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160719, 'Angola', 'AGO');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160720, 'Anguilla', 'AIA');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160721, 'Antarctica', 'ATA');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160722, 'Antigua and Barbuda', 'ATG');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160723, 'Argentina', 'ARG');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160724, 'Armenia', 'ARM');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160725, 'Aruba', 'ABW');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160726, 'Australia', 'AUS');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160727, 'Austria', 'AUT');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160728, 'Azerbaijan', 'AZE');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160729, 'Bahamas', 'BHS');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160730, 'Bahrain', 'BHR');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160731, 'Bangladesh', 'BGD');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160732, 'Barbados', 'BRB');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160733, 'Belarus', 'BLR');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160734, 'Belgium', 'BEL');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160735, 'Belize', 'BLZ');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160736, 'Benin', 'BEN');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160737, 'Bermuda', 'BMU');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160738, 'Bhutan', 'BTN');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160739, 'Bolivia', 'BOL');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160740, 'Bosnia and Herzegovina', 'BIH');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160741, 'Botswana', 'BWA');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160742, 'Bouvet Island', 'BVT');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160743, 'Brazil', 'BRA');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160744, 'British Virgin Islands', 'VGB');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160745, 'British Indian Ocean Territory', 'IOT');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160746, 'Brunei Darussalam', 'BRN');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160747, 'Bulgaria', 'BGR');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160748, 'Burkina Faso', 'BFA');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160749, 'Burundi', 'BDI');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160750, 'Cambodia', 'KHM');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160751, 'Cameroon', 'CMR');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160752, 'Canada', 'CAN');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160753, 'Cape Verde', 'CPV');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160754, 'Cayman Islands', 'CYM');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160755, 'Central African Republic', 'CAF');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160756, 'Chad', 'TCD');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160757, 'Chile', 'CHL');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160758, 'China', 'CHN');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160759, 'Hong Kong, Special Administrative Region of China', 'HKG');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160760, 'Macao, Special Administrative Region of China', 'MAC');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160761, 'Christmas Island', 'CXR');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160762, 'Cocos (Keeling) Islands', 'CCK');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160763, 'Colombia', 'COL');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160764, 'Comoros', 'COM');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160765, 'Congo (Brazzaville)', 'COG');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160766, 'Congo, Democratic Republic of the', 'COD');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160767, 'Cook Islands', 'COK');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160768, 'Costa Rica', 'CRI');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160769, 'Cote d\'Ivoire', 'CIV');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160770, 'Croatia', 'HRV');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160771, 'Cuba', 'CUB');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160772, 'Cyprus', 'CYP');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160773, 'Czech Republic', 'CZE');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160774, 'Denmark', 'DNK');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160775, 'Djibouti', 'DJI');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160776, 'Dominica', 'DMA');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160777, 'Dominican Republic', 'DOM');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160778, 'Ecuador', 'ECU');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160779, 'Egypt', 'EGY');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160780, 'El Salvador', 'SLV');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160781, 'Equatorial Guinea', 'GNQ');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160782, 'Eritrea', 'ERI');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160783, 'Estonia', 'EST');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160784, 'Ethiopia', 'ETH');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160785, 'Falkland Islands (Malvinas)', 'FLK');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160786, 'Faroe Islands', 'FRO');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160787, 'Fiji', 'FJI');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160788, 'Finland', 'FIN');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160789, 'France', 'FRA');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160790, 'French Guiana', 'GUF');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160791, 'French Polynesia', 'PYF');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160792, 'French Southern Territories', 'ATF');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160793, 'Gabon', 'GAB');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160794, 'Gambia', 'GMB');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160795, 'Georgia', 'GEO');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160796, 'Germany', 'DEU');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160797, 'Ghana', 'GHA');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160798, 'Gibraltar', 'GIB');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160799, 'Greece', 'GRC');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160800, 'Greenland', 'GRL');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160801, 'Grenada', 'GRD');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160802, 'Guadeloupe', 'GLP');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160803, 'Guam', 'GUM');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160804, 'Guatemala', 'GTM');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160805, 'Guernsey', 'GGY');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160806, 'Guinea', 'GIN');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160807, 'Guinea-Bissau', 'GNB');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160808, 'Guyana', 'GUY');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160809, 'Haiti', 'HTI');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160810, 'Heard Island and Mcdonald Islands', 'HMD');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160811, 'Holy See (Vatican City State)', 'VAT');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160812, 'Honduras', 'HND');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160813, 'Hungary', 'HUN');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160814, 'Iceland', 'ISL');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160815, 'India', 'IND');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160816, 'Indonesia', 'IDN');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160817, 'Iran, Islamic Republic of', 'IRN');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160818, 'Iraq', 'IRQ');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160819, 'Ireland', 'IRL');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160820, 'Isle of Man', 'IMN');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160821, 'Israel', 'ISR');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160822, 'Italy', 'ITA');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160823, 'Jamaica', 'JAM');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160824, 'Japan', 'JPN');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160825, 'Jersey', 'JEY');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160826, 'Jordan', 'JOR');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160827, 'Kazakhstan', 'KAZ');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160828, 'Kenya', 'KEN');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160829, 'Kiribati', 'KIR');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160830, 'Korea, Democratic People\'s Republic of', 'PRK');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160831, 'Korea, Republic of', 'KOR');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160832, 'Kuwait', 'KWT');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160833, 'Kyrgyzstan', 'KGZ');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160834, 'Lao PDR', 'LAO');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160835, 'Latvia', 'LVA');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160836, 'Lebanon', 'LBN');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160837, 'Lesotho', 'LSO');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160838, 'Liberia', 'LBR');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160839, 'Libya', 'LBY');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160840, 'Liechtenstein', 'LIE');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160841, 'Lithuania', 'LTU');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160842, 'Luxembourg', 'LUX');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160843, 'Macedonia, Republic of', 'MKD');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160844, 'Madagascar', 'MDG');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160845, 'Malawi', 'MWI');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160846, 'Malaysia', 'MYS');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160847, 'Maldives', 'MDV');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160848, 'Mali', 'MLI');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160849, 'Malta', 'MLT');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160850, 'Marshall Islands', 'MHL');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160851, 'Martinique', 'MTQ');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160852, 'Mauritania', 'MRT');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160853, 'Mauritius', 'MUS');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160854, 'Mayotte', 'MYT');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160855, 'Mexico', 'MEX');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160856, 'Micronesia, Federated States of', 'FSM');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160857, 'Moldova', 'MDA');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160858, 'Monaco', 'MCO');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160859, 'Mongolia', 'MNG');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160860, 'Montenegro', 'MNE');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160861, 'Montserrat', 'MSR');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160862, 'Morocco', 'MAR');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160863, 'Mozambique', 'MOZ');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160864, 'Myanmar', 'MMR');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160865, 'Namibia', 'NAM');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160866, 'Nauru', 'NRU');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160867, 'Nepal', 'NPL');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160868, 'Netherlands', 'NLD');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160869, 'Netherlands Antilles', 'ANT');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160870, 'New Caledonia', 'NCL');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160871, 'New Zealand', 'NZL');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160872, 'Nicaragua', 'NIC');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160873, 'Niger', 'NER');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160874, 'Nigeria', 'NGA');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160875, 'Niue', 'NIU');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160876, 'Norfolk Island', 'NFK');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160877, 'Northern Mariana Islands', 'MNP');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160878, 'Norway', 'NOR');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160879, 'Oman', 'OMN');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160880, 'Pakistan', 'PAK');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160881, 'Palau', 'PLW');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160882, 'Palestinian Territory, Occupied', 'PSE');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160883, 'Panama', 'PAN');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160884, 'Papua New Guinea', 'PNG');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160885, 'Paraguay', 'PRY');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160886, 'Peru', 'PER');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160887, 'Philippines', 'PHL');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160888, 'Pitcairn', 'PCN');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160889, 'Poland', 'POL');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160890, 'Portugal', 'PRT');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160891, 'Puerto Rico', 'PRI');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160892, 'Qatar', 'QAT');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160893, 'Reunion', 'REU');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160894, 'Romania', 'ROU');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160895, 'Russian Federation', 'RUS');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160896, 'Rwanda', 'RWA');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160897, 'Saint-Barthelemy', 'BLM');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160898, 'Saint Helena', 'SHN');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160899, 'Saint Kitts and Nevis', 'KNA');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160900, 'Saint Lucia', 'LCA');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160901, 'Saint-Martin (French part)', 'MAF');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160902, 'Saint Pierre and Miquelon', 'SPM');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160903, 'Saint Vincent and Grenadines', 'VCT');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160904, 'Samoa', 'WSM');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160905, 'San Marino', 'SMR');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160906, 'Sao Tome and Principe', 'STP');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160907, 'Saudi Arabia', 'SAU');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160908, 'Senegal', 'SEN');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160909, 'Serbia', 'SRB');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160910, 'Seychelles', 'SYC');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160911, 'Sierra Leone', 'SLE');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160912, 'Singapore', 'SGP');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160913, 'Slovakia', 'SVK');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160914, 'Slovenia', 'SVN');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160915, 'Solomon Islands', 'SLB');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160916, 'Somalia', 'SOM');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160917, 'South Africa', 'ZAF');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160918, 'South Georgia and the South Sandwich Islands', 'SGS');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160919, 'South Sudan', 'SSD');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160920, 'Spain', 'ESP');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160921, 'Sri Lanka', 'LKA');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160922, 'Sudan', 'SDN');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160923, 'Suriname', 'SUR');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160924, 'Svalbard and Jan Mayen Islands', 'SJM');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160925, 'Swaziland', 'SWZ');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160926, 'Sweden', 'SWE');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160927, 'Switzerland', 'CHE');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160928, 'Syrian Arab Republic (Syria)', 'SYR');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160929, 'Taiwan, Republic of China', 'TWN');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160930, 'Tajikistan', 'TJK');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160931, 'Tanzania *, United Republic of', 'TZA');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160932, 'Thailand', 'THA');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160933, 'Timor-Leste', 'TLS');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160934, 'Togo', 'TGO');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160935, 'Tokelau', 'TKL');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160936, 'Tonga', 'TON');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160937, 'Trinidad and Tobago', 'TTO');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160938, 'Tunisia', 'TUN');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160939, 'Turkey', 'TUR');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160940, 'Turkmenistan', 'TKM');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160941, 'Turks and Caicos Islands', 'TCA');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160942, 'Tuvalu', 'TUV');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160943, 'Uganda', 'UGA');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160944, 'Ukraine', 'UKR');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160945, 'United Arab Emirates', 'ARE');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160946, 'United Kingdom', 'GBR');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160947, 'United States of America', 'USA');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160948, 'United States Minor Outlying Islands', 'UMI');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160949, 'Uruguay', 'URY');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160950, 'Uzbekistan', 'UZB');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160951, 'Vanuatu', 'VUT');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160952, 'Venezuela (Bolivarian Republic of)', 'VEN');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160953, 'Viet Nam', 'VNM');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160954, 'Virgin Islands, US', 'VIR');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160955, 'Wallis and Futuna Islands', 'WLF');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160956, 'Western Sahara', 'ESH');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160957, 'Yemen', 'YEM');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160958, 'Zambia', 'ZMB');
INSERT INTO `geotripe`.`Country` (`Country_Id`, `Name`, `CountryCode`) VALUES (20160959, 'Zimbabwe', 'ZWE');

COMMIT;


-- -----------------------------------------------------
-- Data for table `geotripe`.`State`
-- -----------------------------------------------------
START TRANSACTION;
USE `geotripe`;
INSERT INTO `geotripe`.`State` (`State_Id`, `Name`, `State_Country_Id`) VALUES (20160719, 'ABIA', 20160874);
INSERT INTO `geotripe`.`State` (`State_Id`, `Name`, `State_Country_Id`) VALUES (20160720, 'ADAMAWA', 20160874);
INSERT INTO `geotripe`.`State` (`State_Id`, `Name`, `State_Country_Id`) VALUES (20160721, 'AKWAIBOM', 20160874);
INSERT INTO `geotripe`.`State` (`State_Id`, `Name`, `State_Country_Id`) VALUES (20160722, 'ANAMBRA', 20160874);
INSERT INTO `geotripe`.`State` (`State_Id`, `Name`, `State_Country_Id`) VALUES (20160723, 'BAUCHI', 20160874);
INSERT INTO `geotripe`.`State` (`State_Id`, `Name`, `State_Country_Id`) VALUES (20160724, 'BAYELSA', 20160874);
INSERT INTO `geotripe`.`State` (`State_Id`, `Name`, `State_Country_Id`) VALUES (20160725, 'BENUE', 20160874);
INSERT INTO `geotripe`.`State` (`State_Id`, `Name`, `State_Country_Id`) VALUES (20160726, 'BORNO', 20160874);
INSERT INTO `geotripe`.`State` (`State_Id`, `Name`, `State_Country_Id`) VALUES (20160727, 'CROSSRIVER', 20160874);
INSERT INTO `geotripe`.`State` (`State_Id`, `Name`, `State_Country_Id`) VALUES (20160728, 'DELTA', 20160874);
INSERT INTO `geotripe`.`State` (`State_Id`, `Name`, `State_Country_Id`) VALUES (20160729, 'EBONYI', 20160874);
INSERT INTO `geotripe`.`State` (`State_Id`, `Name`, `State_Country_Id`) VALUES (20160730, 'EDO', 20160874);
INSERT INTO `geotripe`.`State` (`State_Id`, `Name`, `State_Country_Id`) VALUES (20160731, 'EKITI', 20160874);
INSERT INTO `geotripe`.`State` (`State_Id`, `Name`, `State_Country_Id`) VALUES (20160732, 'ENUGU', 20160874);
INSERT INTO `geotripe`.`State` (`State_Id`, `Name`, `State_Country_Id`) VALUES (20160733, 'GOMBE', 20160874);
INSERT INTO `geotripe`.`State` (`State_Id`, `Name`, `State_Country_Id`) VALUES (20160734, 'IMO', 20160874);
INSERT INTO `geotripe`.`State` (`State_Id`, `Name`, `State_Country_Id`) VALUES (20160735, 'JIGAWA', 20160874);
INSERT INTO `geotripe`.`State` (`State_Id`, `Name`, `State_Country_Id`) VALUES (20160736, 'KADUNA', 20160874);
INSERT INTO `geotripe`.`State` (`State_Id`, `Name`, `State_Country_Id`) VALUES (20160737, 'KANO', 20160874);
INSERT INTO `geotripe`.`State` (`State_Id`, `Name`, `State_Country_Id`) VALUES (20160738, 'KATSINA', 20160874);
INSERT INTO `geotripe`.`State` (`State_Id`, `Name`, `State_Country_Id`) VALUES (20160739, 'KEBBI', 20160874);
INSERT INTO `geotripe`.`State` (`State_Id`, `Name`, `State_Country_Id`) VALUES (20160740, 'KOGI', 20160874);
INSERT INTO `geotripe`.`State` (`State_Id`, `Name`, `State_Country_Id`) VALUES (20160741, 'KWARA', 20160874);
INSERT INTO `geotripe`.`State` (`State_Id`, `Name`, `State_Country_Id`) VALUES (20160742, 'LAGOS', 20160874);
INSERT INTO `geotripe`.`State` (`State_Id`, `Name`, `State_Country_Id`) VALUES (20160743, 'NASSARAWA', 20160874);
INSERT INTO `geotripe`.`State` (`State_Id`, `Name`, `State_Country_Id`) VALUES (20160744, 'NIGER', 20160874);
INSERT INTO `geotripe`.`State` (`State_Id`, `Name`, `State_Country_Id`) VALUES (20160745, 'OGUN', 20160874);
INSERT INTO `geotripe`.`State` (`State_Id`, `Name`, `State_Country_Id`) VALUES (20160746, 'ONDO', 20160874);
INSERT INTO `geotripe`.`State` (`State_Id`, `Name`, `State_Country_Id`) VALUES (20160747, 'OSUN', 20160874);
INSERT INTO `geotripe`.`State` (`State_Id`, `Name`, `State_Country_Id`) VALUES (20160748, 'OYO', 20160874);
INSERT INTO `geotripe`.`State` (`State_Id`, `Name`, `State_Country_Id`) VALUES (20160749, 'PLATEAU', 20160874);
INSERT INTO `geotripe`.`State` (`State_Id`, `Name`, `State_Country_Id`) VALUES (20160750, 'RIVERS', 20160874);
INSERT INTO `geotripe`.`State` (`State_Id`, `Name`, `State_Country_Id`) VALUES (20160751, 'SOKOTO', 20160874);
INSERT INTO `geotripe`.`State` (`State_Id`, `Name`, `State_Country_Id`) VALUES (20160752, 'TARABA', 20160874);
INSERT INTO `geotripe`.`State` (`State_Id`, `Name`, `State_Country_Id`) VALUES (20160753, 'YOBE', 20160874);
INSERT INTO `geotripe`.`State` (`State_Id`, `Name`, `State_Country_Id`) VALUES (20160754, 'ZAMFARA', 20160874);

COMMIT;


-- -----------------------------------------------------
-- Data for table `geotripe`.`BusinessType`
-- -----------------------------------------------------
START TRANSACTION;
USE `geotripe`;
INSERT INTO `geotripe`.`BusinessType` (`BusinessType_Id`, `Name`, `description`) VALUES (20310741, 'Banking', NULL);

COMMIT;


-- -----------------------------------------------------
-- Data for table `geotripe`.`PartyStatus`
-- -----------------------------------------------------
START TRANSACTION;
USE `geotripe`;
INSERT INTO `geotripe`.`PartyStatus` (`PartyStatus_Id`, `Name`, `description`) VALUES (1011, 'Approved', NULL);
INSERT INTO `geotripe`.`PartyStatus` (`PartyStatus_Id`, `Name`, `description`) VALUES (1012, 'Rejected', NULL);

COMMIT;


-- -----------------------------------------------------
-- Data for table `geotripe`.`Party`
-- -----------------------------------------------------
START TRANSACTION;
USE `geotripe`;
INSERT INTO `geotripe`.`Party` (`Party_Id`, `Party_PartyType_Id`, `AddressCity`, `AddressLine1`, `AddressLine2`, `PostalCode`, `ContactPhoneNumber`, `Name`, `EmailAddress`, `Party_Country_Id`, `Party_State_Id`, `ClientId`, `IsActive`, `ContactLastname`, `ContactFirstname`, `ContactPersonTitle`, `ContactMiddlename`, `YearEstablished`, `Party_BusinessType_Id`, `OtherTypeOfBusiness`, `MajorBusinessActivity`, `TermConditionAccepted`, `PartyStatus_PartyStatus_Id`) VALUES (20161307, 201607130, 'Lagos', 'Samuel Manua Street', 'Off Keffi', NULL, NULL, 'Geoscape Limited', NULL, 20160874, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, 20310741, NULL, NULL, NULL, 1011);

COMMIT;


-- -----------------------------------------------------
-- Data for table `geotripe`.`Users`
-- -----------------------------------------------------
START TRANSACTION;
USE `geotripe`;
INSERT INTO `geotripe`.`Users` (`User_Id`, `Firstname`, `MiddleName`, `LastName`, `WorkPhoneNumber`, `ContactPhoneNumber`, `User_Party_Id`, `IsAuthorizedPerson`, `Username`, `Email`, `Password`, `token`, `Enabled`, `AccountLocked`, `AccountExpirationTime`, `CredentialsExpirationTime`, `DateCreated`, `DateModified`) VALUES (20160713, 'Abimbola', 'S', 'Hassan', '07065725667', NULL, 20161307, NULL, NULL, 'infinitizon@yahoo.com', 'c20ad4d76fe97759aa27a0c99bff6710', NULL, 1, 0, NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Users` (`User_Id`, `Firstname`, `MiddleName`, `LastName`, `WorkPhoneNumber`, `ContactPhoneNumber`, `User_Party_Id`, `IsAuthorizedPerson`, `Username`, `Email`, `Password`, `token`, `Enabled`, `AccountLocked`, `AccountExpirationTime`, `CredentialsExpirationTime`, `DateCreated`, `DateModified`) VALUES (20160714, 'Labake', NULL, 'Hassan', '143131513', '135135153151', 20161317, NULL, NULL, 'labaks@gmail.com', '72a9034327785dab5ad6a914b73c16b8', NULL, 1, 0, NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Users` (`User_Id`, `Firstname`, `MiddleName`, `LastName`, `WorkPhoneNumber`, `ContactPhoneNumber`, `User_Party_Id`, `IsAuthorizedPerson`, `Username`, `Email`, `Password`, `token`, `Enabled`, `AccountLocked`, `AccountExpirationTime`, `CredentialsExpirationTime`, `DateCreated`, `DateModified`) VALUES (20160715, 'Deribigbe', NULL, 'Ajasa', '75365653', '345673546356', 20161317, NULL, NULL, 'dajasa@mail.com', '960a92425e165e5ec9830f78e28dafc7', NULL, 1, 0, NULL, NULL, NULL, NULL);

COMMIT;


-- -----------------------------------------------------
-- Data for table `geotripe`.`QuoteStatus`
-- -----------------------------------------------------
START TRANSACTION;
USE `geotripe`;
INSERT INTO `geotripe`.`QuoteStatus` (`QuoteStatus_Id`, `Name`, `description`) VALUES (12141324, 'Submitted', 'Submitted');
INSERT INTO `geotripe`.`QuoteStatus` (`QuoteStatus_Id`, `Name`, `description`) VALUES (12141325, 'In Progress', 'In Progress');
INSERT INTO `geotripe`.`QuoteStatus` (`QuoteStatus_Id`, `Name`, `description`) VALUES (12141326, 'TQ', 'TQ');
INSERT INTO `geotripe`.`QuoteStatus` (`QuoteStatus_Id`, `Name`, `description`) VALUES (12141327, 'Sourcing for suppliers', 'Sourcing for suppliers');
INSERT INTO `geotripe`.`QuoteStatus` (`QuoteStatus_Id`, `Name`, `description`) VALUES (12141328, 'Costing at suppliers', 'Costing at suppliers');

COMMIT;


-- -----------------------------------------------------
-- Data for table `geotripe`.`Currency`
-- -----------------------------------------------------
START TRANSACTION;
USE `geotripe`;
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923342, 'NGN', 'Naira', '&#8358;', '&#x20A6;', 'U+20A6');
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923343, 'USD', 'US Dollar', '&#36;', '&#x0024;', 'U+0024');
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923344, 'GBP', 'Pound', '&#163;', '&#x00A3;', 'U+00A3');
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923345, 'GHc', 'Cedi', '&#8373;', '&#x20B5;', 'U+20B5');
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923346, 'AED', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923347, 'AFN', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923348, 'ALL', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923349, 'AMD', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923350, 'ANG', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923351, 'ANG', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923352, 'AOA', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923353, 'ARS', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923354, 'AUD', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923355, 'AWG', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923356, 'AZN', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923357, 'BAM', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923358, 'BBD', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923359, 'BDT', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923360, 'BGN', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923361, 'BHD', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923362, 'BIF', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923363, 'BMD', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923364, 'BND', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923365, 'BOB', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923366, 'BRL', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923367, 'BSD', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923368, 'BTN', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923369, 'BWP', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923370, 'BYN', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923371, 'BZD', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923372, 'CAD', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923373, 'CDF', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923374, 'CHF', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923375, 'CLP', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923376, 'CNY', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923377, 'COP', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923378, 'CRC', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923379, 'CUP', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923380, 'CVE', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923381, 'CZK', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923382, 'DJF', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923383, 'DKK', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923384, 'DOP', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923385, 'DZD', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923386, 'EGP', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923387, 'ERN', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923388, 'ETB', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923389, 'EUR', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923390, 'FJD', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923391, 'FKP', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923392, 'GBP', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923393, 'GEL', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923394, 'GGP', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923395, 'GHS', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923396, 'GIP', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923397, 'GMD', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923398, 'GNF', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923399, 'GTQ', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923400, 'GYD', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923401, 'HKD', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923402, 'HNL', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923403, 'HRK', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923404, 'HTG', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923405, 'HUF', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923406, 'IDR', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923407, 'ILS', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923408, 'IMP', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923409, 'INR', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923410, 'IQD', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923411, 'IRR', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923412, 'ISK', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923413, 'JEP', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923414, 'JMD', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923415, 'JOD', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923416, 'JPY', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923417, 'KES', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923418, 'KGS', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923419, 'KHR', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923420, 'KMF', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923421, 'KPW', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923422, 'KRW', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923423, 'KWD', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923424, 'KYD', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923425, 'KZT', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923426, 'LAK', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923427, 'LBP', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923428, 'LKR', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923429, 'LRD', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923430, 'LSL', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923431, 'LYD', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923432, 'MAD', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923433, 'MDL', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923434, 'MGA', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923435, 'MKD', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923436, 'MMK', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923437, 'MNT', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923438, 'MOP', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923439, 'MRO', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923440, 'MUR', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923441, 'MVR', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923442, 'MWK', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923443, 'MXN', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923444, 'MYR', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923445, 'MZN', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923446, 'NAD', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923447, 'NGN', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923448, 'NIO', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923449, 'NOK', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923450, 'NPR', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923451, 'NZD', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923452, 'OMR', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923453, 'PEN', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923454, 'PGK', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923455, 'PHP', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923456, 'PKR', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923457, 'PLN', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923458, 'PYG', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923459, 'QAR', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923460, 'RON', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923461, 'RSD', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923462, 'RUB', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923463, 'RWF', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923464, 'SAR', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923465, 'SBD', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923466, 'SCR', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923467, 'SDG', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923468, 'SEK', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923469, 'SGD', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923470, 'SHP', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923471, 'SLL', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923472, 'SOS', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923473, 'SRD', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923474, 'SSP', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923475, 'STD', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923476, 'SYP', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923477, 'SZL', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923478, 'THB', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923479, 'TJS', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923480, 'TMT', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923481, 'TND', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923482, 'TOP', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923483, 'TRY', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923484, 'TTD', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923485, 'TWD', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923486, 'TZS', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923487, 'UAH', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923488, 'UGX', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923489, 'USD', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923490, 'UYU', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923491, 'UZS', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923492, 'VEF', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923493, 'VND', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923494, 'VUV', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923495, 'WST', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923496, 'XAF', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923497, 'XCD', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923498, 'XDR', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923499, 'XOF', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923500, 'XPF', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923501, 'YER', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923502, 'ZAR', NULL, NULL, NULL, NULL);
INSERT INTO `geotripe`.`Currency` (`currency_id`, `code`, `description`, `decimalHTML`, `hexHTML`, `unicode`) VALUES (19923503, 'ZMW', NULL, NULL, NULL, NULL);

COMMIT;


-- -----------------------------------------------------
-- Data for table `geotripe`.`Quote`
-- -----------------------------------------------------
START TRANSACTION;
USE `geotripe`;
INSERT INTO `geotripe`.`Quote` (`quote_Id`, `subject`, `rfq_no`, `Party_Party_Id`, `Quote_Status_Id`, `Quote_Currency_Id`, `PublishDate`, `DueDate`, `EntryDate`, `EventOwner`, `Users_User_Id`, `ApproveDate`, `Quote_EnteredBy_Id`, `Description`, `Quote_ApprovedBy_Id`, `SpecificationAndRequirement`, `po_no`, `po_is_split`) VALUES (20160809, 'A test quote', NULL, 20161307, 12141324, 19923342, NULL, NULL, NULL, NULL, NULL, NULL, 20160713, 'Nice stuff', NULL, NULL, NULL, NULL);

COMMIT;


-- -----------------------------------------------------
-- Data for table `geotripe`.`DocumentTypes`
-- -----------------------------------------------------
START TRANSACTION;
USE `geotripe`;
INSERT INTO `geotripe`.`DocumentTypes` (`documentType_id`, `documentType`, `documentTypeDesc`) VALUES (113525552, 'Source files', 'Original Files received from cliet');
INSERT INTO `geotripe`.`DocumentTypes` (`documentType_id`, `documentType`, `documentTypeDesc`) VALUES (113525553, 'Costing Sheet', 'Costing sheet used to develop quote');

COMMIT;


-- -----------------------------------------------------
-- Data for table `geotripe`.`User_AuthView`
-- -----------------------------------------------------
START TRANSACTION;
USE `geotripe`;
INSERT INTO `geotripe`.`User_AuthView` (`AuthView_AuthView_Id`, `User_User_Id`, `ius_yn`) VALUES (13072016, 20160713, 1);
INSERT INTO `geotripe`.`User_AuthView` (`AuthView_AuthView_Id`, `User_User_Id`, `ius_yn`) VALUES (13072017, 20160713, 1);
INSERT INTO `geotripe`.`User_AuthView` (`AuthView_AuthView_Id`, `User_User_Id`, `ius_yn`) VALUES (13072018, 20160713, 1);

COMMIT;


-- -----------------------------------------------------
-- Data for table `geotripe`.`MailType`
-- -----------------------------------------------------
START TRANSACTION;
USE `geotripe`;
INSERT INTO `geotripe`.`MailType` (`mail_type_id`, `name`) VALUES (30122016, 'late_rfq');

COMMIT;


-- -----------------------------------------------------
-- Data for table `geotripe`.`UnitOfMeasure`
-- -----------------------------------------------------
START TRANSACTION;
USE `geotripe`;
INSERT INTO `geotripe`.`UnitOfMeasure` (`unitofmeasure_id`, `Name`, `description`) VALUES (20160923, 'Each', 'Each');
INSERT INTO `geotripe`.`UnitOfMeasure` (`unitofmeasure_id`, `Name`, `description`) VALUES (20160924, 'Set', 'Set');
INSERT INTO `geotripe`.`UnitOfMeasure` (`unitofmeasure_id`, `Name`, `description`) VALUES (20160925, 'Pack', 'Pack');
INSERT INTO `geotripe`.`UnitOfMeasure` (`unitofmeasure_id`, `Name`, `description`) VALUES (20160926, 'Piece', 'Piece');
INSERT INTO `geotripe`.`UnitOfMeasure` (`unitofmeasure_id`, `Name`, `description`) VALUES (20160927, 'Kit', 'Kit');
INSERT INTO `geotripe`.`UnitOfMeasure` (`unitofmeasure_id`, `Name`, `description`) VALUES (20160928, 'Litre', 'Litre');
INSERT INTO `geotripe`.`UnitOfMeasure` (`unitofmeasure_id`, `Name`, `description`) VALUES (20160929, 'Gallon', 'Gallon');
INSERT INTO `geotripe`.`UnitOfMeasure` (`unitofmeasure_id`, `Name`, `description`) VALUES (20160930, 'Can', 'Can');
INSERT INTO `geotripe`.`UnitOfMeasure` (`unitofmeasure_id`, `Name`, `description`) VALUES (20160931, 'Drum', 'Drum');

COMMIT;


-- -----------------------------------------------------
-- Data for table `geotripe`.`AuthRoles`
-- -----------------------------------------------------
START TRANSACTION;
USE `geotripe`;
INSERT INTO `geotripe`.`AuthRoles` (`AuthRoles_Id`, `Name`, `description`) VALUES (13072016, 'RFQ_OFFICER', 'Allowed to enter in the RFQ request from client');
INSERT INTO `geotripe`.`AuthRoles` (`AuthRoles_Id`, `Name`, `description`) VALUES (13072017, 'RFQ_SUPERVISOR', 'Allowd to override the details entered by the RFQ_OFFICER and also add/modify quotes from supplier');
INSERT INTO `geotripe`.`AuthRoles` (`AuthRoles_Id`, `Name`, `description`) VALUES (13072018, 'RFQ_ADMIN', 'Can make global changes to an RFQ');
INSERT INTO `geotripe`.`AuthRoles` (`AuthRoles_Id`, `Name`, `description`) VALUES (13072019, 'SUPPORT_ADMIN', 'Can make system-wide changes to assist users');
INSERT INTO `geotripe`.`AuthRoles` (`AuthRoles_Id`, `Name`, `description`) VALUES (13072020, 'PO_OFFICER', 'Allowed to createaPO from a submitted RFQ');
INSERT INTO `geotripe`.`AuthRoles` (`AuthRoles_Id`, `Name`, `description`) VALUES (13072021, 'PO_SUPERVISOR', 'Allowed to override the details entered by the PO_OFFICER and also add/modify quotes from supplier');
INSERT INTO `geotripe`.`AuthRoles` (`AuthRoles_Id`, `Name`, `description`) VALUES (13072022, 'PO_ADMIN', 'Can make global changes to an PO');

COMMIT;

