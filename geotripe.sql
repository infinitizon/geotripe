CREATE DATABASE  IF NOT EXISTS `geotripe` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `geotripe`;
-- MySQL dump 10.13  Distrib 5.6.11, for osx10.6 (i386)
--
-- Host: 127.0.0.1    Database: geotripe
-- ------------------------------------------------------
-- Server version	5.6.24

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `AuthView`
--

DROP TABLE IF EXISTS `AuthView`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `AuthView` (
  `AuthView_Id` bigint(20) NOT NULL,
  `parent_id` bigint(20) DEFAULT NULL,
  `Name` varchar(200) DEFAULT NULL,
  `ViewPath` varchar(200) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `css_class` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`AuthView_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AuthView`
--

LOCK TABLES `AuthView` WRITE;
/*!40000 ALTER TABLE `AuthView` DISABLE KEYS */;
INSERT INTO `AuthView` VALUES (13072016,0,'Dashboard','home','Shows the dashboard on login','fa-tachometer'),(13072017,0,'Quotes','quotes','Monitors Quote Lifecycle','fa-files-o'),(13072018,0,'Setup','setup','Admin Setup page','fa-cogs'),(13072019,13072017,'DashSub','dashsub','testDashSub','fa-wheel'),(13072020,13072019,'DashSub_l2','dashsub_l2','testDashSub_l2','_l2');
/*!40000 ALTER TABLE `AuthView` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `BankAccountDetail`
--

DROP TABLE IF EXISTS `BankAccountDetail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `BankAccountDetail` (
  `BankAccountDetail_Id` bigint(20) NOT NULL,
  `BankAccountDetail_Party_Id` bigint(20) NOT NULL,
  `BankName` varchar(45) DEFAULT NULL,
  `BankAccountDetail_Currency_Id` bigint(20) NOT NULL,
  `AccountName` varchar(100) DEFAULT NULL,
  `AccountReference` varchar(100) DEFAULT NULL,
  `SWIFTCode` varchar(45) DEFAULT NULL,
  `IBAN` varchar(45) DEFAULT NULL,
  `NUBAN` varchar(45) DEFAULT NULL,
  `BankAccountDetail_Country_Id` bigint(20) NOT NULL,
  `BankAccountDetail_State_Id` bigint(20) NOT NULL,
  PRIMARY KEY (`BankAccountDetail_Id`),
  KEY `fk_BankAccountDetail_Party1_idx` (`BankAccountDetail_Party_Id`),
  KEY `fk_BankAccountDetail_Currency1_idx` (`BankAccountDetail_Currency_Id`),
  KEY `fk_BankAccountDetail_Country1_idx` (`BankAccountDetail_Country_Id`),
  KEY `fk_BankAccountDetail_State1_idx` (`BankAccountDetail_State_Id`),
  CONSTRAINT `fk_BankAccountDetail_Country1` FOREIGN KEY (`BankAccountDetail_Country_Id`) REFERENCES `Country` (`Country_Id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_BankAccountDetail_Currency1` FOREIGN KEY (`BankAccountDetail_Currency_Id`) REFERENCES `Currency` (`currency_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_BankAccountDetail_Party1` FOREIGN KEY (`BankAccountDetail_Party_Id`) REFERENCES `Party` (`Party_Id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_BankAccountDetail_State1` FOREIGN KEY (`BankAccountDetail_State_Id`) REFERENCES `State` (`State_Id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BankAccountDetail`
--

LOCK TABLES `BankAccountDetail` WRITE;
/*!40000 ALTER TABLE `BankAccountDetail` DISABLE KEYS */;
/*!40000 ALTER TABLE `BankAccountDetail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `BusinessType`
--

DROP TABLE IF EXISTS `BusinessType`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `BusinessType` (
  `BusinessType_Id` bigint(20) NOT NULL,
  `Name` varchar(200) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`BusinessType_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BusinessType`
--

LOCK TABLES `BusinessType` WRITE;
/*!40000 ALTER TABLE `BusinessType` DISABLE KEYS */;
INSERT INTO `BusinessType` VALUES (20310741,'Banking',NULL);
/*!40000 ALTER TABLE `BusinessType` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Country`
--

DROP TABLE IF EXISTS `Country`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Country` (
  `Country_Id` bigint(20) NOT NULL,
  `Name` varchar(255) DEFAULT NULL,
  `CountryCode` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`Country_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Country`
--

LOCK TABLES `Country` WRITE;
/*!40000 ALTER TABLE `Country` DISABLE KEYS */;
INSERT INTO `Country` VALUES (20160713,'Afghanistan','AFG'),(20160714,'Aland Islands','ALA'),(20160715,'Albania','ALB'),(20160716,'Algeria','DZA'),(20160717,'American Samoa','ASM'),(20160718,'Andorra','AND'),(20160719,'Angola','AGO'),(20160720,'Anguilla','AIA'),(20160721,'Antarctica','ATA'),(20160722,'Antigua and Barbuda','ATG'),(20160723,'Argentina','ARG'),(20160724,'Armenia','ARM'),(20160725,'Aruba','ABW'),(20160726,'Australia','AUS'),(20160727,'Austria','AUT'),(20160728,'Azerbaijan','AZE'),(20160729,'Bahamas','BHS'),(20160730,'Bahrain','BHR'),(20160731,'Bangladesh','BGD'),(20160732,'Barbados','BRB'),(20160733,'Belarus','BLR'),(20160734,'Belgium','BEL'),(20160735,'Belize','BLZ'),(20160736,'Benin','BEN'),(20160737,'Bermuda','BMU'),(20160738,'Bhutan','BTN'),(20160739,'Bolivia','BOL'),(20160740,'Bosnia and Herzegovina','BIH'),(20160741,'Botswana','BWA'),(20160742,'Bouvet Island','BVT'),(20160743,'Brazil','BRA'),(20160744,'British Virgin Islands','VGB'),(20160745,'British Indian Ocean Territory','IOT'),(20160746,'Brunei Darussalam','BRN'),(20160747,'Bulgaria','BGR'),(20160748,'Burkina Faso','BFA'),(20160749,'Burundi','BDI'),(20160750,'Cambodia','KHM'),(20160751,'Cameroon','CMR'),(20160752,'Canada','CAN'),(20160753,'Cape Verde','CPV'),(20160754,'Cayman Islands','CYM'),(20160755,'Central African Republic','CAF'),(20160756,'Chad','TCD'),(20160757,'Chile','CHL'),(20160758,'China','CHN'),(20160759,'Hong Kong, Special Administrative Region of China','HKG'),(20160760,'Macao, Special Administrative Region of China','MAC'),(20160761,'Christmas Island','CXR'),(20160762,'Cocos (Keeling) Islands','CCK'),(20160763,'Colombia','COL'),(20160764,'Comoros','COM'),(20160765,'Congo (Brazzaville)','COG'),(20160766,'Congo, Democratic Republic of the','COD'),(20160767,'Cook Islands','COK'),(20160768,'Costa Rica','CRI'),(20160769,'Cote d\'Ivoire','CIV'),(20160770,'Croatia','HRV'),(20160771,'Cuba','CUB'),(20160772,'Cyprus','CYP'),(20160773,'Czech Republic','CZE'),(20160774,'Denmark','DNK'),(20160775,'Djibouti','DJI'),(20160776,'Dominica','DMA'),(20160777,'Dominican Republic','DOM'),(20160778,'Ecuador','ECU'),(20160779,'Egypt','EGY'),(20160780,'El Salvador','SLV'),(20160781,'Equatorial Guinea','GNQ'),(20160782,'Eritrea','ERI'),(20160783,'Estonia','EST'),(20160784,'Ethiopia','ETH'),(20160785,'Falkland Islands (Malvinas)','FLK'),(20160786,'Faroe Islands','FRO'),(20160787,'Fiji','FJI'),(20160788,'Finland','FIN'),(20160789,'France','FRA'),(20160790,'French Guiana','GUF'),(20160791,'French Polynesia','PYF'),(20160792,'French Southern Territories','ATF'),(20160793,'Gabon','GAB'),(20160794,'Gambia','GMB'),(20160795,'Georgia','GEO'),(20160796,'Germany','DEU'),(20160797,'Ghana','GHA'),(20160798,'Gibraltar','GIB'),(20160799,'Greece','GRC'),(20160800,'Greenland','GRL'),(20160801,'Grenada','GRD'),(20160802,'Guadeloupe','GLP'),(20160803,'Guam','GUM'),(20160804,'Guatemala','GTM'),(20160805,'Guernsey','GGY'),(20160806,'Guinea','GIN'),(20160807,'Guinea-Bissau','GNB'),(20160808,'Guyana','GUY'),(20160809,'Haiti','HTI'),(20160810,'Heard Island and Mcdonald Islands','HMD'),(20160811,'Holy See (Vatican City State)','VAT'),(20160812,'Honduras','HND'),(20160813,'Hungary','HUN'),(20160814,'Iceland','ISL'),(20160815,'India','IND'),(20160816,'Indonesia','IDN'),(20160817,'Iran, Islamic Republic of','IRN'),(20160818,'Iraq','IRQ'),(20160819,'Ireland','IRL'),(20160820,'Isle of Man','IMN'),(20160821,'Israel','ISR'),(20160822,'Italy','ITA'),(20160823,'Jamaica','JAM'),(20160824,'Japan','JPN'),(20160825,'Jersey','JEY'),(20160826,'Jordan','JOR'),(20160827,'Kazakhstan','KAZ'),(20160828,'Kenya','KEN'),(20160829,'Kiribati','KIR'),(20160830,'Korea, Democratic People\'s Republic of','PRK'),(20160831,'Korea, Republic of','KOR'),(20160832,'Kuwait','KWT'),(20160833,'Kyrgyzstan','KGZ'),(20160834,'Lao PDR','LAO'),(20160835,'Latvia','LVA'),(20160836,'Lebanon','LBN'),(20160837,'Lesotho','LSO'),(20160838,'Liberia','LBR'),(20160839,'Libya','LBY'),(20160840,'Liechtenstein','LIE'),(20160841,'Lithuania','LTU'),(20160842,'Luxembourg','LUX'),(20160843,'Macedonia, Republic of','MKD'),(20160844,'Madagascar','MDG'),(20160845,'Malawi','MWI'),(20160846,'Malaysia','MYS'),(20160847,'Maldives','MDV'),(20160848,'Mali','MLI'),(20160849,'Malta','MLT'),(20160850,'Marshall Islands','MHL'),(20160851,'Martinique','MTQ'),(20160852,'Mauritania','MRT'),(20160853,'Mauritius','MUS'),(20160854,'Mayotte','MYT'),(20160855,'Mexico','MEX'),(20160856,'Micronesia, Federated States of','FSM'),(20160857,'Moldova','MDA'),(20160858,'Monaco','MCO'),(20160859,'Mongolia','MNG'),(20160860,'Montenegro','MNE'),(20160861,'Montserrat','MSR'),(20160862,'Morocco','MAR'),(20160863,'Mozambique','MOZ'),(20160864,'Myanmar','MMR'),(20160865,'Namibia','NAM'),(20160866,'Nauru','NRU'),(20160867,'Nepal','NPL'),(20160868,'Netherlands','NLD'),(20160869,'Netherlands Antilles','ANT'),(20160870,'New Caledonia','NCL'),(20160871,'New Zealand','NZL'),(20160872,'Nicaragua','NIC'),(20160873,'Niger','NER'),(20160874,'Nigeria','NGA'),(20160875,'Niue','NIU'),(20160876,'Norfolk Island','NFK'),(20160877,'Northern Mariana Islands','MNP'),(20160878,'Norway','NOR'),(20160879,'Oman','OMN'),(20160880,'Pakistan','PAK'),(20160881,'Palau','PLW'),(20160882,'Palestinian Territory, Occupied','PSE'),(20160883,'Panama','PAN'),(20160884,'Papua New Guinea','PNG'),(20160885,'Paraguay','PRY'),(20160886,'Peru','PER'),(20160887,'Philippines','PHL'),(20160888,'Pitcairn','PCN'),(20160889,'Poland','POL'),(20160890,'Portugal','PRT'),(20160891,'Puerto Rico','PRI'),(20160892,'Qatar','QAT'),(20160893,'Reunion','REU'),(20160894,'Romania','ROU'),(20160895,'Russian Federation','RUS'),(20160896,'Rwanda','RWA'),(20160897,'Saint-Barthelemy','BLM'),(20160898,'Saint Helena','SHN'),(20160899,'Saint Kitts and Nevis','KNA'),(20160900,'Saint Lucia','LCA'),(20160901,'Saint-Martin (French part)','MAF'),(20160902,'Saint Pierre and Miquelon','SPM'),(20160903,'Saint Vincent and Grenadines','VCT'),(20160904,'Samoa','WSM'),(20160905,'San Marino','SMR'),(20160906,'Sao Tome and Principe','STP'),(20160907,'Saudi Arabia','SAU'),(20160908,'Senegal','SEN'),(20160909,'Serbia','SRB'),(20160910,'Seychelles','SYC'),(20160911,'Sierra Leone','SLE'),(20160912,'Singapore','SGP'),(20160913,'Slovakia','SVK'),(20160914,'Slovenia','SVN'),(20160915,'Solomon Islands','SLB'),(20160916,'Somalia','SOM'),(20160917,'South Africa','ZAF'),(20160918,'South Georgia and the South Sandwich Islands','SGS'),(20160919,'South Sudan','SSD'),(20160920,'Spain','ESP'),(20160921,'Sri Lanka','LKA'),(20160922,'Sudan','SDN'),(20160923,'Suriname *','SUR'),(20160924,'Svalbard and Jan Mayen Islands','SJM'),(20160925,'Swaziland','SWZ'),(20160926,'Sweden','SWE'),(20160927,'Switzerland','CHE'),(20160928,'Syrian Arab Republic (Syria)','SYR'),(20160929,'Taiwan, Republic of China','TWN'),(20160930,'Tajikistan','TJK'),(20160931,'Tanzania *, United Republic of','TZA'),(20160932,'Thailand','THA'),(20160933,'Timor-Leste','TLS'),(20160934,'Togo','TGO'),(20160935,'Tokelau','TKL'),(20160936,'Tonga','TON'),(20160937,'Trinidad and Tobago','TTO'),(20160938,'Tunisia','TUN'),(20160939,'Turkey','TUR'),(20160940,'Turkmenistan','TKM'),(20160941,'Turks and Caicos Islands','TCA'),(20160942,'Tuvalu','TUV'),(20160943,'Uganda','UGA'),(20160944,'Ukraine','UKR'),(20160945,'United Arab Emirates','ARE'),(20160946,'United Kingdom','GBR'),(20160947,'United States of America','USA'),(20160948,'United States Minor Outlying Islands','UMI'),(20160949,'Uruguay','URY'),(20160950,'Uzbekistan','UZB'),(20160951,'Vanuatu','VUT'),(20160952,'Venezuela (Bolivarian Republic of)','VEN'),(20160953,'Viet Nam','VNM'),(20160954,'Virgin Islands, US','VIR'),(20160955,'Wallis and Futuna Islands','WLF'),(20160956,'Western Sahara','ESH'),(20160957,'Yemen','YEM'),(20160958,'Zambia','ZMB'),(20160959,'Zimbabwe','ZWE');
/*!40000 ALTER TABLE `Country` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Currency`
--

DROP TABLE IF EXISTS `Currency`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Currency` (
  `currency_id` bigint(20) NOT NULL,
  `code` varchar(200) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `decimalHTML` varchar(10) DEFAULT NULL,
  `hexHTML` varchar(10) DEFAULT NULL,
  `unicode` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`currency_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Currency`
--

LOCK TABLES `Currency` WRITE;
/*!40000 ALTER TABLE `Currency` DISABLE KEYS */;
INSERT INTO `Currency` VALUES (19923342,'NGN','Naira','&#8358;','&#x20A6;','U+20A6'),(19923343,'USD','US Dollar','&#36;','&#x0024;','U+0024'),(19923344,'GBP','Pound','&#163;','&#x00A3;','U+00A3'),(19923345,'GHc','Cedi','&#8373;','&#x20B5;','U+20B5');
/*!40000 ALTER TABLE `Currency` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Document`
--

DROP TABLE IF EXISTS `Document`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Document` (
  `Document_Id` bigint(20) NOT NULL,
  `Document_Quote_Id` bigint(20) NOT NULL,
  `DocumentName` varchar(45) DEFAULT NULL,
  `DocumentMimeType` varchar(45) DEFAULT NULL,
  `DocumentBlob` blob,
  PRIMARY KEY (`Document_Id`),
  KEY `fk_Document_Quote1_idx` (`Document_Quote_Id`),
  CONSTRAINT `fk_Document_Quote1` FOREIGN KEY (`Document_Quote_Id`) REFERENCES `Quote` (`Quote_Id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Document`
--

LOCK TABLES `Document` WRITE;
/*!40000 ALTER TABLE `Document` DISABLE KEYS */;
/*!40000 ALTER TABLE `Document` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LoginDetail`
--

DROP TABLE IF EXISTS `LoginDetail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `LoginDetail` (
  `LoginDetail_Id` bigint(20) NOT NULL,
  `Username` varchar(200) NOT NULL,
  `RemoteAddress` varchar(45) DEFAULT NULL,
  `LoginDate` datetime NOT NULL,
  `LoginSuccessful` bit(1) NOT NULL,
  `FailureReason` varchar(500) DEFAULT NULL,
  `LoginDetail_User_Id` bigint(20) NOT NULL,
  PRIMARY KEY (`LoginDetail_Id`),
  KEY `fk_LoginDetail_User1_idx` (`LoginDetail_User_Id`),
  CONSTRAINT `fk_LoginDetail_User1` FOREIGN KEY (`LoginDetail_User_Id`) REFERENCES `Users` (`User_Id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LoginDetail`
--

LOCK TABLES `LoginDetail` WRITE;
/*!40000 ALTER TABLE `LoginDetail` DISABLE KEYS */;
/*!40000 ALTER TABLE `LoginDetail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Party`
--

DROP TABLE IF EXISTS `Party`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Party` (
  `Party_Id` bigint(20) NOT NULL,
  `Party_PartyType_Id` int(11) NOT NULL,
  `AddressCity` varchar(100) DEFAULT NULL,
  `AddressLine1` varchar(255) DEFAULT NULL,
  `AddressLine2` varchar(255) DEFAULT NULL,
  `PostalCode` varchar(45) DEFAULT NULL,
  `ContactPhoneNumber` varchar(45) DEFAULT NULL,
  `Name` varchar(45) DEFAULT NULL,
  `EmailAddress` varchar(45) DEFAULT NULL,
  `Party_Country_Id` bigint(20) DEFAULT NULL,
  `Party_State_Id` bigint(20) DEFAULT NULL,
  `ClientId` varchar(45) DEFAULT NULL,
  `IsActive` bit(1) DEFAULT NULL,
  `ContactLastname` varchar(100) DEFAULT NULL,
  `ContactFirstname` varchar(100) DEFAULT NULL,
  `ContactPersonTitle` varchar(100) DEFAULT NULL,
  `ContactMiddlename` varchar(100) DEFAULT NULL,
  `YearEstablished` int(11) DEFAULT NULL,
  `Party_BusinessType_Id` bigint(20) NOT NULL,
  `OtherTypeOfBusiness` varchar(555) DEFAULT NULL,
  `MajorBusinessActivity` varchar(455) DEFAULT NULL,
  `TermConditionAccepted` bit(1) DEFAULT NULL,
  `PartyStatus_PartyStatus_Id` bigint(20) NOT NULL,
  PRIMARY KEY (`Party_Id`),
  KEY `fk_Party_PartyType1_idx` (`Party_PartyType_Id`),
  KEY `fk_Party_Country1_idx` (`Party_Country_Id`),
  KEY `fk_Party_State1_idx` (`Party_State_Id`),
  KEY `fk_Party_BusinessType1_idx` (`Party_BusinessType_Id`),
  KEY `fk_Party_PartyStatus1_idx` (`PartyStatus_PartyStatus_Id`),
  CONSTRAINT `fk_Party_BusinessType1` FOREIGN KEY (`Party_BusinessType_Id`) REFERENCES `BusinessType` (`BusinessType_Id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Party_Country1` FOREIGN KEY (`Party_Country_Id`) REFERENCES `Country` (`Country_Id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Party_PartyStatus1` FOREIGN KEY (`PartyStatus_PartyStatus_Id`) REFERENCES `PartyStatus` (`PartyStatus_Id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Party_PartyType1` FOREIGN KEY (`Party_PartyType_Id`) REFERENCES `PartyType` (`PartyType_Id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Party_State1` FOREIGN KEY (`Party_State_Id`) REFERENCES `State` (`State_Id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Party`
--

LOCK TABLES `Party` WRITE;
/*!40000 ALTER TABLE `Party` DISABLE KEYS */;
INSERT INTO `Party` VALUES (20161307,201607130,'Lagos','Samuel Manua Street','Off Keffi',NULL,NULL,'Geoscape Limited',NULL,20160874,NULL,NULL,'',NULL,NULL,NULL,NULL,NULL,20310741,NULL,NULL,NULL,1011),(20161308,201607130,'Lagos','Samuel Manua Street','Off Keffi',NULL,NULL,'Geoscape Limited 1',NULL,20160874,NULL,NULL,'',NULL,NULL,NULL,NULL,NULL,20310741,NULL,NULL,NULL,1011),(20161309,201607130,'Lagos ss','Samuel Manua Street','Off Keffi',NULL,NULL,'Geoscape Limited 2',NULL,20160874,NULL,NULL,'',NULL,NULL,NULL,NULL,NULL,20310741,NULL,NULL,NULL,1011),(20161310,201607130,'Lagos','Samuel Manua Street','Off Keffi',NULL,NULL,'Geoscape Limited 3',NULL,20160874,NULL,NULL,'',NULL,NULL,NULL,NULL,NULL,20310741,NULL,NULL,NULL,1011),(20161311,201607130,'Lagos','Samuel Manua Street','Off Keffi',NULL,NULL,'Geoscape Limited 4',NULL,20160874,NULL,NULL,'',NULL,NULL,NULL,NULL,NULL,20310741,NULL,NULL,NULL,1011),(20161312,201607130,'Lagos','Samuel Manua Street','Off Keffi',NULL,NULL,'Geoscape Limited 5',NULL,20160874,NULL,NULL,'',NULL,NULL,NULL,NULL,NULL,20310741,NULL,NULL,NULL,1011),(20161313,201607130,'Lagos','Samuel Manua Street','Off Keffi',NULL,NULL,'Geoscape Limited 6',NULL,20160874,NULL,NULL,'',NULL,NULL,NULL,NULL,NULL,20310741,NULL,NULL,NULL,1011),(20161314,201607130,'Lagos','Samuel Manua Street','Off Keffi',NULL,NULL,'Geoscape Limited 7',NULL,20160874,NULL,NULL,'',NULL,NULL,NULL,NULL,NULL,20310741,NULL,NULL,NULL,1011),(20161315,201607130,'Lagos','Samuel Manua Street','Off Keffi',NULL,NULL,'Geoscape Limited 8',NULL,20160874,NULL,NULL,'',NULL,NULL,NULL,NULL,NULL,20310741,NULL,NULL,NULL,1011),(20161316,201607130,'Lagos','Samuel Manua Street','Off Keffi',NULL,NULL,'Geoscape Limited 9',NULL,20160874,NULL,NULL,'',NULL,NULL,NULL,NULL,NULL,20310741,NULL,NULL,NULL,1011),(20161317,201607130,'Lagos','Samuel Manua Street','Off Keffi',NULL,NULL,'Geoscape Limited 10',NULL,20160874,NULL,NULL,'',NULL,NULL,NULL,NULL,NULL,20310741,NULL,NULL,NULL,1011),(20161318,201607130,'Lagos','Samuel Manua Street','Off Keffi',NULL,NULL,'Geoscape Limited 11',NULL,20160874,NULL,NULL,'',NULL,NULL,NULL,NULL,NULL,20310741,NULL,NULL,NULL,1011);
/*!40000 ALTER TABLE `Party` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PartyStatus`
--

DROP TABLE IF EXISTS `PartyStatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `PartyStatus` (
  `PartyStatus_Id` bigint(20) NOT NULL,
  `Name` varchar(200) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`PartyStatus_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PartyStatus`
--

LOCK TABLES `PartyStatus` WRITE;
/*!40000 ALTER TABLE `PartyStatus` DISABLE KEYS */;
INSERT INTO `PartyStatus` VALUES (1011,'Approved',NULL),(1012,'Rejected',NULL);
/*!40000 ALTER TABLE `PartyStatus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PartyType`
--

DROP TABLE IF EXISTS `PartyType`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `PartyType` (
  `PartyType_Id` int(11) NOT NULL,
  `Name` varchar(200) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`PartyType_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PartyType`
--

LOCK TABLES `PartyType` WRITE;
/*!40000 ALTER TABLE `PartyType` DISABLE KEYS */;
INSERT INTO `PartyType` VALUES (201607130,'Geoscape',NULL),(201607131,'Client',NULL),(201607132,'Supplier',NULL);
/*!40000 ALTER TABLE `PartyType` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Product`
--

DROP TABLE IF EXISTS `Product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Product` (
  `Product_Id` bigint(20) NOT NULL,
  `Name` varchar(200) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `ins_yn` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`Product_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Product`
--

LOCK TABLES `Product` WRITE;
/*!40000 ALTER TABLE `Product` DISABLE KEYS */;
INSERT INTO `Product` VALUES (20160908,'Shipments','Shipments',1);
/*!40000 ALTER TABLE `Product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PurchaseOrder`
--

DROP TABLE IF EXISTS `PurchaseOrder`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `PurchaseOrder` (
  `PurchaseOrder_Id` bigint(20) NOT NULL,
  `PurchaseOrder_PurchaseOrderStatus_Id` bigint(20) NOT NULL,
  `EntryDate` datetime DEFAULT NULL,
  `DateOfExcetuion` datetime DEFAULT NULL,
  `PurchasePrice` decimal(19,2) DEFAULT NULL,
  PRIMARY KEY (`PurchaseOrder_Id`),
  KEY `fk_PurchaseOrder_PurchaseOrderStatus1_idx` (`PurchaseOrder_PurchaseOrderStatus_Id`),
  CONSTRAINT `fk_PurchaseOrder_PurchaseOrderStatus1` FOREIGN KEY (`PurchaseOrder_PurchaseOrderStatus_Id`) REFERENCES `PurchaseOrderStatus` (`PurchaseOrderStatus_Id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PurchaseOrder`
--

LOCK TABLES `PurchaseOrder` WRITE;
/*!40000 ALTER TABLE `PurchaseOrder` DISABLE KEYS */;
/*!40000 ALTER TABLE `PurchaseOrder` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PurchaseOrderStatus`
--

DROP TABLE IF EXISTS `PurchaseOrderStatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `PurchaseOrderStatus` (
  `PurchaseOrderStatus_Id` bigint(20) NOT NULL,
  `Name` varchar(200) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`PurchaseOrderStatus_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PurchaseOrderStatus`
--

LOCK TABLES `PurchaseOrderStatus` WRITE;
/*!40000 ALTER TABLE `PurchaseOrderStatus` DISABLE KEYS */;
/*!40000 ALTER TABLE `PurchaseOrderStatus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Quote`
--

DROP TABLE IF EXISTS `Quote`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Quote` (
  `Quote_Id` bigint(20) NOT NULL,
  `Quote_Status_Id` bigint(20) NOT NULL,
  `Quote_QuoteDirection_Id` bigint(20) NOT NULL,
  `QuoteAmount` decimal(19,2) DEFAULT NULL,
  `Quote_Currency_Id` bigint(20) NOT NULL,
  `EntryDate` datetime DEFAULT NULL,
  `ApproveDate` datetime DEFAULT NULL,
  `Quote_EnteredBy_Id` bigint(20) NOT NULL,
  `BidPrice` decimal(19,2) DEFAULT NULL,
  `AskPrice` decimal(19,2) DEFAULT NULL,
  `Quote_PurchaseOrder_Id` bigint(20) NOT NULL,
  `Strike` decimal(19,2) DEFAULT NULL,
  `Description` varchar(1000) DEFAULT NULL,
  `Quantity` varchar(45) DEFAULT NULL,
  `Quote_Product_Id` bigint(20) NOT NULL,
  `ExpiryDate` datetime DEFAULT NULL,
  `Quote_ApprovedBy_Id` bigint(20) NOT NULL,
  `SpecificationAndRequirement` varchar(2000) DEFAULT NULL,
  PRIMARY KEY (`Quote_Id`),
  KEY `fk_Quote_QuoteStatus1_idx` (`Quote_Status_Id`),
  KEY `fk_Quote_QuoteDirection1_idx` (`Quote_QuoteDirection_Id`),
  KEY `fk_Quote_Currency1_idx` (`Quote_Currency_Id`),
  KEY `fk_Quote_User1_idx` (`Quote_EnteredBy_Id`),
  KEY `fk_Quote_PurchaseOrder1_idx` (`Quote_PurchaseOrder_Id`),
  KEY `fk_Quote_Product1_idx` (`Quote_Product_Id`),
  KEY `fk_Quote_User2_idx` (`Quote_ApprovedBy_Id`),
  CONSTRAINT `fk_Quote_Currency1` FOREIGN KEY (`Quote_Currency_Id`) REFERENCES `Currency` (`currency_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Quote_Product1` FOREIGN KEY (`Quote_Product_Id`) REFERENCES `Product` (`Product_Id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Quote_PurchaseOrder1` FOREIGN KEY (`Quote_PurchaseOrder_Id`) REFERENCES `PurchaseOrder` (`PurchaseOrder_Id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Quote_QuoteDirection1` FOREIGN KEY (`Quote_QuoteDirection_Id`) REFERENCES `QuoteDirection` (`QuoteDirection_Id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Quote_QuoteStatus1` FOREIGN KEY (`Quote_Status_Id`) REFERENCES `QuoteStatus` (`QuoteStatus_Id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Quote_User1` FOREIGN KEY (`Quote_EnteredBy_Id`) REFERENCES `Users` (`User_Id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Quote_User2` FOREIGN KEY (`Quote_ApprovedBy_Id`) REFERENCES `Users` (`User_Id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Quote`
--

LOCK TABLES `Quote` WRITE;
/*!40000 ALTER TABLE `Quote` DISABLE KEYS */;
/*!40000 ALTER TABLE `Quote` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `QuoteDirection`
--

DROP TABLE IF EXISTS `QuoteDirection`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `QuoteDirection` (
  `QuoteDirection_Id` bigint(20) NOT NULL,
  `Name` varchar(200) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`QuoteDirection_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `QuoteDirection`
--

LOCK TABLES `QuoteDirection` WRITE;
/*!40000 ALTER TABLE `QuoteDirection` DISABLE KEYS */;
INSERT INTO `QuoteDirection` VALUES (1922341,'Buy','Buy'),(1922342,'Sell','Sell');
/*!40000 ALTER TABLE `QuoteDirection` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `QuoteStatus`
--

DROP TABLE IF EXISTS `QuoteStatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `QuoteStatus` (
  `QuoteStatus_Id` bigint(20) NOT NULL,
  `Name` varchar(200) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`QuoteStatus_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `QuoteStatus`
--

LOCK TABLES `QuoteStatus` WRITE;
/*!40000 ALTER TABLE `QuoteStatus` DISABLE KEYS */;
/*!40000 ALTER TABLE `QuoteStatus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `State`
--

DROP TABLE IF EXISTS `State`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `State` (
  `State_Id` bigint(20) NOT NULL,
  `Name` varchar(255) DEFAULT NULL,
  `State_Country_Id` bigint(20) NOT NULL,
  PRIMARY KEY (`State_Id`),
  KEY `fk_State_Country1_idx` (`State_Country_Id`),
  CONSTRAINT `fk_State_Country1` FOREIGN KEY (`State_Country_Id`) REFERENCES `Country` (`Country_Id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `State`
--

LOCK TABLES `State` WRITE;
/*!40000 ALTER TABLE `State` DISABLE KEYS */;
INSERT INTO `State` VALUES (20160719,'ABIA',20160874),(20160720,'ADAMAWA',20160874),(20160721,'AKWAIBOM',20160874),(20160722,'ANAMBRA',20160874),(20160723,'BAUCHI',20160874),(20160724,'BAYELSA',20160874),(20160725,'BENUE',20160874),(20160726,'BORNO',20160874),(20160727,'CROSSRIVER',20160874),(20160728,'DELTA',20160874),(20160729,'EBONYI',20160874),(20160730,'EDO',20160874),(20160731,'EKITI',20160874),(20160732,'ENUGU',20160874),(20160733,'GOMBE',20160874),(20160734,'IMO',20160874),(20160735,'JIGAWA',20160874),(20160736,'KADUNA',20160874),(20160737,'KANO',20160874),(20160738,'KATSINA',20160874),(20160739,'KEBBI',20160874),(20160740,'KOGI',20160874),(20160741,'KWARA',20160874),(20160742,'LAGOS',20160874),(20160743,'NASSARAWA',20160874),(20160744,'NIGER',20160874),(20160745,'OGUN',20160874),(20160746,'ONDO',20160874),(20160747,'OSUN',20160874),(20160748,'OYO',20160874),(20160749,'PLATEAU',20160874),(20160750,'RIVERS',20160874),(20160751,'SOKOTO',20160874),(20160752,'TARABA',20160874),(20160753,'YOBE',20160874),(20160754,'ZAMFARA',20160874);
/*!40000 ALTER TABLE `State` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User_AuthView`
--

DROP TABLE IF EXISTS `User_AuthView`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `User_AuthView` (
  `AuthView_AuthView_Id` int(11) NOT NULL,
  `User_User_Id` bigint(20) NOT NULL,
  `ius_yn` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`AuthView_AuthView_Id`,`User_User_Id`),
  KEY `fk_user_authView_AuthView1_idx` (`AuthView_AuthView_Id`),
  KEY `fk_user_authView_User1_idx` (`User_User_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User_AuthView`
--

LOCK TABLES `User_AuthView` WRITE;
/*!40000 ALTER TABLE `User_AuthView` DISABLE KEYS */;
INSERT INTO `User_AuthView` VALUES (13072016,20160713,1),(13072016,20160714,1),(13072016,20160735,1),(13072016,20160736,1),(13072016,20160737,1),(13072017,20160713,1),(13072017,20160714,1),(13072017,20160735,1),(13072017,20160736,1),(13072017,20160737,1),(13072018,20160713,1),(13072019,20160713,1),(13072020,20160713,1);
/*!40000 ALTER TABLE `User_AuthView` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Users` (
  `User_Id` bigint(20) NOT NULL AUTO_INCREMENT,
  `Firstname` varchar(200) NOT NULL,
  `MiddleName` varchar(200) DEFAULT NULL,
  `LastName` varchar(200) NOT NULL,
  `WorkPhoneNumber` varchar(45) DEFAULT NULL,
  `ContactPhoneNumber` varchar(45) DEFAULT NULL,
  `User_Party_Id` bigint(20) NOT NULL,
  `IsAuthorizedPerson` tinyint(1) DEFAULT NULL,
  `Username` varchar(100) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `Password` varchar(200) NOT NULL,
  `token` varchar(200) DEFAULT NULL,
  `Enabled` bit(1) DEFAULT NULL,
  `AccountLocked` bit(1) DEFAULT NULL,
  `AccountExpirationTime` datetime DEFAULT NULL,
  `CredentialsExpirationTime` datetime DEFAULT NULL,
  `DateCreated` datetime DEFAULT NULL,
  `DateModified` datetime DEFAULT NULL,
  PRIMARY KEY (`User_Id`),
  KEY `fk_User_Party1_idx` (`User_Party_Id`),
  CONSTRAINT `fk_User_Party1` FOREIGN KEY (`User_Party_Id`) REFERENCES `Party` (`Party_Id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=20160738 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (20160713,'Abimbolawrywre','Soo','Hassan','07065725667',NULL,20161307,NULL,NULL,'infinitizon@yahoo.com','c20ad4d76fe97759aa27a0c99bff6710','a9b5d3c782ca951687f16cc1f004227179726224','','\0',NULL,NULL,NULL,NULL),(20160714,'Nathaniel Abimbola','S','Hassan','07065725667',NULL,20161307,NULL,NULL,'aa@bb.com','c20ad4d76fe97759aa27a0c99bff6710',NULL,'','\0',NULL,NULL,NULL,NULL),(20160715,'Abimbola','S','Hassan','07065725667',NULL,20161307,NULL,NULL,'aa@bb.com','c20ad4d76fe97759aa27a0c99bff6710',NULL,'','\0',NULL,NULL,NULL,NULL),(20160716,'Abimbola','S','Hassan','07065725667',NULL,20161307,NULL,NULL,'aa@bb.com','c20ad4d76fe97759aa27a0c99bff6710',NULL,'','\0',NULL,NULL,NULL,NULL),(20160717,'Abimbola','S','Hassan','07065725667',NULL,20161307,NULL,NULL,'aa@bb.com','c20ad4d76fe97759aa27a0c99bff6710',NULL,'','\0',NULL,NULL,NULL,NULL),(20160718,'Abimbola','S','Hassan','07065725667',NULL,20161307,NULL,NULL,'aa@bb.com','c20ad4d76fe97759aa27a0c99bff6710',NULL,'','\0',NULL,NULL,NULL,NULL),(20160719,'Abimbola','S','Hassan','07065725667',NULL,20161307,NULL,NULL,'aa@bb.com','c20ad4d76fe97759aa27a0c99bff6710',NULL,'','\0',NULL,NULL,NULL,NULL),(20160720,'Abimbola','S','Hassan','07065725667',NULL,20161307,NULL,NULL,'aa@bb.com','c20ad4d76fe97759aa27a0c99bff6710',NULL,'','\0',NULL,NULL,NULL,NULL),(20160721,'Abimbola','S','Hassan','07065725667',NULL,20161307,NULL,NULL,'aa@bb.com','c20ad4d76fe97759aa27a0c99bff6710',NULL,'','\0',NULL,NULL,NULL,NULL),(20160722,'Abimbola','S','Hassan','07065725667',NULL,20161307,NULL,NULL,'aa@bb.com','c20ad4d76fe97759aa27a0c99bff6710',NULL,'','\0',NULL,NULL,NULL,NULL),(20160723,'Abimbola','S','Hassan','07065725667',NULL,20161307,NULL,NULL,'aa@bb.com','c20ad4d76fe97759aa27a0c99bff6710',NULL,'','\0',NULL,NULL,NULL,NULL),(20160724,'Abimbola','S','Hassan','07065725667',NULL,20161307,NULL,NULL,'aa@bb.com','c20ad4d76fe97759aa27a0c99bff6710',NULL,'','\0',NULL,NULL,NULL,NULL),(20160725,'Abimbola','S','Hassan','07065725667',NULL,20161307,NULL,NULL,'aa@bb.com','c20ad4d76fe97759aa27a0c99bff6710',NULL,'','\0',NULL,NULL,NULL,NULL),(20160726,'Abimbola','S','Hassan','07065725667',NULL,20161307,NULL,NULL,'aa@bb.com','c20ad4d76fe97759aa27a0c99bff6710',NULL,'','\0',NULL,NULL,NULL,NULL),(20160727,'Abimbola','S','Hassan','07065725667',NULL,20161307,NULL,NULL,'aa@bb.com','c20ad4d76fe97759aa27a0c99bff6710',NULL,'','\0',NULL,NULL,NULL,NULL),(20160728,'David','Oreoluwabomi','Hans','213513531','64264262',20161312,NULL,NULL,NULL,'775703d23741974d3217f7065ad50208',NULL,'',NULL,NULL,NULL,NULL,NULL),(20160729,'Sansa',NULL,'Stark','91898366171','967798676',20161310,NULL,NULL,NULL,'b9cc45f136991e8e45c9ac8094d2dd23',NULL,'',NULL,NULL,NULL,NULL,NULL),(20160730,'Theon',NULL,'Grayjoy','8811223344','3563535733',20161313,NULL,NULL,NULL,'c8326a9bc2afc3fc55624c3abc8f9719',NULL,'',NULL,NULL,NULL,NULL,NULL),(20160731,'Seun',NULL,'Ajapanta','25262413','2352624672',20161309,NULL,NULL,NULL,'de759f3179cda0e5d94baacb769e706b',NULL,'',NULL,NULL,NULL,NULL,NULL),(20160732,'Lara',NULL,'Jon','6426246','246246724',20161310,NULL,NULL,NULL,'ed72bfc1b08e4111c6623478ef720aaa',NULL,'',NULL,NULL,NULL,NULL,NULL),(20160733,'Dada',NULL,'Don','634563464','64364334',20161309,NULL,NULL,NULL,'b26a9a0e28c78f820b115b6b531bb924',NULL,'',NULL,NULL,NULL,NULL,NULL),(20160734,'wywrw','wrtwrwr','wtwtewtew','252332','2452436246',20161315,NULL,NULL,NULL,'f6ba716ae1dd8aafdc27102b3ec190d0',NULL,'',NULL,NULL,NULL,NULL,NULL),(20160735,'rhrfhh','ehfhsfh','shfshsfh','53635535','36346436354',20161317,NULL,NULL,NULL,'d0924a715543ab1d5162aacee3632a7a',NULL,'',NULL,NULL,NULL,NULL,NULL),(20160736,'euuetu','etuetut','etuetute','53575375','35753735',20161315,NULL,NULL,NULL,'174da19ce31e80c98a0299c2f4f323c5',NULL,'',NULL,NULL,NULL,NULL,NULL),(20160737,'ettetee','eetetyet','eryeryer','3463634643','3634643',20161310,NULL,NULL,NULL,'3e4be06175d8f861b58ee4baf6b3b3da',NULL,'',NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-08-09 11:37:05
