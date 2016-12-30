<?php
include_once "core/init.inc.php";
$fxns = new Functions($dbo);
/** This part eventually sends the mail using phpmailer */
$g_late_rfq = "SELECT * FROM Mail WHERE mail_type_id=30122016";
$r_late_rfq = $dbo->prepare($g_late_rfq);
$r_late_rfq->execute();

include_once "phpmailer-master/class.phpmailer.php";
while ($lateQuotes = $r_late_rfq->fetch(PDO::FETCH_ASSOC)) {

    $mail = new PHPMailer();

    $mail->IsSMTP();                                      // set mailer to use SMTP
    $mail->Host = "mail.mrfreshservices.com";  // specify main and backup server
    $mail->SMTPAuth = true;     // turn on SMTP authentication
    $mail->Username = "mrfreshs";  // SMTP username
    $mail->Password = "0phFdD14d4"; // SMTP password

    $mail->From = $lateQuotes['mail_from'];
    $mail->FromName = $mail_config['rfq'];
    $mail->AddAddress($lateQuotes['mail_to']);

    $mail->WordWrap = 50;                                 // set word wrap to 50 characters
    $mail->IsHTML(true);                                  // set email format to HTML

    $mail->Subject = $lateQuotes['mail_subj'];
    $mail->Body    = $lateQuotes['mail_body'];
    $mail->AltBody = $lateQuotes['mail_body'];

    if(!$mail->Send()) {
        $s_late_rfq = "UPDATE Mail SET msg={$mail->ErrorInfo}";
        $updt = $dbo->prepare($s_late_rfq);
        $updt->execute();
    }else{
        $s_late_rfq = "UPDATE Mail SET sent_times=sent_times+1";
        $updt = $dbo->prepare($s_late_rfq);
        $updt->execute();
    }

}

echo "\n";