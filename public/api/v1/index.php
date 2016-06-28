<?php
header("Content-Type:application/json");

$scriptName = $_SERVER['SCRIPT_NAME']; // <-- "e.g /api/v1/index.php"
$requestUri = $_SERVER['REQUEST_URI']; // <-- "e.g /api/v1/login"
$physicalPath = str_replace('\\', '', dirname($scriptName)); // <-- "e.g /api/v1"
$env['PATH_INFO'] = substr_replace($requestUri, '', 0, strlen($physicalPath)); // <--returns "/login"

$data = json_decode(file_get_contents("php://input")); //Get data that is sent to the backend

include_once "core/init.inc.php";
//$fxns = new Functions($dbo);


$stmt = $dbo->prepare("SELECT 'tenantId', '1' FROM class");
$stmt->execute();
$result = $stmt->fetch(PDO::FETCH_ASSOC);
var_dump($result);

//if($env['PATH_INFO']==="/login"){
//    $json = array("tenantId"=>1
//          , '$scriptName' => $scriptName
//          , '$requestUri' => $_SERVER['REQUEST_URI']
//          , 'physicalPath (replaced SCRIPT_NAME)' => $physicalPath
//          , 'PATH_INFO' => $env['PATH_INFO']
//        );
//    echo json_encode($json);
//}