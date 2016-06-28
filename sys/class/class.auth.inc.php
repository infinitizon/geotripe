<?php
/**
* General functions class
*
* PHP version 5+
*
* LICENSE: This source file is subject to the MIT License, available at http://www.opensource.org/licenses/mit-license.html
*
* @author Abimbola Hassan <ahassan@infinitizon.com>
* @copyright 2014 infinitizon Design
* @license http://www.opensource.org/licenses/mit-license.html
*/
class Auth extends DB_Connect{
	private $the_customer;
	private $fxns;
	
	/**
	* Creates a database object and stores relevant data
	*
	* Upon instantiation, this class accepts a database object that, if not null, is stored in the object's private $_db
	* property. If null, a new PDO object is created and stored instead.
	*
	* @param object $dbo a database object
	* @return void
	*/
	public function __construct($dbo=NULL){
		/*
		* Call the parent constructor to check for a database object
		*/
		parent::__construct($dbo);
		$this->fxns = new Functions($dbo);
	}
	/**
	* Function to authenticate a user
	*
	* @return array: User authentication details
	*/
	public function _authenticate ($string) {

	}
}

?>