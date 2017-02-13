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
//    var_dump($_FILES);
//    echo $input;
//    exit;
    $data = json_decode($input);
}
//var_dump($data);
//    exit;
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
    if ($data->transactionEventType == "QuoteDash") {
        $q_str = "select p.party_id, p.Name, count(q.quote_id) totalQuotes ";
        $q_str .= " , (select count(q.Quote_Status_Id) from Quote q where q.Quote_Status_Id=12141324 AND q.Party_Party_Id=p.party_id )Submitted ";
	    $q_str .= " , (select count(q.Quote_Status_Id) from Quote q where q.Quote_Status_Id=12141325 AND q.Party_Party_Id=p.party_id )'In Progress' ";
	    $q_str .= " , (select count(q.Quote_Status_Id) from Quote q where q.Quote_Status_Id=12141326 AND q.Party_Party_Id=p.party_id )'TQ' ";
	    $q_str .= " , (select count(q.Quote_Status_Id) from Quote q where q.Quote_Status_Id=12141327 AND q.Party_Party_Id=p.party_id )'Sourcing for suppliers' ";
	    $q_str .= " , (select count(q.Quote_Status_Id) from Quote q where q.Quote_Status_Id=12141328 AND q.Party_Party_Id=p.party_id )'Costing at suppliers' ";
        $q_str .= " FROM Party p LEFT JOIN Quote q ON p.Party_Id=q.Party_Party_Id ";
        if (!empty($data->transactionMetaData->queryMetaData->queryClause->andExpression)) {
            $q_str .= " WHERE "; $files_id = '';
            foreach ($data->transactionMetaData->queryMetaData->queryClause->andExpression as $field) {
                $q_str .= $field->propertyName . " " . $field->operatorType . " ";
                if($field->operatorType=="IN"){
//                            echo $field->propertyName;
                    $q_str .= "(".$field->propertyValue . ") AND";
                }elseif($field->operatorType=="LIKE"){
                    $q_str .= "'%".$field->propertyValue . "%' AND";
                }else{
                    $q_str .= $field->propertyValue . " AND";
                }
                $files_id .= $field->propertyValue.' ,';
            }
            $q_str = $fxns->_subStrAtDel($q_str, ' AND');
            $files_id = $fxns->_subStrAtDel($files_id, ' ,');
            $q_getFiles_str = "SELECT doc_id,doc_quote_id,docName,docCreateDate FROM Document WHERE doc_quote_Id IN ($files_id)";
        }
        if (!empty($data->transactionMetaData->groupingProperties->by)) {
            $q_str .= " GROUP BY ".$data->transactionMetaData->groupingProperties->by;
        }
//        echo $q_str;
        $q_str_tot_count = $dbo->query("SELECT COUNT(*) as `count` FROM (" . $q_str . ") t");
        $r_str_tot_count = $q_str_tot_count->fetch(PDO::FETCH_ASSOC);

        $r_obj = $dbo->prepare($q_str);
        $r_obj->execute(array());
        $q_response = $r_obj->fetchAll(PDO::FETCH_ASSOC);
        $response = array("response" => "Success", "token" => $data->token, "total_count" => $r_str_tot_count['count'], "data" => @$q_response);
    }
    if ($data->transactionEventType == "PUT") {
        try {
            $dbo->beginTransaction();
                if($data->factObjects[0]->quote){
                    $q_fields = $dbo->query("DESCRIBE Quote");
                    $r_fields = $q_fields->fetchAll(PDO::FETCH_ASSOC);
                    foreach ($r_fields as $fields) {
                        if ($fields['Key'] == 'PRI') {
                            $priKy = $fields['Field'];
                        }
                    }
                    $q_str = "INSERT INTO Quote ";
                    $q_str_cat = "INSERT INTO QuoteCat ";
                    $ins_fields = " (";
                    $ins_values = " VALUES (";

                    $q_str_logs = "INSERT INTO logs (users_user_id,log_table,log_table_key,log_changes,log_date) VALUES ";
                    $q_str_logs .= "( {$user[0]['User_Id']}, 'Quote', :tblColKey, 'New Quote inserted ";
                    $log_txt = "";

                    foreach($r_fields as $fields) {
                        $fieldNm = strtolower($fields['Field']);
                            if (strtolower(@$data->factObjects[0]->quote->$fieldNm)) {
                            @$ins_fields .= " {$fields['Field']} ,";
                            $formatedVal = $fxns->_formatFieldValue($data->factObjects[0]->quote->$fieldNm, array('type'=>$fields['Type']))." ,";
                            @$ins_values .= $formatedVal;
                            $log_txt .= "{$fields['Field']}={$data->factObjects[0]->quote->$fieldNm},";
                        }
                    }
                    $ins_fields = $fxns->_subStrAtDel($ins_fields, ' ,');
                    $ins_values = rtrim($ins_values,' ,');
                    $q_str_quote = $q_str .$ins_fields . ") " . $ins_values . ")";
//                    $q_str_quote_cat = $q_str_cat .$ins_fields . isset($data->factObjects[0]->quote->rolesToApprove)? ", rolesToApprove) ":")" . $ins_values . ", '{$data->factObjects[0]->quote->rolesToApprove}')";
//echo $q_str_quote."\n";
//echo $q_str_quote_cat; exit;
                    $r_str = $dbo->prepare($q_str_quote);
                    $r_str->execute();
                    $lastQuoteId = $dbo->lastInsertId();


                    if($_FILES){
                        $log_txt .=" Also inserted documents in the Document table with IDs ";
                        for($i=0; $i<count($_FILES['file']['name']); $i++ ){

                            $name = $_FILES['file']['name'][$i];
                            $mime = $_FILES['file']['type'][$i];
                            $temp = $_FILES['file']['tmp_name'][$i];
                            $size = intval($_FILES['file']['size'][$i]);
//                        $newfilename = substr(md5(time()), 0, 10) . '.' . end($temp);
                            $newfilename = md5(time()).".".pathinfo($name, PATHINFO_EXTENSION);
                            $path = $_SERVER['DOCUMENT_ROOT'].'/uploads/' . $newfilename;
                            $webPath = WEB_ROOT.'/uploads/' . $newfilename;
                            move_uploaded_file($temp, $path);

//                            $blob = $dbo->quote(file_get_contents($_FILES['file']['tmp_name'][$i]));
                            $query = "INSERT INTO Document (doc_quote_id,docName,docMimeType,docPath,docSize,docCreateDate";
                            $query .= isset($data->factObjects[0]->fileType[$i])?",documentType_id)":")";
                            $query .= " VALUES ({$lastQuoteId},'{$name}','{$mime}','{$webPath}',{$size},NOW()";
                            $query .= isset($data->factObjects[0]->fileType[$i])?",{$data->factObjects[0]->fileType[$i]})":")";
//echo $query;
                            $r_query = $dbo->prepare($query);
                            $r_query->execute();
                            @$lastDocId .= $dbo->lastInsertId().",";
                        }
                        $log_txt.=$lastDocId;
                    }
                    $q_str_logs .= $log_txt ."', NOW())";
//echo $q_str_logs;
                    $r_str_logs = $dbo->prepare($q_str_logs);
                    $r_str_logs->execute(array(':tblColKey'=>$lastQuoteId));
                }

                if(isset($data->factObjects[0]->PODetails) ){
                    $q_fields = $dbo->query("DESCRIBE PODetails");
                    $r_fields = $q_fields->fetchAll(PDO::FETCH_ASSOC);
                    foreach ($r_fields as $fields) {
                        if ($fields['Key'] == 'PRI') {
                            $priKy = $fields['Field'];
                        }
                    }
                    foreach ($data->factObjects[0]->PODetails as $key => $val) {
                        $q_str_PODetails = "INSERT INTO PODetails ";
                        $ins_fields = " (Quote_quote_Id, ";
                        $ins_values = " VALUES ($lastQuoteId, ";
                        $onUpdt = "";
                        foreach ($r_fields as $fields) {
                            $fieldNm = strtolower($fields['Field']);
                            if( isset($val->$fieldNm)){
                                @$ins_fields .= " {$fields['Field']} ,";
                                $onUpdt .=$fields['Field']."=VALUES({$fields['Field']}),";
                                $ins_values .= $fxns->_formatFieldValue($val->$fieldNm, array('type'=>$fields['Type'])).",";
                            }
                        }
                        $ins_values = rtrim($ins_values,',');
                        $ins_fields = $fxns->_subStrAtDel($ins_fields, ' ,');
                        $onUpdt = rtrim($onUpdt,',');
                        $q_str_PODetails = $q_str_PODetails .$ins_fields . ") " . $ins_values . ")";
                        $q_str_PODetails .= " ON DUPLICATE KEY UPDATE Quote_quote_Id=VALUES(Quote_quote_Id),".$onUpdt;
                        $q_str_PODetails = $dbo->prepare($q_str_PODetails);
                        $q_str_PODetails->execute();
                    }
                }

                if(isset($data->factObjects[0]->QuoteDetail) ){
                    foreach ($data->factObjects[0]->QuoteDetail as $key => $val) {
                        $q_str_logs = "INSERT INTO logs (users_user_id,log_table,log_table_key,log_changes,log_date) VALUES ";
                        $q_str_logs .= "( {$user[0]['User_Id']}, 'QuoteDetail', :tblColKey, 'Line items for the Quote {$lastQuoteId}: ";

                        $q_str = "INSERT INTO QuoteDetail ";
                        $q_str_cat = "INSERT INTO QuoteDetailCat ";
                        $ins_fields = " (Quote_quote_Id, ";
                        $ins_values = " VALUES ($lastQuoteId, ";
                        foreach($val as $col => $value){
                            $ins_fields .= $col . " ,";
                            $ins_values .= "'" . $value . "' ,";
                            $q_str_logs .= $col."<=>".$value . ", ";;
                        }
                        $ins_fields = $fxns->_subStrAtDel($ins_fields, ' ,');
                        $ins_values = rtrim($ins_values,' ,');
                        $q_str_quoteDetail = $q_str .$ins_fields . ") " . $ins_values . ")";
                        $q_str_quoteDetail_cat = $q_str_cat .$ins_fields . ") " . $ins_values . ")";
//echo $q_str_quoteDetail."\n";
//echo $q_str_quoteDetail_cat; exit;
                        $r_str = $dbo->prepare($q_str_quoteDetail);
                        $r_str->execute();
                        $lastQuoteDetailId = $dbo->lastInsertId();
                        $r_str_cat = $dbo->prepare($q_str_quoteDetail_cat);
                        $r_str_cat->execute();
                        /**Running logs for Quotedetail*/
                        $q_str_logs .= $log_txt ."', NOW())";
//echo $q_str_logs."\n";
                        $r_str_logs = $dbo->prepare($q_str_logs);
                        $r_str_logs->execute(array(':tblColKey'=>$lastQuoteDetailId));

//								var_dump($data->factObjects[0]->QuoteDetail_Manufacturer);
                        if(isset($data->factObjects[0]->QuoteDetail_Manufacturer[$key])){
                            foreach($data->factObjects[0]->QuoteDetail_Manufacturer[$key] as $subVals){
                                $q_str = "INSERT INTO QuoteDetail_Manufacturer ";
                                $ins_fields = " (QuoteDetail_QuoteDetail_Id ,";
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
                $q_fields = $dbo->query("DESCRIBE Quote");
                $r_fields = $q_fields->fetchAll(PDO::FETCH_ASSOC);
                foreach ($r_fields as $fields) {
                    if ($fields['Key'] == 'PRI') {
                        $priKy = $fields['Field'];
                    }
                }
                $q_str_quotes = "UPDATE Quote SET ";
                $q_str_quote_cat = "INSERT INTO QuoteCat ";
                $ins_fields = " (quote_Id,"; $ins_values = " VALUES ({$data->factObjects[0]->quote->id},";

                $inserts = "";
                $q_str_logs = "INSERT INTO logs (users_user_id,log_table,log_table_key,log_changes,log_date) VALUES ";
                $q_str_logs .= "( {$user[0]['User_Id']}, 'Quote', {$data->factObjects[0]->quote->id}, 'Updated Quote {$data->factObjects[0]->quote->id}: ";
                $log_txt = '';
                $onUpdt = "";
                foreach ($r_fields as $fields) {
                    $fieldNm = strtolower($fields['Field']);
                    if (@$data->factObjects[0]->quote->$fieldNm) {
                        $inserts .= "{$fields['Field']} = ".$fxns->_formatFieldValue($data->factObjects[0]->quote->$fieldNm, array('type'=>$fields['Type'])).",";

                        @$ins_fields .= " {$fields['Field']} ,";
                        $formatedVal = $fxns->_formatFieldValue($data->factObjects[0]->quote->$fieldNm, array('type'=>$fields['Type']))." ,";
                        @$ins_values .= $formatedVal;
                        if ($fieldNm == 'po_no' && @$data->factObjects[0]->quote->role_to_approve) {
                            $ins_fields .= "notes ,";$ins_values.="'Approve pending PO update' ,";
                        }
                        $log_txt .= "{$fields['Field']}<=>{$data->factObjects[0]->quote->$fieldNm},";
                        $onUpdt .=$fields['Field']."=VALUES({$fields['Field']}),";
                    }
                }
                $inserts = rtrim($inserts,',');
                $q_str_quotes .= $inserts." WHERE $priKy={$data->factObjects[0]->quote->id}";
                if(@$data->factObjects[0]->quote->role_to_approve){
                    $ins_fields = $fxns->_subStrAtDel($ins_fields, ' ,');
                    $ins_values = rtrim($ins_values,' ,');
                    $q_str_quote_cat = $q_str_quote_cat .$ins_fields . ",po_is_approved, role_to_approve) " . $ins_values . ",'0', '{$data->factObjects[0]->quote->role_to_approve}')";

//                    $q_str_quotes_cat .= $inserts.",po_is_approved=0,role_to_approve='{$data->factObjects[0]->quote->role_to_approve}' WHERE $priKy={$data->factObjects[0]->quote->id}";
                }


//echo $q_str_quotes;exit;

                    if(@$data->factObjects[0]->quote->role_to_approve ){
                        $onUpdt = rtrim($onUpdt,',');
                        $q_str_quote_cat .= " ON DUPLICATE KEY UPDATE ".$onUpdt;
//echo $q_str_quote_cat;exit;
                        $r_str = $dbo->prepare($q_str_quote_cat);
                        $r_str->execute();
                        $lastQuoteCatId = $dbo->lastInsertId();
                    }elseif($inserts != ""){
                        $r_str = $dbo->prepare($q_str_quotes);
                        $r_str->execute();
                    }
                if($_FILES){
                    $log_txt .=" Also inserted documents in the Document table with IDs ";
                    for($i=0; $i<count($_FILES['file']['name']); $i++ ){

                        $name = $_FILES['file']['name'][$i];
                        $mime = $_FILES['file']['type'][$i];
                        $temp = $_FILES['file']['tmp_name'][$i];
                        $size = intval($_FILES['file']['size'][$i]);
//                        $newfilename = substr(md5(time()), 0, 10) . '.' . end($temp);
                        $newfilename = md5(time()).".".pathinfo($name, PATHINFO_EXTENSION);
                        $path = $_SERVER['DOCUMENT_ROOT'].'/uploads/' . $newfilename;
                        $webPath = WEB_ROOT.'/uploads/' . $newfilename;
                        move_uploaded_file($temp, $path);

//                            $blob = $dbo->quote(file_get_contents($_FILES['file']['tmp_name'][$i]));
                        $query = "INSERT INTO Document (doc_quote_id,docName,docMimeType,docPath,docSize,docCreateDate";
                        $query .= isset($data->factObjects[0]->fileType[$i])?",documentType_id)":")";
                        $query .= " VALUES ({$data->factObjects[0]->quote->id},'{$name}','{$mime}','{$webPath}',{$size},NOW()";
                        $query .= isset($data->factObjects[0]->fileType[$i])?",{$data->factObjects[0]->fileType[$i]})":")";
                        $r_query = $dbo->prepare($query);
                        $r_query->execute();
                        @$lastDocId .= $dbo->lastInsertId().",";
                    }
                    $log_txt.=$lastDocId;
                }
                if(isset($data->factObjects[0]->QuoteDetail) ){
                    $log_txt .= "...made changes on the QuoteDetail-> ";
                    foreach ($data->factObjects[0]->QuoteDetail as $key => $val) {
                        $q_fields = $dbo->query("DESCRIBE QuoteDetail");
                        $r_fields = $q_fields->fetchAll(PDO::FETCH_ASSOC);
                        foreach ($r_fields as $fields) {
                            if ($fields['Key'] == 'PRI') {
                                $priKy = $fields['Field'];
                            }
                        }
//                        echo $key;
                        if(isset($data->factObjects[0]->QuoteDetail[$key]->id)){
                            $q_QuoteDetailFields = "SELECT * FROM QuoteDetail WHERE quoteDetail_Id={$data->factObjects[0]->QuoteDetail[$key]->id}";
                            $r_QuoteDetailFields = $dbo->prepare($q_QuoteDetailFields);
                            $r_QuoteDetailFields->execute(array(":token" => $token));
                            $QuoteDetailFields = $r_QuoteDetailFields->fetchAll(PDO::FETCH_ASSOC);

                            $q_str_quoteDetail = "UPDATE QuoteDetail SET ";
                            $q_str_quoteDetail_cat = "INSERT INTO QuoteDetailCat ";
                            $ins_fields = " (Quote_Quote_Id ,QuoteDetail_Id , quotecat_id ,";
                            if(@$data->factObjects[0]->quote->role_to_approve ) {
                                $ins_values = " VALUES ({$data->factObjects[0]->quote->id},{$data->factObjects[0]->QuoteDetail[$key]->id},$lastQuoteCatId ,";
                            }
                            $inserts = "";

                            @$log .= "Updated {$data->factObjects[0]->QuoteDetail[$key]->id}: ";
                            $onUpdt = "";
                            foreach ($r_fields as $fields) {
                                $fieldNm = strtolower($fields['Field']);
                                if (@$data->factObjects[0]->QuoteDetail[$key]->$fieldNm && $QuoteDetailFields[0][$fieldNm] != $data->factObjects[0]->QuoteDetail[$key]->$fieldNm) {
                                    $inserts .= "{$fields['Field']} = ".$fxns->_formatFieldValue($data->factObjects[0]->QuoteDetail[$key]->$fieldNm, array('type'=>$fields['Type']))." ,";
                                    $log .= "{$fields['Field']}<=>{$data->factObjects[0]->QuoteDetail[$key]->$fieldNm},";

                                    $onUpdt .=$fields['Field']."=VALUES({$fields['Field']}),";

                                    @$ins_fields .= " {$fields['Field']} ,";
                                    $formatedVal = $fxns->_formatFieldValue($data->factObjects[0]->QuoteDetail[$key]->$fieldNm, array('type'=>$fields['Type']))." ,";
                                    @$ins_values .= $formatedVal;
                                }
                            }
                            $inserts = $fxns->_subStrAtDel($inserts, ' ,');
                            $q_str_quoteDetail .= $inserts." WHERE QuoteDetail_Id={$data->factObjects[0]->QuoteDetail[$key]->id}";
                            if(@$data->factObjects[0]->quote->role_to_approve){
                                $ins_fields = $fxns->_subStrAtDel($ins_fields, ' ,');
                                $ins_values = rtrim($ins_values,' ,');
                                $q_str_quoteDetail_cat = $q_str_quoteDetail_cat .$ins_fields . ",po_is_approved, role_to_approve) " . $ins_values . ",'0', '{$data->factObjects[0]->QuoteDetail[$key]->role_to_approve}')";
                            }
//echo $q_str_quoteDetail;
//echo $q_str_quoteDetail_cat;exit;
                            if(@$data->factObjects[0]->quote->role_to_approve ){
                                $onUpdt ="po_is_approved=VALUES(po_is_approved),".$onUpdt;
                                $onUpdt = rtrim($onUpdt,',');
                                $q_str_quoteDetail_cat .= " ON DUPLICATE KEY UPDATE ".$onUpdt;
                                $r_str = $dbo->prepare($q_str_quoteDetail_cat);
                                $r_str->execute();
                            }elseif($inserts != "" && !isset($data->factObjects[0]->quote->role_to_approve)){
//                                echo 'here';
                                $r_str = $dbo->prepare($q_str_quoteDetail);
                                $r_str->execute();
//                                echo 'end';
                            }
                            $lastQuoteDetailId = $data->factObjects[0]->QuoteDetail[$key]->id;
                        }else{
                            $q_str = "INSERT INTO QuoteDetail ";
                            $ins_fields = " (Quote_quote_Id, ";
                            $ins_values = " VALUES ({$data->factObjects[0]->quote->id}, ";
                            @$log .= "Inserted {$data->factObjects[0]->quote->id}: ";
                            foreach($val as $col => $value){
                                $ins_fields .= $col . " ,";
                                $ins_values .= "'" . $value . "' ,";
                                $log .= "{$col}<=>{$value},";
                            }
                            $ins_fields = $fxns->_subStrAtDel($ins_fields, ' ,');
                            $ins_values = rtrim($ins_values,' ,');
                            $q_str_quoteDetail = $q_str .$ins_fields . ") " . $ins_values . ")";
//echo $q_str_quoteDetail;exit;
                            $r_str = $dbo->prepare($q_str_quoteDetail);
                            $r_str->execute();
                            $lastQuoteDetailId = $dbo->lastInsertId();
                        }

                        if(isset($data->factObjects[0]->QuoteDetail_Manufacturer[$key])){
                            $dbo->query("delete from QuoteDetail_Manufacturer where QuoteDetail_QuoteDetail_Id = {$lastQuoteDetailId}");

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
//echo $q_str_quoteDetail_Manufacturer;
                                //Let's update the manufacturer table
                                $r_str_quoteDetail_Manufacturer = $dbo->prepare($q_str_quoteDetail_Manufacturer);
                                $r_str_quoteDetail_Manufacturer->execute();
                                $lastId = $dbo->lastInsertId();
                            }
                        }
                    }
                    $q_str_logs .= $log_txt . $log;
                }
                if(isset($data->factObjects[0]->PODetails) ){
                    $q_fields = $dbo->query("DESCRIBE PODetails");
                    $r_fields = $q_fields->fetchAll(PDO::FETCH_ASSOC);
                    foreach ($r_fields as $fields) {
                        if ($fields['Key'] == 'PRI') {
                            $priKy = $fields['Field'];
                        }
                    }
                    $log_txt = "...also inserted new PODetails ";
//                    var_dump($data->factObjects[0]->PODetails);
                    foreach ($data->factObjects[0]->PODetails as $key => $val) {
                        $q_str_PODetails = "INSERT INTO PODetails ";
                        $q_str_PODetails_cat = "INSERT INTO PODetailsCat ";
                        $ins_fields = " (Quote_quote_Id, ";
                        $ins_values = " VALUES ({$data->factObjects[0]->quote->id},";
                        $onUpdt = "";
                        @$log = "{$data->factObjects[0]->quote->id}: ";
                        foreach ($r_fields as $fields) {
                            $fieldNm = strtolower($fields['Field']);
                            if( isset($val->$fieldNm) && $fieldNm != strtolower('Quote_quote_Id')){
                                @$ins_fields .= " {$fields['Field']} ,";
                                $onUpdt .=$fields['Field']."=VALUES({$fields['Field']}),";
                                $ins_values .= $fxns->_formatFieldValue($val->$fieldNm, array('type'=>$fields['Type'])).",";
                                $log .= "{$fields['Field']}<=>{$val->$fieldNm},";
                            }
                        }
                        $ins_values = rtrim($ins_values,',');
                        $ins_fields = $fxns->_subStrAtDel($ins_fields, ' ,');
                        $onUpdt = rtrim($onUpdt,',');
                        $q_str_PODetails = $q_str_PODetails .$ins_fields . ") " . $ins_values . ")";
                        $q_str_PODetails .= " ON DUPLICATE KEY UPDATE Quote_quote_Id=VALUES(Quote_quote_Id),".$onUpdt;
//echo $q_str_PODetails;
//echo $q_str_PODetails_cat;exit;
                        if(@$val->role_to_approve ){
                            if(!isset($val->$priKy)) {
                                $q_str_PODetails = $dbo->prepare($q_str_PODetails);
                                $q_str_PODetails->execute();
                                $lastId = $dbo->lastInsertId();
                                $q_str_PODetails_cat = $q_str_PODetails_cat .$ins_fields . ", quotecat_id,po_is_approved, role_to_approve, $priKy) " . $ins_values . ", $lastQuoteCatId,'0', '{$val->role_to_approve}', $lastId)";
                                $q_str_PODetails_cat .= " ON DUPLICATE KEY UPDATE Quote_quote_Id=VALUES(Quote_quote_Id),".$onUpdt;
                            }else{
                                $q_str_PODetails_cat = $q_str_PODetails_cat .$ins_fields . ", quotecat_id,po_is_approved, role_to_approve) " . $ins_values . ", $lastQuoteCatId,'0', '{$val->role_to_approve}')";
                                $q_str_PODetails_cat .= " ON DUPLICATE KEY UPDATE Quote_quote_Id=VALUES(Quote_quote_Id),".$onUpdt;
                            }
//                            throw new Exception($q_str_PODetails);
                            $r_str = $dbo->prepare($q_str_PODetails_cat);
                            $r_str->execute();
                        }else{
                            $q_str_PODetails = $dbo->prepare($q_str_PODetails);
                            $q_str_PODetails->execute();
                        }
                    }
                    $log_txt .= $log;
                }
                $q_str_logs .= $log_txt ."', NOW())";
                $r_str_logs = $dbo->prepare($q_str_logs);
                $r_str_logs->execute();
            }
            $dbo->commit();
            $data=array('token'=> $data->token);
            $response = array("response" => "Success", "message" => "Record Saved Successfully", "data"=>$data);
        }catch(Exception $e){
            $dbo->rollBack();
            switch($e->getCode()){
                case 23000:
                    $response = array("response"=>"Failure","message"=>"A pending approval seem to exist for this data","token"=>$data->token);
                    break;
                default:
                    $response = array("response"=>"Failure","message"=>$e->getMessage(),"token"=>$data->token);

            }
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
