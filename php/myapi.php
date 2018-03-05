<?php 
require_once 'api.php';
require_once 'const.php';
require_once './vendor/autoload.php';


class MyAPI extends API
{

    public $dbh;
    private $LOCAL_URL;
    
    public function __construct($request, $origin) {          
        parent::__construct($request);
        $this->dbh = new PDO( PDOString, Username, Password );
        $this->dbh->setAttribute( PDO::ATTR_EMULATE_PREPARES, false );
        $this->dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $this->LOCAL_URL = "../src/assets/docs/";
        
        
    }

    protected function getNew() {
        $Taula = $this->request['taula'];
        $Camp  = $this->request['camp'];
        
        $RET = $this->runQuery("Select COALESCE(Max({$Camp})+1,1) as Max from {$Taula}", array(), true, true);        
        if (empty($RET)) return array("No he trobat cap valor", 500);
        else return array($RET, 200);
    } 

    protected function getDadesTaulaById() {
        $Taula = $this->request['taula'];
        $Camp = $this->request['camp'];
        $id = $this->request['id'];
        $RET = $this->runQuery("Select * from {$Taula} WHERE {$Camp} = {$id}", array(), false, true);
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
        
        $C = $this->request['ContracteControl'];
        
        \PhpOffice\PhpWord\Settings::setTempDir($this->LOCAL_URL.'tmp/');
                                      
        $Select = "Select * from contractes where ctc_idContracte = 12";
        $Rows = $this->runQuery($Select, array(), false, true);        
                                      
        $CE = array();        
        $Companyies = array();
        foreach($Rows as $K => $Row) { 
            $Companyies[$Row['c_idCompanyia']] = $Row['c_Nom'];
            $CE[$Row['cte_idContracteEspectacle']] = array('CFL' => array(), 'Row' => $Row); 
            $CF[$Row['cte_idContracteEspectacle']]['CFL'][$Row['ctf_idFuncio']] = $Row; 
        }
        
        $phpword = new \PhpOffice\PhpWord\PhpWord();
        $T = $phpword->loadTemplate( $this->LOCAL_URL.'ModelsDocuments/Contracte2.docx');        
        
        $D = getdate();
        
        $T->setValue('DataDocument', htmlspecialchars("Girona, a ".$D['mday']." ".$this->getMes($D['mon'])." de ".$D['year']));        
        $T->setValue('LlistatCompanyies', implode(', ', $Companyies));
        $T->setValue('NomEntitat', htmlspecialchars($Rows[0]["e_Nom"]));
        $T->setValue('AdrecaEntitat', htmlspecialchars($Rows[0]["e_Adreca"]. ", ".$Rows[0]["e_CodiPostal"]." ".$Rows[0]["e_Ciutat"]));
        $T->setValue('CifEntitat', htmlspecialchars($Rows[0]["e_CIF"]));
        
        $dom = new DOMDocument();
        $dom->loadXML($T->tempDocumentMainPart);        
        $x = new DOMXPath($dom);
        $elements = $x->query('/w:document/w:body/w:p');
        $i = 0; $f = 0;
        $RET = $dom->createElement('conyos');
        foreach($dom->childNodes as $document) { 
            foreach($document->childNodes as $body) {                
                foreach($body->childNodes as $k => $p ) {                    
                    if ($p->nodeValue === '${BLOC1}') $i = $k;                    
                    if ($p->nodeValue === '${/BLOC1}') $f = $k;
                    if ($i > 0 && $f == 0) { $RET->appendChild($p); }
                    
                }
            }
        }
        
        var_dump($RET->childNodes); die;
        
        foreach($dom->childNodes as $document) {
            foreach($document->childNodes as $body) {
                foreach($body->childNodes as $k=>$p) {
                    if ($p->nodeValue === '${BLOC1}') $i = $k;
                    if ($p->nodeValue === '${/BLOC1}') $f = $k;
                    if ($i > 0 && $f == 0) { $RET[] = $p; }
                    
                }
            }
        }
        
        
        // print $item->nodeName . " = ". $item->nodeValue ."<br>";
        die;
                
        $BlocXmlCC = $this->getBlock('BLOC1', $XML);
        $BlocXmlCF = $this->getBlock('BLOC2', $XML);
        $BCCT = "";
        foreach($Companyies as $CC) {
            $BCC = $BlocXmlCC;            
            $BCC = str_replace("${NomCompanyia}", $CC['Row']['c_Nom'], $BCC);
            $BCC = str_replace("${NomEspectacle}", $CC['Row']['ep_Nom'], $BCC);
            $BCC = str_replace("${NomEspai}", $CC['Row']['es_Nom'], $BCC);
            $BCC = str_replace("${NomPoblacioEspai}", $CC['Row']['es_Poblacio'], $BCC);
            $BCFT = "";
            foreach($CC['CFL'] as $CF) {
                $BCF = $BlocXmlCF;
                $BCF = str_replace("${DataFuncio}", $CF['ctf_Data'], $BCF);
                $BCF = str_replace("${NomCompanyia}", $CF['c_Nom'], $BCF);
                $BCFT .= $BCF;
            }
            $this->replaceBlock("BLOC2", $BCFT, $BCC);
            $BCCT .= $BCC;
        }
        $T->replaceBlock("BLOC1", $BCCT);
        
        var_dump($T); die;        
        
        $T->saveAs($this->LOCAL_URL.'tmp/Doc.docx');
        
        return true;
    }
    
    function getArray($node)
    {
        $array = false;
        
        if ($node->hasAttributes())
        {
            foreach ($node->attributes as $attr)
            {
                $array[$attr->nodeName] = $attr->nodeValue;
            }
        }
        
        if ($node->hasChildNodes())
        {
            if ($node->childNodes->length == 1)
            {
                $array[$node->firstChild->nodeName] = $node->firstChild->nodeValue;
            }
            else
            {
                foreach ($node->childNodes as $childNode)
                {
                    if ($childNode->nodeType != XML_TEXT_NODE)
                    {
                        $array[$childNode->nodeName][] = $this->getArray($childNode);
                    }
                }
            }
        }
        
        return $array;
    } 
    

    public function getBlock($blockname, $xml)
    {
        $xmlBlock = null;
        preg_match(
            '/(<w:p.*>\${' . $blockname . '}<\/w:.*?p>)(.*)(<w:p.*\${\/' . $blockname . '}<\/w:.*?p>)/is',
            $xml,
            $matches
            );
        return $matches;
    }
    
    public function replaceBlock($blockname, $replacement, $XML)
    {
        preg_match(
            '/(<w:p.*>\${' . $blockname . '}<\/w:.*?p>)(.*)(<w:p.*\${\/' . $blockname . '}<\/w:.*?p>)/is',
            $XML,
            $matches
            );
        
        if (isset($matches[3])) {
            return str_replace(
                $matches[2] . $matches[3] . $matches[4],
                $replacement,
                $XML
                );
        }
    }
    
    
    
     ###########################################################
     # USUARIS 
     ###########################################################
          
     protected function doSaveToTable($Taula, $Fields, $Accio) {
         switch($Taula) {
             case 'Companyies':                  
                 $WHERE = " where c_idCompanyia = ? ";
                 $WHEREP = array($Fields['c_idCompanyia']);
                 $CAMPAUTOINCREMENT = 'c_idCompanyia';                                  
                 $this->InsertUpdate($Fields, $Taula, $WHERE, $WHEREP, $CAMPAUTOINCREMENT, $Accio);
                 break;
             case 'ContactesComercials':                 
                 $WHERE = " where ccco_idContacteComercial = ?  ";
                 $WHEREP = array($Fields['ccco_idContacteComercial']);
                 $CAMPAUTOINCREMENT = 'ccco_idContacteComercial';
                 $this->InsertUpdate($Fields, $Taula, $WHERE, $WHEREP, $CAMPAUTOINCREMENT, $Accio);
                 break;                 
             case 'ContracteEspectacles':
                 $WHERE = " where cte_idContracteEspectacle = ? ";
                 $WHEREP = array($Fields['cte_idContracteEspectacle']);
                 $CAMPAUTOINCREMENT = 'cte_idContracteEspectacle';
                 $this->InsertUpdate($Fields, $Taula, $WHERE, $WHEREP, $CAMPAUTOINCREMENT, $Accio);                 
                 break;
             case 'ContractesControl':
                 $WHERE = " where ctc_idContracte = ? ";
                 $WHEREP = array($Fields['ctc_idContracte']);
                 $CAMPAUTOINCREMENT = 'ctc_idContracte';
                 $this->InsertUpdate($Fields, $Taula, $WHERE, $WHEREP, $CAMPAUTOINCREMENT, $Accio);                 
                 break;
             case 'ContractesFuncions':
                 $WHERE = " where ctf_idFuncio = ? ";
                 $WHEREP = array($Fields['ctf_idFuncio']);
                 $CAMPAUTOINCREMENT = 'ctf_idFuncio';
                 $this->InsertUpdate($Fields, $Taula, $WHERE, $WHEREP, $CAMPAUTOINCREMENT, $Accio);
                 break;
             case 'Entitats':
                 $WHERE = " where e_idAjuntament = ? ";
                 $WHEREP = array($Fields['e_idAjuntament']);
                 $CAMPAUTOINCREMENT = 'e_idAjuntament';
                 $this->InsertUpdate($Fields, $Taula, $WHERE, $WHEREP, $CAMPAUTOINCREMENT, $Accio);
                 break;
             case 'Espais':
                 $WHERE = " where es_idEspai = ? ";
                 $WHEREP = array($Fields['es_idEspai']);
                 $CAMPAUTOINCREMENT = 'es_idEspai';
                 $this->InsertUpdate($Fields, $Taula, $WHERE, $WHEREP, $CAMPAUTOINCREMENT, $Accio);
                 break;
             case 'Espectacles':
                 $WHERE = " where ep_idEspectacle = ? ";
                 $WHEREP = array($Fields['ep_idEspectacle']);
                 $CAMPAUTOINCREMENT = 'ep_idEspectacle';
                 $this->InsertUpdate($Fields, $Taula, $WHERE, $WHEREP, $CAMPAUTOINCREMENT, $Accio);
                 break;
             case 'Preus':
                 $WHERE = " where p_idPreu = ? ";
                 $WHEREP = array($Fields['p_idPreu']);
                 $CAMPAUTOINCREMENT = 'p_idPreu';
                 $this->InsertUpdate($Fields, $Taula, $WHERE, $WHEREP, $CAMPAUTOINCREMENT, $Accio);
                 break;
             case 'Projectes':
                 $WHERE = " where pr_idProjecte = ? ";
                 $WHEREP = array($Fields['pr_idProjecte']);
                 $CAMPAUTOINCREMENT = 'pr_idProjecte';
                 $this->InsertUpdate($Fields, $Taula, $WHERE, $WHEREP, $CAMPAUTOINCREMENT, $Accio);
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
     
     protected function getOneUsuari() {
                  
         $idU = $this->request['id'];
         $Params = array($idU);
         
         $Dades = array(
             "Dades" => array(), 
             "Estudis" => array(),
             "ExperienciaLaboral" => array(),
             "Seguiment" => array(),
             "Idiomes" => array(),
             "Files" => array(),
             "CampsMultiples" => array(),
             "DadesContacte" => array(),
         );
         
         try {
                 
             $Dades['Dades'] = $this->runQuery('Select * from Usuaris u WHERE u.u_idUsuari = ?', $Params, true);             
             $Dades['Estudis'] = $this->runQuery('Select * from usuariestudis WHERE ue_fk_IdUsuari = ?', $Params);
             $Dades['ExperienciaLaboral'] = $this->runQuery('Select * from usuariexperiencialaboral WHERE uel_fk_idUsuari = ?', $Params);
             $Dades['Seguiment'] = $this->runQuery('Select s.* from seguiment s WHERE s.s_fk_idUsuari = ?', $Params);
             $Dades['Idiomes'] = $this->runQuery('Select * from usuariidiomes WHERE ui_idUsuari = ?', $Params);
             $Dades['CampsMultiples'] = $this->runQuery("Select * from campsmultiples WHERE cm_idExtern = ? AND cm_Taula = 'u' ", $Params);
             $Dades['DadesContacte'] = $this->runQuery("Select * from ext_dades_contacte WHERE dc_idExtern = ? AND dc_Taula = 'u'", $Params);
             $Dades['Files'] = array('base' => '', 'files' => array() );
                          
             //Carrego els arxius que tÃ© l'usuari
             $users_folder = $this->LOCAL_URL . $idU . '/';             
             
             if (!file_exists($users_folder)) { mkdir($users_folder, 0777, true); }             
             $LlistatArxius = scandir($users_folder);
             $Dades['Files']['base'] = $users_folder;
             foreach(scandir($users_folder) as $V) { 
                 if($V != '.' && $V != '..'){
                     $t = date('Y-m-d', filectime( $users_folder.$V));
                     $Tipus = explode("_", $V)[0];
                     $Dades['Files']['files'][] = array('name'=>$V, 'date'=> $t, 'type' => $Tipus) ;
                 }
             }                                                        
                                                                  
             return array($Dades, 200);
             
         } catch (PDOException $e) { return array($e->getMessage(), 500); }
         
     }

     protected function getUsuaris() {
        
        $P = $this->request['post'];
 
        $Pi = (isset($P['pageIndex']))?intval($P['pageIndex']):0;
        $Ps = (isset($P['pageSize']))?intval($P['pageSize']):50;
        $Inici = $Pi * $Ps;                          
        $O = (isset($P['Oferta']))?json_decode($P['Oferta'], true):array();                   
        $OnlySelected = (isset($P['OnlySelected']))?$P['OnlySelected']:'0';                                   
        $Q = (isset($P['q']))?'%'.$P['q'].'%':'';
        $Params = array();
         
        /* Carrego els camps de l'estructura oferta a un array pla */
        $PO = array();
        foreach($O['RowUpdates'] as $V) {
            foreach($V['Fields'] as $C) {
                $PO[$C['Camp']] = $C['Valor'];                
            }                
            foreach($V['Multiples'] as $M) {
                //cm_idExtern 0, cm_Camp 1, cm_idForeignKey 2, cm_Taula 3, cm_Text 4, cm_isText 5
                /* Si el camp extra tÃ© l'acciÃ³ d'esborrar-lo, no ha d'aparÃ¨ixer */
                if ($M['tmp_action'] != 'D') {
                    $PO[$M['Fields'][1]['Valor']][] = $M['Fields'][2]['Valor'];
                }
            }               
        }        
                
        /* Carrego tots els camps obligats possibles */        
        $T = $this->runQuery("Select * from ext_duals where categoria = 'CAMP_OBLIGAT'", array());
        foreach($T as $V) $LlistatCampsObligats[$V['id']] = $V['text'];        
        $CampsObligats = array();
        foreach($PO['o_CampsObligats'] as $Camp) { $CampsObligats[ $LlistatCampsObligats[$Camp] ] = $LlistatCampsObligats[$Camp]; }        

        
        /* Formatejo les categories i subcategories */        
        if (isset($CampsObligats['o_CategoriesLab']) && !empty($PO['o_CategoriesLab'])){
            $CategoriesLab = implode(",", $PO['o_CategoriesLab']);
            $uel_C = " uel.uel_fk_CategoriaLab in (".$CategoriesLab.") ";
            $cm_C = " cm.cm_Taula = 'u' AND cm.cm_Camp = 'u_CategoriesLab' AND cm.cm_idForeignKey in (".$CategoriesLab.") ";
        } 
        if (isset($CampsObligats['o_SubCategoriesLab']) && !empty($PO['o_SubCategoriesLab'])){
            $SubCategoriesLab = implode(",", $PO['o_SubCategoriesLab']);
            $uel_SC = " uel.uel_fk_SubCategoriaLab in (".$SubCategoriesLab.") ";
            $cm_SC = " cm.cm_Taula = 'u' AND cm.cm_Camp = 'u_SubCategoriesLab' AND cm.cm_idForeignKey in (".implode(",", $PO['o_SubCategoriesLab']).") ";
        }
        if (!empty($CategoriesLab) && !empty(SubCategoriesLab)){
            $uel_OR = " OR ";
        }
                          
        
        /* Calculo les noves ponderacions segons el que estem estipulant */
        if (!empty($O)) $this->calcPonderacionsOfertes($PO);
        
        /* FAIG LES SELECTS */
        $hasPuntuacio = (isset($PO['o_idOferta']) && $PO['o_idOferta'] > 0)?1:0;
        $Puntuacio = array(
            1 => array(
                " ,uop.uop_puntuacio as uop_puntuacio ",
                " LEFT JOIN usuarisofertespuntuacions uop ON ( uop.uop_idUsuari = u.u_idUsuari AND uop.uop_idOferta = {$PO['o_idOferta']}) "
            ),
            0 => array(" ,0 as uop_puntuacio ")
        );
        
        $SelectC ='Select FOUND_ROWS() as c';
        $Select = "
        SELECT SQL_CALC_FOUND_ROWS u.u_idUsuari, u.u_idUsuari, u.u_Nom, u.u_Cognoms, u.u_DNI, u.u_DataEntrada, u.u_DataModificacio, u.u_Disponibilitat, u_hasCurriculum,
            DATEDIFF(CURRENT_DATE, u.u_DataNaixement)/365 AS ageInYears,
            MAX(ue.ue_Ext_NivellEstudi) as nivellestudis
            {$Puntuacio[$hasPuntuacio][0]}
            
        ";
        $From = "
            FROM usuaris u
            LEFT JOIN usuariestudis ue ON (u.u_idUsuari = ue.ue_fk_IdUsuari)
            LEFT JOIN ofertesusuaris ou ON ( ou.ou_fk_idUsuari = u.u_idUsuari )
            {$Puntuacio[$hasPuntuacio][1]} ";
       
        $W = " WHERE 1 = 1 ";
                
        if($Q != '%%' && $Q != '') { $W .= " AND u.u_Nom like ? OR u.u_Cognoms like ? "; $Params[] = $Q; $Params[] = $Q; }
        if($OnlySelected == '1') { $W .= " AND ou.ou_fk_idOferta = ? AND ou.ou_Informat = 1 "; $Params[] = $PO['o_idOferta']; }
                       
        /* HaurÃ­em de recalcular amb el que tenim aquÃ­ */
        if(isset($CampsObligats['o_NivellFormatiu'])) { 
            $W .= " AND u.u_idUsuari in (Select u.u_idUsuari as usuari from usuariestudis ue WHERE ue.ue_Ext_NivellEstudi > ?) "; $Params[] = $PO['o_NivellFormatiu']; 
        }
        
        if( isset($CampsObligats['o_CategoriesLab']) || isset($CampsObligats['o_SubCategoriesLab'] )) { 
            $W .= " AND u.u_idUsuari in ( Select cm.cm_idExtern as usuari FROM campsmultiples cm WHERE 1 = 1 ";
            if(isset($CampsObligats['o_CategoriesLab']) ) { $W .= " AND ( cm.cm_Taula = 'u' AND cm.cm_Camp = 'u_CategoriesLab' AND cm.cm_idForeignKey in (".implode(",", $PO['o_CategoriesLab']).") ) "; }
            if(isset($CampsObligats['o_SubCategoriesLab']) ) { $W .= " AND ( cm.cm_Taula = 'u' AND cm.cm_Camp = 'u_SubCategoriesLab' AND cm.cm_idForeignKey in (".implode(",", $PO['o_SubCategoriesLab']).") ) "; }
            if(isset($CampsObligats['o_Experiencia']) ) { 
                $T = array( 
                    " uel.uel_fk_CategoriaLab in (".implode(",", $PO['o_CategoriesLab']).") ", 
                    " uel.uel_fk_SubCategoriaLab in (".implode(",", $PO['o_SubCategoriesLab']).") ");
                $W .= " AND ( cm.cm_idExtern in (
                            SELECT u.u_idUsuari from usuaris u, usuariexperiencialaboral uel
                            WHERE 1 = 1 AND ".implode("OR", $T)."  
                            GROUP BY u.u_idUsuari
                            having sum(uel.uel_TempsTreballat) > ?))";
                $Params[] = $PO['o_Experiencia'];
            }
            $W .= ")";
        }
        if(isset($CampsObligats['o_isAltresPrestacions']) ) {
            if($PO['o_isAltresPrestacions'] == 1) { $W .= " AND u.u_idUsuari in (Select cm.cm_idExtern, count(cm.cm_idExtern) as usuari FROM campsmultiples cm WHERE cm.cm_Taula = 'u' AND cm.cm_Camp = 'u_AltresPrestacions' having count(cm.cm_idExtern) > 0) "; }
            elseif($PO['o_isAltresPrestacions'] == 0) { $W .= " AND u.u_idUsuari in (Select cm.cm_idExtern, count(cm.cm_idExtern) as usuari FROM campsmultiples cm WHERE cm.cm_Taula = 'u' AND cm.cm_Camp = 'u_AltresPrestacions' having count(cm.cm_idExtern) = 0) "; }         
        }        
        if(isset($CampsObligats['o_Competencies']) ) {        
            $W .= " AND u.u_idUsuari in (Select cm.cm_idExtern as usuari FROM campsmultiples cm WHERE cm.cm_Taula = 'u' AND cm.cm_Camp = 'u_Competencies' AND cm.cm_idForeignKey in (".implode(",", $PO['o_Competencies']).")) ";
        }
        if(isset($CampsObligats['o_Idiomes']) ) {
            $W .= " AND u.u_idUsuari in (Select ui.ui_idUsuari as usuari FROM usuariidiomes ui WHERE ui.ui_Idioma in (".implode(",", $PO['o_Idiomes']).")) ";
        }
        if(isset($CampsObligats['o_PermisosConduir']) ) {
            $W .= " AND u.u_idUsuari in (Select cm.cm_idExtern as usuari FROM campsmultiples cm WHERE cm.cm_Taula = 'u' AND cm.cm_Camp = 'u_CarnetsConduir' AND cm.cm_idForeignKey in (".implode(",", $PO['o_PermisosConduir']).")) ";
        }
        if(isset($CampsObligats['o_ZonaFeina']) ) { $W .= " AND u.u_ZonaFeina >= ? "; $Params[] = $PO['o_ZonaFeina']; }                                  
        if(isset($CampsObligats['o_TipusJornada']) ) { $W .= " AND u.u_Disponibilitat = ? "; $Params[] = $PO['o_TipusJornada']; }        
        if(isset($CampsObligats['o_SalariBaix']) ) { $W .= " AND u.u_Salari > ? "; $Params[] = $PO['o_SalariBaix']; }
        if(isset($CampsObligats['o_SalariAlt']) ) { $W .= " AND u.u_Salari < ? "; $Params[] = $PO['o_SalariAlt']; }        
        if(isset($CampsObligats['o_EdatInicial']) ) {
            $T = strtotime("-".$PO['o_EdatInicial']." year", time());
            $W .= " AND u.u_DataNaixement >= ? "; $Params[] = date('Y-m-d', $T); 
        }
        if(isset($CampsObligats['o_EdatFinal']) ) {
            $T = strtotime("-".$PO['o_EdatFinal']." year", time());
            $W .= " AND u.u_DataNaixement <= ? "; $Params[] = date('Y-m-d', $T);
        }        
        if(isset($CampsObligats['o_TipusRelacioLaboral']) ) {
            if($PO['o_isEspanyol'] == 1) { $W .= " AND u.u_AltaAutonoms = 1 "; }
            elseif($PO['o_isEspanyol'] == 0) { $W .= " AND u.u_AltaAutonoms = 0 ";}
        }
        if(isset($CampsObligats['o_isEspanyol']) ) {
            if($PO['o_isEspanyol'] == 1) { $W .= " AND u.u_fk_Nacionalitat = ? "; $Params[] = 108; }
            elseif($PO['o_isEspanyol'] == 0) { $W .= " AND u.u_fk_Nacionalitat <> ? "; $Params[] = 108; } 
        }
        if(isset($CampsObligats['o_isInscritSoc']) ) { 
            if ($PO['o_isInscritSoc'] == 1) { $W .= " AND u.u_InscritAlSoc = 1 "; }
            elseif ($PO['o_isInscritSoc'] == 0) { $W .= " AND ( u.u_InscritAlSoc = 0 )"; }                         
        }                               
        if(isset($CampsObligats['o_VehiclePropi']) ) {
            if ($PO['o_VehiclePropi'] == 1) { $W .= " AND u.u_VehiclePropi = 1 "; }
            elseif($PO['o_VehiclePropi'] == 0) { $W .= " AND ( u.u_VehiclePropi = 0 )"; }
        }
        if(isset($CampsObligats['o_isPirmi']) ) {
            if ($PO['o_isPirmi'] == 1) { $W .= " AND u.u_Pirmi = 1 "; }
            elseif($PO['o_isPirmi'] == 0) { $W .= " AND ( u.u_Pirmi = 0 )"; }                       
        }  
        if(isset($CampsObligats['o_PirmiData']) ) { $W .= " AND u.u_DataPirmi>= ? "; $Params[] = $PO['o_PirmiData']; }        
        if(isset($CampsObligats['o_TipusMinusvalia']) ) {
            if ($PO['o_TipusMinusvalia'] >= 0) { $W .= " AND u.u_Minusvalia = ? "; $Params[] = $PO['o_TipusMinusvalia']; }
        }
        
        if(isset($CampsObligats['o_MinusvaliaPercentatge']) ) {
            // de 33 a 64
            if ($PO['o_MinusvaliaPercentatge'] == 33 ) { $W .= " AND u.u_MinusvaliaPercentatge <= 64 && u.u_MinusvaliaPercentatge >= 33 "; }
            // MÃ©s de 65
            else if($PO['o_MinusvaliaPercentatge'] == 65) { $W .= " AND u.u_MinusvaliaPercentatge > 64 "; }                     
        }        
        
        $GROUPBY = " GROUP BY u.u_idUsuari, u.u_Nom, u.u_Cognoms, u.u_DNI, u.u_DataEntrada, u.u_DataModificacio, u_hasCurriculum,	ageInYears, uop_puntuacio ";
        $ORDER  = " ORDER BY uop_puntuacio desc, u.u_Cognoms asc, u.u_Nom desc ";
        $LIMIT  = " LIMIT ? OFFSET ? "; $Params[] = $Ps; $Params[] = $Inici;        
                          
         try {
                                                                     
             $SQL = $Select . $From . $W . $GROUPBY . $ORDER . $LIMIT;             
             $TMP2 = $this->runQuery($SQL, $Params);
                          
             $SQL = $SelectC;
             $TMP = $this->runQuery($SQL, array());
                                      
             return array(array('c' => $TMP[0]['c'], 'List' => $TMP2), 200);
             
         } catch (PDOException $e) { var_dump($e); return array($e->toString(), 500); }
         
     }
               
     
     ###########################################################
     # OFERTES
     ###########################################################

     protected function getNewOfertaId() {
         
         $RET = array();
         $Params = array();
         
         try {
             
             $RET = $this->runQuery('SELECT (Max(o_idOferta) + 1) as id from ofertes', $Params, true);
             return array($RET['id'], 200);
             
         } catch (PDOException $e) { return array($e->getMessage(), 500); }
     }
     
     
     protected function getUsuariOfertes() {
         $idu = $this->request['idu'];         
         $Params = array($idu);
         try {
             
            $RET = $this->runQuery("Select * from ofertesusuaris ou LEFT JOIN ofertes o ON (ou_fk_idOferta = o_idOferta) WHERE ou_fk_idUsuari = ?", $Params);
            
         } catch (PDOException $e) { return array($e->getMessage(), 500); }
         
         return array($RET, 200);
     }
     
     protected function getOneOferta() {
                  
         $idu = $this->request['idu'];
         $ido = $this->request['ido'];
         $Params = array($ido, $idu);
         $ParamsO = array($ido);
         
         $Dades = array(
             "Dades" => array(),
             "Usuaris" => array(),
             "Seguiment" => array()             
         );
         
         $SelectU = "Select * 
			  FROM ofertesusuaris ou 
			  LEFT JOIN usuaris u ON (ou.ou_fk_idUsuari = u.u_idUsuari) 
			 WHERE ou.ou_fk_idOferta = ?;";
         $SelectS = "Select * 
		      FROM seguiment s 
		      WHERE ( s.s_fk_idOferta = ? && s.s_fk_idOferta > 0 );";
         $SelectO = "Select * 
			  FROM ofertes o LEFT JOIN empreses e ON (e.e_idEmpresa = o.o_fk_idEmpresa)
			 WHERE o.o_idOferta = ?;";
         $SelectM = "Select * from campsmultiples cm WHERE cm.cm_idExtern = ? AND cm.cm_Taula = 'o'";
         
         try {
             
             $Dades['Dades'] = $this->runQuery($SelectO, $ParamsO, true);                         
             $Dades['Usuaris'] = $this->runQuery($SelectU, $ParamsO);
             $Dades['Seguiment'] = $this->runQuery($SelectS, $ParamsO);
             $Dades['CampsMultiples'] = $this->runQuery($SelectM, $ParamsO);
                         
             return array($Dades, 200);
             
         } catch (PDOException $e) { return array($e->getMessage(), 500); }
         
     }
     
     protected function getOfertes() {
         
         $Pi = (isset($this->request['pageIndex']))?intval($this->request['pageIndex']):0;
         $Ps = (isset($this->request['pageSize']))?intval($this->request['pageSize']):10;
         $Q = (isset($this->request['q']))?'%'.$this->request['q'].'%':'';
         $Estat = (isset($this->request['estat']))?$this->request['estat']:'';
         $Inici = $Pi * $Ps;                  
         $Params = array();
         
         $SelectC ='Select FOUND_ROWS() as c';
         $Select = "SELECT SQL_CALC_FOUND_ROWS e.e_NomComercial, o.o_Estat, o.o_Nom, o.o_DataAlta, o.o_idOferta, count(*) as tmp_quants_inscrits ";
         $FROM = "
    		FROM ofertes o 
		    LEFT JOIN ofertesusuaris ou ON ( o.o_idOferta = ou.ou_fk_idOferta )    
		    LEFT JOIN empreses e ON ( o.o_fk_idEmpresa = e.e_idEmpresa )    
		    LEFT JOIN usuaris u ON ( ou.ou_fk_idUsuari = u.u_idUsuari )
    	       ";
         
         $W = ' WHERE 1 = 1 ';
         if($Q != '%%' && $Q != '') { $W .= " AND e.e_NomComercial like ? OR o.o_Nom like ? "; $Params[] = $Q; $Params[] = $Q; }
         if(isset($this->request['estat'])) { $W .= " AND o.o_Estat = ? "; $Params[] = $Estat; }
         $GROUPBY = " GROUP BY e.e_NomComercial, o.o_Estat, o.o_Nom, o.o_DataAlta, o.o_idOferta ";
         $ORDER  = " ORDER BY o.o_DataAlta desc ";
         $LIMIT  = " LIMIT ? OFFSET ? "; $Params[] = $Ps; $Params[] = $Inici;
         
         try {
                                      
             $SQL = $Select . $FROM . $W . $GROUPBY . $ORDER . $LIMIT;
             $TMP2 = $this->runQuery($SQL, $Params);
             
             $SQL = $SelectC;
             $TMP = $this->runQuery($SQL, array());             
             
             return array(array('c' => $TMP[0]['c'], 'List' => $TMP2), 200);
             
         } catch (PDOException $e) { return array($e->getMessage(), 500); }
         
     }
 
     /* FunciÃ³ que calcula les ponderacions i Ã©s cridada des de getUsuari quan entra una oferta */
     protected function calcPonderacionsOfertes($OfertesFields) {
        
        $F = $OfertesFields;                
                                      
        $SQL = "delete from usuarisofertespuntuacions where uop_idOferta = {$F['o_idOferta']}";
        $Dades = $this->runQuery($SQL, array(), false, false);        
        
        $SQL = "INSERT INTO usuarisofertespuntuacions (";
        $SQL .= " SELECT id, {$F['o_idOferta']}, sum(Val)";
        $SQL .= " FROM ( ";
        $SQL .= " ( Select u_idUsuari as id, u_ZonaFeina * 100 as Val from usuaris WHERE u_ZonaFeina >= {$F['o_ZonaFeina']} ) ";
        $SQL .= " UNION ALL ";
        
        if( !empty($F['o_SubCategoriesLab'])):
            $SQL .= " ( Select u.u_idUsuari as id, sum(cm.cm_idForeignKey IS NOT NULL) * 100 as Val FROM usuaris u LEFT JOIN campsmultiples cm ON ( u.u_idUsuari = cm.cm_idExtern AND cm.cm_Camp = 'u_SubCategoriesLab' AND cm.cm_idForeignKey in (".implode(',',$F['o_SubCategoriesLab']).") ) group by u_idUsuari ) ";
            $SQL .= " UNION ALL ";
            $SQL .= " ( Select uel.uel_fk_idUsuari as id, (uel.uel_TempsTreballat * 10) as Val from usuariexperiencialaboral uel WHERE uel.uel_fk_SubCategoriaLab in (".implode(",",$F['o_SubCategoriesLab']).") ) ";
            $SQL .= " UNION ALL ";
        endif;

        if( !empty($F['o_CategoriesLab'])):        
            $SQL .= " ( Select u.u_idUsuari as id, sum(cm.cm_idForeignKey IS NOT NULL) * 50 as Val FROM usuaris u LEFT JOIN campsmultiples cm ON ( u.u_idUsuari = cm.cm_idExtern AND cm.cm_Camp = 'u_CategoriesLab' AND cm.cm_idForeignKey in (".implode(',',$F['o_CategoriesLab']).") ) group by u_idUsuari ) ";
            $SQL .= " UNION ALL ";
            $SQL .= " ( Select uel.uel_fk_idUsuari as id, (uel.uel_TempsTreballat * 5) as Val from usuariexperiencialaboral uel WHERE uel.uel_fk_CategoriaLab in (".implode(",",$F['o_CategoriesLab']).") ) ";
            $SQL .= " UNION ALL ";
        endif;
        
        $SQL .= " ( Select ue.ue_fk_IdUsuari as id, ue.ue_Ext_NivellEstudi from usuariestudis ue WHERE ue.ue_Ext_NivellEstudi >= {$F['o_NivellFormatiu']} ) ";
        $SQL .= " UNION ALL ";
        
        if (!empty($F['o_Competencies'])):
            $SQL .= " ( Select u.u_idUsuari as id, sum(cm.cm_idForeignKey IS NOT NULL) * 100 as Val 
                        from usuaris u LEFT JOIN campsmultiples cm ON ( u.u_idUsuari = cm.cm_idExtern AND cm.cm_Camp = 'u_Competencies' AND cm.cm_idForeignKey in (".implode(',',$F['o_Competencies']).") )  GROUP BY u.u_idUsuari ) ";        
            $SQL .= " UNION ALL ";
        endif;
                        
        if (!empty($E['o_Idiomes'])):
            $SQL .= " ( Select ui.ui_idUsuari as id, 100 * ui.ui_NivellIdioma from usuariidiomes ui WHERE ui.ui_Idioma in (".implode(",", $F['o_Idiomes']).") ) ";
            $SQL .= " UNION ALL ";
        endif;
        
        if (!empty($F['o_PermisosConduir'])):
            $SQL .= " ( Select u.u_idUsuari as id, sum(cm.cm_idForeignKey IS NOT NULL) * 50 as Val
                        from usuaris u LEFT JOIN campsmultiples cm ON ( u.u_idUsuari = cm.cm_idExtern AND cm.cm_Camp = 'u_PermisosConduir' AND cm.cm_idForeignKey in (".implode(',',$F['o_PermisosConduir']).") )  GROUP BY u.u_idUsuari ) ";
            $SQL .= " UNION ALL ";
        endif;
        
        $SQL .= " ( Select u_idUsuari as id, 20 FROM usuaris WHERE u_VehiclePropi = {$F['o_VehiclePropi']} ) ";
        $SQL .= " UNION ALL ";
        $SQL .= "     ( Select u_idUsuari as id, 20 FROM usuaris WHERE u_AltaAutonoms = {$F['o_AltaAutonoms']} ) ";
        $SQL .= " UNION ALL ";
        $SQL .= "     ( Select u_idUsuari as id, 20 FROM usuaris WHERE u_Disponibilitat = {$F['o_TipusJornada']} ) ";
        $SQL .= " UNION ALL ";
        
        if ($F['o_EdatInicial'] > 0) {
            $D1 = new DateTime(date('Y-m-d',time()));
            $D1->sub(new DateInterval('P'.$F['o_EdatInicial'].'Y'));
            $F['o_EdatInicial'] = $D1->format('Y-m-d');
        }
        
        if ($F['o_EdatFinal'] > 0) { 
            $D1 = new DateTime(date('Y-m-d',time()));
            $D1->sub(new DateInterval('P'.$F['o_EdatFinal'].'Y'));
            $F['o_EdatFinal'] = $D1->format('Y-m-d');
        }
        $SQL .= "     ( Select u_idUsuari as id, 20 FROM usuaris WHERE u_DataNaixement < '{$F['o_EdatInicial']}' AND u_DataNaixement > '{$F['o_EdatFinal']}' ) ";
        $SQL .= " UNION ALL ";
        if ($F['o_isEspanyol']) { $F['o_isEspanyol'] = 108; }
        $SQL .= "     ( Select u_idUsuari as id, 20 FROM usuaris WHERE u_fk_Nacionalitat = {$F['o_isEspanyol']} ) ";
        $SQL .= " UNION ALL ";
        $SQL .= "     ( Select u_idUsuari as id, 20 FROM usuaris WHERE u_InscritAlSoc = {$F['o_isInscritSoc']} ) ";
        $SQL .= " UNION ALL ";
        $SQL .= "     ( Select u_idUsuari as id, 20 FROM usuaris WHERE u_Pirmi = {$F['o_isPirmi']} ) ";
        $SQL .= " UNION ALL ";
        $SQL .= "     ( Select u_idUsuari as id, 20 FROM usuaris WHERE u_DataPirmi > '{$F['o_PirmiData']}' ) ";
        $SQL .= " UNION ALL ";
        $SQL .= "     ( Select u_idUsuari as id, 20 FROM usuaris WHERE u_Minusvalia = {$F['o_TipusMinusvalia']} AND u_MinusvaliaPercentatge > {$F['o_MinusvaliaPercentatge']} ) ";        
       $SQL .= " ) as T1 ";
       $SQL .= " GROUP BY id);";                 
       
       $Dades = $this->runQuery($SQL, array(), false, false);
       return array($Dades, 200);              
                                            
     }
     
     
     ###########################################################
     # EMPRESES
     ###########################################################

     protected function getOneEmpresa() {
         
         $idE = $this->request['id'];         
         $Params = array($idE);
         
         $Dades = array(
             "Dades" => array(),
             "CampsMultiples" => array(),
             "DadesContacte" => array(),             
         );
                           
         try {
             
             $Dades['Dades'] = $this->runQuery("Select * FROM empreses e WHERE e.e_idEmpresa = ?;", $Params, true);
             $Dades['DadesContacte'] = $this->runQuery("Select * from ext_dades_contacte dc where dc.dc_idExtern = ? AND dc.dc_Taula = 'e'", $Params);
             $Dades['CampsMultiples'] = $this->runQuery('Select * from campsmultiples WHERE cm_idExtern = ?', $Params);
             return array($Dades, 200);
             
         } catch (PDOException $e) { return array($e->getMessage(), 500); }
         
     }
     
     protected function getEmpreses() {
         
         $Pi = (isset($this->request['pageIndex']))?intval($this->request['pageIndex']):0;
         $Ps = (isset($this->request['pageSize']))?intval($this->request['pageSize']):10;
         $Q = (isset($this->request['q']))?'%'.$this->request['q'].'%':'';
         $Inici = $Pi * $Ps;
         $Params = array();
         
         $SelectC ='Select FOUND_ROWS() as c';
         $Select = "SELECT SQL_CALC_FOUND_ROWS e.e_idEmpresa, e.e_DataModificacio, e.e_DataAlta, e.e_NIF, e.e_NomComercial, e.e_PersonaContacte, e.e_ActivitatPrincipal ";
         $FROM = " FROM empreses e ";     		
         
         $W = ' WHERE 1 = 1 ';
         if($Q != '%%' && $Q != '') { $W = " AND e.e_NomComercial like ? OR e.e_RaoSocial like ? "; $Params[] = $Q; $Params[] = $Q; }
         $GROUPBY = " GROUP BY e.e_idEmpresa ";
         $ORDER  = " ORDER BY e.e_NomComercial asc ";
         $LIMIT  = " LIMIT ? OFFSET ? "; $Params[] = $Ps; $Params[] = $Inici;
         
         try {
                                                               
             $SQL = $Select . $FROM . $W . $GROUPBY . $ORDER . $LIMIT;             
             $TMP2 = $this->runQuery($SQL, $Params);
             
             $SQL = $SelectC;
             $TMP = $this->runQuery($SQL, array());             
                          
             return array(array('c' => $TMP[0]['c'], 'List' => $TMP2), 200);
             
         } catch (PDOException $e) { return array($e->getMessage(), 500); }
         
     }
     
     protected function getNewEmpresaId() {
         
         $RET = array();
         $Params = array();
         
         try {
             
             $RET = $this->runQuery('SELECT (Max(e_idEmpresa) + 1) as id from empreses WHERE e_idEmpresa', $Params);             
             return array($RET[0]['id'], 200);
             
         } catch (PDOException $e) { return array($e->getMessage(), 500); }
         
     }
     
     
     
     ######################################################################
     # FUNCIONS GENERALS
     ######################################################################
          
     
     protected function getExtDualsNewId() {
         $CAMP = (isset($this->request['camp']))?$this->request['camp']:'';
         $SQL = "Select max(id)+1 as max from ext_duals where categoria = ?";
         $Params = array($CAMP);
         
         try {                         
             $TMP = $this->runQuery($SQL, $Params);                      
             return array($TMP[0]['max'], 200);             
         } catch (PDOException $e) { return array($e->getMessage(), 500); }
         
     }
     
     protected function getExtDuals() {
         $Pi = (isset($this->request['pageIndex']))?intval($this->request['pageIndex']):0;
         $Ps = (isset($this->request['pageSize']))?intval($this->request['pageSize']):10;
         $Q = (isset($this->request['q']))?'%'.$this->request['q'].'%':'';
         $CAMP = (isset($this->request['camp']))?$this->request['camp']:'';
         $Inici = $Pi * $Ps;
         $Params = array();
         
         $SelectC ='Select FOUND_ROWS() as c';
         $Select = "SELECT SQL_CALC_FOUND_ROWS id, categoria, text ";
         $FROM = " FROM ext_duals ";
         $W = ' WHERE 1 = 1 ';         
         if ($CAMP != '') { $W .= " AND categoria = ?"; $Params[] = $CAMP; }
         $ORDER  = " ORDER BY categoria, id asc ";
         $LIMIT  = " LIMIT ? OFFSET ? "; $Params[] = $Ps; $Params[] = $Inici;         
         
         try {
             
             $SQL = $Select . $FROM . $W . $ORDER . $LIMIT;
             $TMP2 = $this->runQuery($SQL, $Params);
             
             $SQL = $SelectC;
             $TMP = $this->runQuery($SQL, array());
             
             return array(array('c' => $TMP[0]['c'], 'List' => $TMP2), 200);
             
         } catch (PDOException $e) { return array($e->getMessage(), 500); }
         
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
             $this->runQuery( $UPDATE, $Params, false );
             return true;
         } elseif ( $ACCIO == 'A' ) {             
             $this->runQuery( $INSERT, $VALS, false );
             return true;
         } elseif ( $ACCIO == 'D' ) {
             $this->runQuery( $DELETE, $WHEREP, false );
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
