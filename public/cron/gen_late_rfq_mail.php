<?php
include_once "core/init.inc.php";
$fxns = new Functions($dbo);

try {
    /**
     * @var  $q_lateQuotes
     * This part gives us the late RFQs
     */
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
        /**
         * @var  $q_lateQuotes
         * Get the users and supervisors for each late RFQs
         */
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

            $mail_body = "Dear {$alertees['Firstname']} {$alertees['LastName']}<br><br>";
            $mail_body .="This is to notify you that quote <b>{$lateQuotes['rfq_no']}</b> entered by ".($lateQuotes['quote_enteredBy_id']==$alertees['user_id']?'you':$lateQuotes['enteredBy']);
            $mail_body .=" would expire in <span style=\'color:#F00;\'>{$lateQuotes['remDays']} day(s)</span>.<br>";
            $mail_body .="Please attend to the rfq as soon as possible.<br><br>";
            $mail_body .="THIS IS A SYSTEM GENERATED E-MAIL, DO NOT RESPOND TO THE E-MAIL ADDRESS SPECIFIED ABOVE.";
            $mail_body .="<br><br><br>";
            $mail_body .="<small>This e-mail is intended for the person to whom it is addressed and it contains information which may be confidential, ";
            $mail_body .="legally privileged and exempt from disclosure under applicable law. If an addressing or transmission error has misdirected this e-mail to you, ";
            $mail_body .="kindly notify the author immediately and destroy the material in its entirety, whether electronic or hard copy. ";
            $mail_body .="If you are not the intended recipient of this e-mail or authorised to receive it for the intended recipient, you must not use, disclose, ";
            $mail_body .="print or rely on the contents of this e- mail. Chapel Hill Denham Group may monitor outgoing and incoming e-mails and other forms of communication on its telecommunication systems. ";
            $mail_body .="By replying to this e-mail, you give your express consent to such monitoring.</small>";

            $q_sendMail = "INSERT INTO Mail (mail_to,mail_type_id,mail_from,mail_subj,mail_body,status,create_date,timestamp)
                        VALUES
                        ('{$alertees['Email']}',30122016,'no-reply@geoscape.com','Notice: Quote {$lateQuotes['rfq_no']} expiration'
                            ,'{$mail_body}','0', NOW(),$timestamp )";
            echo $q_sendMail;
            $r_sendMail = $dbo->prepare($q_sendMail);
            $r_sendMail->execute();
            $lastId = $dbo->lastInsertId();

        }
    }
}catch(Exception $e){
//    $dbo->rollBack();
    echo $e->getMessage();
}
