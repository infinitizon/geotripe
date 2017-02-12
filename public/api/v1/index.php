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
if($env['PATH_INFO']==="/login"){
    try {
        $stmtChkUsr = "SELECT u.user_id, u.firstname, u.middlename, u.lastname, u.username, u.email, u.workphonenumber, u.contactphonenumber, u.password, u.pix
                    FROM Users u
                    WHERE (u.username=:email OR u.email=:email) AND u.password = :password AND u.enabled=1 and u.accountlocked<>1 ";
        $stmtChkUsr = $dbo->prepare($stmtChkUsr);
        $stmtChkUsr->execute(array(":email" => $data->usr, ":password" => md5(base64_decode($data->pwd))));
        $user = $stmtChkUsr->fetchAll(PDO::FETCH_ASSOC);
        if (count($user) == 1) {
            $qryGivToken = "UPDATE Users SET token =:token WHERE email=:email AND password = :password";
            $qryGivToken = $dbo->prepare($qryGivToken);
            $qryGivToken->execute(array(":token" => $token, ":email" => $data->usr, ":password" => md5(base64_decode($data->pwd))));
            $r_getRoles = $dbo->query("SELECT AuthRoles_Id,Name FROM User_AuthRole ua
                          JOIN AuthRoles ar
                          ON ua.AuthRoles_AuthRoles_Id=ar.AuthRoles_Id
                        WHERE ua.Users_User_Id=".$user[0]['user_id']);
            //Get all pages for the app
            $r_getPages = $dbo->query("SELECT av.authview_id, av.name, av.parent_id, av.viewpath, av.parentViewPath, av.description
                                    , av.css_class, av.roles FROM AuthView av");
//            // Create a multidimensional array to contain a list of items and parents
//            $menu = array('items' => array(), 'parents' => array());
//            // Builds the array lists with data from the menu table
//            while ($items = $r_getPages->fetch(PDO::FETCH_ASSOC)) {
//                $menu['items'][$items['authview_id']] = $items;
//                $menu['parents'][$items['parent_id']][] = $items['authview_id'];
//            }
            $authRoles = $r_getRoles->fetchAll(PDO::FETCH_ASSOC);
            $appPages = $r_getPages->fetchAll(PDO::FETCH_ASSOC);
//            $appPages = $fxns->_buildMenu(0, $menu, array('method' => "json")); //Same concept was used in getting authViews b4 it was commented
//            $appPages = json_decode($appPages);
            $response = array("response" => "Success", "token" => $token
            , "authDetails" => $user[0]
            , "authRoles" => $authRoles
            , "appPages" => $appPages);
            $usrnm = ($user[0]['username'])? $user[0]['username'] :$user[0]['email'];
            $q_loginDetail = "INSERT INTO LoginDetail";
            $q_loginDetail .= "(Username,RemoteAddress,LoginDate,LoginSuccessful,LoginDetail_User_Id)";
            $q_loginDetail .= "VALUES";
            $q_loginDetail .= "('{$usrnm}','{$_SERVER['HTTP_REFERER']}',NOW(),1,{$user[0]['user_id']})";
            $q_fields = $dbo->query($q_loginDetail);

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
if($env['PATH_INFO']==="/password/changeRequest"){
    include_once "phpmailer-master/class.phpmailer.php";
    try {
        $stmtChkUsr = "SELECT u.user_id, u.firstname, u.middlename, u.lastname, u.username, u.email, u.workphonenumber, u.contactphonenumber, u.password, u.pix
                    FROM Users u
                    WHERE (u.username=:email OR u.email=:email) AND u.enabled=1 and u.accountlocked<>1 ";
        $stmtChkUsr = $dbo->prepare($stmtChkUsr);
        $stmtChkUsr->execute(array(":email" => $data->username));
        $user = $stmtChkUsr->fetchAll(PDO::FETCH_ASSOC);
        if (count($user) == 1) {
//            $dbo->beginTransaction();
            $q_setRequest = "UPDATE Users SET requestReset=1 WHERE email=:email";
            $r_setRequest = $dbo->prepare($q_setRequest);
            if($r_setRequest->execute(array(":email" => $data->username))){
                $time = time();
                $mail = new PHPMailer();

                $mail->IsSMTP();                                      // set mailer to use SMTP
                $mail->Host = "mail.mrfreshservices.com";  // specify main and backup server
                $mail->SMTPAuth = true;     // turn on SMTP authentication
                $mail->Username = "mrfreshs";  // SMTP username
                $mail->Password = "0phFdD14d4"; // SMTP password

                $mail->From = "noreply@geoscape.com";
                $mail->FromName = "Geoscape ERP";
                $mail->AddAddress($user[0]['email']);

                $mail->WordWrap = 50;                                 // set word wrap to 50 characters
                $mail->IsHTML(true);                                  // set email format to HTML

                $mail->Subject = "Forget Password";;
                $password = "{$data->preURL}/reset/".md5($user[0]['user_id'].$user[0]['email'].$time)."/$time";
                $mail->Body    = "Hi {$user[0]['lastname']}, {$user[0]['firstname']} <br/> <br/>You or someone else requested a password reset on the Geoscape ERP."
                    ."<br><br>Click here to reset your password <a href='$password'>$password</a>.<br>Ignore this message if it wasn't you <br>--<br>Geoscape";
                $mail->AltBody = "Hi {$user[0]['lastname']}, {$user[0]['firstname']} <br/> <br/>You or someone else requested a password on the Geoscape ERP."
                    ."<br><br>If this was you, Click here to reset your password <a href='$password'>$password</a>.<br/>Ignore this message if it wasn't you <br>--<br>Geoscape";
                if(!$mail->Send()) {
//                    $dbo->rollBack();
                    $response = array("response" => "Failure", "message" => "Error sending mail: {$mail->ErrorInfo} \n Please contact admin");
                }else{
//                    $dbo->commit();
                    $response = array("response" => "Success", "message" => "Your password reset link send to your e-mail address.");
                }
            }else{
                $response = array("response" => "Failure", "message" => "Error experienced on the system database\n Please contact admin");
            }
        }elseif (count($user) > 1) {
            $response = array("response" => "Failure", "message" => "More than one record exists for your login.\nPlease contact admin");
        }else {
            $response = array("response" => "Failure", "message" => "Username does not exist");
        }
    }catch(Exception $e){
        $response = array("response"=>"Failure","message"=>$e->getMessage());
    }
    echo json_encode($response);
}
if($env['PATH_INFO']==="/password/check"){
    try {
        $now = time();
        if(($now - $data->t) > 60*15){
            $response = array("response" => "Failure", "message" => "Password token is expired");
        }else{
            $stmtChkUsr = "SELECT u.user_id, u.firstname, u.middlename, u.lastname, u.username, u.email, u.workphonenumber, u.requestReset, u.contactphonenumber, u.password, u.pix
                    FROM Users u
                    WHERE md5(CONCAT(u.user_id,u.email,{$data->t}))= '{$data->h}'";
            $stmtChkUsr = $dbo->prepare($stmtChkUsr);
            $stmtChkUsr->execute();
            $user = $stmtChkUsr->fetchAll(PDO::FETCH_ASSOC);
            if (count($user) == 1) {
                if($user[0]['requestReset']==1){
                    $response = array("response" => "Success", "message" => "Found", "email" => $user[0]['email']);
                }else{
                    $response = array("response" => "Failure", "message" => "Password token does not exist or is expired");
                }
            }elseif (count($user) > 1) {
                $response = array("response" => "Failure", "message" => "More than one record exists for your login.\nPlease contact admin");
            }else {
                $response = array("response" => "Failure", "message" => "Username does not exist");
            }
        }
    }catch(Exception $e){
        $response = array("response"=>"Failure","message"=>$e->getMessage());
    }
    echo json_encode($response);
}
if($env['PATH_INFO']==="/password/reset"){
    try {
        $stmtChkUsr = "SELECT u.user_id, u.firstname, u.middlename, u.lastname, u.username, u.email, u.workphonenumber, u.contactphonenumber, u.password, u.pix
                    FROM Users u
                    WHERE (u.username=:email OR u.email=:email) AND u.enabled=1 and u.accountlocked<>1 ";
        $stmtChkUsr = $dbo->prepare($stmtChkUsr);
        $stmtChkUsr->execute(array(":email" => $data->usr));
        $user = $stmtChkUsr->fetchAll(PDO::FETCH_ASSOC);
        if (count($user) == 1) {
            $qryGivToken = "UPDATE Users SET password=:password, requestReset=0 WHERE email=:email";
            $qryGivToken = $dbo->prepare($qryGivToken);
            $qryGivToken->execute(array(":email" => $data->usr, ":password" => md5(base64_decode($data->pwd))));
            $response = array("response" => "Success", "message" => "Password reset successfully");
        }elseif (count($user) > 1) {
            $response = array("response" => "Failure", "message" => "More than one record exists for your login.\nPlease contact admin");
        }else {
            $response = array("response" => "Failure", "message" => "Username does not exist");
        }
    }catch(Exception $e){
        $response = array("response"=>"Failure","message"=>$e->getMessage());
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
            if (isset($data->transactionEventType) && !isset($data->putType)) {
                $theFact = explode(',',$data->factName);
                $q_fields = $dbo->query("DESCRIBE {$theFact[0]}");
                $r_fields = $q_fields->fetchAll(PDO::FETCH_ASSOC);
                foreach ($r_fields as $fields) {
                    if ($fields['Key'] == 'PRI') {
                        $priKy = $fields['Field'];
                    }
                }
            }/**
             * A Query is a select
             */
            if ($data->transactionEventType == "downFile") {
                $stmt = $dbo->prepare("SELECT docName, docMimeType, docSize, docBlob FROM Document WHERE doc_id = :fileid");
                $stmt->bindParam(':fileid', $data->transactionMetaData->queryMetaData->queryClause->andExpression[0]->propertyValue, PDO::PARAM_INT, 11);
                $stmt->execute();
                $fRes = $stmt->fetchAll(PDO::FETCH_ASSOC);

//var_dump($fRes);

                header("Cache-Control: public");
                header("Content-Description: File Transfer");
                header("Content-length: ".$fRes[0]['docSize']);
                header("Content-type: ".$fRes[0]['docMimeType']);
//header("Content-Transfer-Encoding: Binary");
                header("Content-Disposition: attachment; filename=\"".$fRes[0]['docName']."\"");
//                echo json_encode(readfile($fRes[0]['docBlob']));
                echo $fRes[0]['docBlob'];
                exit;
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
                    $q_str .= " WHERE "; $files_id = '';
                    foreach ($data->transactionMetaData->queryMetaData->queryClause->andExpression as $field) {
                        $q_str .= $field->propertyName . " " . $field->operatorType . " ";
                        if($field->operatorType=="IN"){
//                            echo $field->propertyName;
                            $q_str .= "(".$field->propertyValue . ") AND ";
                        }elseif($field->operatorType=="LIKE"){
                            $q_str .= ($field->propertyValue ? "'%".$field->propertyValue . "%' AND " : "'' AND ");
                        }else{
                            $q_str .= $field->propertyValue . " AND ";
                        }
                        $files_id .= $field->propertyValue.' ,';
                    }
                    $q_str = $fxns->_subStrAtDel($q_str, ' AND ');
                    $files_id = $fxns->_subStrAtDel($files_id, ' ,');
//                    $q_getFiles_str = "SELECT doc_id,doc_quote_id,docName,docPath,docMimeType,docCreateDate,documentType_id FROM Document WHERE doc_quote_Id IN ($files_id)";
                }
                if (!empty($data->transactionMetaData->groupingProperties->by)) {
                    $q_str .= " GROUP BY ".$data->transactionMetaData->groupingProperties->by;
                    if (!empty($data->transactionMetaData->groupingProperties->having)) {
                        $q_str .= " HAVING ";
                        foreach ($data->transactionMetaData->groupingProperties->having as $field) {
                            $q_str .= $field->clause . " " . $field->operatorType . " ".$field->propertyValue. " AND ";
                        }
                        $q_str = $fxns->_subStrAtDel($q_str, ' AND ');
                    }
                }

//echo $q_str;exit;
                $q_str_tot_count = $dbo->query("SELECT COUNT(*) as `count` FROM (" . $q_str . ") t");
                $r_str_tot_count = $q_str_tot_count->fetch(PDO::FETCH_ASSOC);

// var_dump( $r_str_tot_count );
                if (!is_null($data->transactionMetaData->pageno)) {
                    $start = $data->transactionMetaData->pageno * $data->transactionMetaData->itemsPerPage;
                    $q_str .= " LIMIT {$start},{$data->transactionMetaData->itemsPerPage}";
                }

//echo $q_str;exit;
                $r_obj = $dbo->prepare($q_str);
                $r_obj->execute(array());
                while ($items = $r_obj->fetch(PDO::FETCH_ASSOC)) {
                    foreach($items as $kname=>$kval){
                        if($kname == 'docBlob'){
                            $items['docBlob'] = base64_encode($items['docBlob']);
//                            $items['docBlob'] = utf8_encode($items['docBlob']);
                        }
                    }
                    $q_response[] = $items;
                }
                if(isset($q_getFiles_str)) {
                    var_dump($q_getFiles_str);
                    $r_getFiles_str = $dbo->prepare($q_getFiles_str);
                    $r_getFiles_str->execute();
                    $files = $r_getFiles_str->fetchAll(PDO::FETCH_ASSOC);
                    if(count($files) > 0) {
                        $q_response['files'] = $files;
                    }
                }
                $response = array("response" => "Success", "token" => $data->token, "total_count" => $r_str_tot_count['count'], "data" => @$q_response);

//                var_dump($response);
//                $response = json_encode($response);
//                echo $response;exit;
            }
            /**
             * An Update is an Update
             */
            if ($data->transactionEventType == "Update") {
//                echo "Got here";
                if(is_array($data->factObjects[0])){
                    $dbo->beginTransaction();
                        $q_str = "INSERT INTO {$data->factName} ";
                        $q_str_logs = "INSERT INTO logs (users_user_id,log_table,log_table_key,log_changes,log_date) VALUES ( ";
                        $q_str_logs .= "{$user[0]['User_Id']},'{$data->factName}',{$data->factObjects[0]->id}, '";
                        $ins_fields = " (";
                        $ins_values = " VALUES (";
                        $onUpdt = "";
                        foreach ($r_fields as $fields) {
                            $fieldNm = strtolower($fields['Field']);
                            if( isset($data->factObjects[0][0]->$fieldNm)){
                                @$ins_fields .= " {$fields['Field']} ,";
                                $onUpdt .=$fields['Field']."=VALUES({$fields['Field']}),";
                                @$logs_fields .= $fields['Field'].",";
                            }
                        }
                        $ins_values = " VALUES ";
                        foreach($data->factObjects[0] as $values){
                            $ins_values .= "(";
                            foreach ($r_fields as $fields) {
                                $fieldNm = strtolower($fields['Field']);
                                if (isset($values->$fieldNm)) {
                                    @$ins_values .= $fxns->_formatFieldValue($values->$fieldNm, array('type'=>$fields['Type'])).",";
                                    @$logs_values .= $values->$fieldNm.",";
                                }
                            }
                            $ins_values = rtrim($ins_values,',');
                            $ins_values .= "),";
                        }
                        if($logs_fields!=''){
                            $q_str_logs .="Modified the following fields with values ".$logs_fields."<=>".$logs_values." respectively', NOW())";
//echo $q_str_logs;
                            $r_logStr = $dbo->prepare($q_str_logs);
                            $r_logStr->execute(array(':tblColKey'=>$lastId));

                        }
                        $ins_fields = $fxns->_subStrAtDel($ins_fields, ' ,');
                        $ins_values = rtrim($ins_values,',');
                        $onUpdt = rtrim($onUpdt,',');
                        $q_str .= $ins_fields . ") " . $ins_values;
                        $q_str .= " ON DUPLICATE KEY UPDATE ".$onUpdt;
//echo $q_str;
                        $r_str = $dbo->prepare($q_str);
                        $r_str->execute();
                    $dbo->commit();
                }else {
                    $dbo->beginTransaction();
                        $q_str = "UPDATE {$data->factName} SET ";$updts='';
                        $q_str_logs = "INSERT INTO logs (users_user_id,log_table,log_table_key,log_changes,log_date) VALUES ( ";
                        $log_txt = "{$user[0]['User_Id']},'{$data->factName}',{$data->factObjects[0]->id}, 'updated row, set: ";
                        foreach ($r_fields as $fields) {
                            $fieldNm = strtolower($fields['Field']);
                            if (array_key_exists($fieldNm, @$data->factObjects[0])) {
                                $q_str .= "{$fields['Field']} = '{$data->factObjects[0]->$fieldNm}' ,";
                                $log_txt .= "{$fields['Field']}<=>{$data->factObjects[0]->$fieldNm} ,";
                            }
                        }
                        $q_str = $fxns->_subStrAtDel($q_str, ' ,');
                        $q_str_logs .= $log_txt . "', NOW())";
                        $q_str .= " WHERE $priKy={$data->factObjects[0]->id}";
//echo $q_str;
//echo $q_str_logs;
                        $r_str = $dbo->prepare($q_str);
                        $r_str->execute();

                        $r_str_logs = $dbo->prepare($q_str_logs);
                        $r_str_logs->execute();
                    if($_FILES){
                        for($i=0; $i<count($_FILES['file']['name']); $i++ ){
                            $name = $_FILES['file']['name'][$i];
                            $mime = $_FILES['file']['type'][$i];
                            $temp = $_FILES['file']['tmp_name'][$i];
                            $size = intval($_FILES['file']['size'][$i]);

                            $newfilename = md5(time()).".".pathinfo($name, PATHINFO_EXTENSION);
                            $path = $_SERVER['DOCUMENT_ROOT'].'/uploads/' . $newfilename;
                            $webPath = WEB_ROOT.'/uploads/' . $newfilename;
                            move_uploaded_file($temp, $path);


//                              $blob = $dbo->quote(file_get_contents($_FILES['file']['tmp_name'][$i]));
                            $query = "INSERT INTO Document (doc_quote_id,docName,docMimeType,docPath,docSize,docCreateDate)
                                            VALUES
                                          ({$data->factObjects[0]->id},'{$name}','{$mime}','{$webPath}',{$size},NOW())";
                            $r_query = $dbo->prepare($query);
                            $r_query->execute();
                            //Document Logs
                            $q_str_logs = "INSERT INTO logs (users_user_id,log_table,log_table_key,log_changes,log_date) ";
                            $log_txt = "{$user[0]['User_Id']},'Document',:tblColKey, 'inserted new lines for: ";
                            $log_txt .= "docName=>{$name}, docPath=>{$path}";
                            $q_str_logs .= " VALUES (" . $log_txt . "', NOW() )";
//                            echo $q_str_logs;
                            $r_logStr = $dbo->prepare($q_str_logs);
                            $r_logStr->execute(array(':tblColKey'=>$data->factObjects[0]->id));

                        }
                    }
                    $dbo->commit();
                }
//                echo $q_str;
                $response = array("response" => "Success", "message" => "Record Updated Successfully", "token" => $data->token);

            }
            /**
             * A PUT is an insert
             */
            if ($data->transactionEventType == "PUT") {

                $q_str = "INSERT INTO {$data->factName} ";
                $q_str_logs = "INSERT INTO logs (users_user_id,log_table,log_table_key,log_changes,log_date) ";

                $ins_fields = " (";
                $ins_values = " VALUES (";
                if(!is_array($data->factObjects[0])){
                    $dbo->beginTransaction();
                        $log_txt = "{$user[0]['User_Id']},'{$data->factName}',:tblColKey, 'inserted new lines for: ";
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
//echo $q_str;
                        $r_str = $dbo->prepare($q_str);
                        $r_str->execute();
                        $lastId = $dbo->lastInsertId();

                        $r_logStr = $dbo->prepare($q_str_logs);
                        $r_logStr->execute(array(':tblColKey'=>$lastId));
                        if($_FILES){
                            for($i=0; $i<count($_FILES['file']['name']); $i++ ){
                                $name = $_FILES['file']['name'][$i];
                                $mime = $_FILES['file']['type'][$i];
                                $temp = $_FILES['file']['tmp_name'][$i];
                                $size = intval($_FILES['file']['size'][$i]);

                                $newfilename = md5(time()).".".pathinfo($name, PATHINFO_EXTENSION);
                                $path = $_SERVER['DOCUMENT_ROOT'].'/uploads/' . $newfilename;
                                $webPath = WEB_ROOT.'/uploads/' . $newfilename;
                                move_uploaded_file($temp, $path);


//                              $blob = $dbo->quote(file_get_contents($_FILES['file']['tmp_name'][$i]));
                                $query = "INSERT INTO Document (doc_quote_id,docName,docMimeType,docPath,docSize,docCreateDate)
                                            VALUES
                                          ({$lastId},'{$name}','{$mime}','{$webPath}',{$size},NOW())";
                                $r_query = $dbo->prepare($query);
                                $r_query->execute();
                                //Document Logs
                                $q_str_logs = "INSERT INTO logs (users_user_id,log_table,log_table_key,log_changes,log_date) ";
                                $log_txt = "{$user[0]['User_Id']},'Document',:tblColKey, 'inserted new lines for: ";
                                $log_txt .= "docName=>{$name}, docPath=>{$path}";
                                $q_str_logs .= " VALUES (" . $log_txt . "', NOW() )";
                                $r_logStr = $dbo->prepare($q_str_logs);
                                $r_logStr->execute(array(':tblColKey'=>$lastId));

                            }
                        }
                    $dbo->commit();
                }else{
                    $dbo->beginTransaction();
                        $ins_fields = " (";
                        foreach ($r_fields as $fields) {
                            $fieldNm = strtolower($fields['Field']);
                            if( isset($data->factObjects[0][0]->$fieldNm)){
                                @$ins_fields .= " {$fields['Field']} ,";
                                @$log_fields .= " {$fields['Field']} :";
                            }
                        }
                        $ins_values = " VALUES ";
                        foreach($data->factObjects[0] as $values){
                            $ins_values .= "(";
                            foreach ($r_fields as $fields) {
                                $fieldNm = strtolower($fields['Field']);
                                if ($values->$fieldNm) {
                                    @$ins_values .= $fxns->_formatFieldValue($values->$fieldNm, array('type'=>$fields['Type'])).",";
                                    @$log_values .= $fxns->_formatFieldValue($values->$fieldNm, array('type'=>$fields['Type'])).",";
                                }
                            }
                            $ins_values = rtrim($ins_values,',');

                            $ins_fields = $fxns->_subStrAtDel($ins_fields, ' ,');
                            $log_fields = $fxns->_subStrAtDel($log_fields, ' :');
                            $q_str .= $ins_fields . ") " . $ins_values .= ")";

                            $r_str = $dbo->prepare($q_str);
                            $r_str->execute();
                            $lastId = $dbo->lastInsertId();

                            $q_str_logs = "INSERT INTO logs (users_user_id,log_table,log_table_key,log_changes,log_date) VALUES ";
                            $q_str_logs .= "( {$user[0]['User_Id']}, '{$data->factName}', :tblColKey, 'inserted new lines for: ".$ins_fields."<=>".$ins_values."', NOW() )";
                            $r_logStr = $dbo->prepare($q_str_logs);
                            $r_logStr->execute(array(':tblColKey'=>$lastId));
                        }
                    $dbo->commit();
                }
                $data=array('token'=> $data->token,'insertId'=>$lastId);
                $response = array("response" => "Success", "message" => "Record Saved Successfully", "data"=>$data);
            }
            if (@$data->transactionEventType == "DELETE") {
                try{
                    $dbo->beginTransaction();
                        $q_del = "DELETE FROM {$data->factName} WHERE ";
                        foreach ($data->transactionMetaData->queryMetaData->queryClause->andExpression as $field) {
                            $q_del .= $field->propertyName . " " . $field->operatorType . " ";
                            if($field->operatorType=="IN"){
                                $q_del .= "(".$field->propertyValue . ") AND";
                            }elseif($field->operatorType=="LIKE"){
                                $q_del .= "'%".$field->propertyValue . "%' AND";
                            }else{
                                $q_del .= $field->propertyValue . " AND";
                            }
                        }
                        $q_del = $fxns->_subStrAtDel($q_del, ' AND');
                        $r_str = $dbo->prepare($q_del);
                        $r_str->execute();

                        $q_str_logs = "INSERT INTO logs (users_user_id,log_table,log_table_key,log_changes,log_date) VALUES ";
                        $q_str_logs .= "( {$user[0]['User_Id']}, '{$data->factName}', '', '{$q_del}', NOW() )";
                        $r_logStr = $dbo->prepare($q_str_logs);
                        $r_logStr->execute();

                        $data=array('token'=> $data->token);
                        $response = array("response" => "Success", "message" => "Record Deleted Successfully", "data"=>$data);
                    $dbo->commit();
                }catch(Exception $e){
                    $response = array("response"=>"Warning","message"=>$e->getMessage(),"token"=>$data->token);
                }
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
        $response = array("response"=>"Success","message"=>"You have been logged out");
    }catch(Exception $e){
        $response = array("response"=>"Failure","message"=> $e->getMessage());
    }
    echo json_encode($response);
}
