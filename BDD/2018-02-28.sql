-- MySQL dump 10.13  Distrib 5.7.17, for macos10.12 (x86_64)
--
-- Host: 127.0.0.1    Database: troca
-- ------------------------------------------------------
-- Server version	5.7.19

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
-- Table structure for table `Companyies`
--

DROP TABLE IF EXISTS `Companyies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Companyies` (
  `c_idCompanyia` int(10) NOT NULL AUTO_INCREMENT,
  `c_Nom` text,
  `c_Responsable` text,
  `c_Telefon` text,
  `c_Email` text,
  `c_NIF` text,
  `c_CCC` text,
  `c_NIFCompanyia` text,
  PRIMARY KEY (`c_idCompanyia`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Companyies`
--

LOCK TABLES `Companyies` WRITE;
/*!40000 ALTER TABLE `Companyies` DISABLE KEYS */;
INSERT INTO `Companyies` VALUES (1,'Companyia la Bleda','Helena Escobar','','yonkis@hoa.cat','789756445','CCC',''),(2,'Companyia 2','hola',NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `Companyies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ContactesComercials`
--

DROP TABLE IF EXISTS `ContactesComercials`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ContactesComercials` (
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
  CONSTRAINT `IDAJUNTAMENT` FOREIGN KEY (`ccco_idAjuntament`) REFERENCES `Entitats` (`e_idAjuntament`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `IDESPECTACLE` FOREIGN KEY (`ccco_idEspectacle`) REFERENCES `Espectacles` (`ep_idEspectacle`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_ContactesComercials_Projectes1` FOREIGN KEY (`ccco_idProjecte`) REFERENCES `Projectes` (`pr_idProjecte`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ContactesComercials`
--

LOCK TABLES `ContactesComercials` WRITE;
/*!40000 ALTER TABLE `ContactesComercials` DISABLE KEYS */;
/*!40000 ALTER TABLE `ContactesComercials` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ContracteEspectacles`
--

DROP TABLE IF EXISTS `ContracteEspectacles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ContracteEspectacles` (
  `cte_idContracteEspectacle` int(10) NOT NULL AUTO_INCREMENT,
  `cte_idcontracte` int(10) NOT NULL,
  `cte_idespectacle` int(10) NOT NULL,
  `cte_idEspai` int(10) NOT NULL,
  `cte_PreuSC` float DEFAULT NULL,
  `cte_IVASC` float DEFAULT NULL,
  `cte_PreuAC` float DEFAULT NULL,
  `cte_IVAAC` float DEFAULT NULL,
  `cte_TotalSC` float DEFAULT NULL,
  `cte_TotalAC` float DEFAULT NULL,
  PRIMARY KEY (`cte_idContracteEspectacle`),
  KEY `CONTCONT_idx` (`cte_idcontracte`),
  KEY `CONTCONT2_idx` (`cte_idespectacle`),
  KEY `CONTCONT3_idx` (`cte_idEspai`),
  CONSTRAINT `CONTCONT` FOREIGN KEY (`cte_idcontracte`) REFERENCES `ContractesControl` (`ctc_idContracte`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `CONTCONT2` FOREIGN KEY (`cte_idespectacle`) REFERENCES `Espectacles` (`ep_idEspectacle`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `CONTCONT3` FOREIGN KEY (`cte_idEspai`) REFERENCES `Espais` (`es_idEspai`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ContracteEspectacles`
--

LOCK TABLES `ContracteEspectacles` WRITE;
/*!40000 ALTER TABLE `ContracteEspectacles` DISABLE KEYS */;
/*!40000 ALTER TABLE `ContracteEspectacles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ContractesControl`
--

DROP TABLE IF EXISTS `ContractesControl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ContractesControl` (
  `ctc_idContracte` int(10) NOT NULL AUTO_INCREMENT,
  `ctc_idprojecte` int(10) DEFAULT NULL,
  `ctc_EntregatFullRuta` int(1) DEFAULT NULL,
  `ctc_Observacions` text,
  `ctc_idEntitat` int(10) DEFAULT NULL,
  `ctc_DataContracte` date DEFAULT NULL,
  `ctc_EntregatContracte` int(1) DEFAULT NULL,
  PRIMARY KEY (`ctc_idContracte`),
  KEY `CONTCONT1_idx` (`ctc_idprojecte`),
  CONSTRAINT `CONTCONT1` FOREIGN KEY (`ctc_idprojecte`) REFERENCES `Projectes` (`pr_idProjecte`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ContractesControl`
--

LOCK TABLES `ContractesControl` WRITE;
/*!40000 ALTER TABLE `ContractesControl` DISABLE KEYS */;
/*!40000 ALTER TABLE `ContractesControl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ContractesFuncions`
--

DROP TABLE IF EXISTS `ContractesFuncions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ContractesFuncions` (
  `ctf_idFuncio` int(10) NOT NULL AUTO_INCREMENT,
  `ctf_idContracteEspectacle` int(10) DEFAULT NULL,
  `ctf_Hora_inici` time DEFAULT NULL,
  `ctf_Hora_arribada` time DEFAULT NULL,
  `ctf_Hora_Recollida` time DEFAULT NULL,
  `ctf_Adreca_Arribada` varchar(50) DEFAULT NULL,
  `ctf_Aparcament` varchar(50) DEFAULT NULL,
  `ctf_CarregaDescarrega` varchar(50) DEFAULT NULL,
  `ctf_On_Canviarse` varchar(50) DEFAULT NULL,
  `ctf_Acords_tecnics` varchar(50) DEFAULT NULL,
  `ctf_Data` date DEFAULT NULL,
  PRIMARY KEY (`ctf_idFuncio`),
  KEY `CONTESPC_idx` (`ctf_idContracteEspectacle`),
  CONSTRAINT `CONTESPC` FOREIGN KEY (`ctf_idContracteEspectacle`) REFERENCES `ContracteEspectacles` (`cte_idContracteEspectacle`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ContractesFuncions`
--

LOCK TABLES `ContractesFuncions` WRITE;
/*!40000 ALTER TABLE `ContractesFuncions` DISABLE KEYS */;
/*!40000 ALTER TABLE `ContractesFuncions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Entitats`
--

DROP TABLE IF EXISTS `Entitats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Entitats` (
  `e_idAjuntament` int(10) NOT NULL AUTO_INCREMENT,
  `e_Nom` varchar(200) DEFAULT NULL,
  `e_Responsable` varchar(200) DEFAULT NULL,
  `e_Telèfon` varchar(200) DEFAULT NULL,
  `e_Email` varchar(200) DEFAULT NULL,
  `e_Adreca` varchar(200) DEFAULT NULL,
  `e_CodiPostal` varchar(10) DEFAULT NULL,
  `e_Ciutat` varchar(200) DEFAULT NULL,
  `e_CIF` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`e_idAjuntament`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Entitats`
--

LOCK TABLES `Entitats` WRITE;
/*!40000 ALTER TABLE `Entitats` DISABLE KEYS */;
/*!40000 ALTER TABLE `Entitats` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Espais`
--

DROP TABLE IF EXISTS `Espais`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Espais` (
  `es_idEspai` int(10) NOT NULL AUTO_INCREMENT,
  `es_idAjuntament` int(10) DEFAULT NULL,
  `es_Nom` varchar(50) DEFAULT NULL,
  `es_Poblacio` varchar(50) DEFAULT NULL,
  `es_TeFitxaTecnica` int(1) DEFAULT NULL,
  `es_TeCaixaNegra` int(1) DEFAULT NULL,
  `es_TeAparcament` int(1) DEFAULT NULL,
  `es_TeCarregaDescarrega` int(1) DEFAULT NULL,
  `es_Responsable_nom` text,
  `es_Responsable_mobil` text,
  `es_Aparcament_Text` text,
  `es_CarregaDescarrega_Text` text,
  `es_Lloc_canviarse` int(1) DEFAULT NULL,
  `es_Lloc_Canviarse_text` text,
  PRIMARY KEY (`es_idEspai`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Espais`
--

LOCK TABLES `Espais` WRITE;
/*!40000 ALTER TABLE `Espais` DISABLE KEYS */;
/*!40000 ALTER TABLE `Espais` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Espectacles`
--

DROP TABLE IF EXISTS `Espectacles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Espectacles` (
  `ep_idEspectacle` int(10) NOT NULL AUTO_INCREMENT,
  `ep_idCompanyia` int(10) DEFAULT NULL,
  `ep_Nom` text,
  `ep_Tecnic` text,
  `ep_Requeriments` text,
  `ep_TipusEspectacle` text,
  PRIMARY KEY (`ep_idEspectacle`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Espectacles`
--

LOCK TABLES `Espectacles` WRITE;
/*!40000 ALTER TABLE `Espectacles` DISABLE KEYS */;
INSERT INTO `Espectacles` VALUES (1,1,'Espectacle 2','Tècnic 1','Requisit 1','Familiar'),(2,1,'E2',NULL,NULL,'F2'),(22,2,'E3',NULL,NULL,'F3'),(23,2,'E4',NULL,NULL,'F4');
/*!40000 ALTER TABLE `Espectacles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Preus`
--

DROP TABLE IF EXISTS `Preus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Preus` (
  `p_idPreu` int(10) NOT NULL AUTO_INCREMENT,
  `p_idEspectacle` int(10) NOT NULL,
  `p_PreuSC` float DEFAULT NULL,
  `p_PreuAC` float DEFAULT NULL,
  `p_Text` text,
  PRIMARY KEY (`p_idPreu`),
  KEY `PreusEspectacles_idx` (`p_idEspectacle`),
  CONSTRAINT `PreusEspectacles` FOREIGN KEY (`p_idEspectacle`) REFERENCES `Espectacles` (`ep_idEspectacle`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Preus`
--

LOCK TABLES `Preus` WRITE;
/*!40000 ALTER TABLE `Preus` DISABLE KEYS */;
INSERT INTO `Preus` VALUES (1,1,100,200,'Prova'),(2,1,200,300,'Més 3 espectacles');
/*!40000 ALTER TABLE `Preus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Projectes`
--

DROP TABLE IF EXISTS `Projectes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Projectes` (
  `pr_idProjecte` int(10) NOT NULL AUTO_INCREMENT,
  `pr_nom` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`pr_idProjecte`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Projectes`
--

LOCK TABLES `Projectes` WRITE;
/*!40000 ALTER TABLE `Projectes` DISABLE KEYS */;
/*!40000 ALTER TABLE `Projectes` ENABLE KEYS */;
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
 1 AS `c_Nom`,
 1 AS `c_Responsable`,
 1 AS `c_Telefon`,
 1 AS `c_Email`,
 1 AS `c_NIF`,
 1 AS `c_CCC`,
 1 AS `c_NIFCompanyia`,
 1 AS `ep_idEspectacle`,
 1 AS `ep_idCompanyia`,
 1 AS `ep_Nom`,
 1 AS `ep_Tecnic`,
 1 AS `ep_Requeriments`,
 1 AS `ep_TipusEspectacle`,
 1 AS `p_idPreu`,
 1 AS `p_idEspectacle`,
 1 AS `p_PreuSC`,
 1 AS `p_PreuAC`,
 1 AS `p_Text`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `contactescomercialsllistat`
--

DROP TABLE IF EXISTS `contactescomercialsllistat`;
/*!50001 DROP VIEW IF EXISTS `contactescomercialsllistat`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `contactescomercialsllistat` AS SELECT 
 1 AS `ccco_idContacteComercial`,
 1 AS `ccco_idAjuntament`,
 1 AS `ccco_idEspectacle`,
 1 AS `ccco_DataContacte`,
 1 AS `ccco_Resposta`,
 1 AS `ccco_idProjecte`,
 1 AS `ccco_Tancat`,
 1 AS `e_Nom`,
 1 AS `ep_Nom`,
 1 AS `pr_Nom`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `contractescontrolllistat`
--

DROP TABLE IF EXISTS `contractescontrolllistat`;
/*!50001 DROP VIEW IF EXISTS `contractescontrolllistat`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `contractescontrolllistat` AS SELECT 
 1 AS `ctc_idContracte`,
 1 AS `ctc_idprojecte`,
 1 AS `ctc_EntregatFullRuta`,
 1 AS `ctc_Observacions`,
 1 AS `ctc_idEntitat`,
 1 AS `ctc_DataContracte`,
 1 AS `ctc_EntregatContracte`,
 1 AS `pr_Nom`,
 1 AS `e_Nom`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `contractesespectaclesllistat`
--

DROP TABLE IF EXISTS `contractesespectaclesllistat`;
/*!50001 DROP VIEW IF EXISTS `contractesespectaclesllistat`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `contractesespectaclesllistat` AS SELECT 
 1 AS `cte_idContracteEspectacle`,
 1 AS `cte_idcontracte`,
 1 AS `cte_idespectacle`,
 1 AS `cte_idEspai`,
 1 AS `cte_PreuSC`,
 1 AS `cte_IVASC`,
 1 AS `cte_PreuAC`,
 1 AS `cte_IVAAC`,
 1 AS `cte_TotalSC`,
 1 AS `cte_TotalAC`,
 1 AS `ep_Nom`,
 1 AS `es_Nom`*/;
SET character_set_client = @saved_cs_client;

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
/*!50001 VIEW `companyiesespectaclespreus` AS select `c`.`c_idCompanyia` AS `c_idCompanyia`,`c`.`c_Nom` AS `c_Nom`,`c`.`c_Responsable` AS `c_Responsable`,`c`.`c_Telefon` AS `c_Telefon`,`c`.`c_Email` AS `c_Email`,`c`.`c_NIF` AS `c_NIF`,`c`.`c_CCC` AS `c_CCC`,`c`.`c_NIFCompanyia` AS `c_NIFCompanyia`,`e`.`ep_idEspectacle` AS `ep_idEspectacle`,`e`.`ep_idCompanyia` AS `ep_idCompanyia`,`e`.`ep_Nom` AS `ep_Nom`,`e`.`ep_Tecnic` AS `ep_Tecnic`,`e`.`ep_Requeriments` AS `ep_Requeriments`,`e`.`ep_TipusEspectacle` AS `ep_TipusEspectacle`,`p`.`p_idPreu` AS `p_idPreu`,`p`.`p_idEspectacle` AS `p_idEspectacle`,`p`.`p_PreuSC` AS `p_PreuSC`,`p`.`p_PreuAC` AS `p_PreuAC`,`p`.`p_Text` AS `p_Text` from ((((select `troca`.`companyies`.`c_idCompanyia` AS `c_idCompanyia`,`troca`.`companyies`.`c_Nom` AS `c_Nom`,`troca`.`companyies`.`c_Responsable` AS `c_Responsable`,`troca`.`companyies`.`c_Telefon` AS `c_Telefon`,`troca`.`companyies`.`c_Email` AS `c_Email`,`troca`.`companyies`.`c_NIF` AS `c_NIF`,`troca`.`companyies`.`c_CCC` AS `c_CCC`,`troca`.`companyies`.`c_NIFCompanyia` AS `c_NIFCompanyia` from `troca`.`companyies` limit 10)) `c` left join `troca`.`espectacles` `e` on((`c`.`c_idCompanyia` = `e`.`ep_idCompanyia`))) left join `troca`.`preus` `p` on((`p`.`p_idEspectacle` = `e`.`ep_idEspectacle`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `contactescomercialsllistat`
--

/*!50001 DROP VIEW IF EXISTS `contactescomercialsllistat`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `contactescomercialsllistat` AS select `ccco`.`ccco_idContacteComercial` AS `ccco_idContacteComercial`,`ccco`.`ccco_idAjuntament` AS `ccco_idAjuntament`,`ccco`.`ccco_idEspectacle` AS `ccco_idEspectacle`,`ccco`.`ccco_DataContacte` AS `ccco_DataContacte`,`ccco`.`ccco_Resposta` AS `ccco_Resposta`,`ccco`.`ccco_idProjecte` AS `ccco_idProjecte`,`ccco`.`ccco_Tancat` AS `ccco_Tancat`,`e`.`e_Nom` AS `e_Nom`,`ep`.`ep_Nom` AS `ep_Nom`,`pr`.`pr_nom` AS `pr_Nom` from (((`contactescomercials` `ccco` left join `entitats` `e` on((`e`.`e_idAjuntament` = `ccco`.`ccco_idAjuntament`))) left join `espectacles` `ep` on((`ep`.`ep_idEspectacle` = `ccco`.`ccco_idEspectacle`))) left join `projectes` `pr` on((`pr`.`pr_idProjecte` = `ccco`.`ccco_idProjecte`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `contractescontrolllistat`
--

/*!50001 DROP VIEW IF EXISTS `contractescontrolllistat`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `contractescontrolllistat` AS select `ctc`.`ctc_idContracte` AS `ctc_idContracte`,`ctc`.`ctc_idprojecte` AS `ctc_idprojecte`,`ctc`.`ctc_EntregatFullRuta` AS `ctc_EntregatFullRuta`,`ctc`.`ctc_Observacions` AS `ctc_Observacions`,`ctc`.`ctc_idEntitat` AS `ctc_idEntitat`,`ctc`.`ctc_DataContracte` AS `ctc_DataContracte`,`ctc`.`ctc_EntregatContracte` AS `ctc_EntregatContracte`,`pr`.`pr_nom` AS `pr_Nom`,`e`.`e_Nom` AS `e_Nom` from ((`contractescontrol` `ctc` left join `projectes` `pr` on((`pr`.`pr_idProjecte` = `ctc`.`ctc_idprojecte`))) left join `entitats` `e` on((`ctc`.`ctc_idEntitat` = `e`.`e_idAjuntament`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `contractesespectaclesllistat`
--

/*!50001 DROP VIEW IF EXISTS `contractesespectaclesllistat`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `contractesespectaclesllistat` AS select `cte`.`cte_idContracteEspectacle` AS `cte_idContracteEspectacle`,`cte`.`cte_idcontracte` AS `cte_idcontracte`,`cte`.`cte_idespectacle` AS `cte_idespectacle`,`cte`.`cte_idEspai` AS `cte_idEspai`,`cte`.`cte_PreuSC` AS `cte_PreuSC`,`cte`.`cte_IVASC` AS `cte_IVASC`,`cte`.`cte_PreuAC` AS `cte_PreuAC`,`cte`.`cte_IVAAC` AS `cte_IVAAC`,`cte`.`cte_TotalSC` AS `cte_TotalSC`,`cte`.`cte_TotalAC` AS `cte_TotalAC`,`ep`.`ep_Nom` AS `ep_Nom`,`es`.`es_Nom` AS `es_Nom` from ((`contracteespectacles` `cte` left join `espectacles` `ep` on((`cte`.`cte_idespectacle` = `ep`.`ep_idEspectacle`))) left join `espais` `es` on((`cte`.`cte_idEspai` = `es`.`es_idEspai`))) */;
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

-- Dump completed on 2018-02-28  9:55:47
