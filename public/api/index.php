<?php

//$target_dir = "./upload/";


$data = json_decode(file_get_contents("php://input")); //Get data that is sent to the backend\
if($data){
    var_dump($data);
}else{
    var_dump($_POST);
    print_r($_FILES);
}
//$image= file_get_contents($_FILES['file']['tmp_name']);
//var_dump($image);
//$target_file = $target_dir . basename($_FILES["file"]["name"]);
//
//move_uploaded_file($_FILES["file"]["tmp_name"], $target_file);

//write code for saving to database
//include_once "config.php";
//
//// Create connection
//$conn = new mysqli($servername, $username, $password, $dbname);
//// Check connection
//if ($conn->connect_error) {
//    die("Connection failed: " . $conn->connect_error);
//}
//
//$sql = "INSERT INTO MyData (name,filename) VALUES ('".$name."','".basename($_FILES["file"]["name"])."')";
//
//if ($conn->query($sql) === TRUE) {
//    echo json_encode($_FILES["file"]); // new file uploaded
//} else {
//    echo "Error: " . $sql . "<br>" . $conn->error;
//}
//
//$conn->close();

?>