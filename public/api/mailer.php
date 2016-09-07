<?php
include_once "core/init.inc.php";
$fxns = new Functions($dbo);

$q_getPendingMails = "";
$params = array();
$fxns->_execQuery($q_getPendingMails, true, true, $params);