<?php
/**
 * Created by IntelliJ IDEA.
 * User: ahassan
 * Date: 7/19/16
 * Time: 1:58 PM
 */
//echo md5("12")."<br>";
//$facts = "User u, Party p";
//$options = array('joinType'=>array('LEFT'),'joinKeys'=>array('u.user_party_id=p.party_id'), 'del'=>'&');
//$fields = "u.contactphonenumber&u.user_party_id&p.name&u.isauthorizedperson";
//$fields = explode('&',$fields);
$facts = "Users u";
//$options = array('joinType'=>array('LEFT'),'joinKeys'=>array('u.user_party_id=p.party_id'), 'del'=>'&');
$fields = "u.contactphonenumber&u.user_party_id&u.isauthorizedperson";
$fields = explode('&',$fields);
echo _generateQry($facts, $fields);

function _generateQry($factName, $fields, $options=array()){
    $required = array('del'=>'&');
    $options = array_merge($required,$options);
    $q_str = "SELECT ";
    foreach ($fields as $field) {
        $q_str .= $field . ",";
    }
    $q_str = substr($q_str, 0, -1) . " FROM ";

    $joins= explode(",",$factName);
    foreach($joins as $key => $tables){
        $q_str .= $tables." ";
        if(isset($options['joinType'][$key])){
            $q_str .= $options['joinType'][$key];
        }
        $q_str .= " JOIN ";
    }
    $q_str = substr($q_str, 0, strrpos($q_str, "JOIN"));
    if(isset($options['joinKeys'])){
        foreach($options['joinKeys'] as $key => $joinFields){
            $q_str .= " ON ".$joinFields;
        }
    }
    return $q_str;
}