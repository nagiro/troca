<?php 

require_once('myapi.php');
error_reporting( E_ALL );
ini_set('display_errors', 0);

// Requests from the same server don't have a HTTP_ORIGIN header
if (!array_key_exists('HTTP_ORIGIN', $_SERVER)) {
    $_SERVER['HTTP_ORIGIN'] = $_SERVER['SERVER_NAME'];
}

try {
        
    $API = new MyAPI($_REQUEST['request'], $_SERVER['HTTP_ORIGIN']);
    echo $API->processAPI();
    
} catch (Exception $e) {
    // echo json_encode(Array('error' => $e->getMessage()));
    var_dump($e);
}

?>