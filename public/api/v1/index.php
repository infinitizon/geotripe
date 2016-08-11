<?php
header("Content-Type:application/json");

$scriptName = $_SERVER['SCRIPT_NAME']; // <-- "e.g /api/v1/index.php"
$requestUri = $_SERVER['REQUEST_URI']; // <-- "e.g /api/v1/login"
$physicalPath = str_replace('\\', '', dirname($scriptName)); // <-- "e.g /api/v1"
$env['PATH_INFO'] = substr_replace($requestUri, '', 0, strlen($physicalPath)); // <--returns "/login"

$data = json_decode(file_get_contents("php://input")); //Get data that is sent to the backend\
if(!$data){
    if(isset($_POST)){
        $input = "{\"transactionEventType\":\"{$_POST['transactionEventType']}\",\"factName\":\"{$_POST['factName']}\",\"token\":\"{$_POST['token']}\",";
        if(isset($_POST['factObjects'])){
            $factObjects = "[".json_encode($_POST['factObjects'])."]";
            $factObjects = str_replace('\"', '"',$factObjects);
            $factObjects = str_replace('"{', '{',$factObjects);
            $factObjects = str_replace('}"', '}',$factObjects);
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
if($env['PATH_INFO']==="/login"){
    try {
        $stmtChkUsr = "SELECT u.user_id, u.firstname, u.middlename, u.lastname, u.username, u.email
                    FROM Users u
                    WHERE (u.username=:email OR u.email=:email) AND u.password = :password AND u.enabled=1 and u.accountlocked<>1 ";
        $stmtChkUsr = $dbo->prepare($stmtChkUsr);
        $stmtChkUsr->execute(array(":email" => $data->usr, ":password" => md5(base64_decode($data->pwd))));
        $user = $stmtChkUsr->fetchAll(PDO::FETCH_ASSOC);
        if (count($user) == 1) {
            $qryGivToken = "UPDATE Users SET token =:token WHERE email=:email AND password = :password";
            $qryGivToken = $dbo->prepare($qryGivToken);
            $qryGivToken->execute(array(":token" => $token, ":email" => $data->usr, ":password" => md5(base64_decode($data->pwd))));
            $r_getViews = $dbo->query("SELECT av.authview_id, av.name, av.parent_id, av.viewpath, av.description, av.css_class
                          FROM User_AuthView ua
                        JOIN AuthView av
                          ON ua.authview_authview_id=av.authview_id
                        WHERE ua.ius_yn=1 AND ua.User_User_Id=".$user[0]['user_id']);
            // Create a multidimensional array to conatin a list of items and parents

            $menu = array('items' => array(), 'parents' => array());
            // Builds the array lists with data from the menu table
            while ($items = $r_getViews->fetch(PDO::FETCH_ASSOC)) {
                $menu['items'][$items['authview_id']] = $items;
                $menu['parents'][$items['parent_id']][] = $items['authview_id'];

            }
            $authViews = json_decode($fxns->_buildMenu(0, $menu, array('method' => "json")));
            $response = array("response" => "Success", "token" => $token
            , "authDetails" => $user[0]
            , "authViews" => $authViews);

        }elseif (count($user) > 1) {
            $response = array("response" => "Failure", "message" => "More than one record exists for your login.\nPlease contact admin");
        }else {
            $response = array("response" => "Failure", "message" => "Username or password is invalid.");
        }
    }catch(Exception $e){
        $response = array("response"=>"Failure","message"=>$e->getMessage(),"token"=>$data->token);
    }
    echo json_encode($response);
}

if($env['PATH_INFO']==="/inboundService") {
    try {
        ##check if User is logged in
        $q_ChkUsr = "SELECT * FROM Users WHERE token=:token";
        $r_ChkUsr = $dbo->prepare($q_ChkUsr);
        $r_ChkUsr->execute(array(":token"=>$token));
        $user = $r_ChkUsr->fetchAll(PDO::FETCH_ASSOC);
        if(count($user) != 1) {
            throw new Exception("-110011");
        }else{
            if (isset($data->transactionEventType)) {
                $theFact = explode(',',$data->factName);
                $q_fields = $dbo->query("DESCRIBE {$theFact[0]}");
                $r_fields = $q_fields->fetchAll(PDO::FETCH_ASSOC);
                foreach ($r_fields as $fields) {
                    if ($fields['Key'] == 'PRI') {
                        $priKy = $fields['Field'];
                    }
                }
            }
            /**
             * A Query is a select
             */
            if ($data->transactionEventType == "Query") {

                $responseData = explode("&", $data->transactionMetaData->responseDataProperties);
                $options = array();
                if (!empty($data->transactionMetaData->queryMetaData->joinClause->joinType)){
                    foreach ($data->transactionMetaData->queryMetaData->joinClause->joinType as $key => $item) {
                        $options['joinType'][] = $item;
                        $options['joinKeys'][] = $data->transactionMetaData->queryMetaData->joinClause->joinKeys[$key];
                    }
                }
                $q_str = $fxns->_generateQry($data->factName, $responseData,$options);
                if (!empty($data->transactionMetaData->queryMetaData->queryClause->andExpression)) {
                    $q_str .= " WHERE ";
                    foreach ($data->transactionMetaData->queryMetaData->queryClause->andExpression as $field) {
                        $q_str .= $field->propertyName . " " . $field->operatorType . " " . $field->propertyValue . " AND";
                    }
                    $q_str = $fxns->_subStrAtDel($q_str, ' AND');
                }
                $q_str_tot_count = $dbo->query("SELECT COUNT(*) as `count` FROM (" . $q_str . ") t");
                $r_str_tot_count = $q_str_tot_count->fetch(PDO::FETCH_ASSOC);

                if (!is_null($data->transactionMetaData->pageno)) {
                    $start = $data->transactionMetaData->pageno * $data->transactionMetaData->itemsPerPage;
                    $q_str .= " LIMIT {$start},{$data->transactionMetaData->itemsPerPage}";
                }
                $r_obj = $dbo->prepare($q_str);
                $r_obj->execute(array());
                while ($items = $r_obj->fetch(PDO::FETCH_ASSOC)) {
                    $q_response[] = $items;
                }
                $response = array("response" => "Success", "token" => $data->token, "total_count" => $r_str_tot_count['count'], "data" => @$q_response);
            }
            /**
             * An Update is an Update
             */
            if ($data->transactionEventType == "Update") {
                if(is_array($data->factObjects[0])){
                    $q_str = "INSERT INTO {$data->factName} ";
                    $multipleFields = "";
                    $ins_fields = " (";
                    $ins_values = " VALUES (";
                    $onUpdt = "";
                    foreach ($r_fields as $fields) {
                        $fieldNm = strtolower($fields['Field']);
                        if( isset($data->factObjects[0][0]->$fieldNm)){
                            @$ins_fields .= " {$fields['Field']} ,";
                            $onUpdt .=$fields['Field']."=VALUES({$fields['Field']}),";
                        }
                    }
                    $ins_values = " VALUES ";
                    foreach($data->factObjects[0] as $values){
                        $ins_values .= "(";
                        foreach ($r_fields as $fields) {
                            $fieldNm = strtolower($fields['Field']);
                            if (isset($values->$fieldNm)) {
                                @$ins_values .= $fxns->_formatFieldValue($values->$fieldNm, array('type'=>$fields['Type'])).",";
                            }
                        }
                        $ins_values = rtrim($ins_values,',');
                        $ins_values .= "),";
                    }
                    $ins_fields = $fxns->_subStrAtDel($ins_fields, ' ,');
                    $ins_values = rtrim($ins_values,',');
                    $onUpdt = rtrim($onUpdt,',');
                    $q_str .= $ins_fields . ") " . $ins_values;
                    $q_str .= " ON DUPLICATE KEY UPDATE ".$onUpdt;
                }else {
                    $q_str = "UPDATE {$data->factName} SET ";
                    foreach ($r_fields as $fields) {
                        $fieldNm = strtolower($fields['Field']);
                        if (@$data->factObjects[0]->$fieldNm) {
                            $q_str .= "{$fields['Field']} = '{$data->factObjects[0]->$fieldNm}'";
                        }
                    }
                    $q_str .= " WHERE $priKy={$data->factObjects[0]->id}";
                }
                $r_str = $dbo->prepare($q_str);
                $r_str->execute();
                $response = array("response" => "Success", "message" => "Record Updated Successfully", "token" => $data->token);
            }
            /**
             * A PUT is an insert
             */
            if ($data->transactionEventType == "PUT") {
                $q_str = "INSERT INTO {$data->factName} ";
                $q_str_logs = "INSERT INTO logs (users_user_id,log_table,log_table_key,log_changes,log_date) ";

                $multipleFields = "";
                $ins_fields = " (";
                $ins_values = " VALUES (";
                if(!is_array($data->factObjects[0])){
                    $log_txt = "{$user[0]['User_Id']},'{$data->factName}',:tblColKey, 'inserted new lines for: ";
//                    var_dump($data->factObjects[0]);
                    foreach ($r_fields as $fields) {
                        $fieldNm = strtolower($fields['Field']);
                        if (strtolower(@$data->factObjects[0]->$fieldNm)) {
                            @$ins_fields .= " {$fields['Field']} ,";
                            $formatedVal = $fxns->_formatFieldValue($data->factObjects[0]->$fieldNm, array('type'=>$fields['Type'])).",";
                            @$ins_values .= $formatedVal;
                            @$log_txt .= "{$fields['Field']}=>".htmlspecialchars($data->factObjects[0]->$fieldNm,ENT_QUOTES ).", ";
                        }
                    }

                    $ins_fields = $fxns->_subStrAtDel($ins_fields, ' ,');
                    $ins_values = rtrim($ins_values,',');
                    $log_txt = rtrim($log_txt,', ');
                    $q_str .= $ins_fields . ") " . $ins_values . ")";
                    $q_str_logs .= " VALUES (" . $log_txt . "', NOW() )";

                    $r_str = $dbo->prepare($q_str);
                    $r_str->execute();
                    $lastId = $dbo->lastInsertId();

                    $r_logStr = $dbo->prepare($q_str_logs);
                    $r_logStr->execute(array(':tblColKey'=>$lastId));
                    if($_FILES){
//                        var_dump($_FILES['file']);
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
                }else{
                    foreach ($r_fields as $fields) {
                        $fieldNm = strtolower($fields['Field']);
                        if( isset($data->factObjects[0][0]->$fieldNm)){
                            @$ins_fields .= " {$fields['Field']} ,";
                        }
                    }
                    $ins_values = " VALUES ";
                    foreach($data->factObjects[0] as $values){
                        $ins_values .= "(";
                        foreach ($r_fields as $fields) {
                            $fieldNm = strtolower($fields['Field']);
                            if ($values->$fieldNm) {
                                @$ins_values .= $fxns->_formatFieldValue($values->$fieldNm, array('type'=>$fields['Type'])).",";
                            }
                        }
                        $ins_values = rtrim($ins_values,',');
                        $ins_values .= "),";
                    }
                    $ins_fields = $fxns->_subStrAtDel($ins_fields, ' ,');
                    $ins_values = rtrim($ins_values,',');
                    $q_str .= $ins_fields . ") " . $ins_values;
                }
//echo $q_str;exit;

                $data=array('token'=> $data->token,'insertId'=>$lastId);
                $response = array("response" => "Success", "message" => "Record Saved Successfully", "data"=>$data);
            }
        }
    }catch(Exception $e){
        $response = array("response"=>"Failure","message"=>$e->getMessage(),"token"=>$data->token);
    }
    $response = json_encode($response);
    echo $response;
}

if($env['PATH_INFO']==="/logout"){
    try{
        $qryGivToken = "UPDATE Users SET token =null WHERE token=:token";
        $qryGivToken = $dbo->prepare($qryGivToken);
        $qryGivToken->execute(array(":token"=>$token));
        $response = array("response"=>"Success","token"=>"You have been logged out");
    }catch(Exception $e){
        $response = array("response"=>"Failure","message"=> $e->getMessage());
    }
    echo json_encode($response);
}