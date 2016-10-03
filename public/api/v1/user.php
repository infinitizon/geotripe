<?php
header("Content-Type:application/json");
//echo 'problem in index!';

$scriptName = $_SERVER['SCRIPT_NAME']; // <-- "e.g /api/v1/index.php"
$requestUri = $_SERVER['REQUEST_URI']; // <-- "e.g /api/v1/login"
$physicalPath = str_replace('\\', '', dirname($scriptName)); // <-- "e.g /api/v1"
$env['PATH_INFO'] = substr_replace($requestUri, '', 0, strlen($physicalPath)); // <--returns "/login"
//https://www.olx.com.ng/ad/honda-accord-2005-ID15KkhD.html#6d45d1b9e3
$data = json_decode(file_get_contents("php://input")); //Get data that is sent to the backend\
if(!$data){
    if(isset($_POST)){
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
            $factObjects = str_replace('"]"', '"]',$factObjects);
            $factObjects = str_replace('"["', '["',$factObjects);
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
    }
//    echo $input;
//    exit;
    $data = json_decode($input);
}
//$incoming = json_encode($data);
//echo $incoming;
//exit;
include_once "core/init.inc.php";
$fxns = new Functions($dbo);

$token = isset($data->token)? $data->token : $token; //Get or Generate token

##check if User is logged in
$q_ChkUsr = "SELECT * FROM Users WHERE token=:token";
$r_ChkUsr = $dbo->prepare($q_ChkUsr);
$r_ChkUsr->execute(array(":token" => $token));
$user = $r_ChkUsr->fetchAll(PDO::FETCH_ASSOC);
if (count($user) != 1) {
    throw new Exception("-110011");
}
if ($data->transactionEventType == "PUT") {
    try {
        $dbo->beginTransaction();
            if($data->factObjects[0]->users){
                $q_fields = $dbo->query("DESCRIBE Users");
                $r_fields = $q_fields->fetchAll(PDO::FETCH_ASSOC);
                foreach ($r_fields as $fields) {
                    if ($fields['Key'] == 'PRI') {
                        $priKy = $fields['Field'];
                    }
                }
                $q_str = "INSERT INTO Users ";
                $ins_fields = " (";
                $ins_values = " VALUES (";
                foreach($r_fields as $fields) {
                    $fieldNm = strtolower($fields['Field']);
                    if (strtolower(@$data->factObjects[0]->users->$fieldNm)) {
                        @$ins_fields .= " {$fields['Field']} ,";
                        $formatedVal = $fxns->_formatFieldValue($data->factObjects[0]->users->$fieldNm, array('type'=>$fields['Type']))." ,";
                        @$ins_values .= $formatedVal;
                    }
                }
                $ins_fields = $fxns->_subStrAtDel($ins_fields, ' ,');
                $ins_values = rtrim($ins_values,' ,');
                $q_str_users = $q_str .$ins_fields . ") " . $ins_values . ")";
                $r_str = $dbo->prepare($q_str_users);
                $r_str->execute();
                $lastQuoteId = $dbo->lastInsertId();
            }
            if($data->factObjects[0]->rolesChecked) {
                $q_str = "INSERT INTO User_AuthRole ";
                $ins_values = " VALUES ";
                foreach ($data->factObjects[0]->rolesChecked as $checked) {
                    $ins_values .= "({$lastQuoteId}, $checked) ,";
                }
                $ins_values = $fxns->_subStrAtDel($ins_values, ' ,');
                $q_str .= $ins_values." ON DUPLICATE KEY UPDATE Users_User_Id=VALUES(Users_User_Id),AuthRoles_AuthRoles_Id=VALUES(AuthRoles_AuthRoles_Id)";

                $r_str = $dbo->prepare($q_str);
                $r_str->execute();
            }
//        echo $q_str; exit;
        $dbo->commit();
        $data=array('token'=> $data->token);
        $response = array("response" => "Success", "message" => "Record Saved Successfully", "data"=>$data);
    }catch(Exception $e){
        $dbo->rollBack();
        $response = array("response"=>"Failure","message"=>$e->getMessage(),"token"=>$data->token);
    }
}
if (@$data->transactionEventType == "UPDATE") {
    try {
        $dbo->beginTransaction();
            if($data->factObjects[0]->users) {
                $q_fields = $dbo->query("DESCRIBE Users");
                $r_fields = $q_fields->fetchAll(PDO::FETCH_ASSOC);
                foreach ($r_fields as $fields) {
                    if ($fields['Key'] == 'PRI') {
                        $priKy = $fields['Field'];
                    }
                }
                $q_str_users = "UPDATE Users SET ";
                $inserts = "";
                foreach ($r_fields as $fields) {
                    $fieldNm = strtolower($fields['Field']);
                    if (@$data->factObjects[0]->users->$fieldNm) {
                        $inserts .= "{$fields['Field']} = " . $fxns->_formatFieldValue($data->factObjects[0]->users->$fieldNm, array('type' => $fields['Type'])) . ",";
                    }
                }
                $inserts = rtrim($inserts, ',');
                $q_str_users .= $inserts . " WHERE $priKy={$data->factObjects[0]->users->id}";
//                echo $q_str_users; exit;
                if ($inserts != "") {
                    $r_str = $dbo->prepare($q_str_users);
                    $r_str->execute();
                }
            }
            if($data->factObjects[0]->rolesChecked) {
                $q_str = "INSERT INTO User_AuthRole ";
                $ins_values = " VALUES ";
                foreach ($data->factObjects[0]->rolesChecked as $checked) {
                    $ins_values .= "({$data->factObjects[0]->users->id}, $checked) ,";
                }
                $ins_values = $fxns->_subStrAtDel($ins_values, ' ,');
                $q_str .= $ins_values." ON DUPLICATE KEY UPDATE Users_User_Id=VALUES(Users_User_Id),AuthRoles_AuthRoles_Id=VALUES(AuthRoles_AuthRoles_Id)";

                $r_str = $dbo->prepare($q_str);
                $r_str->execute();
            }
            if($data->factObjects[0]->rolesUnChecked) {
                $q_str = "DELETE FROM User_AuthRole WHERE (Users_User_Id,AuthRoles_AuthRoles_Id) IN (";
                $ins_values = "";
                foreach ($data->factObjects[0]->rolesUnChecked as $checked) {
                    $ins_values .= "({$data->factObjects[0]->users->id},$checked) ,";
                }
                $q_str .= $fxns->_subStrAtDel($ins_values, ' ,').")";

                $r_str = $dbo->prepare($q_str);
                $r_str->execute();
            }
//        echo $q_str; exit;
        $dbo->commit();
        $data=array('token'=> $data->token);
        $response = array("response" => "Success", "message" => "Record Saved Successfully", "data"=>$data);
    }catch(Exception $e){
        $dbo->rollBack();
        $response = array("response"=>"Failure","message"=>$e->getMessage(),"token"=>$data->token);
    }
}
$response = json_encode($response);
echo $response;
