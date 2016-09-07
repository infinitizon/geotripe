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
    echo $input;exit;
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
                    if($_FILES){
                        for($i=0; $i<count($_FILES['file']['name']); $i++ ){
                            $name = $_FILES['file']['name'][$i];
                            $mime = $_FILES['file']['type'][$i];
                            $blob = $dbo->quote(file_get_contents($_FILES['file']['tmp_name'][$i]));
                            $size = intval($_FILES['file']['size'][$i]);
                            $query = "INSERT INTO document (doc_quote_id,docName,docMimeType,docBlob,docSize,docCreateDate) VALUES ({$lastId},'{$name}','{$mime}',{$blob},{$size},NOW())";
                            $r_query = $dbo->prepare($query);
                            $r_query->execute();
                        }
                    }
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
//								var_dump($data->factObjects[0]->QuoteDetail_Manufacturer);
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
			$lastId = isset($lastId)?$lastId:(isset($lastQuoteDetailId)?$lastQuoteDetailId:$lastQuoteId);
            $data=array('token'=> $data->token,'insertId'=>$lastId);
            $response = array("response" => "Success", "message" => "Record Saved Successfully", "data"=>$data);
        }catch(Exception $e){
            $dbo->rollBack();
            $response = array("response"=>"Failure","message"=>$e->getMessage(),"token"=>$data->token);
        }
    }
    if (@$data->transactionEventType == "UPDATE") {
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
                $q_str_quotes = "UPDATE quote SET ";
                $inserts = "";
                foreach ($r_fields as $fields) {
                    $fieldNm = strtolower($fields['Field']);
                    if (@$data->factObjects[0]->quote->$fieldNm) {
                        $inserts .= "{$fields['Field']} = ".$fxns->_formatFieldValue($data->factObjects[0]->quote->$fieldNm, array('type'=>$fields['Type'])).",";
                    }
                }
                $inserts = rtrim($inserts,',');
                $q_str_quotes .= $inserts." WHERE $priKy={$data->factObjects[0]->quote->id}";
//                echo $q_str_quotes;
                if($inserts != ""){
                    $r_str = $dbo->prepare($q_str_quotes);
                    $r_str->execute();
                }
                if($_FILES){
                    for($i=0; $i<count($_FILES['file']['name']); $i++ ){
                        $name = $_FILES['file']['name'][$i];
                        $mime = $_FILES['file']['type'][$i];
                        $blob = $dbo->quote(file_get_contents($_FILES['file']['tmp_name'][$i]));
                        $size = intval($_FILES['file']['size'][$i]);
                        $query = "INSERT INTO document (doc_quote_id,docName,docMimeType,docBlob,docSize,docCreateDate) VALUES ({$data->factObjects[0]->quote->id},'{$name}','{$mime}',{$blob},{$size},NOW())";
                        $r_query = $dbo->prepare($query);
                        $r_query->execute();
                    }
                }
                if(isset($data->factObjects[0]->QuoteDetail) ){
                    foreach ($data->factObjects[0]->QuoteDetail as $key => $val) {
                        $q_fields = $dbo->query("DESCRIBE QuoteDetail");
                        $r_fields = $q_fields->fetchAll(PDO::FETCH_ASSOC);
                        foreach ($r_fields as $fields) {
                            if ($fields['Key'] == 'PRI') {
                                $priKy = $fields['Field'];
                            }
                        }
                        if(isset($data->factObjects[0]->QuoteDetail[$key]->id)){
                            $q_QuoteDetailFields = "SELECT * FROM QuoteDetail WHERE quoteDetail_Id={$data->factObjects[0]->QuoteDetail[$key]->id}";
                            $r_QuoteDetailFields = $dbo->prepare($q_QuoteDetailFields);
                            $r_QuoteDetailFields->execute(array(":token" => $token));
                            $QuoteDetailFields = $r_QuoteDetailFields->fetchAll(PDO::FETCH_ASSOC);

                            $q_str_quoteDetail = "UPDATE QuoteDetail SET ";
                            $inserts = "";
                            foreach ($r_fields as $fields) {
                                $fieldNm = strtolower($fields['Field']);
                                if (@$data->factObjects[0]->QuoteDetail[$key]->$fieldNm && $QuoteDetailFields[0][$fieldNm] != $data->factObjects[0]->QuoteDetail[$key]->$fieldNm) {
                                    $inserts .= "{$fields['Field']} = ".$fxns->_formatFieldValue($data->factObjects[0]->QuoteDetail[$key]->$fieldNm, array('type'=>$fields['Type'])).",";
                                }
                            }
                            $q_str_quoteDetail .= $inserts." WHERE Quote_quote_Id={$data->factObjects[0]->QuoteDetail[$key]->id}";
                            if($inserts != ""){
                                $r_str = $dbo->prepare($q_str_quoteDetail);
                                $r_str->execute();
                            }
                            $lastQuoteDetailId = $data->factObjects[0]->QuoteDetail[$key]->id;
                        }else{
                            $q_str = "INSERT INTO QuoteDetail ";
                            $ins_fields = " (Quote_quote_Id, ";
                            $ins_values = " VALUES ({$data->factObjects[0]->quote->id}, ";
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
                        }

                        if(isset($data->factObjects[0]->QuoteDetail_Manufacturer[$key])){

                            $q_fields = $dbo->query("DESCRIBE QuoteDetail_Manufacturer");
                            $r_fields = $q_fields->fetchAll(PDO::FETCH_ASSOC);
                            foreach ($r_fields as $fields) {
                                if ($fields['Key'] == 'PRI') {
                                    $priKy = $fields['Field'];
                                }
                            }
                            foreach($data->factObjects[0]->QuoteDetail_Manufacturer[$key] as $values){

                                $q_str_quoteDetail_Manufacturer = "INSERT INTO QuoteDetail_Manufacturer ";
                                $ins_fields = " (QuoteDetail_QuoteDetail_Id ,";
                                $ins_values = " VALUES ({$lastQuoteDetailId},";
                                $onUpdt = "";
                                foreach ($r_fields as $fields) {
                                    $fieldNm = strtolower($fields['Field']);
                                    if( isset($values->$fieldNm)){
                                        @$ins_fields .= " {$fields['Field']} ,";
                                        $onUpdt .=$fields['Field']."=VALUES({$fields['Field']}),";
                                    }
                                }
                                foreach ($r_fields as $fields) {
                                    $fieldNm = strtolower($fields['Field']);
                                    if (isset($values->$fieldNm)) {
                                        @$ins_values .= $fxns->_formatFieldValue($values->$fieldNm, array('type'=>$fields['Type'])).",";
                                    }
                                }
                                $ins_values = rtrim($ins_values,',');
                                $ins_values .= "),";
                                $ins_fields = $fxns->_subStrAtDel($ins_fields, ' ,');
                                $ins_values = rtrim($ins_values,',');
                                $onUpdt = rtrim($onUpdt,',');
                                $q_str_quoteDetail_Manufacturer .= $ins_fields . ") " . $ins_values;
                                $q_str_quoteDetail_Manufacturer .= " ON DUPLICATE KEY UPDATE ".$onUpdt;
                                //Let's update the manufacturer table
                                $r_str_quoteDetail_Manufacturer = $dbo->prepare($q_str_quoteDetail_Manufacturer);
                                $r_str_quoteDetail_Manufacturer->execute();
                                $lastId = $dbo->lastInsertId();
                            }
                        }
                    }
                }
            }

            $dbo->commit();
            $data=array('token'=> $data->token);
            $response = array("response" => "Success", "message" => "Record Saved Successfully", "data"=>$data);
        }catch(Exception $e){
            $dbo->rollBack();
            $response = array("response"=>"Failure","message"=>$e->getMessage(),"token"=>$data->token);
        }

    }
    if (@$data->transactionEventType == "DELETE") {
        try{
            $q_del_quoteDetail = "DELETE FROM QuoteDetail WHERE ";
            foreach ($data->transactionMetaData->queryMetaData->queryClause->andExpression as $field) {
                $q_del_quoteDetail .= $field->propertyName . " " . $field->operatorType . " ";
                if($field->operatorType=="IN"){
                    $q_del_quoteDetail .= "(".$field->propertyValue . ") AND";
                }elseif($field->operatorType=="LIKE"){
                    $q_del_quoteDetail .= "'%".$field->propertyValue . "%' AND";
                }else{
                    $q_del_quoteDetail .= $field->propertyValue . " AND";
                }
            }
            $q_del_quoteDetail = $fxns->_subStrAtDel($q_del_quoteDetail, ' AND');
            $r_str = $dbo->prepare($q_del_quoteDetail);
            $r_str->execute();
            $data=array('token'=> $data->token);
            $response = array("response" => "Success", "message" => "Record Deleted Successfully", "data"=>$data);
        }catch(Exception $e){
            $dbo->rollBack();
            $response = array("response"=>"Failure","message"=>$e->getMessage(),"token"=>$data->token);
        }

    }
$response = json_encode($response);
echo $response;
