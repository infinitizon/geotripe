<?php
header("Content-Type:application/json");
//echo 'problem in quote!';
$scriptName = $_SERVER['SCRIPT_NAME']; // <-- "e.g /api/v1/index.php"
$requestUri = $_SERVER['REQUEST_URI']; // <-- "e.g /api/v1/login"
$physicalPath = str_replace('\\', '', dirname($scriptName)); // <-- "e.g /api/v1"
$env['PATH_INFO'] = substr_replace($requestUri, '', 0, strlen($physicalPath)); // <--returns "/login"
//https://www.olx.com.ng/ad/honda-accord-2005-ID15KkhD.html#6d45d1b9e3
$data = json_decode(file_get_contents("php://input")); //Get data that is sent to the backend\

if(!$data){
    if(count($_POST)>0){
        $input = "{\"transactionEventType\":\"{$_POST['transactionEventType']}\",\"factName\":\"{$_POST['factName']}\",\"token\":\"{$_POST['token']}\",";
        if(isset($_POST['putType'])) {
            $input .= "\"putType\": \"{$_POST['putType']}\",";
        }
        if(isset($_POST['putOrder'])) {
            $input .= "\"putOrder\": \"{$_POST['putOrder']}\",";
        }
        if(isset($_POST['factObjects'])){
            $factObjects = "[".json_encode($_POST['factObjects'])."]";
            $factObjects = str_replace('\"', '"',$factObjects);
            $factObjects = str_replace('"{', '{',$factObjects);
            $factObjects = str_replace('}"', '}',$factObjects);
            $factObjects = str_replace('"[{', '[{',$factObjects);
            $factObjects = str_replace('}]"', '}]',$factObjects);
            $input .= "\"factObjects\": {$factObjects},";
        }
        if(isset($_POST['transactionMetaData'])){
            $transactionMetaData = json_encode($_POST['transactionMetaData']);
            $transactionMetaData = str_replace('\"', '"',$transactionMetaData);
            $transactionMetaData = str_replace('"[', '[',$transactionMetaData);
            $transactionMetaData = str_replace(']"', ']',$transactionMetaData);
            $input .= "\"transactionMetaData\": {$transactionMetaData}";
        }
        $input .= "}";
        $data = json_decode($input);
    }elseif(count($_GET)>0) {
        $input = (object)$_GET;
        $data = $input;
    }
//    var_dump($_FILES);
//    echo $input;
//    exit;
}
//var_dump($data);
//    exit;
include_once "core/init.inc.php";
$fxns = new Functions($dbo);

$token = isset($data->token)? $data->token : $token; //Get or Generate token
try {
    ##check if User is logged in
    $q_ChkUsr = "SELECT * FROM Users WHERE token=:token";
    $r_ChkUsr = $dbo->prepare($q_ChkUsr);
    $r_ChkUsr->execute(array(":token" => $token));
    $user = $r_ChkUsr->fetchAll(PDO::FETCH_ASSOC);
    if (count($user) != 1) {
        throw new Exception("-110011");
    }
//    echo 'quote.php';
//    $response = json_encode($response);
//    echo $response;

    if(isset($data->not_cnt)){ //Get notification count
        $roles =explode(',',$data->roles);
        $q_notification = "SELECT * FROM QuoteCat WHERE po_is_approved=0 AND (";
        $set ='';
        foreach ($roles as $role) {
            $set .= " FIND_IN_SET('$role',role_to_approve) OR";
        }
        $set = rtrim($set,'OR');
        $q_notification .= $set.")";
        $q_notification_count = $dbo->query("SELECT COUNT(*) as `count` FROM (" . $q_notification . ") t");
        $q_notification_count = $q_notification_count->fetch(PDO::FETCH_ASSOC);

        $q_response = $dbo->prepare($q_notification);
        $q_response->execute(array());
        $r_response = $q_response->fetchAll(PDO::FETCH_ASSOC);


        $response = array("success" => true, "token" => $data->token, "total_count" => $q_notification_count['count'], "data" => @$r_response);
    }
    if (@$data->transactionEventType == "UPDATEPO") {
        $dbo->beginTransaction();
            $q_fields = $dbo->query("DESCRIBE Quote");
            $r_fields = $q_fields->fetchAll(PDO::FETCH_ASSOC);
            foreach ($r_fields as $fields) {
                if ($fields['Key'] == 'PRI') {
                    $priKy = $fields['Field'];
                }
            }
            $inserts = "";$log_txt="";
            $q_str_quotes = "UPDATE Quote SET ";
            $q_str_quoteCat = "UPDATE QuoteCat SET ";
            foreach ($r_fields as $fields) {
                $fieldNm = strtolower($fields['Field']);
                if (@$data->factObjects[0]->$fieldNm) {
                    $inserts .= "{$fields['Field']} = ".$fxns->_formatFieldValue($data->factObjects[0]->$fieldNm, array('type'=>$fields['Type'])).",";

                    $log_txt .= "{$fields['Field']}<=>{$data->factObjects[0]->$fieldNm},";
                }
            }
            $inserts = rtrim($inserts,',');
            $q_str_quotes .= $inserts." WHERE $priKy={$data->factObjects[0]->id}";
            $q_str_quoteCat .= $inserts." WHERE $priKy={$data->factObjects[0]->id}"." AND quotecat_id={$data->factObjects[0]->quotecatId}";
            $r_str = $dbo->prepare($q_str_quotes);
            $r_str->execute();
            $r_str = $dbo->prepare($q_str_quoteCat);
            $r_str->execute();
        $dbo->commit();
        $response = array("success" => true,"token"=>$data->token);
    }
    $response = json_encode($response);
    echo $response;
}catch(Exception $e){
    $response = array("success" => false,"message"=>$e->getMessage(),"token"=>$data->token);
    $response = json_encode($response);
    echo $response;
}