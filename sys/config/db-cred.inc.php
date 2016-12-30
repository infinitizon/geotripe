<?php

/*
* Create an empty array to store constants
*/
$C = array();
/*
* The database host URL
*/
$C['DB_HOST'] = '127.0.0.1';
/*
* The database username
*/
$C['DB_USER'] = 'root';	 //root  -  cummins_geotripe
/*
* The database password
*/
$C['DB_PASS'] =  ''; // rootn31, root
/*
* The name of the database to work with
*/
$C['DB_NAME'] = 'geotripe';  // geotripe  -  cummins_geotripe
/*
* The web root of our application
*/
$C['WEB_ROOT'] = 'http://127.0.0.1';  // Use "http".(!empty($_SERVER['HTTPS'])?"s":"")."://".$_SERVER['HTTP_HOST'] in production; http://127.0.0.1 in dev

?>
