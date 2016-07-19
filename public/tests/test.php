<?php
/**
 * Created by IntelliJ IDEA.
 * User: ahassan
 * Date: 7/19/16
 * Time: 1:58 PM
 */

$main_qry = "contactphonenumber&user_party_id(Party=>(party_id)&name)&isauthorizedperson";
$join = get_string_between($main_qry, "(", ")");
$main_qry = str_replace("()","",str_replace($join,"",$main_qry));

echo $main_qry."<br>";
echo $join."<br>";
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
    return substr($string, $ini, $len);
}