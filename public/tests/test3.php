<?php

echo formatFieldValue('1',array('type'=>"bit"));
function _formatFieldValue($value, $options=array()){
    $rtnVal=null;
    if(substr($options['type'],0,3)=="bit") {
        $rtnVal = $value;
    }elseif($options['type']=="datetime") {
        $timestamp = strtotime($value);
        $timestamp = date("Y-m-d H:i:s", $timestamp);
        $rtnVal = "'{$timestamp}'";
    }else{
        $rtnVal = "'{$value}'";
    }
    return $rtnVal;
}