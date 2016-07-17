-- MySQL dump 10.13  Distrib 5.7.12, for Win32 (AMD64)
--
-- Host: 127.0.0.1    Database: geotripe
-- ------------------------------------------------------
-- Server version	5.5.5-10.1.13-MariaDB

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
-- Table structure for table `authview`
--

DROP TABLE IF EXISTS `authview`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `authview` (
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
-- Dumping data for table `authview`
--

LOCK TABLES `authview` WRITE;
/*!40000 ALTER TABLE `authview` DISABLE KEYS */;
INSERT INTO `authview` VALUES (13072016,0,'Dashboard','home','Shows the dashboard on login','fa-tachometer'),(13072017,0,'Quotes','quotes','Monitors Quote Lifecycle','fa-files-o'),(13072018,0,'Setup','home.setup','Admin Setup page','fa-cogs'),(13072019,13072017,'dashSub','dashSub','test',NULL),(13072020,13072019,'dashSub2','dashSub2','dashSub2',NULL),(13072021,13072017,'terdd','sfd','dgdgh',NULL),(13072022,13072019,'shsfhfs','sfhsfhsfsfh','hsfhsfhfs',NULL),(13072023,13072020,'ssfhsfhsd','dsgssf','shsfhsf',NULL);
/*!40000 ALTER TABLE `authview` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bankaccountdetail`
--

DROP TABLE IF EXISTS `bankaccountdetail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bankaccountdetail` (
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
  CONSTRAINT `fk_BankAccountDetail_Country1` FOREIGN KEY (`BankAccountDetail_Country_Id`) REFERENCES `country` (`Country_Id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_BankAccountDetail_Currency1` FOREIGN KEY (`BankAccountDetail_Currency_Id`) REFERENCES `currency` (`Currency_Id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_BankAccountDetail_Party1` FOREIGN KEY (`BankAccountDetail_Party_Id`) REFERENCES `party` (`Party_Id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_BankAccountDetail_State1` FOREIGN KEY (`BankAccountDetail_State_Id`) REFERENCES `state` (`State_Id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bankaccountdetail`
--

LOCK TABLES `bankaccountdetail` WRITE;
/*!40000 ALTER TABLE `bankaccountdetail` DISABLE KEYS */;
/*!40000 ALTER TABLE `bankaccountdetail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `businesstype`
--

DROP TABLE IF EXISTS `businesstype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `businesstype` (
  `BusinessType_Id` bigint(20) NOT NULL,
  `Name` varchar(200) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`BusinessType_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `businesstype`
--

LOCK TABLES `businesstype` WRITE;
/*!40000 ALTER TABLE `businesstype` DISABLE KEYS */;
INSERT INTO `businesstype` VALUES (20310741,'Banking',NULL);
/*!40000 ALTER TABLE `businesstype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `country`
--

DROP TABLE IF EXISTS `country`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `country` (
  `Country_Id` bigint(20) NOT NULL,
  `Name` varchar(255) DEFAULT NULL,
  `CountryCode` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`Country_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `country`
--

LOCK TABLES `country` WRITE;
/*!40000 ALTER TABLE `country` DISABLE KEYS */;
INSERT INTO `country` VALUES (20160713,'Afghanistan','AFG'),(20160714,'Aland Islands','ALA'),(20160715,'Albania','ALB'),(20160716,'Algeria','DZA'),(20160717,'American Samoa','ASM'),(20160718,'Andorra','AND'),(20160719,'Angola','AGO'),(20160720,'Anguilla','AIA'),(20160721,'Antarctica','ATA'),(20160722,'Antigua and Barbuda','ATG'),(20160723,'Argentina','ARG'),(20160724,'Armenia','ARM'),(20160725,'Aruba','ABW'),(20160726,'Australia','AUS'),(20160727,'Austria','AUT'),(20160728,'Azerbaijan','AZE'),(20160729,'Bahamas','BHS'),(20160730,'Bahrain','BHR'),(20160731,'Bangladesh','BGD'),(20160732,'Barbados','BRB'),(20160733,'Belarus','BLR'),(20160734,'Belgium','BEL'),(20160735,'Belize','BLZ'),(20160736,'Benin','BEN'),(20160737,'Bermuda','BMU'),(20160738,'Bhutan','BTN'),(20160739,'Bolivia','BOL'),(20160740,'Bosnia and Herzegovina','BIH'),(20160741,'Botswana','BWA'),(20160742,'Bouvet Island','BVT'),(20160743,'Brazil','BRA'),(20160744,'British Virgin Islands','VGB'),(20160745,'British Indian Ocean Territory','IOT'),(20160746,'Brunei Darussalam','BRN'),(20160747,'Bulgaria','BGR'),(20160748,'Burkina Faso','BFA'),(20160749,'Burundi','BDI'),(20160750,'Cambodia','KHM'),(20160751,'Cameroon','CMR'),(20160752,'Canada','CAN'),(20160753,'Cape Verde','CPV'),(20160754,'Cayman Islands','CYM'),(20160755,'Central African Republic','CAF'),(20160756,'Chad','TCD'),(20160757,'Chile','CHL'),(20160758,'China','CHN'),(20160759,'Hong Kong, Special Administrative Region of China','HKG'),(20160760,'Macao, Special Administrative Region of China','MAC'),(20160761,'Christmas Island','CXR'),(20160762,'Cocos (Keeling) Islands','CCK'),(20160763,'Colombia','COL'),(20160764,'Comoros','COM'),(20160765,'Congo (Brazzaville)','COG'),(20160766,'Congo, Democratic Republic of the','COD'),(20160767,'Cook Islands','COK'),(20160768,'Costa Rica','CRI'),(20160769,'Côte d\'Ivoire','CIV'),(20160770,'Croatia','HRV'),(20160771,'Cuba','CUB'),(20160772,'Cyprus','CYP'),(20160773,'Czech Republic','CZE'),(20160774,'Denmark','DNK'),(20160775,'Djibouti','DJI'),(20160776,'Dominica','DMA'),(20160777,'Dominican Republic','DOM'),(20160778,'Ecuador','ECU'),(20160779,'Egypt','EGY'),(20160780,'El Salvador','SLV'),(20160781,'Equatorial Guinea','GNQ'),(20160782,'Eritrea','ERI'),(20160783,'Estonia','EST'),(20160784,'Ethiopia','ETH'),(20160785,'Falkland Islands (Malvinas)','FLK'),(20160786,'Faroe Islands','FRO'),(20160787,'Fiji','FJI'),(20160788,'Finland','FIN'),(20160789,'France','FRA'),(20160790,'French Guiana','GUF'),(20160791,'French Polynesia','PYF'),(20160792,'French Southern Territories','ATF'),(20160793,'Gabon','GAB'),(20160794,'Gambia','GMB'),(20160795,'Georgia','GEO'),(20160796,'Germany','DEU'),(20160797,'Ghana','GHA'),(20160798,'Gibraltar','GIB'),(20160799,'Greece','GRC'),(20160800,'Greenland','GRL'),(20160801,'Grenada','GRD'),(20160802,'Guadeloupe','GLP'),(20160803,'Guam','GUM'),(20160804,'Guatemala','GTM'),(20160805,'Guernsey','GGY'),(20160806,'Guinea','GIN'),(20160807,'Guinea-Bissau','GNB'),(20160808,'Guyana','GUY'),(20160809,'Haiti','HTI'),(20160810,'Heard Island and Mcdonald Islands','HMD'),(20160811,'Holy See (Vatican City State)','VAT'),(20160812,'Honduras','HND'),(20160813,'Hungary','HUN'),(20160814,'Iceland','ISL'),(20160815,'India','IND'),(20160816,'Indonesia','IDN'),(20160817,'Iran, Islamic Republic of','IRN'),(20160818,'Iraq','IRQ'),(20160819,'Ireland','IRL'),(20160820,'Isle of Man','IMN'),(20160821,'Israel','ISR'),(20160822,'Italy','ITA'),(20160823,'Jamaica','JAM'),(20160824,'Japan','JPN'),(20160825,'Jersey','JEY'),(20160826,'Jordan','JOR'),(20160827,'Kazakhstan','KAZ'),(20160828,'Kenya','KEN'),(20160829,'Kiribati','KIR'),(20160830,'Korea, Democratic People\'s Republic of','PRK'),(20160831,'Korea, Republic of','KOR'),(20160832,'Kuwait','KWT'),(20160833,'Kyrgyzstan','KGZ'),(20160834,'Lao PDR','LAO'),(20160835,'Latvia','LVA'),(20160836,'Lebanon','LBN'),(20160837,'Lesotho','LSO'),(20160838,'Liberia','LBR'),(20160839,'Libya','LBY'),(20160840,'Liechtenstein','LIE'),(20160841,'Lithuania','LTU'),(20160842,'Luxembourg','LUX'),(20160843,'Macedonia, Republic of','MKD'),(20160844,'Madagascar','MDG'),(20160845,'Malawi','MWI'),(20160846,'Malaysia','MYS'),(20160847,'Maldives','MDV'),(20160848,'Mali','MLI'),(20160849,'Malta','MLT'),(20160850,'Marshall Islands','MHL'),(20160851,'Martinique','MTQ'),(20160852,'Mauritania','MRT'),(20160853,'Mauritius','MUS'),(20160854,'Mayotte','MYT'),(20160855,'Mexico','MEX'),(20160856,'Micronesia, Federated States of','FSM'),(20160857,'Moldova','MDA'),(20160858,'Monaco','MCO'),(20160859,'Mongolia','MNG'),(20160860,'Montenegro','MNE'),(20160861,'Montserrat','MSR'),(20160862,'Morocco','MAR'),(20160863,'Mozambique','MOZ'),(20160864,'Myanmar','MMR'),(20160865,'Namibia','NAM'),(20160866,'Nauru','NRU'),(20160867,'Nepal','NPL'),(20160868,'Netherlands','NLD'),(20160869,'Netherlands Antilles','ANT'),(20160870,'New Caledonia','NCL'),(20160871,'New Zealand','NZL'),(20160872,'Nicaragua','NIC'),(20160873,'Niger','NER'),(20160874,'Nigeria','NGA'),(20160875,'Niue','NIU'),(20160876,'Norfolk Island','NFK'),(20160877,'Northern Mariana Islands','MNP'),(20160878,'Norway','NOR'),(20160879,'Oman','OMN'),(20160880,'Pakistan','PAK'),(20160881,'Palau','PLW'),(20160882,'Palestinian Territory, Occupied','PSE'),(20160883,'Panama','PAN'),(20160884,'Papua New Guinea','PNG'),(20160885,'Paraguay','PRY'),(20160886,'Peru','PER'),(20160887,'Philippines','PHL'),(20160888,'Pitcairn','PCN'),(20160889,'Poland','POL'),(20160890,'Portugal','PRT'),(20160891,'Puerto Rico','PRI'),(20160892,'Qatar','QAT'),(20160893,'Réunion','REU'),(20160894,'Romania','ROU'),(20160895,'Russian Federation','RUS'),(20160896,'Rwanda','RWA'),(20160897,'Saint-Barthélemy','BLM'),(20160898,'Saint Helena','SHN'),(20160899,'Saint Kitts and Nevis','KNA'),(20160900,'Saint Lucia','LCA'),(20160901,'Saint-Martin (French part)','MAF'),(20160902,'Saint Pierre and Miquelon','SPM'),(20160903,'Saint Vincent and Grenadines','VCT'),(20160904,'Samoa','WSM'),(20160905,'San Marino','SMR'),(20160906,'Sao Tome and Principe','STP'),(20160907,'Saudi Arabia','SAU'),(20160908,'Senegal','SEN'),(20160909,'Serbia','SRB'),(20160910,'Seychelles','SYC'),(20160911,'Sierra Leone','SLE'),(20160912,'Singapore','SGP'),(20160913,'Slovakia','SVK'),(20160914,'Slovenia','SVN'),(20160915,'Solomon Islands','SLB'),(20160916,'Somalia','SOM'),(20160917,'South Africa','ZAF'),(20160918,'South Georgia and the South Sandwich Islands','SGS'),(20160919,'South Sudan','SSD'),(20160920,'Spain','ESP'),(20160921,'Sri Lanka','LKA'),(20160922,'Sudan','SDN'),(20160923,'Suriname *','SUR'),(20160924,'Svalbard and Jan Mayen Islands','SJM'),(20160925,'Swaziland','SWZ'),(20160926,'Sweden','SWE'),(20160927,'Switzerland','CHE'),(20160928,'Syrian Arab Republic (Syria)','SYR'),(20160929,'Taiwan, Republic of China','TWN'),(20160930,'Tajikistan','TJK'),(20160931,'Tanzania *, United Republic of','TZA'),(20160932,'Thailand','THA'),(20160933,'Timor-Leste','TLS'),(20160934,'Togo','TGO'),(20160935,'Tokelau','TKL'),(20160936,'Tonga','TON'),(20160937,'Trinidad and Tobago','TTO'),(20160938,'Tunisia','TUN'),(20160939,'Turkey','TUR'),(20160940,'Turkmenistan','TKM'),(20160941,'Turks and Caicos Islands','TCA'),(20160942,'Tuvalu','TUV'),(20160943,'Uganda','UGA'),(20160944,'Ukraine','UKR'),(20160945,'United Arab Emirates','ARE'),(20160946,'United Kingdom','GBR'),(20160947,'United States of America','USA'),(20160948,'United States Minor Outlying Islands','UMI'),(20160949,'Uruguay','URY'),(20160950,'Uzbekistan','UZB'),(20160951,'Vanuatu','VUT'),(20160952,'Venezuela (Bolivarian Republic of)','VEN'),(20160953,'Viet Nam','VNM'),(20160954,'Virgin Islands, US','VIR'),(20160955,'Wallis and Futuna Islands','WLF'),(20160956,'Western Sahara','ESH'),(20160957,'Yemen','YEM'),(20160958,'Zambia','ZMB'),(20160959,'Zimbabwe','ZWE');
/*!40000 ALTER TABLE `country` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `currency`
--

DROP TABLE IF EXISTS `currency`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `currency` (
  `Currency_Id` bigint(20) NOT NULL,
  `Name` varchar(200) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Currency_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `currency`
--

LOCK TABLES `currency` WRITE;
/*!40000 ALTER TABLE `currency` DISABLE KEYS */;
/*!40000 ALTER TABLE `currency` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `document`
--

DROP TABLE IF EXISTS `document`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `document` (
  `Document_Id` bigint(20) NOT NULL,
  `Document_Quote_Id` bigint(20) NOT NULL,
  `DocumentName` varchar(45) DEFAULT NULL,
  `DocumentMimeType` varchar(45) DEFAULT NULL,
  `DocumentBlob` blob,
  PRIMARY KEY (`Document_Id`),
  KEY `fk_Document_Quote1_idx` (`Document_Quote_Id`),
  CONSTRAINT `fk_Document_Quote1` FOREIGN KEY (`Document_Quote_Id`) REFERENCES `quote` (`Quote_Id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `document`
--

LOCK TABLES `document` WRITE;
/*!40000 ALTER TABLE `document` DISABLE KEYS */;
/*!40000 ALTER TABLE `document` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `logindetail`
--

DROP TABLE IF EXISTS `logindetail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `logindetail` (
  `LoginDetail_Id` bigint(20) NOT NULL,
  `Username` varchar(200) NOT NULL,
  `RemoteAddress` varchar(45) DEFAULT NULL,
  `LoginDate` datetime NOT NULL,
  `LoginSuccessful` bit(1) NOT NULL,
  `FailureReason` varchar(500) DEFAULT NULL,
  `LoginDetail_User_Id` bigint(20) NOT NULL,
  PRIMARY KEY (`LoginDetail_Id`),
  KEY `fk_LoginDetail_User1_idx` (`LoginDetail_User_Id`),
  CONSTRAINT `fk_LoginDetail_User1` FOREIGN KEY (`LoginDetail_User_Id`) REFERENCES `users` (`User_Id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `logindetail`
--

LOCK TABLES `logindetail` WRITE;
/*!40000 ALTER TABLE `logindetail` DISABLE KEYS */;
/*!40000 ALTER TABLE `logindetail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `party`
--

DROP TABLE IF EXISTS `party`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `party` (
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
  `ContacLastname` varchar(100) DEFAULT NULL,
  `ContacFirstname` varchar(100) DEFAULT NULL,
  `ContacPersonTitle` varchar(100) DEFAULT NULL,
  `ContacMiddlename` varchar(100) DEFAULT NULL,
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
  CONSTRAINT `fk_Party_BusinessType1` FOREIGN KEY (`Party_BusinessType_Id`) REFERENCES `businesstype` (`BusinessType_Id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Party_Country1` FOREIGN KEY (`Party_Country_Id`) REFERENCES `country` (`Country_Id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Party_PartyStatus1` FOREIGN KEY (`PartyStatus_PartyStatus_Id`) REFERENCES `partystatus` (`PartyStatus_Id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Party_PartyType1` FOREIGN KEY (`Party_PartyType_Id`) REFERENCES `partytype` (`PartyType_Id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Party_State1` FOREIGN KEY (`Party_State_Id`) REFERENCES `state` (`State_Id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `party`
--

LOCK TABLES `party` WRITE;
/*!40000 ALTER TABLE `party` DISABLE KEYS */;
INSERT INTO `party` VALUES (20161307,201607130,'Lagos','Samuel Manua Street','Off Keffi',NULL,NULL,'Geoscape Limited',NULL,20160874,NULL,NULL,'',NULL,NULL,NULL,NULL,NULL,20310741,NULL,NULL,NULL,1011);
/*!40000 ALTER TABLE `party` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `partystatus`
--

DROP TABLE IF EXISTS `partystatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `partystatus` (
  `PartyStatus_Id` bigint(20) NOT NULL,
  `Name` varchar(200) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`PartyStatus_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `partystatus`
--

LOCK TABLES `partystatus` WRITE;
/*!40000 ALTER TABLE `partystatus` DISABLE KEYS */;
INSERT INTO `partystatus` VALUES (1011,'Approved',NULL),(1012,'Rejected',NULL);
/*!40000 ALTER TABLE `partystatus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `partytype`
--

DROP TABLE IF EXISTS `partytype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `partytype` (
  `PartyType_Id` int(11) NOT NULL,
  `Name` varchar(200) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`PartyType_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `partytype`
--

LOCK TABLES `partytype` WRITE;
/*!40000 ALTER TABLE `partytype` DISABLE KEYS */;
INSERT INTO `partytype` VALUES (201607130,'Geoscape',NULL),(201607131,'Client',NULL),(201607132,'Supplier',NULL);
/*!40000 ALTER TABLE `partytype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product` (
  `Product_Id` bigint(20) NOT NULL,
  `Name` varchar(200) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Product_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `purchaseorder`
--

DROP TABLE IF EXISTS `purchaseorder`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `purchaseorder` (
  `PurchaseOrder_Id` bigint(20) NOT NULL,
  `PurchaseOrder_PurchaseOrderStatus_Id` bigint(20) NOT NULL,
  `EntryDate` datetime DEFAULT NULL,
  `DateOfExcetuion` datetime DEFAULT NULL,
  `PurchasePrice` decimal(19,2) DEFAULT NULL,
  PRIMARY KEY (`PurchaseOrder_Id`),
  KEY `fk_PurchaseOrder_PurchaseOrderStatus1_idx` (`PurchaseOrder_PurchaseOrderStatus_Id`),
  CONSTRAINT `fk_PurchaseOrder_PurchaseOrderStatus1` FOREIGN KEY (`PurchaseOrder_PurchaseOrderStatus_Id`) REFERENCES `purchaseorderstatus` (`PurchaseOrderStatus_Id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchaseorder`
--

LOCK TABLES `purchaseorder` WRITE;
/*!40000 ALTER TABLE `purchaseorder` DISABLE KEYS */;
/*!40000 ALTER TABLE `purchaseorder` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `purchaseorderstatus`
--

DROP TABLE IF EXISTS `purchaseorderstatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `purchaseorderstatus` (
  `PurchaseOrderStatus_Id` bigint(20) NOT NULL,
  `Name` varchar(200) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`PurchaseOrderStatus_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchaseorderstatus`
--

LOCK TABLES `purchaseorderstatus` WRITE;
/*!40000 ALTER TABLE `purchaseorderstatus` DISABLE KEYS */;
/*!40000 ALTER TABLE `purchaseorderstatus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quote`
--

DROP TABLE IF EXISTS `quote`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `quote` (
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
  CONSTRAINT `fk_Quote_Currency1` FOREIGN KEY (`Quote_Currency_Id`) REFERENCES `currency` (`Currency_Id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Quote_Product1` FOREIGN KEY (`Quote_Product_Id`) REFERENCES `product` (`Product_Id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Quote_PurchaseOrder1` FOREIGN KEY (`Quote_PurchaseOrder_Id`) REFERENCES `purchaseorder` (`PurchaseOrder_Id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Quote_QuoteDirection1` FOREIGN KEY (`Quote_QuoteDirection_Id`) REFERENCES `quotedirection` (`QuoteDirection_Id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Quote_QuoteStatus1` FOREIGN KEY (`Quote_Status_Id`) REFERENCES `quotestatus` (`QuoteStatus_Id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Quote_User1` FOREIGN KEY (`Quote_EnteredBy_Id`) REFERENCES `users` (`User_Id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Quote_User2` FOREIGN KEY (`Quote_ApprovedBy_Id`) REFERENCES `users` (`User_Id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quote`
--

LOCK TABLES `quote` WRITE;
/*!40000 ALTER TABLE `quote` DISABLE KEYS */;
/*!40000 ALTER TABLE `quote` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quotedirection`
--

DROP TABLE IF EXISTS `quotedirection`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `quotedirection` (
  `QuoteDirection_Id` bigint(20) NOT NULL,
  `Name` varchar(200) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`QuoteDirection_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quotedirection`
--

LOCK TABLES `quotedirection` WRITE;
/*!40000 ALTER TABLE `quotedirection` DISABLE KEYS */;
/*!40000 ALTER TABLE `quotedirection` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quotestatus`
--

DROP TABLE IF EXISTS `quotestatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `quotestatus` (
  `QuoteStatus_Id` bigint(20) NOT NULL,
  `Name` varchar(200) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`QuoteStatus_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quotestatus`
--

LOCK TABLES `quotestatus` WRITE;
/*!40000 ALTER TABLE `quotestatus` DISABLE KEYS */;
/*!40000 ALTER TABLE `quotestatus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `state`
--

DROP TABLE IF EXISTS `state`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `state` (
  `State_Id` bigint(20) NOT NULL,
  `Name` varchar(255) DEFAULT NULL,
  `State_Country_Id` bigint(20) NOT NULL,
  PRIMARY KEY (`State_Id`),
  KEY `fk_State_Country1_idx` (`State_Country_Id`),
  CONSTRAINT `fk_State_Country1` FOREIGN KEY (`State_Country_Id`) REFERENCES `country` (`Country_Id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `state`
--

LOCK TABLES `state` WRITE;
/*!40000 ALTER TABLE `state` DISABLE KEYS */;
/*!40000 ALTER TABLE `state` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_authview`
--

DROP TABLE IF EXISTS `user_authview`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_authview` (
  `AuthView_AuthView_Id` int(11) NOT NULL,
  `User_User_Id` bigint(20) NOT NULL,
  `ius_yn` bit(1) DEFAULT NULL,
  PRIMARY KEY (`AuthView_AuthView_Id`,`User_User_Id`),
  KEY `fk_user_authView_AuthView1_idx` (`AuthView_AuthView_Id`),
  KEY `fk_user_authView_User1_idx` (`User_User_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_authview`
--

LOCK TABLES `user_authview` WRITE;
/*!40000 ALTER TABLE `user_authview` DISABLE KEYS */;
INSERT INTO `user_authview` VALUES (13072016,20160713,''),(13072017,20160713,''),(13072018,20160713,''),(13072019,20160713,''),(13072020,20160713,''),(13072021,20160713,''),(13072022,20160713,''),(13072023,20160713,'');
/*!40000 ALTER TABLE `user_authview` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `User_Id` bigint(20) NOT NULL AUTO_INCREMENT,
  `Firstname` varchar(200) NOT NULL,
  `MiddleName` varchar(200) DEFAULT NULL,
  `LastName` varchar(200) NOT NULL,
  `WorkPhoneNumber` varchar(45) DEFAULT NULL,
  `ContactPhoneNumber` varchar(45) DEFAULT NULL,
  `User_Party_Id` bigint(20) NOT NULL,
  `IsAuthorizedPerson` bit(1) DEFAULT NULL,
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
  CONSTRAINT `fk_User_Party1` FOREIGN KEY (`User_Party_Id`) REFERENCES `party` (`Party_Id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=20160714 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (20160713,'Abimbola','S','Hassan','07065725667',NULL,20161307,NULL,NULL,'infinitizon@yahoo.com','c20ad4d76fe97759aa27a0c99bff6710','b7d3365a91e2180063076dbb870d23d8d384ff7c','','\0',NULL,NULL,NULL,NULL);
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

-- Dump completed on 2016-07-17 23:08:39
