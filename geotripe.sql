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
-- Table structure for table `authroles`
--

DROP TABLE IF EXISTS `authroles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `authroles` (
  `AuthRoles_Id` bigint(20) NOT NULL AUTO_INCREMENT,
  `Name` varchar(200) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`AuthRoles_Id`),
  UNIQUE KEY `Name_UNIQUE` (`Name`)
) ENGINE=InnoDB AUTO_INCREMENT=13072020 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `authroles`
--

LOCK TABLES `authroles` WRITE;
/*!40000 ALTER TABLE `authroles` DISABLE KEYS */;
INSERT INTO `authroles` VALUES (13072016,'RFQ_OFFICER','Allowed to enter in the RFQ request from client'),(13072017,'RFQ_SUPERVISOR','Allowd to override the details entered by the RFQ_OFFICER and also add/modify quotes from supplier'),(13072018,'RFQ_ADMIN','Can make global changes to an RFQ'),(13072019,'SUPPORT_ADMIN','Can make system-wide changes to assist users');
/*!40000 ALTER TABLE `authroles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `authview`
--

DROP TABLE IF EXISTS `authview`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `authview` (
  `AuthView_Id` bigint(20) NOT NULL AUTO_INCREMENT,
  `parent_id` bigint(20) DEFAULT '0',
  `Name` varchar(200) DEFAULT NULL,
  `ViewPath` varchar(200) DEFAULT NULL,
  `parentViewPath` varchar(100) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `css_class` varchar(100) DEFAULT NULL,
  `roles` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`AuthView_Id`)
) ENGINE=InnoDB AUTO_INCREMENT=13072026 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `authview`
--

LOCK TABLES `authview` WRITE;
/*!40000 ALTER TABLE `authview` DISABLE KEYS */;
INSERT INTO `authview` VALUES (13072016,0,'Dashboard','app.home',NULL,'Shows the dashboard on login','fa fa-tachometer','SUPPORT_ADMIN'),(13072017,0,'Procurement','javascript:;','app.procurement','Monitors Procurement Lifecycle','fa fa-cart-plus','RFQ_OFFICER,RFQ_SUPERVISOR,RFQ_ADMIN,SUPPORT_ADMIN'),(13072018,0,'Logistics','javascript:;','app.logistics','Monitors Logistics Lifecycle','fa fa-files-o','SUPPORT_ADMIN'),(13072019,13072018,'Create PO','app.logistics.list',NULL,NULL,NULL,'SUPPORT_ADMIN'),(13072020,13072018,'View PO','app.logistics.view',NULL,NULL,NULL,'SUPPORT_ADMIN'),(13072021,0,'Setup','javascript:;','app.setup','Admin Setup page','fa fa-cogs','SUPPORT_ADMIN'),(13072022,13072021,'Clients','app.setup.clients',NULL,'Under Setup, allows you to setup clients',NULL,'SUPPORT_ADMIN'),(13072023,13072021,'Users','app.setup.users',NULL,'Under Setup, allows you to setup Users',NULL,'SUPPORT_ADMIN'),(13072024,13072017,'Create/Edit RFQ','app.procurement.clients',NULL,NULL,NULL,'SUPPORT_ADMIN'),(13072025,13072017,'View RFQ','app.procurement.view',NULL,NULL,NULL,'SUPPORT_ADMIN');
/*!40000 ALTER TABLE `authview` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bankaccountdetail`
--

DROP TABLE IF EXISTS `bankaccountdetail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bankaccountdetail` (
  `BankAccountDetail_Id` bigint(20) NOT NULL AUTO_INCREMENT,
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
  CONSTRAINT `fk_BankAccountDetail_Currency1` FOREIGN KEY (`BankAccountDetail_Currency_Id`) REFERENCES `currency` (`currency_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
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
  `BusinessType_Id` bigint(20) NOT NULL AUTO_INCREMENT,
  `Name` varchar(200) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`BusinessType_Id`)
) ENGINE=InnoDB AUTO_INCREMENT=20310742 DEFAULT CHARSET=utf8;
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
  `Country_Id` bigint(20) NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) DEFAULT NULL,
  `CountryCode` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`Country_Id`)
) ENGINE=InnoDB AUTO_INCREMENT=20160960 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `country`
--

LOCK TABLES `country` WRITE;
/*!40000 ALTER TABLE `country` DISABLE KEYS */;
INSERT INTO `country` VALUES (20160713,'Afghanistan','AFG'),(20160714,'Aland Islands','ALA'),(20160715,'Albania','ALB'),(20160716,'Algeria','DZA'),(20160717,'American Samoa','ASM'),(20160718,'Andorra','AND'),(20160719,'Angola','AGO'),(20160720,'Anguilla','AIA'),(20160721,'Antarctica','ATA'),(20160722,'Antigua and Barbuda','ATG'),(20160723,'Argentina','ARG'),(20160724,'Armenia','ARM'),(20160725,'Aruba','ABW'),(20160726,'Australia','AUS'),(20160727,'Austria','AUT'),(20160728,'Azerbaijan','AZE'),(20160729,'Bahamas','BHS'),(20160730,'Bahrain','BHR'),(20160731,'Bangladesh','BGD'),(20160732,'Barbados','BRB'),(20160733,'Belarus','BLR'),(20160734,'Belgium','BEL'),(20160735,'Belize','BLZ'),(20160736,'Benin','BEN'),(20160737,'Bermuda','BMU'),(20160738,'Bhutan','BTN'),(20160739,'Bolivia','BOL'),(20160740,'Bosnia and Herzegovina','BIH'),(20160741,'Botswana','BWA'),(20160742,'Bouvet Island','BVT'),(20160743,'Brazil','BRA'),(20160744,'British Virgin Islands','VGB'),(20160745,'British Indian Ocean Territory','IOT'),(20160746,'Brunei Darussalam','BRN'),(20160747,'Bulgaria','BGR'),(20160748,'Burkina Faso','BFA'),(20160749,'Burundi','BDI'),(20160750,'Cambodia','KHM'),(20160751,'Cameroon','CMR'),(20160752,'Canada','CAN'),(20160753,'Cape Verde','CPV'),(20160754,'Cayman Islands','CYM'),(20160755,'Central African Republic','CAF'),(20160756,'Chad','TCD'),(20160757,'Chile','CHL'),(20160758,'China','CHN'),(20160759,'Hong Kong, Special Administrative Region of China','HKG'),(20160760,'Macao, Special Administrative Region of China','MAC'),(20160761,'Christmas Island','CXR'),(20160762,'Cocos (Keeling) Islands','CCK'),(20160763,'Colombia','COL'),(20160764,'Comoros','COM'),(20160765,'Congo (Brazzaville)','COG'),(20160766,'Congo, Democratic Republic of the','COD'),(20160767,'Cook Islands','COK'),(20160768,'Costa Rica','CRI'),(20160769,'Cote d\'Ivoire','CIV'),(20160770,'Croatia','HRV'),(20160771,'Cuba','CUB'),(20160772,'Cyprus','CYP'),(20160773,'Czech Republic','CZE'),(20160774,'Denmark','DNK'),(20160775,'Djibouti','DJI'),(20160776,'Dominica','DMA'),(20160777,'Dominican Republic','DOM'),(20160778,'Ecuador','ECU'),(20160779,'Egypt','EGY'),(20160780,'El Salvador','SLV'),(20160781,'Equatorial Guinea','GNQ'),(20160782,'Eritrea','ERI'),(20160783,'Estonia','EST'),(20160784,'Ethiopia','ETH'),(20160785,'Falkland Islands (Malvinas)','FLK'),(20160786,'Faroe Islands','FRO'),(20160787,'Fiji','FJI'),(20160788,'Finland','FIN'),(20160789,'France','FRA'),(20160790,'French Guiana','GUF'),(20160791,'French Polynesia','PYF'),(20160792,'French Southern Territories','ATF'),(20160793,'Gabon','GAB'),(20160794,'Gambia','GMB'),(20160795,'Georgia','GEO'),(20160796,'Germany','DEU'),(20160797,'Ghana','GHA'),(20160798,'Gibraltar','GIB'),(20160799,'Greece','GRC'),(20160800,'Greenland','GRL'),(20160801,'Grenada','GRD'),(20160802,'Guadeloupe','GLP'),(20160803,'Guam','GUM'),(20160804,'Guatemala','GTM'),(20160805,'Guernsey','GGY'),(20160806,'Guinea','GIN'),(20160807,'Guinea-Bissau','GNB'),(20160808,'Guyana','GUY'),(20160809,'Haiti','HTI'),(20160810,'Heard Island and Mcdonald Islands','HMD'),(20160811,'Holy See (Vatican City State)','VAT'),(20160812,'Honduras','HND'),(20160813,'Hungary','HUN'),(20160814,'Iceland','ISL'),(20160815,'India','IND'),(20160816,'Indonesia','IDN'),(20160817,'Iran, Islamic Republic of','IRN'),(20160818,'Iraq','IRQ'),(20160819,'Ireland','IRL'),(20160820,'Isle of Man','IMN'),(20160821,'Israel','ISR'),(20160822,'Italy','ITA'),(20160823,'Jamaica','JAM'),(20160824,'Japan','JPN'),(20160825,'Jersey','JEY'),(20160826,'Jordan','JOR'),(20160827,'Kazakhstan','KAZ'),(20160828,'Kenya','KEN'),(20160829,'Kiribati','KIR'),(20160830,'Korea, Democratic People\'s Republic of','PRK'),(20160831,'Korea, Republic of','KOR'),(20160832,'Kuwait','KWT'),(20160833,'Kyrgyzstan','KGZ'),(20160834,'Lao PDR','LAO'),(20160835,'Latvia','LVA'),(20160836,'Lebanon','LBN'),(20160837,'Lesotho','LSO'),(20160838,'Liberia','LBR'),(20160839,'Libya','LBY'),(20160840,'Liechtenstein','LIE'),(20160841,'Lithuania','LTU'),(20160842,'Luxembourg','LUX'),(20160843,'Macedonia, Republic of','MKD'),(20160844,'Madagascar','MDG'),(20160845,'Malawi','MWI'),(20160846,'Malaysia','MYS'),(20160847,'Maldives','MDV'),(20160848,'Mali','MLI'),(20160849,'Malta','MLT'),(20160850,'Marshall Islands','MHL'),(20160851,'Martinique','MTQ'),(20160852,'Mauritania','MRT'),(20160853,'Mauritius','MUS'),(20160854,'Mayotte','MYT'),(20160855,'Mexico','MEX'),(20160856,'Micronesia, Federated States of','FSM'),(20160857,'Moldova','MDA'),(20160858,'Monaco','MCO'),(20160859,'Mongolia','MNG'),(20160860,'Montenegro','MNE'),(20160861,'Montserrat','MSR'),(20160862,'Morocco','MAR'),(20160863,'Mozambique','MOZ'),(20160864,'Myanmar','MMR'),(20160865,'Namibia','NAM'),(20160866,'Nauru','NRU'),(20160867,'Nepal','NPL'),(20160868,'Netherlands','NLD'),(20160869,'Netherlands Antilles','ANT'),(20160870,'New Caledonia','NCL'),(20160871,'New Zealand','NZL'),(20160872,'Nicaragua','NIC'),(20160873,'Niger','NER'),(20160874,'Nigeria','NGA'),(20160875,'Niue','NIU'),(20160876,'Norfolk Island','NFK'),(20160877,'Northern Mariana Islands','MNP'),(20160878,'Norway','NOR'),(20160879,'Oman','OMN'),(20160880,'Pakistan','PAK'),(20160881,'Palau','PLW'),(20160882,'Palestinian Territory, Occupied','PSE'),(20160883,'Panama','PAN'),(20160884,'Papua New Guinea','PNG'),(20160885,'Paraguay','PRY'),(20160886,'Peru','PER'),(20160887,'Philippines','PHL'),(20160888,'Pitcairn','PCN'),(20160889,'Poland','POL'),(20160890,'Portugal','PRT'),(20160891,'Puerto Rico','PRI'),(20160892,'Qatar','QAT'),(20160893,'Reunion','REU'),(20160894,'Romania','ROU'),(20160895,'Russian Federation','RUS'),(20160896,'Rwanda','RWA'),(20160897,'Saint-Barthelemy','BLM'),(20160898,'Saint Helena','SHN'),(20160899,'Saint Kitts and Nevis','KNA'),(20160900,'Saint Lucia','LCA'),(20160901,'Saint-Martin (French part)','MAF'),(20160902,'Saint Pierre and Miquelon','SPM'),(20160903,'Saint Vincent and Grenadines','VCT'),(20160904,'Samoa','WSM'),(20160905,'San Marino','SMR'),(20160906,'Sao Tome and Principe','STP'),(20160907,'Saudi Arabia','SAU'),(20160908,'Senegal','SEN'),(20160909,'Serbia','SRB'),(20160910,'Seychelles','SYC'),(20160911,'Sierra Leone','SLE'),(20160912,'Singapore','SGP'),(20160913,'Slovakia','SVK'),(20160914,'Slovenia','SVN'),(20160915,'Solomon Islands','SLB'),(20160916,'Somalia','SOM'),(20160917,'South Africa','ZAF'),(20160918,'South Georgia and the South Sandwich Islands','SGS'),(20160919,'South Sudan','SSD'),(20160920,'Spain','ESP'),(20160921,'Sri Lanka','LKA'),(20160922,'Sudan','SDN'),(20160923,'Suriname','SUR'),(20160924,'Svalbard and Jan Mayen Islands','SJM'),(20160925,'Swaziland','SWZ'),(20160926,'Sweden','SWE'),(20160927,'Switzerland','CHE'),(20160928,'Syrian Arab Republic (Syria)','SYR'),(20160929,'Taiwan, Republic of China','TWN'),(20160930,'Tajikistan','TJK'),(20160931,'Tanzania *, United Republic of','TZA'),(20160932,'Thailand','THA'),(20160933,'Timor-Leste','TLS'),(20160934,'Togo','TGO'),(20160935,'Tokelau','TKL'),(20160936,'Tonga','TON'),(20160937,'Trinidad and Tobago','TTO'),(20160938,'Tunisia','TUN'),(20160939,'Turkey','TUR'),(20160940,'Turkmenistan','TKM'),(20160941,'Turks and Caicos Islands','TCA'),(20160942,'Tuvalu','TUV'),(20160943,'Uganda','UGA'),(20160944,'Ukraine','UKR'),(20160945,'United Arab Emirates','ARE'),(20160946,'United Kingdom','GBR'),(20160947,'United States of America','USA'),(20160948,'United States Minor Outlying Islands','UMI'),(20160949,'Uruguay','URY'),(20160950,'Uzbekistan','UZB'),(20160951,'Vanuatu','VUT'),(20160952,'Venezuela (Bolivarian Republic of)','VEN'),(20160953,'Viet Nam','VNM'),(20160954,'Virgin Islands, US','VIR'),(20160955,'Wallis and Futuna Islands','WLF'),(20160956,'Western Sahara','ESH'),(20160957,'Yemen','YEM'),(20160958,'Zambia','ZMB'),(20160959,'Zimbabwe','ZWE');
/*!40000 ALTER TABLE `country` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `currency`
--

DROP TABLE IF EXISTS `currency`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `currency` (
  `currency_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `code` varchar(200) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `decimalHTML` varchar(10) DEFAULT NULL,
  `hexHTML` varchar(10) DEFAULT NULL,
  `unicode` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`currency_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19923346 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `currency`
--

LOCK TABLES `currency` WRITE;
/*!40000 ALTER TABLE `currency` DISABLE KEYS */;
INSERT INTO `currency` VALUES (19923342,'NGN','Naira','&#8358;','&#x20A6;','U+20A6'),(19923343,'USD','US Dollar','&#36;','&#x0024;','U+0024'),(19923344,'GBP','Pound','&#163;','&#x00A3;','U+00A3'),(19923345,'GHc','Cedi','&#8373;','&#x20B5;','U+20B5');
/*!40000 ALTER TABLE `currency` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `document`
--

DROP TABLE IF EXISTS `document`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `document` (
  `doc_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `doc_quote_id` bigint(20) NOT NULL,
  `docName` varchar(300) DEFAULT NULL,
  `docMimeType` varchar(300) DEFAULT NULL,
  `docPath` varchar(200) DEFAULT NULL,
  `docPathThumb` varchar(255) DEFAULT NULL,
  `docBlob` longblob,
  `docSize` int(11) DEFAULT NULL,
  `docCreateDate` datetime DEFAULT NULL,
  `documentType_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`doc_id`),
  KEY `fk_Document_Quote1_idx` (`doc_quote_id`),
  KEY `fk_Document_DocumentTypes1_idx` (`documentType_id`),
  CONSTRAINT `fk_Document_DocumentTypes1` FOREIGN KEY (`documentType_id`) REFERENCES `documenttypes` (`documentType_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `fk_Document_Quote1` FOREIGN KEY (`doc_quote_id`) REFERENCES `quote` (`quote_Id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `document`
--

LOCK TABLES `document` WRITE;
/*!40000 ALTER TABLE `document` DISABLE KEYS */;
INSERT INTO `document` VALUES (18,20160809,'ActiveTbills.xlsx','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet','http://localhost:8890/uploads/c6431f5b29.xlsx',NULL,NULL,23887,'2016-10-13 14:01:17',113525552);
/*!40000 ALTER TABLE `document` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `documenttypes`
--

DROP TABLE IF EXISTS `documenttypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `documenttypes` (
  `documentType_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `documentType` varchar(45) DEFAULT NULL,
  `documentTypeDesc` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`documentType_id`)
) ENGINE=InnoDB AUTO_INCREMENT=113525554 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `documenttypes`
--

LOCK TABLES `documenttypes` WRITE;
/*!40000 ALTER TABLE `documenttypes` DISABLE KEYS */;
INSERT INTO `documenttypes` VALUES (113525552,'Source files','Original Files received from cliet'),(113525553,'Costing Sheet','Costing sheet used to develop quote');
/*!40000 ALTER TABLE `documenttypes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `logindetail`
--

DROP TABLE IF EXISTS `logindetail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `logindetail` (
  `LoginDetail_Id` bigint(20) NOT NULL AUTO_INCREMENT,
  `Username` varchar(200) NOT NULL,
  `RemoteAddress` varchar(45) DEFAULT NULL,
  `LoginDate` datetime NOT NULL,
  `LoginSuccessful` bit(1) NOT NULL,
  `FailureReason` varchar(500) DEFAULT NULL,
  `LoginDetail_User_Id` bigint(20) NOT NULL,
  PRIMARY KEY (`LoginDetail_Id`),
  KEY `fk_LoginDetail_User1_idx` (`LoginDetail_User_Id`),
  CONSTRAINT `fk_LoginDetail_User1` FOREIGN KEY (`LoginDetail_User_Id`) REFERENCES `users` (`User_Id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=167 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `logindetail`
--

LOCK TABLES `logindetail` WRITE;
/*!40000 ALTER TABLE `logindetail` DISABLE KEYS */;
INSERT INTO `logindetail` VALUES (1,'infinitizon@yahoo.com','http://localhost:8890/','2016-10-10 14:37:50','',NULL,20160713),(2,'infinitizon@yahoo.com','http://localhost:8890/','2016-10-11 08:22:37','',NULL,20160713),(3,'infinitizon@yahoo.com','http://localhost:8890/','2016-10-11 08:58:07','',NULL,20160713),(4,'infinitizon@yahoo.com','http://localhost:8890/','2016-10-11 12:48:26','',NULL,20160713),(5,'infinitizon@yahoo.com','http://localhost:8890/','2016-10-11 12:56:24','',NULL,20160713),(6,'infinitizon@yahoo.com','http://localhost:8890/','2016-10-12 14:51:28','',NULL,20160713),(7,'infinitizon@yahoo.com','http://localhost:8890/','2016-10-12 15:42:04','',NULL,20160713),(8,'infinitizon@yahoo.com','http://localhost:8890/','2016-10-12 15:45:47','',NULL,20160713),(9,'infinitizon@yahoo.com','http://localhost:8890/','2016-10-12 16:27:12','',NULL,20160713),(10,'infinitizon@yahoo.com','http://localhost:8890/','2016-10-12 17:05:24','',NULL,20160713),(11,'infinitizon@yahoo.com','http://localhost:8890/','2016-10-13 08:57:45','',NULL,20160713),(12,'infinitizon@yahoo.com','http://localhost:8890/','2016-10-14 13:14:02','',NULL,20160713),(13,'infinitizon@yahoo.com','http://127.0.0.1:8890/','2016-10-17 18:33:07','',NULL,20160713),(14,'infinitizon@yahoo.com','http://localhost:8890/','2016-10-19 08:52:14','',NULL,20160713),(15,'infinitizon@yahoo.com','http://localhost:8890/','2016-10-19 08:53:17','',NULL,20160713),(16,'infinitizon@yahoo.com','http://localhost:8890/','2016-10-19 08:58:51','',NULL,20160713),(17,'infinitizon@yahoo.com','http://localhost:8890/','2016-10-19 09:29:53','',NULL,20160713),(18,'infinitizon@yahoo.com','http://localhost:8890/','2016-10-19 09:36:23','',NULL,20160713),(19,'infinitizon@yahoo.com','http://localhost:8890/','2016-10-19 13:33:43','',NULL,20160713),(20,'infinitizon@yahoo.com','http://localhost:8890/','2016-10-20 11:30:36','',NULL,20160713),(21,'infinitizon@yahoo.com','http://127.0.0.1:8890/','2016-10-24 10:48:27','',NULL,20160713),(22,'infinitizon@yahoo.com','http://127.0.0.1:8890/?','2016-10-24 10:55:41','',NULL,20160713),(23,'infinitizon@yahoo.com','http://127.0.0.1:8890/','2016-10-24 10:58:17','',NULL,20160713),(24,'infinitizon@yahoo.com','http://127.0.0.1:8890/','2016-10-24 11:12:56','',NULL,20160713),(25,'infinitizon@yahoo.com','http://127.0.0.1:8890/','2016-10-24 11:14:43','',NULL,20160713),(26,'infinitizon@yahoo.com','http://127.0.0.1:8890/','2016-10-24 11:15:28','',NULL,20160713),(27,'infinitizon@yahoo.com','http://127.0.0.1:8890/','2016-10-24 11:15:49','',NULL,20160713),(28,'infinitizon@yahoo.com','http://127.0.0.1:8890/','2016-10-24 11:16:01','',NULL,20160713),(29,'infinitizon@yahoo.com','http://127.0.0.1:8890/','2016-10-24 11:17:28','',NULL,20160713),(30,'infinitizon@yahoo.com','http://127.0.0.1:8890/','2016-10-24 11:19:45','',NULL,20160713),(31,'infinitizon@yahoo.com','http://127.0.0.1:8890/','2016-10-24 11:21:24','',NULL,20160713),(32,'infinitizon@yahoo.com','http://127.0.0.1:8890/','2016-10-24 11:27:33','',NULL,20160713),(33,'infinitizon@yahoo.com','http://127.0.0.1:8890/','2016-10-24 11:27:46','',NULL,20160713),(34,'infinitizon@yahoo.com','http://127.0.0.1:8890/','2016-10-24 11:28:30','',NULL,20160713),(35,'infinitizon@yahoo.com','http://127.0.0.1:8890/','2016-10-24 11:29:08','',NULL,20160713),(36,'infinitizon@yahoo.com','http://127.0.0.1:8890/','2016-10-24 11:31:15','',NULL,20160713),(37,'infinitizon@yahoo.com','http://127.0.0.1:8890/','2016-10-24 11:31:40','',NULL,20160713),(38,'infinitizon@yahoo.com','http://127.0.0.1:8890/','2016-10-24 11:35:08','',NULL,20160713),(39,'infinitizon@yahoo.com','http://127.0.0.1:8890/','2016-10-24 11:35:53','',NULL,20160713),(40,'infinitizon@yahoo.com','http://127.0.0.1:8890/','2016-10-24 11:37:03','',NULL,20160713),(41,'infinitizon@yahoo.com','http://127.0.0.1:8890/','2016-10-24 11:37:50','',NULL,20160713),(42,'infinitizon@yahoo.com','http://127.0.0.1:8890/','2016-10-24 11:38:55','',NULL,20160713),(43,'infinitizon@yahoo.com','http://127.0.0.1:8890/','2016-10-24 11:40:07','',NULL,20160713),(44,'infinitizon@yahoo.com','http://127.0.0.1:8890/','2016-10-24 11:40:45','',NULL,20160713),(45,'infinitizon@yahoo.com','http://127.0.0.1:8890/','2016-10-24 11:43:34','',NULL,20160713),(46,'infinitizon@yahoo.com','http://127.0.0.1:8890/','2016-10-24 11:44:17','',NULL,20160713),(47,'infinitizon@yahoo.com','http://127.0.0.1:8890/','2016-10-24 11:44:46','',NULL,20160713),(48,'infinitizon@yahoo.com','http://127.0.0.1:8890/','2016-10-24 12:03:32','',NULL,20160713),(49,'infinitizon@yahoo.com','http://127.0.0.1:8890/','2016-10-24 13:04:20','',NULL,20160713),(50,'infinitizon@yahoo.com','http://127.0.0.1:8890/','2016-10-24 13:45:20','',NULL,20160713),(51,'infinitizon@yahoo.com','http://127.0.0.1:8890/','2016-10-24 13:50:06','',NULL,20160713),(52,'infinitizon@yahoo.com','http://127.0.0.1:8890/','2016-10-24 14:02:54','',NULL,20160713),(53,'infinitizon@yahoo.com','http://127.0.0.1:8890/','2016-10-24 14:20:48','',NULL,20160713),(54,'infinitizon@yahoo.com','http://127.0.0.1:8890/','2016-10-24 14:22:48','',NULL,20160713),(55,'infinitizon@yahoo.com','http://127.0.0.1:8890/','2016-10-24 14:58:00','',NULL,20160713),(56,'infinitizon@yahoo.com','http://127.0.0.1:8890/','2016-10-24 15:11:00','',NULL,20160713),(57,'infinitizon@yahoo.com','http://127.0.0.1:8890/','2016-10-24 15:54:45','',NULL,20160713),(58,'infinitizon@yahoo.com','http://127.0.0.1:8890/','2016-10-24 15:55:09','',NULL,20160713),(59,'infinitizon@yahoo.com','http://127.0.0.1:8890/','2016-10-24 16:26:30','',NULL,20160713),(60,'infinitizon@yahoo.com','http://127.0.0.1:8890/','2016-10-24 16:51:11','',NULL,20160713),(61,'infinitizon@yahoo.com','http://127.0.0.1:8890/','2016-10-24 17:14:12','',NULL,20160713),(62,'infinitizon@yahoo.com','http://127.0.0.1:8890/','2016-10-24 17:16:17','',NULL,20160713),(63,'infinitizon@yahoo.com','http://127.0.0.1:8890/','2016-10-24 18:13:05','',NULL,20160713),(64,'infinitizon@yahoo.com','http://127.0.0.1:8890/','2016-10-24 18:14:18','',NULL,20160713),(65,'infinitizon@yahoo.com','http://127.0.0.1:8890/','2016-10-24 18:14:54','',NULL,20160713),(66,'infinitizon@yahoo.com','http://localhost:8890/','2016-10-25 11:10:23','',NULL,20160713),(67,'infinitizon@yahoo.com','http://localhost:8890/','2016-10-25 11:17:40','',NULL,20160713),(68,'infinitizon@yahoo.com','http://localhost:8890/','2016-10-25 11:19:27','',NULL,20160713),(69,'infinitizon@yahoo.com','http://localhost:8890/','2016-10-25 11:34:17','',NULL,20160713),(70,'infinitizon@yahoo.com','http://localhost:8890/','2016-10-25 11:34:25','',NULL,20160713),(71,'infinitizon@yahoo.com','http://localhost:8890/','2016-10-25 11:54:11','',NULL,20160713),(72,'infinitizon@yahoo.com','http://localhost:8890/','2016-10-25 11:57:22','',NULL,20160713),(73,'infinitizon@yahoo.com','http://localhost:8890/','2016-10-25 11:58:08','',NULL,20160713),(74,'infinitizon@yahoo.com','http://localhost:8890/','2016-10-25 12:00:29','',NULL,20160713),(75,'infinitizon@yahoo.com','http://localhost:8890/','2016-10-25 12:01:33','',NULL,20160713),(76,'infinitizon@yahoo.com','http://localhost:8890/','2016-10-25 17:24:29','',NULL,20160713),(77,'infinitizon@yahoo.com','http://localhost:8890/','2016-10-25 17:30:09','',NULL,20160713),(78,'infinitizon@yahoo.com','http://localhost:8890/','2016-10-25 17:31:25','',NULL,20160713),(79,'infinitizon@yahoo.com','http://localhost:8890/','2016-10-25 17:31:46','',NULL,20160713),(80,'infinitizon@yahoo.com','http://localhost:8890/','2016-10-25 18:42:17','',NULL,20160713),(81,'infinitizon@yahoo.com','http://localhost:8890/','2016-10-25 18:48:57','',NULL,20160713),(82,'infinitizon@yahoo.com','http://localhost:8890/','2016-10-26 08:28:06','',NULL,20160713),(83,'infinitizon@yahoo.com','http://localhost:8890/','2016-10-26 08:42:58','',NULL,20160713),(84,'infinitizon@yahoo.com','http://localhost:8890/','2016-10-26 08:43:39','',NULL,20160713),(85,'infinitizon@yahoo.com','http://localhost:8890/','2016-10-26 15:08:47','',NULL,20160713),(86,'infinitizon@yahoo.com','http://localhost:8890/','2016-10-27 10:15:19','',NULL,20160713),(87,'infinitizon@yahoo.com','http://localhost:8890/','2016-10-27 10:29:34','',NULL,20160713),(88,'infinitizon@yahoo.com','http://localhost:8890/','2016-10-27 11:13:21','',NULL,20160713),(89,'infinitizon@yahoo.com','http://localhost:8890/','2016-10-27 11:14:45','',NULL,20160713),(90,'infinitizon@yahoo.com','http://localhost:8890/','2016-10-27 11:47:57','',NULL,20160713),(91,'infinitizon@yahoo.com','http://localhost:8890/','2016-10-27 11:49:41','',NULL,20160713),(92,'infinitizon@yahoo.com','http://127.0.0.1/','2016-10-29 12:50:48','',NULL,20160713),(93,'infinitizon@yahoo.com','http://127.0.0.1/','2016-11-01 22:47:50','',NULL,20160713),(94,'infinitizon@yahoo.com','http://127.0.0.1/','2016-11-01 22:48:19','',NULL,20160713),(95,'infinitizon@yahoo.com','http://127.0.0.1/','2016-11-01 22:48:50','',NULL,20160713),(96,'infinitizon@yahoo.com','http://127.0.0.1/','2016-11-03 08:11:48','',NULL,20160713),(97,'infinitizon@yahoo.com','http://127.0.0.1/','2016-11-03 08:30:45','',NULL,20160713),(98,'infinitizon@yahoo.com','http://127.0.0.1/','2016-11-03 08:36:04','',NULL,20160713),(99,'infinitizon@yahoo.com','http://127.0.0.1/','2016-11-03 08:36:22','',NULL,20160713),(100,'infinitizon@yahoo.com','http://127.0.0.1/','2016-11-03 08:39:17','',NULL,20160713),(101,'infinitizon@yahoo.com','http://127.0.0.1/','2016-11-03 08:39:49','',NULL,20160713),(102,'infinitizon@yahoo.com','http://127.0.0.1/','2016-11-03 08:58:13','',NULL,20160713),(103,'infinitizon@yahoo.com','http://127.0.0.1/','2016-11-03 08:59:09','',NULL,20160713),(104,'infinitizon@yahoo.com','http://127.0.0.1/','2016-11-03 09:01:52','',NULL,20160713),(105,'infinitizon@yahoo.com','http://127.0.0.1/','2016-11-03 09:04:07','',NULL,20160713),(106,'infinitizon@yahoo.com','http://127.0.0.1/','2016-11-03 09:06:19','',NULL,20160713),(107,'infinitizon@yahoo.com','http://127.0.0.1/','2016-11-03 09:07:48','',NULL,20160713),(108,'infinitizon@yahoo.com','http://127.0.0.1/','2016-11-03 09:09:39','',NULL,20160713),(109,'infinitizon@yahoo.com','http://127.0.0.1/','2016-11-03 09:11:15','',NULL,20160713),(110,'infinitizon@yahoo.com','http://127.0.0.1/','2016-11-03 09:12:15','',NULL,20160713),(111,'infinitizon@yahoo.com','http://127.0.0.1/','2016-11-03 09:13:28','',NULL,20160713),(112,'infinitizon@yahoo.com','http://127.0.0.1/','2016-11-03 09:21:25','',NULL,20160713),(113,'infinitizon@yahoo.com','http://127.0.0.1/','2016-11-03 09:37:27','',NULL,20160713),(114,'infinitizon@yahoo.com','http://127.0.0.1/','2016-11-03 10:09:44','',NULL,20160713),(115,'infinitizon@yahoo.com','http://127.0.0.1/','2016-11-03 10:11:29','',NULL,20160713),(116,'infinitizon@yahoo.com','http://127.0.0.1/','2016-11-03 10:16:49','',NULL,20160713),(117,'infinitizon@yahoo.com','http://127.0.0.1/','2016-11-03 10:17:59','',NULL,20160713),(118,'infinitizon@yahoo.com','http://127.0.0.1/','2016-11-03 11:06:06','',NULL,20160713),(119,'infinitizon@yahoo.com','http://127.0.0.1/','2016-11-03 12:29:41','',NULL,20160713),(120,'infinitizon@yahoo.com','http://127.0.0.1/','2016-11-04 10:37:27','',NULL,20160713),(121,'infinitizon@yahoo.com','http://127.0.0.1/','2016-11-04 12:41:45','',NULL,20160713),(122,'infinitizon@yahoo.com','http://127.0.0.1/','2016-11-04 14:11:22','',NULL,20160713),(123,'infinitizon@yahoo.com','http://127.0.0.1/','2016-11-04 14:22:52','',NULL,20160713),(124,'infinitizon@yahoo.com','http://127.0.0.1/','2016-11-04 14:23:53','',NULL,20160713),(125,'infinitizon@yahoo.com','http://127.0.0.1/','2016-11-04 14:26:41','',NULL,20160713),(126,'infinitizon@yahoo.com','http://127.0.0.1/','2016-11-04 14:28:21','',NULL,20160713),(127,'infinitizon@yahoo.com','http://127.0.0.1/','2016-11-04 14:28:46','',NULL,20160713),(128,'infinitizon@yahoo.com','http://127.0.0.1/','2016-11-04 14:29:29','',NULL,20160713),(129,'infinitizon@yahoo.com','http://127.0.0.1/','2016-11-04 14:32:16','',NULL,20160713),(130,'infinitizon@yahoo.com','http://127.0.0.1/','2016-11-04 14:33:17','',NULL,20160713),(131,'infinitizon@yahoo.com','http://127.0.0.1/','2016-11-04 14:35:00','',NULL,20160713),(132,'infinitizon@yahoo.com','http://127.0.0.1/','2016-11-04 14:36:48','',NULL,20160713),(133,'infinitizon@yahoo.com','http://127.0.0.1/','2016-11-04 14:37:53','',NULL,20160713),(134,'infinitizon@yahoo.com','http://127.0.0.1/','2016-11-04 14:38:32','',NULL,20160713),(135,'infinitizon@yahoo.com','http://127.0.0.1/','2016-11-04 14:43:17','',NULL,20160713),(136,'infinitizon@yahoo.com','http://127.0.0.1/','2016-11-04 14:44:26','',NULL,20160713),(137,'infinitizon@yahoo.com','http://127.0.0.1/','2016-11-04 14:50:59','',NULL,20160713),(138,'infinitizon@yahoo.com','http://127.0.0.1/','2016-11-04 14:52:53','',NULL,20160713),(139,'infinitizon@yahoo.com','http://127.0.0.1/','2016-11-04 14:54:24','',NULL,20160713),(140,'infinitizon@yahoo.com','http://127.0.0.1/','2016-11-04 14:56:52','',NULL,20160713),(141,'infinitizon@yahoo.com','http://127.0.0.1/','2016-11-04 14:57:42','',NULL,20160713),(142,'infinitizon@yahoo.com','http://127.0.0.1/','2016-11-04 15:03:56','',NULL,20160713),(143,'infinitizon@yahoo.com','http://127.0.0.1/','2016-11-04 15:32:30','',NULL,20160713),(144,'infinitizon@yahoo.com','http://127.0.0.1/','2016-11-04 15:35:14','',NULL,20160713),(145,'infinitizon@yahoo.com','http://127.0.0.1/','2016-11-04 15:38:14','',NULL,20160713),(146,'infinitizon@yahoo.com','http://127.0.0.1/','2016-11-04 16:16:17','',NULL,20160713),(147,'infinitizon@yahoo.com','http://127.0.0.1/','2016-11-04 16:20:44','',NULL,20160713),(148,'infinitizon@yahoo.com','http://127.0.0.1/','2016-11-05 13:19:44','',NULL,20160713),(149,'infinitizon@yahoo.com','http://127.0.0.1/','2016-11-05 23:01:01','',NULL,20160713),(150,'infinitizon@yahoo.com','http://127.0.0.1/','2016-11-05 23:05:14','',NULL,20160713),(151,'infinitizon@yahoo.com','http://127.0.0.1/','2016-11-08 21:01:25','',NULL,20160713),(152,'infinitizon@yahoo.com','http://127.0.0.1/','2016-11-08 21:05:16','',NULL,20160713),(153,'infinitizon@yahoo.com','http://127.0.0.1/','2016-11-20 21:51:00','',NULL,20160713),(154,'infinitizon@yahoo.com','http://127.0.0.1/','2016-11-29 19:14:50','',NULL,20160713),(155,'infinitizon@yahoo.com','http://127.0.0.1/','2016-11-30 11:17:04','',NULL,20160713),(156,'infinitizon@yahoo.com','http://127.0.0.1/','2016-11-30 11:19:18','',NULL,20160713),(157,'infinitizon@yahoo.com','http://127.0.0.1/','2016-11-30 11:33:15','',NULL,20160713),(158,'infinitizon@yahoo.com','http://127.0.0.1/','2016-11-30 11:34:17','',NULL,20160713),(159,'infinitizon@yahoo.com','http://127.0.0.1/','2016-11-30 11:37:57','',NULL,20160713),(160,'infinitizon@yahoo.com','http://127.0.0.1/','2016-11-30 11:41:35','',NULL,20160713),(161,'infinitizon@yahoo.com','http://127.0.0.1/','2016-11-30 11:44:22','',NULL,20160713),(162,'infinitizon@yahoo.com','http://127.0.0.1/','2016-11-30 13:30:06','',NULL,20160713),(163,'infinitizon@yahoo.com','http://127.0.0.1/','2016-12-03 08:10:25','',NULL,20160713),(164,'infinitizon@yahoo.com','http://127.0.0.1/','2016-12-03 08:15:23','',NULL,20160713),(165,'infinitizon@yahoo.com','http://127.0.0.1/','2016-12-03 09:11:12','',NULL,20160713),(166,'infinitizon@yahoo.com','http://127.0.0.1/','2016-12-03 09:55:33','',NULL,20160713);
/*!40000 ALTER TABLE `logindetail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `logs`
--

DROP TABLE IF EXISTS `logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `logs` (
  `log_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `users_user_id` bigint(20) NOT NULL,
  `log_table` varchar(45) DEFAULT NULL,
  `log_table_key` varchar(45) DEFAULT NULL,
  `log_changes` text,
  `log_date` datetime DEFAULT NULL,
  PRIMARY KEY (`log_id`),
  KEY `fk_logs_Users1_idx` (`users_user_id`),
  CONSTRAINT `fk_logs_Users1` FOREIGN KEY (`users_user_id`) REFERENCES `users` (`User_Id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=36786044 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `logs`
--

LOCK TABLES `logs` WRITE;
/*!40000 ALTER TABLE `logs` DISABLE KEYS */;
INSERT INTO `logs` VALUES (36785984,20160713,'Quote',':tblColKey','inserted new lines for: subject=>A test quote, Party_Party_Id=>20161307, Quote_QuoteDirection_Id=>1922341, Quote_Currency_Id=>19923342, Quote_EnteredBy_Id=>20160713, Quantity=>25432, Quote_Product_Id=>20160908, SpecificationAndRequirement=>Tester&#039;s notes','2016-08-11 14:00:11'),(36785985,20160713,'Quote','20160821','inserted new lines for: subject=>A test quote, Party_Party_Id=>20161307, Quote_QuoteDirection_Id=>1922341, Quote_Currency_Id=>19923342, Quote_EnteredBy_Id=>20160713, Quantity=>25432, Quote_Product_Id=>20160908, SpecificationAndRequirement=>Tester&#039;s notes','2016-08-11 14:01:56'),(36785986,20160713,'Quote','20160822','inserted new lines for: subject=>A test quote, Party_Party_Id=>20161307, Quote_QuoteDirection_Id=>1922341, Quote_Currency_Id=>19923342, Quote_EnteredBy_Id=>20160713, Quantity=>25432, Quote_Product_Id=>20160908, SpecificationAndRequirement=>Tester&#039;s notes','2016-08-11 14:02:34'),(36785987,20160713,'Quote','20160823','inserted new lines for: subject=>etet, Party_Party_Id=>20161307, Quote_QuoteDirection_Id=>1922341, Quote_Currency_Id=>19923342, Quote_EnteredBy_Id=>20160713, Quantity=>623463, Quote_Product_Id=>20160908, SpecificationAndRequirement=>Tester&#039;s new quote','2016-08-11 14:08:31'),(36785988,20160713,'Quote','20160824','inserted new lines for: subject=>etet, Party_Party_Id=>20161307, Quote_QuoteDirection_Id=>1922341, Quote_Currency_Id=>19923342, Quote_EnteredBy_Id=>20160713, Quantity=>623463, Quote_Product_Id=>20160908, SpecificationAndRequirement=>Tester&#039;s new quote','2016-08-11 14:09:24'),(36785989,20160713,'Quote','20160825','inserted new lines for: subject=>etet, Party_Party_Id=>20161307, Quote_QuoteDirection_Id=>1922341, Quote_Currency_Id=>19923342, Quote_EnteredBy_Id=>20160713, Quantity=>623463, Quote_Product_Id=>20160908, SpecificationAndRequirement=>Tester&#039;s new quote','2016-08-11 14:09:25'),(36785990,20160713,'Quote','20160826','inserted new lines for: subject=>etet, Party_Party_Id=>20161307, Quote_QuoteDirection_Id=>1922341, Quote_Currency_Id=>19923342, Quote_EnteredBy_Id=>20160713, Quantity=>623463, Quote_Product_Id=>20160908, SpecificationAndRequirement=>Tester&#039;s new quote','2016-08-11 14:10:32'),(36785991,20160713,'Quote','20160827','inserted new lines for: subject=>gertyer, Party_Party_Id=>20161307, Quote_QuoteDirection_Id=>1922341, Quote_Currency_Id=>19923342, Quote_EnteredBy_Id=>20160713, Quantity=>242, Quote_Product_Id=>20160908','2016-08-11 14:33:13'),(36785992,20160713,'Quote','20160828','inserted new lines for: subject=>ytdytfyuf, Party_Party_Id=>20161307, Quote_QuoteDirection_Id=>1922342, Quote_Currency_Id=>19923343, Quote_EnteredBy_Id=>20160713, Quantity=>356464, Quote_Product_Id=>20160908','2016-08-11 14:34:32'),(36785993,20160713,'Quote','20160829','inserted new lines for: subject=>gertyer, Party_Party_Id=>20161307, Quote_QuoteDirection_Id=>1922341, Quote_Currency_Id=>19923342, Quote_EnteredBy_Id=>20160713, Quantity=>2234, Quote_Product_Id=>20160908','2016-08-11 15:56:26'),(36785994,20160713,'Quote','20160830','inserted new lines for: subject=>etet, Party_Party_Id=>20161307, Quote_QuoteDirection_Id=>1922341, Quote_Currency_Id=>19923342, Quote_EnteredBy_Id=>20160713, Quantity=>24634, Quote_Product_Id=>20160908','2016-08-11 15:59:16'),(36785995,20160713,'Quote','20160831','inserted new lines for: subject=>wrr, Party_Party_Id=>20161307, Quote_QuoteDirection_Id=>1922342, Quote_Currency_Id=>19923342, Quote_EnteredBy_Id=>20160713, Quantity=>422, Quote_Product_Id=>20160908','2016-08-11 16:02:13'),(36785996,20160713,'Quote','20160832','inserted new lines for: subject=>reytetr, Party_Party_Id=>20161307, Quote_QuoteDirection_Id=>1922341, Quote_Currency_Id=>19923342, Quote_EnteredBy_Id=>20160713, Quantity=>1431, Quote_Product_Id=>20160908','2016-08-11 16:04:17'),(36785997,20160713,'Quote','20160833','inserted new lines for: subject=>gertyer, Party_Party_Id=>20161307, Quote_QuoteDirection_Id=>1922341, Quote_Currency_Id=>19923342, Quote_EnteredBy_Id=>20160713, Quantity=>7475, Quote_Product_Id=>20160908','2016-08-11 16:13:26'),(36785998,20160713,'Quote','20160834','inserted new lines for: subject=>gertyer, Party_Party_Id=>20161307, Quote_QuoteDirection_Id=>1922341, Quote_Currency_Id=>19923343, Quote_EnteredBy_Id=>20160713, Quantity=>2452, Quote_Product_Id=>20160908','2016-08-11 16:15:58'),(36785999,20160713,'Quote','20160835','inserted new lines for: subject=>etet, Party_Party_Id=>20161307, Quote_QuoteDirection_Id=>1922341, Quote_Currency_Id=>19923342, Quote_EnteredBy_Id=>20160713, Quantity=>24423, Quote_Product_Id=>20160908','2016-08-11 16:19:21'),(36786000,20160713,'Quote','20160836','inserted new lines for: subject=>reytetr, Party_Party_Id=>20161307, Quote_QuoteDirection_Id=>1922341, Quote_Currency_Id=>19923342, Quote_EnteredBy_Id=>20160713, Quantity=>343, Quote_Product_Id=>20160908','2016-08-11 16:21:13'),(36786001,20160713,'Quote','20160837','inserted new lines for: Party_Party_Id=>20161307, Quote_QuoteDirection_Id=>1922341, Quote_Currency_Id=>19923342, Quote_EnteredBy_Id=>20160713, Quantity=>354, Quote_Product_Id=>20160908','2016-08-11 16:22:41'),(36786002,20160713,'Quote','20160838','inserted new lines for: Party_Party_Id=>20161307, Quote_QuoteDirection_Id=>1922341, Quote_Currency_Id=>19923342, Quote_EnteredBy_Id=>20160713, Quantity=>354, Quote_Product_Id=>20160908','2016-08-11 16:23:53'),(36786003,20160713,'Quote','20160839','inserted new lines for: Party_Party_Id=>20161307, Quote_QuoteDirection_Id=>1922341, Quote_Currency_Id=>19923342, Quote_EnteredBy_Id=>20160713, Quantity=>354, Quote_Product_Id=>20160908','2016-08-11 16:24:16'),(36786004,20160713,'Quote','20160840','inserted new lines for: Party_Party_Id=>20161307, Quote_QuoteDirection_Id=>1922341, Quote_Currency_Id=>19923342, Quote_EnteredBy_Id=>20160713, Quantity=>354, Quote_Product_Id=>20160908','2016-08-11 16:24:42'),(36786005,20160713,'Quote','20160841','inserted new lines for: Party_Party_Id=>20161307, Quote_QuoteDirection_Id=>1922341, Quote_Currency_Id=>19923342, Quote_EnteredBy_Id=>20160713, Quantity=>354, Quote_Product_Id=>20160908','2016-08-11 16:25:03'),(36786006,20160713,'Quote','20160842','inserted new lines for: Party_Party_Id=>20161307, Quote_QuoteDirection_Id=>1922341, Quote_Currency_Id=>19923342, Quote_EnteredBy_Id=>20160713, Quantity=>354, Quote_Product_Id=>20160908','2016-08-11 16:25:31'),(36786007,20160713,'Quote','20160843','inserted new lines for: Party_Party_Id=>20161307, Quote_QuoteDirection_Id=>1922341, Quote_Currency_Id=>19923342, Quote_EnteredBy_Id=>20160713, Quantity=>354, Quote_Product_Id=>20160908','2016-08-11 16:25:57'),(36786008,20160713,'Quote','20160844','inserted new lines for: Party_Party_Id=>20161307, Quote_QuoteDirection_Id=>1922341, Quote_Currency_Id=>19923342, Quote_EnteredBy_Id=>20160713, Quantity=>354, Quote_Product_Id=>20160908','2016-08-11 16:26:41'),(36786009,20160713,'Quote','20160845','inserted new lines for: Party_Party_Id=>20161307, Quote_QuoteDirection_Id=>1922341, Quote_Currency_Id=>19923342, Quote_EnteredBy_Id=>20160713, Quantity=>354, Quote_Product_Id=>20160908','2016-08-11 16:27:29'),(36786010,20160713,'Quote','20160846','inserted new lines for: Party_Party_Id=>20161307, Quote_QuoteDirection_Id=>1922341, Quote_Currency_Id=>19923342, Quote_EnteredBy_Id=>20160713, Quantity=>354, Quote_Product_Id=>20160908','2016-08-11 16:29:07'),(36786011,20160713,'Quote','20160847','inserted new lines for: subject=>etet, Party_Party_Id=>20161307, Quote_QuoteDirection_Id=>1922341, Quote_Currency_Id=>19923342, Quote_EnteredBy_Id=>20160713, Quantity=>3443, Quote_Product_Id=>20160908','2016-08-11 16:30:21'),(36786012,20160713,'Quote','20160848','inserted new lines for: subject=>etet, Party_Party_Id=>20161307, Quote_QuoteDirection_Id=>1922341, Quote_Currency_Id=>19923342, Quote_EnteredBy_Id=>20160713, Quantity=>3443, Quote_Product_Id=>20160908','2016-08-11 16:33:58'),(36786013,20160713,'Quote','20160849','inserted new lines for: subject=>gertyer, Party_Party_Id=>20161307, Quote_QuoteDirection_Id=>1922341, Quote_Currency_Id=>19923342, Quote_EnteredBy_Id=>20160713, Quote_Product_Id=>20160908','2016-08-11 16:36:07'),(36786014,20160713,'Quote','20160850','inserted new lines for: subject=>gertyer, Party_Party_Id=>20161307, Quote_QuoteDirection_Id=>1922342, Quote_Currency_Id=>19923342, Quote_EnteredBy_Id=>20160713, Quantity=>87576, Quote_Product_Id=>20160908','2016-08-11 16:40:16'),(36786015,20160713,'Quote','20160851','inserted new lines for: subject=>gertyer, Party_Party_Id=>20161307, Quote_QuoteDirection_Id=>1922342, Quote_Currency_Id=>19923342, Quote_EnteredBy_Id=>20160713, Quantity=>87576, Quote_Product_Id=>20160908','2016-08-11 16:41:16'),(36786016,20160713,'Quote','20160852','inserted new lines for: subject=>gertyer, Party_Party_Id=>20161307, Quote_QuoteDirection_Id=>1922341, Quote_Currency_Id=>19923342, Quote_EnteredBy_Id=>20160713, Quantity=>232, Quote_Product_Id=>20160908','2016-08-11 16:42:56'),(36786017,20160713,'Quote','20160853','inserted new lines for: subject=>gertyer, Party_Party_Id=>20161307, Quote_QuoteDirection_Id=>1922341, Quote_Currency_Id=>19923342, Quote_EnteredBy_Id=>20160713, Quantity=>232, Quote_Product_Id=>20160908','2016-08-11 16:43:24'),(36786018,20160713,'Quote','20160854','inserted new lines for: subject=>gertyer, Party_Party_Id=>20161307, Quote_QuoteDirection_Id=>1922341, Quote_Currency_Id=>19923342, Quote_EnteredBy_Id=>20160713, Quantity=>232, Quote_Product_Id=>20160908','2016-08-11 16:43:43'),(36786019,20160713,'Quote','20160855','inserted new lines for: subject=>gertyer, Party_Party_Id=>20161307, Quote_QuoteDirection_Id=>1922341, Quote_Currency_Id=>19923342, Quote_EnteredBy_Id=>20160713, Quantity=>232, Quote_Product_Id=>20160908','2016-08-11 16:48:37'),(36786020,20160713,'Quote','20160856','inserted new lines for: subject=>gertyer, Party_Party_Id=>20161307, Quote_QuoteDirection_Id=>1922341, Quote_Currency_Id=>19923342, Quote_EnteredBy_Id=>20160713, Quantity=>232, Quote_Product_Id=>20160908','2016-08-11 16:49:45'),(36786021,20160713,'Quote','20160857','inserted new lines for: subject=>gertyer, Party_Party_Id=>20161307, Quote_QuoteDirection_Id=>1922341, Quote_Currency_Id=>19923342, Quote_EnteredBy_Id=>20160713, Quantity=>232, Quote_Product_Id=>20160908','2016-08-11 16:51:35'),(36786022,20160713,'Party','20161308','inserted new lines for: Party_PartyType_Id=>201607132, Name=>Test, IsActive=>1, PartyStatus_PartyStatus_Id=>1011','2016-08-26 12:34:02'),(36786023,20160713,'Party','20161309','inserted new lines for: Party_PartyType_Id=>201607132, Name=>Ibile, IsActive=>1, PartyStatus_PartyStatus_Id=>1011','2016-08-26 13:48:24'),(36786024,20160713,'Party','20161310','inserted new lines for: Party_PartyType_Id=>201607132, Name=>Ibile, IsActive=>1, PartyStatus_PartyStatus_Id=>1011','2016-08-26 13:49:21'),(36786025,20160713,'Party','20161311','inserted new lines for: Party_PartyType_Id=>201607132, Name=>tesrtr, IsActive=>1, PartyStatus_PartyStatus_Id=>1011','2016-08-26 13:50:30'),(36786026,20160713,'Party','20161312','inserted new lines for: Party_PartyType_Id=>201607132, Name=>eryrre, IsActive=>1, PartyStatus_PartyStatus_Id=>1011','2016-08-26 13:52:10'),(36786027,20160713,'Party','20161313','inserted new lines for: Party_PartyType_Id=>201607132, Name=>twrrwr, IsActive=>1, PartyStatus_PartyStatus_Id=>1011','2016-08-26 13:52:18'),(36786028,20160713,'Party','20161314','inserted new lines for: Party_PartyType_Id=>201607132, Name=>det, IsActive=>1, PartyStatus_PartyStatus_Id=>1011','2016-08-26 13:53:58'),(36786029,20160713,'Party','20161315','inserted new lines for: Party_PartyType_Id=>201607132, Name=>gdhfgcguvj, IsActive=>1, PartyStatus_PartyStatus_Id=>1011','2016-08-26 13:54:22'),(36786030,20160713,'Party','20161316','inserted new lines for: Party_PartyType_Id=>201607132, Name=>Bimbo, IsActive=>1, PartyStatus_PartyStatus_Id=>1011','2016-08-26 14:05:41'),(36786031,20160713,'Party','20161317','inserted new lines for: Party_PartyType_Id=>201607131, AddressCity=>david.jaiyeola@gmail.com, AddressLine1=>Address 1, AddressLine2=>Address 2, Name=>Chevron, Party_Country_Id=>20160874, PartyStatus_PartyStatus_Id=>1011','2016-08-29 09:35:52'),(36786032,20160713,'Users','20160714','inserted new lines for: Firstname=>Labake, LastName=>Hassan, WorkPhoneNumber=>143131513, ContactPhoneNumber=>135135153151, User_Party_Id=>20161317, Password=>72a9034327785dab5ad6a914b73c16b8, Enabled=>1','2016-08-29 09:37:02'),(36786033,20160713,'Users','20160715','inserted new lines for: Firstname=>Deribigbe, LastName=>Ajasa, WorkPhoneNumber=>75365653, ContactPhoneNumber=>345673546356, User_Party_Id=>20161317, Password=>960a92425e165e5ec9830f78e28dafc7, Enabled=>1','2016-08-29 10:00:26'),(36786034,20160713,'Party','20161318','inserted new lines for: Party_PartyType_Id=>201607132, Name=>Samsung, IsActive=>1, PartyStatus_PartyStatus_Id=>1011','2016-08-29 10:03:29'),(36786035,20160713,'Party','20161319','inserted new lines for: Party_PartyType_Id=>201607132, Name=>Samsung, IsActive=>1, PartyStatus_PartyStatus_Id=>1011','2016-08-29 10:04:43'),(36786036,20160713,'Party','20161320','inserted new lines for: Party_PartyType_Id=>201607132, Name=>Samsung, IsActive=>1, PartyStatus_PartyStatus_Id=>1011','2016-08-29 10:05:44'),(36786037,20160713,'Quote','20160858','inserted new lines for: subject=>A test quote, rfq_no=>RFQ5356, Party_Party_Id=>20161317, Quote_Status_Id=>12141325, Quote_Currency_Id=>19923342, PublishDate=>2016-08-09T23:00:00.000Z, DueDate=>2016-08-12T23:00:00.000Z, Users_User_Id=>20160715, Quote_EnteredBy_Id=>20160713','2016-08-29 10:28:52'),(36786038,20160713,'Party','20161321','inserted new lines for: Party_PartyType_Id=>201607132, Name=>Mitsubishi, IsActive=>1, PartyStatus_PartyStatus_Id=>1011','2016-08-29 12:12:58'),(36786039,20160713,'Party','20161322','inserted new lines for: Party_PartyType_Id=>201607132, IsActive=>1, PartyStatus_PartyStatus_Id=>1011','2016-09-01 16:26:05'),(36786040,20160713,'Party','20161323','inserted new lines for: Party_PartyType_Id=>201607131, AddressCity=>info@total.com, AddressLine1=>Total HQ, Name=>Total Petroleum, Party_Country_Id=>20160874, PartyStatus_PartyStatus_Id=>1011','2016-09-07 09:57:01'),(36786041,20160713,'Party','20161324','inserted new lines for: Party_PartyType_Id=>201607131, AddressCity=>Victoria Island, AddressLine1=>Adeola Odeku, Name=>Sapetro, EmailAddress=>info@sapetro.com, Party_Country_Id=>20160874, PartyStatus_PartyStatus_Id=>1011','2016-09-07 10:27:59'),(36786042,20160713,'Party','20161325','inserted new lines for: Party_PartyType_Id=>201607131, AddressCity=>Lagos, AddressLine1=>Lekki-Ajah Express way, AddressLine2=>Lekki, Name=>Mobil, EmailAddress=>info@mobil.com, Party_Country_Id=>20160874, PartyStatus_PartyStatus_Id=>1011','2016-09-07 10:29:14'),(36786043,20160713,'Party','20161326','inserted new lines for: Party_PartyType_Id=>201607132, Name=>Adele, IsActive=>1, PartyStatus_PartyStatus_Id=>1011','2016-10-25 18:55:33');
/*!40000 ALTER TABLE `logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mail`
--

DROP TABLE IF EXISTS `mail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mail` (
  `mail_id` int(11) NOT NULL AUTO_INCREMENT,
  `mail_to` varchar(45) DEFAULT NULL,
  `mail_from` varchar(45) DEFAULT NULL,
  `mail_subj` varchar(45) DEFAULT NULL,
  `mail_body` text,
  `status` tinyint(1) DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `timestamp` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`mail_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mail`
--

LOCK TABLES `mail` WRITE;
/*!40000 ALTER TABLE `mail` DISABLE KEYS */;
INSERT INTO `mail` VALUES (1,'infinitizon@yahoo.com','no-reply@geotripe.com','Quote RFQ5356 expiration notice',NULL,0,'2016-11-29 20:29:08',NULL,1480447748),(2,'labaks@gmail.com','no-reply@geotripe.com','Quote RFQ5356 expiration notice',NULL,0,'2016-11-29 20:29:08',NULL,1480447748),(3,'dajasa@mail.com','no-reply@geotripe.com','Quote RFQ5356 expiration notice',NULL,0,'2016-11-29 20:29:08',NULL,1480447748),(4,'infinitizon@yahoo.com','no-reply@geotripe.com','Quote RFQ5126 expiration notice',NULL,0,'2016-11-29 20:29:08',NULL,1480447748),(5,'labaks@gmail.com','no-reply@geotripe.com','Quote RFQ5126 expiration notice',NULL,0,'2016-11-29 20:29:08',NULL,1480447748),(6,'dajasa@mail.com','no-reply@geotripe.com','Quote RFQ5126 expiration notice',NULL,0,'2016-11-29 20:29:08',NULL,1480447748);
/*!40000 ALTER TABLE `mail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `party`
--

DROP TABLE IF EXISTS `party`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `party` (
  `Party_Id` bigint(20) NOT NULL AUTO_INCREMENT,
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
  `Party_BusinessType_Id` bigint(20) DEFAULT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=20161327 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `party`
--

LOCK TABLES `party` WRITE;
/*!40000 ALTER TABLE `party` DISABLE KEYS */;
INSERT INTO `party` VALUES (20161307,201607130,'Lagos','Samuel Manua Street','Off Keffi',NULL,NULL,'Geoscape Limited','aa@bb.com',20160874,NULL,NULL,'',NULL,NULL,NULL,NULL,NULL,20310741,NULL,NULL,NULL,1011),(20161317,201607131,'Lagos','Address 1','Address 2',NULL,NULL,'Chevron','david.jaiyeola@gmail.com',20160874,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1011),(20161320,201607132,NULL,NULL,NULL,NULL,NULL,'Samsung',NULL,NULL,NULL,NULL,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1011),(20161321,201607132,NULL,NULL,NULL,NULL,NULL,'Mitsubishi',NULL,NULL,NULL,NULL,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1011),(20161323,201607131,'Lagos','Total HQ',NULL,NULL,NULL,'Total Petroleum','info@total.com',20160874,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1011),(20161324,201607131,'Victoria Island','Adeola Odeku',NULL,NULL,NULL,'Sapetro','info@sapetro.com',20160874,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1011),(20161325,201607131,'Lagos','Lekki-Ajah Express way','Lekki',NULL,NULL,'Mobil','info@mobil.com',20160874,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1011),(20161326,201607132,NULL,NULL,NULL,NULL,NULL,'Adele',NULL,NULL,NULL,NULL,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1011);
/*!40000 ALTER TABLE `party` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `partystatus`
--

DROP TABLE IF EXISTS `partystatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `partystatus` (
  `PartyStatus_Id` bigint(20) NOT NULL AUTO_INCREMENT,
  `Name` varchar(200) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`PartyStatus_Id`)
) ENGINE=InnoDB AUTO_INCREMENT=1013 DEFAULT CHARSET=utf8;
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
INSERT INTO `partytype` VALUES (201607130,'Internal Organisation',NULL),(201607131,'Client',NULL),(201607132,'Manufacturers',NULL),(201607133,'Suppliers',NULL);
/*!40000 ALTER TABLE `partytype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quote`
--

DROP TABLE IF EXISTS `quote`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `quote` (
  `quote_Id` bigint(20) NOT NULL AUTO_INCREMENT,
  `subject` varchar(200) DEFAULT NULL COMMENT 'You can give any subject you want',
  `rfq_no` varchar(45) DEFAULT NULL COMMENT 'Request Number',
  `Party_Party_Id` bigint(20) NOT NULL,
  `Quote_Status_Id` bigint(20) NOT NULL,
  `Quote_Currency_Id` bigint(20) NOT NULL,
  `PublishDate` datetime DEFAULT NULL,
  `DueDate` datetime DEFAULT NULL,
  `EntryDate` datetime DEFAULT NULL,
  `EventOwner` varchar(200) DEFAULT NULL,
  `Users_User_Id` bigint(20) DEFAULT NULL,
  `ApproveDate` datetime DEFAULT NULL,
  `Quote_EnteredBy_Id` bigint(20) NOT NULL,
  `Description` varchar(1000) DEFAULT NULL,
  `Quote_ApprovedBy_Id` bigint(20) DEFAULT NULL,
  `SpecificationAndRequirement` varchar(2000) DEFAULT NULL,
  `po_no` varchar(45) DEFAULT NULL,
  `po_is_split` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`quote_Id`),
  KEY `fk_Quote_QuoteStatus1_idx` (`Quote_Status_Id`),
  KEY `fk_Quote_Currency1_idx` (`Quote_Currency_Id`),
  KEY `fk_Quote_User1_idx` (`Quote_EnteredBy_Id`),
  KEY `fk_Quote_User2_idx` (`Quote_ApprovedBy_Id`),
  KEY `fk_Quote_Party1_idx` (`Party_Party_Id`),
  KEY `fk_Quote_Users1_idx` (`Users_User_Id`),
  CONSTRAINT `fk_Quote_Currency1` FOREIGN KEY (`Quote_Currency_Id`) REFERENCES `currency` (`currency_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Quote_Party1` FOREIGN KEY (`Party_Party_Id`) REFERENCES `party` (`Party_Id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Quote_QuoteStatus1` FOREIGN KEY (`Quote_Status_Id`) REFERENCES `quotestatus` (`QuoteStatus_Id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Quote_User1` FOREIGN KEY (`Quote_EnteredBy_Id`) REFERENCES `users` (`User_Id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Quote_User2` FOREIGN KEY (`Quote_ApprovedBy_Id`) REFERENCES `users` (`User_Id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=20160884 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quote`
--

LOCK TABLES `quote` WRITE;
/*!40000 ALTER TABLE `quote` DISABLE KEYS */;
INSERT INTO `quote` VALUES (20160809,'A test quote','RFQ5370',20161317,12141324,19923342,'2016-09-14 04:00:00',NULL,NULL,'Yinka Akinoso',20160715,NULL,20160713,'Nice stuff',NULL,NULL,'PO251',NULL),(20160857,'gertyer','PSI2234',20161317,12141325,19923342,'2016-09-13 02:00:00','2016-10-07 02:00:00',NULL,NULL,20160714,NULL,20160713,NULL,NULL,NULL,'PO1123',1),(20160858,'A test quote','RFQ5356',20161317,12141325,19923342,'2016-08-10 01:00:00','2016-11-30 02:00:00',NULL,NULL,20160713,NULL,20160713,NULL,NULL,NULL,NULL,NULL),(20160878,'A test quote','RFQ5357',20161317,12141325,19923342,'2016-08-31 01:00:00',NULL,'2016-09-02 17:07:03',NULL,20160715,NULL,20160713,NULL,NULL,NULL,NULL,NULL),(20160879,NULL,'RFQ663442',20161323,12141325,19923342,'2016-09-05 01:00:00',NULL,'2016-09-08 11:56:43','Samson Fagade',20160713,NULL,20160713,NULL,NULL,NULL,'PO1124',0),(20160880,NULL,'RFQ5334',20161317,12141326,19923342,'2016-09-15 01:00:00',NULL,'2016-09-15 17:19:47','Somebodys Name',20160713,NULL,20160713,NULL,NULL,NULL,NULL,NULL),(20160881,NULL,'RFQ5126',20161317,12141325,19923342,'2016-10-06 01:00:00','2016-11-30 01:00:00','2016-10-06 11:14:44','Samson Fagade',20160713,NULL,20160713,NULL,NULL,NULL,NULL,NULL),(20160883,NULL,'RFQ2020',20161317,12141325,19923342,'2016-10-26 01:00:00','2016-11-28 01:00:00','2016-10-26 09:45:55','Bala Zaka',20160713,NULL,20160713,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `quote` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quotedetail`
--

DROP TABLE IF EXISTS `quotedetail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `quotedetail` (
  `QuoteDetail_Id` bigint(20) NOT NULL AUTO_INCREMENT,
  `Quote_quote_Id` bigint(20) NOT NULL,
  `partno_modelno` varchar(200) DEFAULT NULL,
  `serialNumber` varchar(200) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  `oem_description` varchar(500) DEFAULT NULL,
  `unitofmeasure` bigint(20) DEFAULT NULL,
  `unitprice` decimal(19,2) DEFAULT NULL,
  `crossrrate` int(11) DEFAULT NULL,
  `unit_price_usd` decimal(19,2) DEFAULT NULL,
  `mfr_total` varchar(45) DEFAULT NULL,
  `certOfOrigin` varchar(45) DEFAULT NULL,
  `weight` int(11) DEFAULT NULL,
  `g_f` int(11) DEFAULT NULL,
  `packaging` varchar(45) DEFAULT NULL,
  `int_f` int(11) DEFAULT NULL,
  `ins` int(11) DEFAULT NULL,
  `cif` int(11) DEFAULT NULL,
  `custom` int(11) DEFAULT NULL,
  `surch` int(11) DEFAULT NULL,
  `ciss` int(11) DEFAULT NULL,
  `etls` int(11) DEFAULT NULL,
  `vat` int(11) DEFAULT NULL,
  `nafdac_soncap` int(11) DEFAULT NULL,
  `clearing` int(11) DEFAULT NULL,
  `sub_total` int(11) DEFAULT NULL,
  `goods_in_transit` int(11) DEFAULT NULL,
  `lt_onne` int(11) DEFAULT NULL,
  `bch` int(11) DEFAULT NULL,
  `f_r` int(11) DEFAULT NULL,
  `cof` int(11) DEFAULT NULL,
  `total1` int(11) DEFAULT NULL,
  `mk_up` int(11) DEFAULT NULL,
  `nlcf` int(11) DEFAULT NULL,
  `total3` int(11) DEFAULT NULL,
  `u_p` int(11) DEFAULT NULL,
  `quote_is_po` tinyint(1) DEFAULT NULL,
  `split_po_no` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`QuoteDetail_Id`),
  KEY `fk_QuoteDetail_Quote1_idx` (`Quote_quote_Id`),
  KEY `fk_QuoteDetail_unitofmeasure1_idx` (`unitofmeasure`),
  CONSTRAINT `fk_QuoteDetail_Quote1` FOREIGN KEY (`Quote_quote_Id`) REFERENCES `quote` (`quote_Id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=235366795 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quotedetail`
--

LOCK TABLES `quotedetail` WRITE;
/*!40000 ALTER TABLE `quotedetail` DISABLE KEYS */;
INSERT INTO `quotedetail` VALUES (235366775,20160878,NULL,NULL,2,'REtest',NULL,20160923,NULL,6436,3735.00,'3753',NULL,464,3463,'3755',375,35753,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(235366777,20160809,NULL,NULL,NULL,'A Test','OEM',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(235366778,20160809,NULL,NULL,NULL,'Another Test',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(235366779,20160857,NULL,NULL,NULL,'Tester',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(235366782,20160857,NULL,NULL,NULL,'Wanna Test',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'PO1123-A'),(235366783,20160857,NULL,NULL,NULL,'Pre-Test',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'PO1123-B'),(235366784,20160857,'PRE2202',NULL,1,'Newest Test',NULL,20160923,1500.00,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'PO1123-A'),(235366789,20160879,NULL,NULL,NULL,'A Material',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(235366790,20160879,NULL,NULL,NULL,'Another Material',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(235366791,20160880,'WW234',NULL,NULL,'Java',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(235366792,20160881,'PRE2202',NULL,1,'A Material',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(235366794,20160883,'PSR300',NULL,2,'Material Description',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `quotedetail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quotedetail_manufacturer`
--

DROP TABLE IF EXISTS `quotedetail_manufacturer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `quotedetail_manufacturer` (
  `QuoteDetail_QuoteDetail_Id` bigint(20) NOT NULL,
  `Party_Party_Id` bigint(20) NOT NULL,
  PRIMARY KEY (`QuoteDetail_QuoteDetail_Id`,`Party_Party_Id`),
  KEY `fk_QuoteDetail_Manufacturer_QuoteDetail1_idx` (`QuoteDetail_QuoteDetail_Id`),
  KEY `fk_QuoteDetail_Manufacturer_Party1_idx` (`Party_Party_Id`),
  CONSTRAINT `fk_QuoteDetail_Manufacturer_Party1` FOREIGN KEY (`Party_Party_Id`) REFERENCES `party` (`Party_Id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_QuoteDetail_Manufacturer_QuoteDetail1` FOREIGN KEY (`QuoteDetail_QuoteDetail_Id`) REFERENCES `quotedetail` (`QuoteDetail_Id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quotedetail_manufacturer`
--

LOCK TABLES `quotedetail_manufacturer` WRITE;
/*!40000 ALTER TABLE `quotedetail_manufacturer` DISABLE KEYS */;
INSERT INTO `quotedetail_manufacturer` VALUES (235366775,20161320),(235366777,20161320),(235366778,20161320),(235366778,20161321),(235366779,20161320),(235366782,20161321),(235366783,20161320),(235366784,20161321),(235366789,20161320),(235366789,20161321),(235366790,20161320),(235366791,20161320),(235366792,20161320),(235366794,20161320);
/*!40000 ALTER TABLE `quotedetail_manufacturer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quotestatus`
--

DROP TABLE IF EXISTS `quotestatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `quotestatus` (
  `QuoteStatus_Id` bigint(20) NOT NULL AUTO_INCREMENT,
  `Name` varchar(200) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`QuoteStatus_Id`)
) ENGINE=InnoDB AUTO_INCREMENT=12141329 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quotestatus`
--

LOCK TABLES `quotestatus` WRITE;
/*!40000 ALTER TABLE `quotestatus` DISABLE KEYS */;
INSERT INTO `quotestatus` VALUES (12141324,'Submitted','Submitted'),(12141325,'In Progress','In Progress'),(12141326,'TQ','TQ'),(12141327,'Sourcing for suppliers','Sourcing for suppliers'),(12141328,'Costing at suppliers','Costing at suppliers');
/*!40000 ALTER TABLE `quotestatus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `state`
--

DROP TABLE IF EXISTS `state`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `state` (
  `State_Id` bigint(20) NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) DEFAULT NULL,
  `State_Country_Id` bigint(20) NOT NULL,
  PRIMARY KEY (`State_Id`),
  KEY `fk_State_Country1_idx` (`State_Country_Id`),
  CONSTRAINT `fk_State_Country1` FOREIGN KEY (`State_Country_Id`) REFERENCES `country` (`Country_Id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=20160755 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `state`
--

LOCK TABLES `state` WRITE;
/*!40000 ALTER TABLE `state` DISABLE KEYS */;
INSERT INTO `state` VALUES (20160719,'ABIA',20160874),(20160720,'ADAMAWA',20160874),(20160721,'AKWAIBOM',20160874),(20160722,'ANAMBRA',20160874),(20160723,'BAUCHI',20160874),(20160724,'BAYELSA',20160874),(20160725,'BENUE',20160874),(20160726,'BORNO',20160874),(20160727,'CROSSRIVER',20160874),(20160728,'DELTA',20160874),(20160729,'EBONYI',20160874),(20160730,'EDO',20160874),(20160731,'EKITI',20160874),(20160732,'ENUGU',20160874),(20160733,'GOMBE',20160874),(20160734,'IMO',20160874),(20160735,'JIGAWA',20160874),(20160736,'KADUNA',20160874),(20160737,'KANO',20160874),(20160738,'KATSINA',20160874),(20160739,'KEBBI',20160874),(20160740,'KOGI',20160874),(20160741,'KWARA',20160874),(20160742,'LAGOS',20160874),(20160743,'NASSARAWA',20160874),(20160744,'NIGER',20160874),(20160745,'OGUN',20160874),(20160746,'ONDO',20160874),(20160747,'OSUN',20160874),(20160748,'OYO',20160874),(20160749,'PLATEAU',20160874),(20160750,'RIVERS',20160874),(20160751,'SOKOTO',20160874),(20160752,'TARABA',20160874),(20160753,'YOBE',20160874),(20160754,'ZAMFARA',20160874);
/*!40000 ALTER TABLE `state` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `unitofmeasure`
--

DROP TABLE IF EXISTS `unitofmeasure`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `unitofmeasure` (
  `unitofmeasure_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `Name` varchar(45) DEFAULT NULL,
  `description` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`unitofmeasure_id`)
) ENGINE=InnoDB AUTO_INCREMENT=20160932 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `unitofmeasure`
--

LOCK TABLES `unitofmeasure` WRITE;
/*!40000 ALTER TABLE `unitofmeasure` DISABLE KEYS */;
INSERT INTO `unitofmeasure` VALUES (20160923,'Each','Each'),(20160924,'Set','Set'),(20160925,'Pack','Pack'),(20160926,'Piece','Piece'),(20160927,'Kit','Kit'),(20160928,'Litre','Litre'),(20160929,'Gallon','Gallon'),(20160930,'Can','Can'),(20160931,'Drum','Drum');
/*!40000 ALTER TABLE `unitofmeasure` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_authrole`
--

DROP TABLE IF EXISTS `user_authrole`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_authrole` (
  `Users_User_Id` bigint(20) NOT NULL,
  `AuthRoles_AuthRoles_Id` bigint(20) NOT NULL,
  PRIMARY KEY (`Users_User_Id`,`AuthRoles_AuthRoles_Id`),
  KEY `fk_User_AuthRole_AuthRoles1_idx` (`AuthRoles_AuthRoles_Id`),
  CONSTRAINT `fk_User_AuthRole_AuthRoles1` FOREIGN KEY (`AuthRoles_AuthRoles_Id`) REFERENCES `authroles` (`AuthRoles_Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_User_AuthRole_Users1` FOREIGN KEY (`Users_User_Id`) REFERENCES `users` (`User_Id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_authrole`
--

LOCK TABLES `user_authrole` WRITE;
/*!40000 ALTER TABLE `user_authrole` DISABLE KEYS */;
INSERT INTO `user_authrole` VALUES (20160713,13072016),(20160713,13072017),(20160713,13072019),(20160714,13072017),(20160715,13072017);
/*!40000 ALTER TABLE `user_authrole` ENABLE KEYS */;
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
  `ius_yn` tinyint(1) DEFAULT NULL,
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
INSERT INTO `user_authview` VALUES (13072016,20160713,1),(13072016,20160715,1),(13072017,20160713,1),(13072017,20160715,1),(13072018,20160713,1);
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
  `IsAuthorizedPerson` tinyint(1) DEFAULT NULL,
  `Username` varchar(100) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `Password` varchar(200) NOT NULL,
  `token` varchar(200) DEFAULT NULL,
  `Enabled` tinyint(1) DEFAULT NULL,
  `AccountLocked` tinyint(1) DEFAULT NULL,
  `AccountExpirationTime` datetime DEFAULT NULL,
  `CredentialsExpirationTime` datetime DEFAULT NULL,
  `DateCreated` datetime DEFAULT NULL,
  `DateModified` datetime DEFAULT NULL,
  PRIMARY KEY (`User_Id`),
  KEY `fk_User_Party1_idx` (`User_Party_Id`),
  CONSTRAINT `fk_User_Party1` FOREIGN KEY (`User_Party_Id`) REFERENCES `party` (`Party_Id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=20160716 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (20160713,'Abimbola','S','Hassan','07065725667',NULL,20161307,NULL,NULL,'infinitizon@yahoo.com','c20ad4d76fe97759aa27a0c99bff6710','56daaa8c267b150b37d866da7d1278f0287eeb2a',1,0,NULL,NULL,NULL,NULL),(20160714,'Labake',NULL,'Hassan','143131513','135135153151',20161317,NULL,NULL,'labaks@gmail.com','72a9034327785dab5ad6a914b73c16b8',NULL,1,0,NULL,NULL,NULL,NULL),(20160715,'Deribigbe',NULL,'Ajasa','75365653','345673546356',20161317,NULL,NULL,'dajasa@mail.com','960a92425e165e5ec9830f78e28dafc7',NULL,1,0,NULL,NULL,NULL,NULL);
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

-- Dump completed on 2016-12-03 22:31:04
