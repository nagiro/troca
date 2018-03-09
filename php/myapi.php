<?php
require_once 'api.php';
require_once 'const.php';
require_once './vendor/autoload.php';


class MyAPI extends API
{
    
    public $dbh;
    private $LOCAL_URL = BASE_URL;
    
    public function __construct($request, $origin) {
        parent::__construct($request);
        $this->dbh = new PDO( PDOString, Username, Password );
        $this->dbh->setAttribute( PDO::ATTR_EMULATE_PREPARES, false );
        $this->dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        //$this->LOCAL_URL = "../src/assets/docs/";
        // $this->LOCAL_URL = "C:/Users/Usuario/Documents/Code/src/troca/src/assets/";
        $this->LOCAL_URL = BASE_URL;
    }
    
    protected function getNew() {
        $Taula = $this->request['taula'];
        $Camp  = $this->request['camp'];
        
        $RET = $this->runQuery("Select COALESCE(Max({$Camp})+1,1) as Max from {$Taula}", array(), true, true);
        if (empty($RET)) return array("No he trobat cap valor", 500);
        else return array($RET, 200);
    }
    
    protected function getDadesTaulaById() {
        $Taula = $this->request['post']['taula'];
        $Camp = $this->request['post']['camp'];
        $id = $this->request['post']['id'];
        $RET = $this->runQuery("Select * from {$Taula} WHERE {$Camp} = {$id}", array(), true, true);
        if (empty($RET)) return array("No he trobat cap valor", 500);
        else return array($RET, 200);
    }
    
    protected function getDadesTaulaAll() {
        $Taula = $this->request['post']['taula'];
        
        $SelectC ='Select FOUND_ROWS() as c';
        $Select = "Select SQL_CALC_FOUND_ROWS * from {$Taula} WHERE 1 = 1 ";
        if (isset($this->request['post']['filter1'])) $Select .= " AND ( ".$this->request['post']['filter1'] . ") ";
        if (isset($this->request['post']['filter2'])) $Select .= " AND (".$this->request['post']['filter2'] . ") ";
        if (isset($this->request['post']['filter3'])) $Select .= " AND (".$this->request['post']['filter3'] . ") ";
        if (isset($this->request['post']['filter4'])) $Select .= " AND (".$this->request['post']['filter4'] . ") ";
        if (isset($this->request['post']['filter5'])) $Select .= " AND (".$this->request['post']['filter5'] . ") ";
        if (isset($this->request['post']['filter6'])) $Select .= " AND (".$this->request['post']['filter6'] . ") ";
        if (isset($this->request['post']['filter7'])) $Select .= " AND (".$this->request['post']['filter7'] . ") ";
        
        // var_dump($Select);
        
        $RET = $this->runQuery($Select, array(), false, true);
        $c = $this->runQuery($SelectC, array(), true, true);
        
        if (empty($RET)) return array(array('List'=>array(), 'c' => 0 ), 200);
        else return array(array('List'=>$RET, 'c'=>$c['c']), 200);
    }
    
    protected function DateString($date) {
        list($a, $m, $d) = explode("-", $date);
        return $d.'/'.$m.'/'.$a;
    }
    
    protected function getMes($m) {
        switch($m) {
            case 1: return 'de gener'; break;
            case 2: return 'de febrer'; break;
            case 3: return 'de març'; break;
            case 4: return 'd\'abril'; break;
            case 5: return 'de maig'; break;
            case 6: return 'de juny'; break;
            case 7: return 'de juliol'; break;
            case 8: return 'd\'agost'; break;
            case 9: return 'de setembre'; break;
            case 10: return 'd\'octubre'; break;
            case 11: return 'de novembre'; break;
            case 12: return 'de desembre'; break;
        }
    }
    
    protected function GenWord(){
        
        $idC = $this->request['idC'];
        $idCE = (isset($this->request['idCE']))?$this->request['idCE']:0;
        
        // $this->LOCAL_URL.'tmp/'
        \PhpOffice\PhpWord\Settings::setTempDir("/tmp");
        
        $Select = "Select * from contractes where ctc_idContracte = ".$idC;
        if ($idCE > 0) $Select .= " AND cte_idContracteEspectacle = ". $idCE;
        
        $Rows = $this->runQuery($Select, array(), false, true);
        
        $CE = array();
        $Companyies = array();
        foreach($Rows as $K => $Row) {
            $Companyies[$Row['c_idCompanyia']] = $Row['c_Nom'];
            $CE[$Row['cte_idContracteEspectacle']] = array('CFL' => array(), 'Row' => $Row);
            $CE[$Row['cte_idContracteEspectacle']]['CFL'][$Row['ctf_idFuncio']] = $Row;
        }
        
        $this->GenWordContracte($idC, $Companyies, $CE);
        
        foreach($CE as $idCE => $R){
            foreach($CE[$idCE]['CFL'] as $idCF => $Row){
                $this->GenFullRuta($idCF, $Companyies, $Row);
            }
        }
        
        $rootPath = realpath($this->LOCAL_URL.'tmp');
        
        $zip = new ZipArchive();
        $zip->open($rootPath.'/Contracte.zip', ZipArchive::CREATE | ZipArchive::OVERWRITE);
        $files = new RecursiveIteratorIterator(
            new RecursiveDirectoryIterator($rootPath),
            RecursiveIteratorIterator::LEAVES_ONLY
            );
        foreach ($files as $name => $file)
        {
            if (!$file->isDir() && $file->getFileName() != 'file.zip')
            {
                $filePath = $file->getRealPath();
                $relativePath = substr($filePath, strlen($rootPath) + 1);
                $zip->addFile($filePath, $relativePath);
                $filesToDelete[] = $filePath;
            }
        }
        $zip->close();
        foreach ($filesToDelete as $file) unlink($file);
        
        return array($rootPath.'/Contracte.zip', 200);
    }
    
    
    private function GenWordContracte($idC, $Companyies, $CE) {
        $phpword = new \PhpOffice\PhpWord\PhpWord();
        $T = $phpword->loadTemplate( $this->LOCAL_URL.'docs/ModelsDocuments/Contracte2.docx');
        
        $D = getdate();
        
        $T->setValue('DataDocument', htmlspecialchars("Girona, a ".$D['mday']." ".$this->getMes($D['mon'])." de ".$D['year']));
        $T->setValue('LlistatCompanyies', implode(', ', $Companyies));
        
        /* GENERO EL BLOC 1, DETALL D'INFORMACIÓ */
        $primer = true;
        $phpWordHandle = new \PhpOffice\PhpWord\PhpWord();
        $section = $phpWordHandle->addSection();
        
        foreach($CE as $idC => $OCF) {
            
            if ($primer):
            $T->setValue('NomEntitat', htmlspecialchars($OCF['Row']["e_Nom"]));
            $T->setValue('AdrecaEntitat', htmlspecialchars($OCF['Row']["e_Adreca"]. ", ".$OCF['Row']["e_CodiPostal"]." ".$OCF['Row']["e_Ciutat"]));
            $T->setValue('CifEntitat', htmlspecialchars($OCF['Row']["e_CIF"]));
            $primer = false;
            endif;
            $section->addText($OCF['Row']['c_Nom']);
            $section->addListItem($OCF['Row']['ep_Nom'], 1);
            $section->addListItem($OCF['Row']['es_Nom'], 1);
            $section->addListItem($OCF['Row']['es_Poblacio'], 1);
            foreach($OCF['CFL'] as $idF => $CF) {
                $section->addListItem('Hores:', 1);
                $section->addListItem('Dia '.$this->DateString($CF['ctf_Data']). ' a les '.$CF['ctf_Hora_inici'], 2);
            }
        }
        
        $objWriter =  \PhpOffice\PhpWord\IOFactory::createWriter($phpWordHandle);
        $fullXML = $objWriter->getWriterPart('Document')->write();
        $T->replaceBlock('BLOC1', $this->getBodyBlock($fullXML));
        
        /* Fi bloc 1*/
        
        /* Inici Bloc 2 Dades econòmiques */
        
        $phpWordHandle = new \PhpOffice\PhpWord\PhpWord();
        
        $section = $phpWordHandle->addSection();
        $table = $section->addTable();
        
        $table->addRow();
        $table->addCell()->addText('Nom espectacle');
        $table->addCell()->addText('BAse');
        $table->addCell()->addText('IVA');
        $table->addCell()->addText('Total');
        
        foreach($CE as $idC => $OCF) {
            $table->addRow();
            $table->addCell()->addText($OCF['Row']['c_Nom']);
            foreach($OCF['CFL'] as $idF => $CF) {
                $table->addCell()->addText($CF['cte_PreuAC']);
                $table->addCell()->addText($CF['cte_IVAAC']);
                $table->addCell()->addText($CF['cte_TotalAC']);
            }
        }
        
        $objWriter =  \PhpOffice\PhpWord\IOFactory::createWriter($phpWordHandle);
        $fullXML = $objWriter->getWriterPart('Document')->write();
        $T->replaceBlock('BLOC2', $this->getBodyBlock($fullXML));
        
        /* FI BLOC 2 */
        
        $url = $this->LOCAL_URL.'tmp/C'.$idC.'.docx';
        
        $T->saveAs($url);
    }
    
    
    private function GenFullRuta($idCF, $Companyies, $R) {
        
        $phpword = new \PhpOffice\PhpWord\PhpWord();
        $T = $phpword->loadTemplate( $this->LOCAL_URL.'docs/ModelsDocuments/FullRuta.docx');
        
        $T->setValue('ESPECTACLE', htmlspecialchars($R['ep_Nom']));
        $T->setValue('MUNICIPI', htmlspecialchars($R['es_Poblacio']));
        $T->setValue('NOM_COMPANYIA', htmlspecialchars($R['c_Nom']));
        $T->setValue('NOM_ESPECTACLE', htmlspecialchars($R['ep_Nom']));
        $T->setValue('MUNICIPI', htmlspecialchars($R['es_Poblacio']));
        $T->setValue('DIA', htmlspecialchars($this->DateString($R['ctf_Data'])));
        $T->setValue('HORA', htmlspecialchars($R['ctf_Hora_inici']));
        $T->setValue('ESPAI', htmlspecialchars($R['es_Nom']));
        $T->setValue('TEXT_CARACTERISTIQUES_ACTUACIO', htmlspecialchars($R['ep_Requeriments']));
        $T->setValue('HORA_ARRIBADA', htmlspecialchars($R['ctf_Hora_arribada']));
        $T->setValue('ADRECA_ESPAI', htmlspecialchars($R['es_Adreca']));
        $T->setValue('POBLE_ESPAI', htmlspecialchars($R['es_Poblacio']));
        $T->setValue('TEXT_CARREGA_DESCARREGA', htmlspecialchars($R['es_CarregaDescarrega_Text']));
        $T->setValue('TEXT_APARCAMENT', htmlspecialchars($R['es_Aparcament_Text']));
        $T->setValue('TEXT_LLOC_CANVIARSE', htmlspecialchars($R['es_Lloc_Canviarse_text']));
        $T->setValue('RESP_COMPANYIA_NOM', htmlspecialchars($R['ep_Tecnic_Nom']));
        $T->setValue('RESP_COMPANYIA_TEL', htmlspecialchars($R['ep_Tecnic_Telefon']));
        $T->setValue('RESP_COMPANYIA_MAIL', htmlspecialchars($R['ep_Tecnic_Email']));
        $T->setValue('RESPONSABLE_ENTITAT', htmlspecialchars($R['e_Responsable']));
        $T->setValue('TELEFON_RESPONSABLE_ENTITAT', htmlspecialchars($R['e_Telefon']));
        $T->setValue('EMAIL_RESPONSABLE_ENTITAT', htmlspecialchars($R['e_Email']));
        $T->setValue('NOM_ENTITAT', htmlspecialchars($R['e_Nom']));
        $T->setValue('RESPONSABLE_ENTITAT', htmlspecialchars($R['e_Responsable']));
        $T->setValue('TELEFON_RESPONSABLE_ENTITAT', htmlspecialchars($R['e_Telefon']));
        $T->setValue('EMAIL_RESPONSABLE_ENTITAT', htmlspecialchars($R['e_Email']));
        $T->setValue('ACORDS_TECNICS', htmlspecialchars($R['ctf_Acords_tecnics']));
        $T->setValue('DATA_EMISSIO', htmlspecialchars(date('d-m-Y', time())));
        
        $nom = 'FR'.$idCF.'--'.$this->clean($R['ep_Nom']).'--'.$this->clean($R['ctf_Data']).'--'.$this->clean($R['ctf_Hora_inici']).'.docx';
        
        $url = $this->LOCAL_URL.'tmp/';
        $urlComp = $url.$this->clean($R['c_Nom']);
        if(!file_exists($urlComp)) mkdir($urlComp);
        
        $T->saveAs($urlComp.'/'.$nom);
    }
    
    protected function clean($string) {
        $string = str_replace(' ', '-', $string); // Replaces all spaces with hyphens.
        $string = preg_replace('/[^A-Za-z0-9\-]/', '', $string); // Removes special chars.
        
        return preg_replace('/-+/', '-', $string); // Replaces multiple hyphens with single one.
    }
    
    
    protected function getBodyBlock($string){
        if (preg_match('%(?i)(?<=<w:body>)[\s|\S]*?(?=</w:body>)%', $string, $regs)) {
            return $regs[0];
        } else {
            return '';
        }
    }
    
    
    ###########################################################
    # USUARIS
    ###########################################################
    
    protected function doSaveToTable($Taula, $Fields, $Accio) {
        switch($Taula) {
            case 'companyies':
                $WHERE = " where c_idCompanyia = ? ";
                $WHEREP = array($Fields['c_idCompanyia']);
                $CAMPAUTOINCREMENT = 'c_idCompanyia';
                $this->InsertUpdate($Fields, $Taula, $WHERE, $WHEREP, $CAMPAUTOINCREMENT, $Accio);
                break;
            case 'contactescomercials':
                $WHERE = " where ccco_idContacteComercial = ?  ";
                $WHEREP = array($Fields['ccco_idContacteComercial']);
                $CAMPAUTOINCREMENT = 'ccco_idContacteComercial';
                $this->InsertUpdate($Fields, $Taula, $WHERE, $WHEREP, $CAMPAUTOINCREMENT, $Accio);
                break;
            case 'contracteespectacles':
                $WHERE = " where cte_idContracteEspectacle = ? ";
                $WHEREP = array($Fields['cte_idContracteEspectacle']);
                $CAMPAUTOINCREMENT = 'cte_idContracteEspectacle';
                $this->InsertUpdate($Fields, $Taula, $WHERE, $WHEREP, $CAMPAUTOINCREMENT, $Accio);
                break;
            case 'contractescontrol':
                $WHERE = " where ctc_idContracte = ? ";
                $WHEREP = array($Fields['ctc_idContracte']);
                $CAMPAUTOINCREMENT = 'ctc_idContracte';
                $this->InsertUpdate($Fields, $Taula, $WHERE, $WHEREP, $CAMPAUTOINCREMENT, $Accio);
                break;
            case 'contractesfuncions':
                $WHERE = " where ctf_idFuncio = ? ";
                $WHEREP = array($Fields['ctf_idFuncio']);
                $CAMPAUTOINCREMENT = 'ctf_idFuncio';
                $this->InsertUpdate($Fields, $Taula, $WHERE, $WHEREP, $CAMPAUTOINCREMENT, $Accio);
                break;
            case 'entitats':
                $WHERE = " where e_idAjuntament = ? ";
                $WHEREP = array($Fields['e_idAjuntament']);
                $CAMPAUTOINCREMENT = 'e_idAjuntament';
                $this->InsertUpdate($Fields, $Taula, $WHERE, $WHEREP, $CAMPAUTOINCREMENT, $Accio);
                break;
            case 'espais':
                $WHERE = " where es_idEspai = ? ";
                $WHEREP = array($Fields['es_idEspai']);
                $CAMPAUTOINCREMENT = 'es_idEspai';
                $this->InsertUpdate($Fields, $Taula, $WHERE, $WHEREP, $CAMPAUTOINCREMENT, $Accio);
                break;
            case 'espectacles':
                $WHERE = " where ep_idEspectacle = ? ";
                $WHEREP = array($Fields['ep_idEspectacle']);
                $CAMPAUTOINCREMENT = 'ep_idEspectacle';
                $this->InsertUpdate($Fields, $Taula, $WHERE, $WHEREP, $CAMPAUTOINCREMENT, $Accio);
                break;
            case 'preus':
                $WHERE = " where p_idPreu = ? ";
                $WHEREP = array($Fields['p_idPreu']);
                $CAMPAUTOINCREMENT = 'p_idPreu';
                $this->InsertUpdate($Fields, $Taula, $WHERE, $WHEREP, $CAMPAUTOINCREMENT, $Accio);
                break;
            case 'projectes':
                $WHERE = " where pr_idProjecte = ? ";
                $WHEREP = array($Fields['pr_idProjecte']);
                $CAMPAUTOINCREMENT = 'pr_idProjecte';
                $this->InsertUpdate($Fields, $Taula, $WHERE, $WHEREP, $CAMPAUTOINCREMENT, $Accio);
                break;
            default:
                throw new PDOException('La taula no existeix');
                break;
                
                
        }
    }
    
    protected function doSaveP($M = array()) {
        
        /* Si enviem una cosa des del navegador, ho executem */
        $CridaHTTP = (isset($this->request['RowUpdates']) && !empty($this->request['RowUpdates']) && empty($M));
        $O = ($CridaHTTP)?$this->request['RowUpdates']:$M;
        
        foreach($O as $Row) {
            $Fields = array();
            foreach($Row['Fields'] as $F) { $Fields[$F['Camp']] = $F['Valor']; }
            $this->doSaveToTable($Row['Taula'], $Fields, $Row['tmp_action']);
            if (sizeof($Row['Multiples']) > 0) $this->doSaveP($Row['Multiples']);
        }
        
    }
    
    protected function doSave(){
        
        $this->dbh->beginTransaction();
        try {
            $this->doSaveP();
        } catch (PDOException $e) { $this->dbh->rollback(); return array($e->getMessage(), 500); }
        $this->dbh->commit();
        
        return array('OK', 200);
    }
    
    
    protected function uploadFile() {
        
        $RET = array();
        $Params = array();
        
        $Arxiu = $this->request['files']['file'];
        $TipusArxiu = $this->request['post']['TipusArxiuId'];
        $TipusArxiuNom = $this->request['post']['TipusArxiuNom'];
        $idU = $this->request['post']['idU'];
        
        $tmp_name = $Arxiu["tmp_name"];
        
        $name = $TipusArxiu . '_' . $TipusArxiuNom .'_' . $Arxiu['name'];
        // Primer mirem si el directori existeix, sinÃ³ el creem
        
        $base_dir = $this->LOCAL_URL . $idU;
        if (!file_exists($base_dir)) mkdir($base_dir);
        
        $dest_file = $base_dir . '/' . $name;
        if (!file_exists($dest_file)) touch($dest_file);
        
        if ( move_uploaded_file( $tmp_name, $dest_file ) ){
            $Params[] = $name;
            $Params[] = $idU;
            if ( $TipusArxiu == 1 ){
                $UPDATE = "UPDATE usuaris SET u_hasCurriculum = ? WHERE u_idUsuari = ?";
                $this->runQuery( $UPDATE, $Params );
            } elseif ($TipusArxiu == 2) {
                $UPDATE = "UPDATE usuaris SET u_hasFoto = ? WHERE u_idUsuari = ?";
                $this->runQuery( $UPDATE, $Params );
            }
            
            return array('OK', 200);
        }
        else {
            return array('No he pogut copiar l\'arxiu', 500); }
            
    }
    
    
    private function InsertUpdate($UM, $taula, $WHERE, $WHEREP, $CAMPAUTOINCREMENT, $ACCIO) {
        
        $NOMS = array();
        $VALS = array();
        $INT_INSERT = array();
        $INT_UPDATE = array();
        
        foreach($UM as $Nom => $Valor) {
            if (!($Nom == $CAMPAUTOINCREMENT && $ACCIO == "A")) {
                $NOMS[] = $Nom;
                $VALS[] = $Valor;
                $INT_INSERT[] = '?';
                $INT_UPDATE[] = $Nom . ' = ?';
            }
        }
        
        $INSERT = "INSERT INTO " . $taula . " (" . implode(",", $NOMS) .") VALUES (" . implode(",", $INT_INSERT) . ")";
        $UPDATE = "UPDATE " . $taula . " SET " . implode(",", $INT_UPDATE) . $WHERE;
        $DELETE = "DELETE FROM " . $taula . $WHERE;
        
        if( $ACCIO == 'U' ) {
            $Params = array_merge($VALS, $WHEREP);
            $this->runQuery( $UPDATE, $Params, false, false );
            return true;
        } elseif ( $ACCIO == 'A' ) {
            $this->runQuery( $INSERT, $VALS, false, false );
            return true;
        } elseif ( $ACCIO == 'D' ) {
            $this->runQuery( $DELETE, $WHEREP, false, false );
            return true;
        } else {
            return false;
        }
        
    }
    
    private function runQuery($Select, $Params, $getOne = false, $consulta = true) {
        
        $dbs = $this->dbh->prepare($Select);
        // $dbs->debugDumpParams();
        $dbs->execute($Params);
        if($consulta && $dbs->rowCount() > 0){
            $RET = $dbs->fetchAll(PDO::FETCH_ASSOC);
            if($getOne && isset($RET[0])) return $RET[0];
            else return $RET;
        }
        else return array();
    }
    
    
    
}

?>

 