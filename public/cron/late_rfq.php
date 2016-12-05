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
    $q_alertees = "SELECT u.user_id, u.Firstname, u.MiddleName, u.LastName, u.ContactPhoneNumber, u.WorkPhoneNumber, u.Email
                    FROM Users u
                    WHERE u.enabled=1 AND u.accountlocked<>1 AND u.user_id IN
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
//    $alertees = $r_alertees->fetchAll(PDO::FETCH_ASSOC);
    $timestamp = time();
    while ($alertees = $r_alertees->fetch(PDO::FETCH_ASSOC)) {

        $mail_body = "Dear {$alertees['Firstname']} {$alertees['MiddleName']} {$alertees['LastName']}<br><br>";
        "This is to notify you that quote {$lateQuotes['rfq_no']} entered by ";
        try{
            $q_sendMail = "INSERT INTO Mail (mail_to,mail_from,mail_subj,status,create_date,timestamp)
                        VALUES
                        ('{$alertees['Email']}','no-reply@geotripe.com','Quote {$lateQuotes['rfq_no']} expiration notice'
                            ,'0', NOW(),$timestamp )";
            $r_sendMail = $dbo->prepare($q_sendMail);
            $r_sendMail->execute();
            $lastId = $dbo->lastInsertId();
        }catch(Exception $e){
            $response = array("response"=>"Warning","message"=>$e->getMessage(),"token"=>$data->token);
        }
    }
}
/**
 * Send mails
 * We are going to be sending mails using the phpMailer
 */
include_once "phpmailer-master/class.phpmailer.php";

$mail = new PHPMailer();

$mail->IsSMTP();  // telling the class to use SMTP
$mail->Host     = "smtp.example.com"; // SMTP server

$mail->From     = "from@example.com";
$mail->AddAddress("myfriend@example.net");

$mail->Subject  = "First PHPMailer Message";
$mail->Body     = "Hi! \n\n This is my first e-mail sent through PHPMailer.";
$mail->WordWrap = 50;

if(!$mail->Send()) {
    echo 'Message was not sent.';
    echo 'Mailer error: ' . $mail->ErrorInfo;
} else {
    echo 'Message has been sent.';
}