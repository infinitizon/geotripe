<?php

include_once "core/init.inc.php";
$fxns = new Functions($dbo);
$id =2;
$stmt = $dbo->prepare("SELECT docName, docMimeType, docSize, docBlob FROM Document WHERE doc_id = :fileid");
$stmt->bindParam(':fileid', $id, PDO::PARAM_INT, 11);
$stmt->execute();
$fRes = $stmt->fetchAll(PDO::FETCH_ASSOC);

//var_dump($fRes);

header("Cache-Control: public");
header("Content-Description: File Transfer");
header("Content-length: ".$fRes[0]['docSize']);
header("Content-type: ".$fRes[0]['docMimeType']);
//header("Content-Transfer-Encoding: Binary");
header("Content-Disposition: attachment; filename=\"".$fRes[0]['docName']."\"");
echo $fRes[0]['docBlob'];
