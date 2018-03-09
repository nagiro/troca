-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: troca
-- ------------------------------------------------------
-- Server version	5.5.5-10.1.29-MariaDB

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
-- Table structure for table `companyies`
--

DROP TABLE IF EXISTS `companyies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `companyies` (
  `c_idCompanyia` int(10) NOT NULL AUTO_INCREMENT,
  `c_NIF` varchar(100) DEFAULT NULL,
  `c_Nom` varchar(100) DEFAULT NULL,
  `c_Responsable` varchar(100) DEFAULT NULL,
  `c_Telefon` varchar(100) DEFAULT NULL,
  `c_Email` varchar(100) DEFAULT NULL,
  `c_NIFCompanyia` varchar(100) DEFAULT NULL,
  `c_Responsable2` varchar(100) DEFAULT NULL,
  `c_Telefon2` varchar(100) DEFAULT NULL,
  `c_Email2` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`c_idCompanyia`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `companyies`
--

LOCK TABLES `companyies` WRITE;
/*!40000 ALTER TABLE `companyies` DISABLE KEYS */;
INSERT INTO `companyies` VALUES (1,'789756445','Companyia la Bleda','Helena Escobar','651300826','yonkis@hoa.cat','',NULL,NULL,NULL),(2,NULL,'Companyia 2','hola',NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `companyies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `companyiesespectaclespreus`
--

DROP TABLE IF EXISTS `companyiesespectaclespreus`;
/*!50001 DROP VIEW IF EXISTS `companyiesespectaclespreus`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `companyiesespectaclespreus` AS SELECT 
 1 AS `c_idCompanyia`,
 1 AS `c_NIF`,
 1 AS `c_Nom`,
 1 AS `c_Responsable`,
 1 AS `c_Telefon`,
 1 AS `c_Email`,
 1 AS `c_NIFCompanyia`,
 1 AS `c_Responsable2`,
 1 AS `c_Telefon2`,
 1 AS `c_Email2`,
 1 AS `ep_idEspectacle`,
 1 AS `ep_idCompanyia`,
 1 AS `ep_Nom`,
 1 AS `ep_Tecnic_Nom`,
 1 AS `ep_Requeriments`,
 1 AS `ep_TipusEspectacle`,
 1 AS `ep_EdatMin`,
 1 AS `ep_Tecnic_Telefon`,
 1 AS `ep_Tecnic_Email`,
 1 AS `ep_Contacte_Nom`,
 1 AS `ep_Contacte_Telefon`,
 1 AS `ep_Contacte_Email`,
 1 AS `ep_Descripcio`,
 1 AS `ep_EdatMax`,
 1 AS `p_idPreu`,
 1 AS `p_idEspectacle`,
 1 AS `p_PreuSC`,
 1 AS `p_PreuAC`,
 1 AS `p_Text`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `contactescomercials`
--

DROP TABLE IF EXISTS `contactescomercials`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contactescomercials` (
  `ccco_idContacteComercial` int(10) NOT NULL AUTO_INCREMENT,
  `ccco_idAjuntament` int(10) NOT NULL,
  `ccco_idEspectacle` int(10) NOT NULL,
  `ccco_DataContacte` date DEFAULT NULL,
  `ccco_Resposta` text,
  `ccco_idProjecte` int(10) DEFAULT NULL,
  `ccco_Tancat` int(1) DEFAULT NULL,
  PRIMARY KEY (`ccco_idContacteComercial`),
  KEY `IDAJUNTAMENT_idx` (`ccco_idAjuntament`),
  KEY `IDESPECTACLE_idx` (`ccco_idEspectacle`),
  KEY `fk_ContactesComercials_Projectes1_idx` (`ccco_idProjecte`),
  CONSTRAINT `IDAJUNTAMENT` FOREIGN KEY (`ccco_idAjuntament`) REFERENCES `entitats` (`e_idAjuntament`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `IDESPECTACLE` FOREIGN KEY (`ccco_idEspectacle`) REFERENCES `espectacles` (`ep_idEspectacle`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_ContactesComercials_Projectes1` FOREIGN KEY (`ccco_idProjecte`) REFERENCES `projectes` (`pr_idProjecte`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contactescomercials`
--

LOCK TABLES `contactescomercials` WRITE;
/*!40000 ALTER TABLE `contactescomercials` DISABLE KEYS */;
/*!40000 ALTER TABLE `contactescomercials` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contracteespectacles`
--

DROP TABLE IF EXISTS `contracteespectacles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contracteespectacles` (
  `cte_idContracteEspectacle` int(10) NOT NULL AUTO_INCREMENT,
  `cte_idContracte` int(10) NOT NULL,
  `cte_idEspectacle` int(10) NOT NULL,
  `cte_idEspai` int(10) NOT NULL,
  `cte_PreuSC` float DEFAULT NULL,
  `cte_IVASC` float DEFAULT NULL,
  `cte_PreuAC` float DEFAULT NULL,
  `cte_IVAAC` float DEFAULT NULL,
  `cte_TotalSC` float DEFAULT NULL,
  `cte_TotalAC` float DEFAULT NULL,
  PRIMARY KEY (`cte_idContracteEspectacle`),
  KEY `CONTCONT_idx` (`cte_idContracte`),
  KEY `CONTCONT2_idx` (`cte_idEspectacle`),
  KEY `CONTCONT3_idx` (`cte_idEspai`),
  CONSTRAINT `CONTCONT` FOREIGN KEY (`cte_idContracte`) REFERENCES `contractescontrol` (`ctc_idContracte`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `CONTCONT2` FOREIGN KEY (`cte_idEspectacle`) REFERENCES `espectacles` (`ep_idEspectacle`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `CONTCONT3` FOREIGN KEY (`cte_idEspai`) REFERENCES `espais` (`es_idEspai`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contracteespectacles`
--

LOCK TABLES `contracteespectacles` WRITE;
/*!40000 ALTER TABLE `contracteespectacles` DISABLE KEYS */;
/*!40000 ALTER TABLE `contracteespectacles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `contractes`
--

DROP TABLE IF EXISTS `contractes`;
/*!50001 DROP VIEW IF EXISTS `contractes`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `contractes` AS SELECT 
 1 AS `pr_idProjecte`,
 1 AS `pr_nom`,
 1 AS `ctc_idContracte`,
 1 AS `ctc_idProjecte`,
 1 AS `ctc_idEntitat`,
 1 AS `ctc_EntregatFullRuta`,
 1 AS `ctc_Observacions`,
 1 AS `ctc_DataContracte`,
 1 AS `ctc_EntregatContracte`,
 1 AS `cte_idContracteEspectacle`,
 1 AS `cte_idContracte`,
 1 AS `cte_idEspectacle`,
 1 AS `cte_idEspai`,
 1 AS `cte_PreuSC`,
 1 AS `cte_IVASC`,
 1 AS `cte_PreuAC`,
 1 AS `cte_IVAAC`,
 1 AS `cte_TotalSC`,
 1 AS `cte_TotalAC`,
 1 AS `ctf_idFuncio`,
 1 AS `ctf_idContracteEspectacle`,
 1 AS `ctf_Hora_inici`,
 1 AS `ctf_Hora_arribada`,
 1 AS `ctf_Hora_Recollida`,
 1 AS `ctf_Adreca_Arribada`,
 1 AS `ctf_Aparcament`,
 1 AS `ctf_CarregaDescarrega`,
 1 AS `ctf_On_Canviarse`,
 1 AS `ctf_Acords_tecnics`,
 1 AS `ctf_Data`,
 1 AS `es_idEspai`,
 1 AS `es_idAjuntament`,
 1 AS `es_Nom`,
 1 AS `es_Poblacio`,
 1 AS `es_TeFitxaTecnica`,
 1 AS `es_TeCaixaNegra`,
 1 AS `es_TeAparcament`,
 1 AS `es_TeCarregaDescarrega`,
 1 AS `es_Responsable_nom`,
 1 AS `es_Responsable_mobil`,
 1 AS `es_Responsable_email`,
 1 AS `es_Aparcament_Text`,
 1 AS `es_CarregaDescarrega_Text`,
 1 AS `es_Lloc_canviarse`,
 1 AS `es_Lloc_Canviarse_text`,
 1 AS `es_Adreca`,
 1 AS `es_Responsable1_nom`,
 1 AS `es_Responsable1_email`,
 1 AS `es_Responsable1_mobil`,
 1 AS `ep_idEspectacle`,
 1 AS `ep_idCompanyia`,
 1 AS `ep_Nom`,
 1 AS `ep_Tecnic_Nom`,
 1 AS `ep_Requeriments`,
 1 AS `ep_TipusEspectacle`,
 1 AS `ep_EdatMin`,
 1 AS `ep_Tecnic_Telefon`,
 1 AS `ep_Tecnic_Email`,
 1 AS `ep_Contacte_Nom`,
 1 AS `ep_Contacte_Telefon`,
 1 AS `ep_Contacte_Email`,
 1 AS `ep_Descripcio`,
 1 AS `ep_EdatMax`,
 1 AS `p_idPreu`,
 1 AS `p_idEspectacle`,
 1 AS `p_PreuSC`,
 1 AS `p_PreuAC`,
 1 AS `p_Text`,
 1 AS `e_idAjuntament`,
 1 AS `e_Nom`,
 1 AS `e_Responsable`,
 1 AS `e_Telefon`,
 1 AS `e_Email`,
 1 AS `e_Adreca`,
 1 AS `e_CodiPostal`,
 1 AS `e_Ciutat`,
 1 AS `e_CIF`,
 1 AS `c_idCompanyia`,
 1 AS `c_NIF`,
 1 AS `c_Nom`,
 1 AS `c_Responsable`,
 1 AS `c_Telefon`,
 1 AS `c_Email`,
 1 AS `c_NIFCompanyia`,
 1 AS `c_Responsable2`,
 1 AS `c_Telefon2`,
 1 AS `c_Email2`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `contractescontrol`
--

DROP TABLE IF EXISTS `contractescontrol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contractescontrol` (
  `ctc_idContracte` int(10) NOT NULL AUTO_INCREMENT,
  `ctc_idProjecte` int(10) DEFAULT NULL,
  `ctc_idEntitat` int(10) DEFAULT NULL,
  `ctc_EntregatFullRuta` int(1) DEFAULT NULL,
  `ctc_Observacions` text,
  `ctc_DataContracte` date DEFAULT NULL,
  `ctc_EntregatContracte` int(1) DEFAULT NULL,
  PRIMARY KEY (`ctc_idContracte`),
  KEY `CONTCONT1_idx` (`ctc_idProjecte`),
  CONSTRAINT `CONTCONT1` FOREIGN KEY (`ctc_idProjecte`) REFERENCES `projectes` (`pr_idProjecte`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contractescontrol`
--

LOCK TABLES `contractescontrol` WRITE;
/*!40000 ALTER TABLE `contractescontrol` DISABLE KEYS */;
INSERT INTO `contractescontrol` VALUES (22,1,1,0,'','2018-03-09',0);
/*!40000 ALTER TABLE `contractescontrol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contractesfuncions`
--

DROP TABLE IF EXISTS `contractesfuncions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contractesfuncions` (
  `ctf_idFuncio` int(10) NOT NULL AUTO_INCREMENT,
  `ctf_idContracteEspectacle` int(10) DEFAULT NULL,
  `ctf_Hora_inici` time DEFAULT NULL,
  `ctf_Hora_arribada` time DEFAULT NULL,
  `ctf_Hora_Recollida` time DEFAULT NULL,
  `ctf_Adreca_Arribada` text,
  `ctf_Aparcament` text,
  `ctf_CarregaDescarrega` text,
  `ctf_On_Canviarse` text,
  `ctf_Acords_tecnics` text,
  `ctf_Data` date DEFAULT NULL,
  PRIMARY KEY (`ctf_idFuncio`),
  KEY `CONTESPC_idx` (`ctf_idContracteEspectacle`),
  CONSTRAINT `CONTESPC` FOREIGN KEY (`ctf_idContracteEspectacle`) REFERENCES `contracteespectacles` (`cte_idContracteEspectacle`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contractesfuncions`
--

LOCK TABLES `contractesfuncions` WRITE;
/*!40000 ALTER TABLE `contractesfuncions` DISABLE KEYS */;
/*!40000 ALTER TABLE `contractesfuncions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `entitats`
--

DROP TABLE IF EXISTS `entitats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `entitats` (
  `e_idAjuntament` int(10) NOT NULL AUTO_INCREMENT,
  `e_Nom` varchar(200) DEFAULT NULL,
  `e_Responsable` varchar(200) DEFAULT NULL,
  `e_Telefon` varchar(200) DEFAULT NULL,
  `e_Email` varchar(200) DEFAULT NULL,
  `e_Adreca` varchar(200) DEFAULT NULL,
  `e_CodiPostal` varchar(10) DEFAULT NULL,
  `e_Ciutat` varchar(200) DEFAULT NULL,
  `e_CIF` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`e_idAjuntament`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `entitats`
--

LOCK TABLES `entitats` WRITE;
/*!40000 ALTER TABLE `entitats` DISABLE KEYS */;
INSERT INTO `entitats` VALUES (1,'Casa de Cultura de Girona','Albert Johé i Martí','651300826','albert.johe@gmail.com','Plaça Hospital 6','17002','Girona','G17759887'),(2,'La marfà','Aniol Casadevall','','asdfkljñ','jklñj','2323','kjljk','jk');
/*!40000 ALTER TABLE `entitats` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `entitatsespais`
--

DROP TABLE IF EXISTS `entitatsespais`;
/*!50001 DROP VIEW IF EXISTS `entitatsespais`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `entitatsespais` AS SELECT 
 1 AS `e_idAjuntament`,
 1 AS `e_Nom`,
 1 AS `e_Responsable`,
 1 AS `e_Telefon`,
 1 AS `e_Email`,
 1 AS `e_Adreca`,
 1 AS `e_CodiPostal`,
 1 AS `e_Ciutat`,
 1 AS `e_CIF`,
 1 AS `es_idEspai`,
 1 AS `es_idAjuntament`,
 1 AS `es_Nom`,
 1 AS `es_Poblacio`,
 1 AS `es_TeFitxaTecnica`,
 1 AS `es_TeCaixaNegra`,
 1 AS `es_TeAparcament`,
 1 AS `es_TeCarregaDescarrega`,
 1 AS `es_Responsable_nom`,
 1 AS `es_Responsable_mobil`,
 1 AS `es_Responsable_email`,
 1 AS `es_Aparcament_Text`,
 1 AS `es_CarregaDescarrega_Text`,
 1 AS `es_Lloc_canviarse`,
 1 AS `es_Lloc_Canviarse_text`,
 1 AS `es_Adreca`,
 1 AS `es_Responsable1_nom`,
 1 AS `es_Responsable1_email`,
 1 AS `es_Responsable1_mobil`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `espais`
--

DROP TABLE IF EXISTS `espais`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `espais` (
  `es_idEspai` int(10) NOT NULL AUTO_INCREMENT,
  `es_idAjuntament` int(10) DEFAULT NULL,
  `es_Nom` varchar(50) DEFAULT NULL,
  `es_Poblacio` varchar(50) DEFAULT NULL,
  `es_TeFitxaTecnica` int(1) DEFAULT NULL,
  `es_TeCaixaNegra` int(1) DEFAULT NULL,
  `es_TeAparcament` int(1) DEFAULT NULL,
  `es_TeCarregaDescarrega` int(1) DEFAULT NULL,
  `es_Responsable_nom` varchar(100) DEFAULT NULL,
  `es_Responsable_mobil` varchar(100) DEFAULT NULL,
  `es_Responsable_email` varchar(100) DEFAULT NULL,
  `es_Aparcament_Text` text,
  `es_CarregaDescarrega_Text` text,
  `es_Lloc_canviarse` int(1) DEFAULT NULL,
  `es_Lloc_Canviarse_text` text,
  `es_Adreca` text,
  `es_Responsable1_nom` varchar(100) DEFAULT NULL,
  `es_Responsable1_email` varchar(100) DEFAULT NULL,
  `es_Responsable1_mobil` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`es_idEspai`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `espais`
--

LOCK TABLES `espais` WRITE;
/*!40000 ALTER TABLE `espais` DISABLE KEYS */;
INSERT INTO `espais` VALUES (1,1,'Aula Magna','Girona',1,0,0,0,'Albert Johé i Martí','651300826','albert.johe@gmail.com','Per aparcar cal anar a la cantonada','Hi ha zona de càrrega i descàrrega davant de la casa però gairebé sempre està ple',1,'Poden canviar-se als camerinos de l\'Auditori Viader.','Roger de Flor 13','Mònica aymerich ','ay.monica@gmail.com','633653377'),(2,2,'Espai la troca','',0,0,0,0,'','',NULL,'','',0,'','',NULL,NULL,NULL),(3,1,'Espai 2','Aiguaviva',1,1,0,1,'Albert Johé','651300826','','Podeu aparcar al costat de la benzinera.','Hi ha zona de càrrega i descàrrega al voltant',1,'Podeu canviar-vos al vestuari.','','','',''),(4,2,'Espa 2','',0,0,0,0,'','','','','',0,'','','','','');
/*!40000 ALTER TABLE `espais` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `espectacles`
--

DROP TABLE IF EXISTS `espectacles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `espectacles` (
  `ep_idEspectacle` int(10) NOT NULL AUTO_INCREMENT,
  `ep_idCompanyia` int(10) DEFAULT NULL,
  `ep_Nom` text,
  `ep_Tecnic_Nom` varchar(100) DEFAULT NULL,
  `ep_Requeriments` text,
  `ep_TipusEspectacle` text,
  `ep_EdatMin` int(3) DEFAULT NULL,
  `ep_Tecnic_Telefon` varchar(100) DEFAULT NULL,
  `ep_Tecnic_Email` varchar(100) DEFAULT NULL,
  `ep_Contacte_Nom` varchar(100) DEFAULT NULL,
  `ep_Contacte_Telefon` varchar(100) DEFAULT NULL,
  `ep_Contacte_Email` varchar(100) DEFAULT NULL,
  `ep_Descripcio` text,
  `ep_EdatMax` int(3) DEFAULT NULL,
  PRIMARY KEY (`ep_idEspectacle`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `espectacles`
--

LOCK TABLES `espectacles` WRITE;
/*!40000 ALTER TABLE `espectacles` DISABLE KEYS */;
INSERT INTO `espectacles` VALUES (2,1,'E2','Albert Johé i Martí','Casal amb fort vent','Familiar, dansa',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(22,2,'E3',NULL,NULL,'F3',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(23,2,'E4',NULL,NULL,'F4',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(24,1,'E5','','','Circ',0,'','','','','','',0);
/*!40000 ALTER TABLE `espectacles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `preus`
--

DROP TABLE IF EXISTS `preus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `preus` (
  `p_idPreu` int(10) NOT NULL AUTO_INCREMENT,
  `p_idEspectacle` int(10) NOT NULL,
  `p_PreuSC` double DEFAULT NULL,
  `p_PreuAC` double DEFAULT NULL,
  `p_Text` text,
  PRIMARY KEY (`p_idPreu`),
  KEY `PreusEspectacles_idx` (`p_idEspectacle`),
  CONSTRAINT `PreusEspectacles` FOREIGN KEY (`p_idEspectacle`) REFERENCES `espectacles` (`ep_idEspectacle`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `preus`
--

LOCK TABLES `preus` WRITE;
/*!40000 ALTER TABLE `preus` DISABLE KEYS */;
INSERT INTO `preus` VALUES (3,2,100,200,'Amb comisisó'),(4,22,100,120,'jkhkjhlkjh'),(5,24,50,55,'');
/*!40000 ALTER TABLE `preus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projectes`
--

DROP TABLE IF EXISTS `projectes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `projectes` (
  `pr_idProjecte` int(10) NOT NULL AUTO_INCREMENT,
  `pr_nom` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`pr_idProjecte`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projectes`
--

LOCK TABLES `projectes` WRITE;
/*!40000 ALTER TABLE `projectes` DISABLE KEYS */;
INSERT INTO `projectes` VALUES (1,'Campanya escolar');
/*!40000 ALTER TABLE `projectes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Final view structure for view `companyiesespectaclespreus`
--

/*!50001 DROP VIEW IF EXISTS `companyiesespectaclespreus`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `companyiesespectaclespreus` AS select `c`.`c_idCompanyia` AS `c_idCompanyia`,`c`.`c_NIF` AS `c_NIF`,`c`.`c_Nom` AS `c_Nom`,`c`.`c_Responsable` AS `c_Responsable`,`c`.`c_Telefon` AS `c_Telefon`,`c`.`c_Email` AS `c_Email`,`c`.`c_NIFCompanyia` AS `c_NIFCompanyia`,`c`.`c_Responsable2` AS `c_Responsable2`,`c`.`c_Telefon2` AS `c_Telefon2`,`c`.`c_Email2` AS `c_Email2`,`e`.`ep_idEspectacle` AS `ep_idEspectacle`,`e`.`ep_idCompanyia` AS `ep_idCompanyia`,`e`.`ep_Nom` AS `ep_Nom`,`e`.`ep_Tecnic_Nom` AS `ep_Tecnic_Nom`,`e`.`ep_Requeriments` AS `ep_Requeriments`,`e`.`ep_TipusEspectacle` AS `ep_TipusEspectacle`,`e`.`ep_EdatMin` AS `ep_EdatMin`,`e`.`ep_Tecnic_Telefon` AS `ep_Tecnic_Telefon`,`e`.`ep_Tecnic_Email` AS `ep_Tecnic_Email`,`e`.`ep_Contacte_Nom` AS `ep_Contacte_Nom`,`e`.`ep_Contacte_Telefon` AS `ep_Contacte_Telefon`,`e`.`ep_Contacte_Email` AS `ep_Contacte_Email`,`e`.`ep_Descripcio` AS `ep_Descripcio`,`e`.`ep_EdatMax` AS `ep_EdatMax`,`p`.`p_idPreu` AS `p_idPreu`,`p`.`p_idEspectacle` AS `p_idEspectacle`,`p`.`p_PreuSC` AS `p_PreuSC`,`p`.`p_PreuAC` AS `p_PreuAC`,`p`.`p_Text` AS `p_Text` from ((`companyies` `c` left join `espectacles` `e` on((`c`.`c_idCompanyia` = `e`.`ep_idCompanyia`))) left join `preus` `p` on((`p`.`p_idEspectacle` = `e`.`ep_idEspectacle`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `contractes`
--

/*!50001 DROP VIEW IF EXISTS `contractes`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `contractes` AS select `pr`.`pr_idProjecte` AS `pr_idProjecte`,`pr`.`pr_nom` AS `pr_nom`,`cc`.`ctc_idContracte` AS `ctc_idContracte`,`cc`.`ctc_idProjecte` AS `ctc_idProjecte`,`cc`.`ctc_idEntitat` AS `ctc_idEntitat`,`cc`.`ctc_EntregatFullRuta` AS `ctc_EntregatFullRuta`,`cc`.`ctc_Observacions` AS `ctc_Observacions`,`cc`.`ctc_DataContracte` AS `ctc_DataContracte`,`cc`.`ctc_EntregatContracte` AS `ctc_EntregatContracte`,`ce`.`cte_idContracteEspectacle` AS `cte_idContracteEspectacle`,`ce`.`cte_idContracte` AS `cte_idContracte`,`ce`.`cte_idEspectacle` AS `cte_idEspectacle`,`ce`.`cte_idEspai` AS `cte_idEspai`,`ce`.`cte_PreuSC` AS `cte_PreuSC`,`ce`.`cte_IVASC` AS `cte_IVASC`,`ce`.`cte_PreuAC` AS `cte_PreuAC`,`ce`.`cte_IVAAC` AS `cte_IVAAC`,`ce`.`cte_TotalSC` AS `cte_TotalSC`,`ce`.`cte_TotalAC` AS `cte_TotalAC`,`cf`.`ctf_idFuncio` AS `ctf_idFuncio`,`cf`.`ctf_idContracteEspectacle` AS `ctf_idContracteEspectacle`,`cf`.`ctf_Hora_inici` AS `ctf_Hora_inici`,`cf`.`ctf_Hora_arribada` AS `ctf_Hora_arribada`,`cf`.`ctf_Hora_Recollida` AS `ctf_Hora_Recollida`,`cf`.`ctf_Adreca_Arribada` AS `ctf_Adreca_Arribada`,`cf`.`ctf_Aparcament` AS `ctf_Aparcament`,`cf`.`ctf_CarregaDescarrega` AS `ctf_CarregaDescarrega`,`cf`.`ctf_On_Canviarse` AS `ctf_On_Canviarse`,`cf`.`ctf_Acords_tecnics` AS `ctf_Acords_tecnics`,`cf`.`ctf_Data` AS `ctf_Data`,`e`.`es_idEspai` AS `es_idEspai`,`e`.`es_idAjuntament` AS `es_idAjuntament`,`e`.`es_Nom` AS `es_Nom`,`e`.`es_Poblacio` AS `es_Poblacio`,`e`.`es_TeFitxaTecnica` AS `es_TeFitxaTecnica`,`e`.`es_TeCaixaNegra` AS `es_TeCaixaNegra`,`e`.`es_TeAparcament` AS `es_TeAparcament`,`e`.`es_TeCarregaDescarrega` AS `es_TeCarregaDescarrega`,`e`.`es_Responsable_nom` AS `es_Responsable_nom`,`e`.`es_Responsable_mobil` AS `es_Responsable_mobil`,`e`.`es_Responsable_email` AS `es_Responsable_email`,`e`.`es_Aparcament_Text` AS `es_Aparcament_Text`,`e`.`es_CarregaDescarrega_Text` AS `es_CarregaDescarrega_Text`,`e`.`es_Lloc_canviarse` AS `es_Lloc_canviarse`,`e`.`es_Lloc_Canviarse_text` AS `es_Lloc_Canviarse_text`,`e`.`es_Adreca` AS `es_Adreca`,`e`.`es_Responsable1_nom` AS `es_Responsable1_nom`,`e`.`es_Responsable1_email` AS `es_Responsable1_email`,`e`.`es_Responsable1_mobil` AS `es_Responsable1_mobil`,`es`.`ep_idEspectacle` AS `ep_idEspectacle`,`es`.`ep_idCompanyia` AS `ep_idCompanyia`,`es`.`ep_Nom` AS `ep_Nom`,`es`.`ep_Tecnic_Nom` AS `ep_Tecnic_Nom`,`es`.`ep_Requeriments` AS `ep_Requeriments`,`es`.`ep_TipusEspectacle` AS `ep_TipusEspectacle`,`es`.`ep_EdatMin` AS `ep_EdatMin`,`es`.`ep_Tecnic_Telefon` AS `ep_Tecnic_Telefon`,`es`.`ep_Tecnic_Email` AS `ep_Tecnic_Email`,`es`.`ep_Contacte_Nom` AS `ep_Contacte_Nom`,`es`.`ep_Contacte_Telefon` AS `ep_Contacte_Telefon`,`es`.`ep_Contacte_Email` AS `ep_Contacte_Email`,`es`.`ep_Descripcio` AS `ep_Descripcio`,`es`.`ep_EdatMax` AS `ep_EdatMax`,`p`.`p_idPreu` AS `p_idPreu`,`p`.`p_idEspectacle` AS `p_idEspectacle`,`p`.`p_PreuSC` AS `p_PreuSC`,`p`.`p_PreuAC` AS `p_PreuAC`,`p`.`p_Text` AS `p_Text`,`en`.`e_idAjuntament` AS `e_idAjuntament`,`en`.`e_Nom` AS `e_Nom`,`en`.`e_Responsable` AS `e_Responsable`,`en`.`e_Telefon` AS `e_Telefon`,`en`.`e_Email` AS `e_Email`,`en`.`e_Adreca` AS `e_Adreca`,`en`.`e_CodiPostal` AS `e_CodiPostal`,`en`.`e_Ciutat` AS `e_Ciutat`,`en`.`e_CIF` AS `e_CIF`,`c`.`c_idCompanyia` AS `c_idCompanyia`,`c`.`c_NIF` AS `c_NIF`,`c`.`c_Nom` AS `c_Nom`,`c`.`c_Responsable` AS `c_Responsable`,`c`.`c_Telefon` AS `c_Telefon`,`c`.`c_Email` AS `c_Email`,`c`.`c_NIFCompanyia` AS `c_NIFCompanyia`,`c`.`c_Responsable2` AS `c_Responsable2`,`c`.`c_Telefon2` AS `c_Telefon2`,`c`.`c_Email2` AS `c_Email2` from ((((((((`projectes` `pr` join `contractescontrol` `cc` on((`cc`.`ctc_idProjecte` = `pr`.`pr_idProjecte`))) left join `contracteespectacles` `ce` on((`cc`.`ctc_idContracte` = `ce`.`cte_idContracte`))) left join `contractesfuncions` `cf` on((`ce`.`cte_idContracteEspectacle` = `cf`.`ctf_idContracteEspectacle`))) left join `espais` `e` on((`e`.`es_idEspai` = `ce`.`cte_idEspai`))) left join `espectacles` `es` on((`es`.`ep_idEspectacle` = `ce`.`cte_idEspectacle`))) left join `preus` `p` on((`p`.`p_idEspectacle` = `es`.`ep_idEspectacle`))) left join `entitats` `en` on((`cc`.`ctc_idEntitat` = `en`.`e_idAjuntament`))) left join `companyies` `c` on((`c`.`c_idCompanyia` = `es`.`ep_idCompanyia`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `entitatsespais`
--

/*!50001 DROP VIEW IF EXISTS `entitatsespais`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `entitatsespais` AS select `e`.`e_idAjuntament` AS `e_idAjuntament`,`e`.`e_Nom` AS `e_Nom`,`e`.`e_Responsable` AS `e_Responsable`,`e`.`e_Telefon` AS `e_Telefon`,`e`.`e_Email` AS `e_Email`,`e`.`e_Adreca` AS `e_Adreca`,`e`.`e_CodiPostal` AS `e_CodiPostal`,`e`.`e_Ciutat` AS `e_Ciutat`,`e`.`e_CIF` AS `e_CIF`,`es`.`es_idEspai` AS `es_idEspai`,`es`.`es_idAjuntament` AS `es_idAjuntament`,`es`.`es_Nom` AS `es_Nom`,`es`.`es_Poblacio` AS `es_Poblacio`,`es`.`es_TeFitxaTecnica` AS `es_TeFitxaTecnica`,`es`.`es_TeCaixaNegra` AS `es_TeCaixaNegra`,`es`.`es_TeAparcament` AS `es_TeAparcament`,`es`.`es_TeCarregaDescarrega` AS `es_TeCarregaDescarrega`,`es`.`es_Responsable_nom` AS `es_Responsable_nom`,`es`.`es_Responsable_mobil` AS `es_Responsable_mobil`,`es`.`es_Responsable_email` AS `es_Responsable_email`,`es`.`es_Aparcament_Text` AS `es_Aparcament_Text`,`es`.`es_CarregaDescarrega_Text` AS `es_CarregaDescarrega_Text`,`es`.`es_Lloc_canviarse` AS `es_Lloc_canviarse`,`es`.`es_Lloc_Canviarse_text` AS `es_Lloc_Canviarse_text`,`es`.`es_Adreca` AS `es_Adreca`,`es`.`es_Responsable1_nom` AS `es_Responsable1_nom`,`es`.`es_Responsable1_email` AS `es_Responsable1_email`,`es`.`es_Responsable1_mobil` AS `es_Responsable1_mobil` from (`entitats` `e` left join `espais` `es` on((`es`.`es_idAjuntament` = `e`.`e_idAjuntament`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-03-09 14:59:09
