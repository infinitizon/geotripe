<?php
/**
 * Created by IntelliJ IDEA.
 * User: ahassan
 * Date: 7/19/16
 * Time: 1:58 PM
 */
//echo md5("12")."<br>";
$main_qry = "contactphonenumber&user_party_id(Party=>party_id&name)&isauthorizedperson";
//echo "Main qry: ".$main_qry."<br>";
$r_q = array();
$queries = g_qry(0,$main_qry) ;
var_dump($queries);

$dsn = "mysql:host=127.0.0.1;dbname=geotripe";
try{
    $dbo = new PDO($dsn, "root", "");
    $dbo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}catch(PDOException $e){
    echo "Failed database connection: ".$e->getMessage();
    exit();
}
foreach($queries as $key => $q){
    $q = $dbo->prepare($q);
    $q->execute(array());
    $r_q = $q->fetchAll(PDO::FETCH_ASSOC);
    var_dump($r_q);
    if($key != "main"){
    }

}
function g_qry($first, $main_qry){
    $q = array();
    if (strpos($main_qry, '(') !== false) {
    //    $join = get_string_between($main_qry, "(", ")");
        $join = get_string_between($main_qry, "(", ")");
        $join_ky = get_string_between($main_qry, "&", "(".$join);

        $main = explode('&',str_replace("()","",str_replace($join,"",$main_qry)));

        $q =generateQry("Users", $main);
        $q=array((($first==0)? 'main':'')=>$q);
        $first++;
        foreach($main as $mainVals){
            if($mainVals == $join_ky){
                $q = array_merge($q, array($mainVals  => g_qry($first, $join)));
//                $q = array_push($q , array($mainVals  => g_qry($first, $join)));
            }
        }
    }else{
        $main = explode("=>",$main_qry);

        $q = generateQry($main[0], explode("&",$main[1]));
//        return $main[1];
    }

    return $q;
}
//echo "Join qry: ".$join."<br>";
//$main_qry = str_replace("()","",str_replace($join,"",$main_qry));

//echo $main_qry."<br>";
//$join_fact = explode("=>",$join);
//$join_fields = explode("&",$join_fact[1]);
//echo generateQry($join_fact[0],$join_fields);


function generateQry($factName, $fields, $options=array()){
    $q_str = "SELECT ";
    foreach ($fields as $field) {
        $q_str .= $field . ",";
    }
    $q_str = substr($q_str, 0, -1) . " FROM " . $factName;
    return $q_str;
}
function get_string_between($string, $start, $end){
    $string = ' ' . $string;
    $ini = strpos($string, $start);
    if ($ini == 0) return '';
    $ini += strlen($start);
    $len = strpos($string, $end, $ini) - $ini;
    $new_str = substr($string, $ini, $len);
    if (strpos($new_str, $start) !== false) {
        $new_str.=")";
        $new_str .= get_string_between($string, $new_str, $end);
    }
    return $new_str;
}