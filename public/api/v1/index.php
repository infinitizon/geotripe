<?php
header("Content-Type:application/json");

$scriptName = $_SERVER['SCRIPT_NAME']; // <-- "e.g /api/v1/index.php"
$requestUri = $_SERVER['REQUEST_URI']; // <-- "e.g /api/v1/login"
$physicalPath = str_replace('\\', '', dirname($scriptName)); // <-- "e.g /api/v1"
$env['PATH_INFO'] = substr_replace($requestUri, '', 0, strlen($physicalPath)); // <--returns "/login"

$data = json_decode(file_get_contents("php://input")); //Get data that is sent to the backend
/*
 * Include initialization files
 * Useful for test
    $json = array("tenantId"=>1
    , '$scriptName' => $scriptName
    , '$requestUri' => $_SERVER['REQUEST_URI']
    , 'physicalPath (replaced SCRIPT_NAME)' => $physicalPath
    , 'PATH_INFO' => $env['PATH_INFO']
    );
    echo json_encode($json);
 */
include_once "core/init.inc.php";
$fxns = new Functions($dbo);
$token=isset($data->token)?$data->token:$token; //Get or Generate token
if($env['PATH_INFO']==="/login"){
    $stmtChkUsr = "SELECT * FROM users where email=:email AND password = :password";
    $stmtChkUsr = $dbo->prepare($stmtChkUsr);
    $stmtChkUsr->execute(array(":email"=>$data->usr,":password"=>md5(base64_decode($data->pwd))));
    $user = $stmtChkUsr->fetchAll(PDO::FETCH_ASSOC);
    if(count($user)==1){
        $qryGivToken = "UPDATE users SET token =:token WHERE email=:email AND password = :password";
        $qryGivToken = $dbo->prepare($qryGivToken);
        $qryGivToken->execute(array(":token"=>$token,":email"=>$data->usr,":password"=>md5(base64_decode($data->pwd))));
    }
    $login = array("token"=>$token);
    echo json_encode($login);
}


//$stmt = $dbo->prepare("SELECT 'tenantId', '1' FROM class");
//$stmt->execute();
//$result = $stmt->fetch(PDO::FETCH_ASSOC);
//var_dump($result);

