<?php
include_once "core/init.inc.php";
$fxns = new Functions($dbo);
$factObjects = '{
   "transactionEventType":"PUT",
   "factName":"Quote",
   "token":"9b8fdc376fdcc5337d200fe2d13df0a466fc474e",
   "putType":"many",
   "putOrder":"Quote-Quote_quote_Id,QuoteDetail-QuoteDetail_QuoteDetail_Id,QuoteDetail_Manufacturer",
   "factObjects":[
      {
         "quote":{
            "subject":"ytdytfyuf",
            "rfq_no":"RFQ5356",
            "publishdate":"2016-07-31T23:00:00.000Z",
            "duedate":"2016-08-03T23:00:00.000Z",
            "party_party_id":"20161317",
            "users_user_id":"20160715",
            "quote_currency_id":"19923342",
            "quote_enteredby_id":"20160713",
            "quote_status_id":12141325
         },
         "QuoteDetail":[
            {
               "description":"jdyjyrs",
               "quantity":"2"
            },
            {
               "description":"hjeryjyr",
               "quantity":"1"
            }
         ],
         "QuoteDetail_Manufacturer":[
            [
               {
                  "party_partytype_id":"201607132",
                  "name":"Samsung"
               },
               {
                  "party_partytype_id":"201607132",
                  "name":"Mitsubishi"
               }
            ],
            [
               {
                  "party_partytype_id":"201607132",
                  "name":"Mitsubishi"
               }
            ]
         ]
      }
   ],
   "transactionMetaData":{
      "currentLocale":"NG",
      "queryStore":"MySql"
   }
}';

$data = json_decode($factObjects);
$facts = "Quote-Quote_quote_Id,QuoteDetail-QuoteDetail_QuoteDetail_Id,QuoteDetail_Manufacturer";
$facts = explode(",",$facts);
foreach($facts as $key => $fact){
    $fact = explode("-",$fact);
    $theFact = strtolower($fact[0]);
    $q_fields = $dbo->query("DESCRIBE {$theFact}");
    $r_fields = $q_fields->fetchAll(PDO::FETCH_ASSOC);
    foreach ($r_fields as $fields) {
        if ($fields['Key'] == 'PRI') {
            $priKy = $fields['Field'];
        }
    }
    if($key==0){
        $q_str = "INSERT INTO {$theFact} ";
        $ins_fields = " (";
        $ins_values = " VALUES (";
        foreach ($r_fields as $fields) {
            $fieldNm = strtolower($fields['Field']);
            if (strtolower(@$data->factObjects[0]->$theFact->$fieldNm)) {
                @$ins_fields .= " {$fields['Field']} ,";
                $formatedVal = $fxns->_formatFieldValue($data->factObjects[0]->$theFact->$fieldNm, array('type'=>$fields['Type'])).",";
                @$ins_values .= $formatedVal;
                @$log_txt .= "{$fields['Field']}=>".htmlspecialchars($data->factObjects[0]->$theFact->$fieldNm,ENT_QUOTES ).", ";
            }
        }
        $ins_fields = $fxns->_subStrAtDel($ins_fields, ' ,');
        $ins_values = rtrim($ins_values,',');
//                        $log_txt = rtrim($log_txt,', ');
        $q_str .= $ins_fields . ") " . $ins_values . ")";
        echo $q_str;
    }
    if($key==1){
        $q_str = "INSERT INTO {$theFact} ";
        $ins_fields = " (";
        $ins_values = " VALUES (";
        var_dump( $data->factObjects[0]->QuoteDetail);
        foreach ($r_fields as $fields) {
//            var_dump($data->factObjects[0]);
//            foreach($data->factObjects[0]->$theFact as $obj){
//                var_dump($obj);
//            }
        }
    }
}
//var_dump($data);


//function _buildQuery($key, $object) {
//
//    return $html;
//}