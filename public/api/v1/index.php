<?php
header("Content-Type:application/json");

$scriptName = $_SERVER['SCRIPT_NAME']; // <-- "e.g /api/v1/index.php"
$requestUri = $_SERVER['REQUEST_URI']; // <-- "e.g /api/v1/login"
$physicalPath = str_replace('\\', '', dirname($scriptName)); // <-- "e.g /api/v1"
$env['PATH_INFO'] = substr_replace($requestUri, '', 0, strlen($physicalPath)); // <--returns "/login"

$data = json_decode(file_get_contents("php://input")); //Get data that is sent to the backend\

include_once "core/init.inc.php";
$fxns = new Functions($dbo);

$token = isset($data->token)? $data->token : $token; //Get or Generate token

if($env['PATH_INFO']==="/login"){
    $stmtChkUsr = "SELECT * FROM users where email=:email AND password = :password";
    $stmtChkUsr = $dbo->prepare($stmtChkUsr);
    $stmtChkUsr->execute(array(":email"=>$data->usr,":password"=>md5(base64_decode($data->pwd))));
    $user = $stmtChkUsr->fetchAll(PDO::FETCH_ASSOC);
    if(count($user)==1){
        $qryGivToken = "UPDATE users SET token =:token WHERE email=:email AND password = :password";
        $qryGivToken = $dbo->prepare($qryGivToken);
        $qryGivToken->execute(array(":token"=>$token,":email"=>$data->usr,":password"=>md5(base64_decode($data->pwd))));
        $response = array("response"=>"Success","token"=>$token);
    }else{
        $response = array("response"=>"Failure","message"=>"Username or password is incorrect.");
    }
    echo json_encode($response);
}

if($env['PATH_INFO']==="/logout"){
    try{
        $qryGivToken = "UPDATE user SET token =null WHERE token=:token";
        $qryGivToken = $dbo->prepare($qryGivToken);
        $qryGivToken->execute(array(":token"=>$token));
        $response = array("response"=>"Success","token"=>"You have been logged out");
    }catch(Exception $e){
        $response = array("response"=>"Failure","message"=> $e->getMessage());
    }
    echo json_encode($response);
}