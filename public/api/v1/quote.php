<?php
header("Content-Type:application/json");

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
    $data = json_decode($input);
}
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
                if($data->factObjects[0]->quote){
                    $q_fields = $dbo->query("DESCRIBE quote");
                    $r_fields = $q_fields->fetchAll(PDO::FETCH_ASSOC);
                    foreach ($r_fields as $fields) {
                        if ($fields['Key'] == 'PRI') {
                            $priKy = $fields['Field'];
                        }
                    }
                    $q_str = "INSERT INTO quote ";
                    $ins_fields = " (";
                    $ins_values = " VALUES (";
                    foreach($r_fields as $fields) {
                        $fieldNm = strtolower($fields['Field']);
                        if (strtolower(@$data->factObjects[0]->quote->$fieldNm)) {
                            @$ins_fields .= " {$fields['Field']} ,";
                            $formatedVal = $fxns->_formatFieldValue($data->factObjects[0]->quote->$fieldNm, array('type'=>$fields['Type']))." ,";
                            @$ins_values .= $formatedVal;
                        }
                    }
                    $ins_fields = $fxns->_subStrAtDel($ins_fields, ' ,');
                    $ins_values = rtrim($ins_values,' ,');
                    $q_str_quote = $q_str .$ins_fields . ") " . $ins_values . ")";
//echo $q_str_quote."\n";
                    $r_str = $dbo->prepare($q_str_quote);
                    $r_str->execute();
                    $lastQuoteId = $dbo->lastInsertId();
                }
                if(isset($data->factObjects[0]->QuoteDetail) ){
                    foreach ($data->factObjects[0]->QuoteDetail as $key => $val) {
                        $q_str = "INSERT INTO QuoteDetail ";
                        $ins_fields = " (Quote_quote_Id, ";
                        $ins_values = " VALUES ($lastQuoteId, ";
                        foreach($val as $col => $value){
                            $ins_fields .= $col . " ,";
                            $ins_values .= "'" . $value . "' ,";
                        }
                        $ins_fields = $fxns->_subStrAtDel($ins_fields, ' ,');
                        $ins_values = rtrim($ins_values,' ,');
                        $q_str_quoteDetail = $q_str .$ins_fields . ") " . $ins_values . ")";
//echo $q_str_quoteDetail."\n";
                        $r_str = $dbo->prepare($q_str_quoteDetail);
                        $r_str->execute();
                        $lastQuoteDetailId = $dbo->lastInsertId();
                        if(isset($data->factObjects[0]->QuoteDetail_Manufacturer[$key])){
                            foreach($data->factObjects[0]->QuoteDetail_Manufacturer[$key] as $subVals){
                                $q_str = "INSERT INTO QuoteDetail_Manufacturer ";
                                $ins_fields = " (QuoteDetail_QuoteDetail_Id,";
                                $ins_values = " VALUES ($lastQuoteDetailId,";
                                foreach($subVals as $col => $value){
                                    $ins_fields .= $col . " ,";
                                    $ins_values .= "'" . $value . "' ,";
                                }
                                $ins_fields = $fxns->_subStrAtDel($ins_fields, ' ,');
                                $ins_values = rtrim($ins_values,' ,');
                                $q_str_quoteDetail_Manufacturer = $q_str .$ins_fields . ") " . $ins_values . ")";
//echo $q_str_quoteDetail_Manufacturer."\n";
                                $r_str = $dbo->prepare($q_str_quoteDetail_Manufacturer);
                                $r_str->execute();
                                $lastId = $dbo->lastInsertId();
                            }
                        }
                    }
                }
            $dbo->commit();
            $data=array('token'=> $data->token,'insertId'=>$lastId);
            $response = array("response" => "Success", "message" => "Record Saved Successfully", "data"=>$data);
        }catch(Exception $e){
            $dbo->rollBack();
            $response = array("response"=>"Failure","message"=>$e->getMessage(),"token"=>$data->token);
        }
    }
$response = json_encode($response);
echo $response;
