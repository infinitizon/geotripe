<?php
include_once "core/init.inc.php";
$fxns = new Functions($dbo);

$q_lateQuotes = 'SELECT q.quote_id, q.rfq_no, p.name, CONCAT(LEFT(q.subject , 30),IF(LENGTH(q.subject)>30, "…", "")) subject
	, q.quote_enteredBy_id, CONCAT(u.lastname,", ",u.middlename," ",u.firstname)enteredBy, qs.name status
    , COUNT(qd.Quote_quote_Id) totalQuotes, DATEDIFF(q.duedate,NOW())remDays, q.entrydate
FROM Quote q
JOIN  Party p ON q.Party_Party_Id=p.Party_Id
JOIN  QuoteStatus qs ON q.Quote_Status_Id=qs.QuoteStatus_Id
JOIN  Users u ON q.quote_enteredBy_id=u.user_id
LEFT JOIN  QuoteDetail qd ON q.quote_Id=qd.Quote_quote_Id
WHERE DATEDIFF(q.duedate,NOW()) = 1 AND q.Party_Party_Id = 20161317
GROUP BY q.quote_Id';
$r_lateQuotes = $dbo->prepare($q_lateQuotes);
$r_lateQuotes->execute();
while ($lateQuotes = $r_lateQuotes->fetch(PDO::FETCH_ASSOC)) {
    $q_alertees = "SELECT * FROM USERS WHERE user_id IN
                    (
                    SELECT user_id from Users WHERE user_id={$lateQuotes['quote_enteredBy_id']}
                    UNION ALL
                    SELECT ua.users_user_id
                    FROM User_AuthRole ua
                    JOIN AuthRoles ar ON ua.AuthRoles_AuthRoles_Id=ar.AuthRoles_Id
                    WHERE ar.Name IN ('RFQ_SUPERVISOR', 'RFQ_ADMIN', 'SUPPORT_ADMIN')
                    )";
    $r_alertees = $dbo->prepare($q_alertees);
    $r_alertees->execute();
    $alertees = $r_alertees->fetchAll(PDO::FETCH_ASSOC);
    echo count($alertees);
    echo "<pre>";
        print_r($alertees);
        echo "</pre>";
//    while ($alertees = $r_alertees->fetch(PDO::FETCH_ASSOC)) {
//        echo "<pre>";
//        print_r($alertees);
//        echo "</pre>";
//    }
}