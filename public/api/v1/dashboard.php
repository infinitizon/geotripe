<?php
header("Content-Type:application/json");
//echo 'problem in index!';

$scriptName = $_SERVER['SCRIPT_NAME']; // <-- "e.g /api/v1/index.php"
$requestUri = $_SERVER['REQUEST_URI']; // <-- "e.g /api/v1/login"
$physicalPath = str_replace('\\', '', dirname($scriptName)); // <-- "e.g /api/v1"
$env['PATH_INFO'] = substr_replace($requestUri, '', 0, strlen($physicalPath)); // <--returns "/login"
$data = json_decode(file_get_contents("php://input")); //Get data that is sent to the backend\


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
if ($data->transactionEventType == "QuoteStat") {
    $q_str = "SELECT status, count(status) count ";
    $q_str .= "FROM( ";
    $q_str .= "SELECT q.quote_id,q.rfq_no,p.name,CONCAT(u.lastname,', ',u.middlename,' ',u.firstname)enteredBy ";
    $q_str .= ",(CASE WHEN SUM(qd.tq)>0 AND SUM(qd.submitted) >0 AND (SUM(qd.tq)+ SUM(qd.submitted))<COUNT(qd.Quote_quote_Id) THEN 'Partially Submitted' ";
    $q_str .= "WHEN SUM(qd.tq)>0 THEN 'TQ on line Item(s)' ";
    $q_str .= "ELSE qs.name END) status,COUNT(qd.Quote_quote_Id) totalQuotes ";
    $q_str .= ",DATEDIFF(q.duedate,NOW())remDays,q.entrydate,SUM(qd.submitted)submitted,SUM(qd.tq)tq ";
    $q_str .= "FROM Quote q ";
    $q_str .= "JOIN  Party p ON q.Party_Party_Id=p.Party_Id ";
    $q_str .= "JOIN QuoteStatus qs ON q.Quote_Status_Id=qs.QuoteStatus_Id ";
    $q_str .= "JOIN  Users u ON q.quote_enteredBy_id=u.user_id ";
    $q_str .= "LEFT JOIN  QuoteDetail qd ON q.quote_Id=qd.Quote_quote_Id ";
    $q_str .= "GROUP BY q.quote_Id ";
    $q_str .= ") t ";
    $q_str .= "group by status";

    $q_str_tot_count = $dbo->query("SELECT COUNT(*) as `count` FROM (" . $q_str . ") t");
    $r_str_tot_count = $q_str_tot_count->fetch(PDO::FETCH_ASSOC);

    $r_obj = $dbo->prepare($q_str);
    $r_obj->execute(array());
    $q_response = $r_obj->fetchAll(PDO::FETCH_ASSOC);
    $response = array("response" => "Success", "token" => $data->token, "total_count" => $r_str_tot_count['count'], "data" => @$q_response);

}

$response = json_encode($response);
echo $response;
