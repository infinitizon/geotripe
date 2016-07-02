<?php
/*
* Include the necessary configuration info
*/
include_once 'config/db-cred.inc.php';
/*
* Define constants for configuration info
*/
foreach ( $C as $name => $val ){
	define($name, $val);
}
define('WEB_ROOT', "http".(!empty($_SERVER['HTTPS'])?"s":"")."://".$_SERVER['HTTP_HOST']);
/**
* Define a generic salt
*/
$salt  = "j^i207soif5+_7~%4*%03dql";
/*
* Create a PDO connection object
*/
$dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME;
try{
	$dbo = new PDO($dsn, DB_USER, DB_PASS);
	$dbo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}catch(PDOException $e){
	echo "Failed database connection: ".$e->getMessage();
	exit();
}
$token = sha1(uniqid().time().uniqid());
/*
* Define the auto-load function for classes
*/
include_once "class/class.db_connect.inc.php";
include_once "class/class.fxns.inc.php";
include_once "class/class.auth.inc.php";
?>