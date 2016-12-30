<?php
/**
 * Send mails
 * We are going to be sending mails using the phpMailer
 * This is qservers mail settings
 * 1. Mail Type: POP3 or Imap
 * 2. incoming mail server: mail.yourdomain.com
 * 3. outgoing or smtp server: mail.yourdomain.com
 * 4. username: info@yourdomain.com (mrfreshs
 * 5. password: your email password (0phFdD14d4
 * 6. smtp port: 25 or 26
 * 7. incoming port for POP3: 110 (if using Imap: 143)
 * 8. SSL: No
 * 9. You should check the option "My outgoing server requires authentication"
 * 10. (Iphone) Authentication type: Password
 * In MAC, set php mail function
 * [mail function]
 * ; For Win32 only.
 * SMTP = localhost
 * smtp_port = 25
 *
 * ; For Win32 only.
 * ;sendmail_from = me@example.com
 *
 * ; For Unix only.  You may supply arguments as well (default: "sendmail -t -i").
 * sendmail_path =/usr/sbin/sendmail -t -i -f  yourname@example.com
 */
include_once "phpmailer-master/class.phpmailer.php";

$mail = new PHPMailer();

$mail->IsSMTP();                                      // set mailer to use SMTP
$mail->Host = "mail.mrfreshservices.com";  // specify main and backup server
$mail->SMTPAuth = true;     // turn on SMTP authentication
$mail->Username = "mrfreshs";  // SMTP username
$mail->Password = "0phFdD14d4"; // SMTP password

$mail->From = "from@example.com";
$mail->FromName = "Mailer";
$mail->AddAddress("infinitizon@yahoo.com", "Abimbola Hassan");
//$mail->AddAddress("ellen@example.com");                  // name is optional
//$mail->AddReplyTo("info@example.com", "Information");     // In case we want to be able to reply to the mail

$mail->WordWrap = 50;                                 // set word wrap to 50 characters
//$mail->AddAttachment("/var/tmp/file.tar.gz");         // add attachments
//$mail->AddAttachment("/tmp/image.jpg", "new.jpg");    // optional name
$mail->IsHTML(true);                                  // set email format to HTML

$mail->Subject = "Here is the subject";
$mail->Body    = "This is the HTML message body <b>in bold!</b>";
$mail->AltBody = "This is the body in plain text for non-HTML mail clients";

if(!$mail->Send()) {
    echo "Message could not be sent. <p>";
    echo "Mailer Error: " . $mail->ErrorInfo;
}else{
    echo "Message has been sent";
}

?>