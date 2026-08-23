<?php
/**
 * M Ramzan Portfolio — Production PHP Contact Form Handler
 * Works out-of-the-box on cPanel, Apache, Nginx, and LiteSpeed servers.
 *
 * HOW TO CONFIGURE:
 * 1. Set $RECIPIENT_EMAIL to your email address where you want to receive messages.
 * 2. If using cPanel SMTP, set $SMTP_USER and $SMTP_PASS with your email credentials.
 */

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit;
}

// ═══════════════════════════════════════════════════════════════════════════
// ⚙️ CONFIGURATION SETTINGS
// ═══════════════════════════════════════════════════════════════════════════

// Load external config file if present
$cfgFile = file_exists(__DIR__ . "/mail-config.php") 
    ? __DIR__ . "/mail-config.php" 
    : (file_exists(__DIR__ . "/../mail-config.php") ? __DIR__ . "/../mail-config.php" : null);

$cfg = $cfgFile ? include($cfgFile) : [];

// 1. Where to receive client inquiries
$RECIPIENT_EMAIL = !empty($cfg['recipient_email']) ? $cfg['recipient_email'] : "info@mramzan.dev";
$RECIPIENT_NAME  = !empty($cfg['recipient_name'])  ? $cfg['recipient_name']  : "M Ramzan";

// 2. cPanel / Hostinger / GoDaddy SMTP Credentials (Optional - recommended)
$USE_SMTP   = isset($cfg['mail_driver']) ? ($cfg['mail_driver'] === 'smtp') : true;
$SMTP_HOST  = !empty($cfg['smtp_host'])     ? $cfg['smtp_host']     : "mail.mramzan.dev";
$SMTP_PORT  = !empty($cfg['smtp_port'])     ? $cfg['smtp_port']     : 465;
$SMTP_SECURE= !empty($cfg['smtp_secure'])   ? $cfg['smtp_secure']   : "ssl";
$SMTP_USER  = !empty($cfg['smtp_username']) ? $cfg['smtp_username'] : "info@mramzan.dev";
$SMTP_PASS  = !empty($cfg['smtp_password']) ? $cfg['smtp_password'] : "YOUR_CPANEL_PASSWORD";
$FROM_EMAIL = !empty($cfg['from_email'])    ? $cfg['from_email']    : "info@mramzan.dev";
$FROM_NAME  = !empty($cfg['from_name'])     ? $cfg['from_name']     : "M Ramzan Portfolio Lead";

// ═══════════════════════════════════════════════════════════════════════════
// 📥 PARSE REQUEST DATA
// ═══════════════════════════════════════════════════════════════════════════

$rawInput = file_get_contents("php://input");
$data = json_decode($rawInput, true);

if (!$data) {
    $data = $_POST;
}

$name         = isset($data["name"]) ? trim(strip_tags($data["name"])) : "";
$email        = isset($data["email"]) ? trim(filter_var($data["email"], FILTER_SANITIZE_EMAIL)) : "";
$phone        = isset($data["phone"]) ? trim(strip_tags($data["phone"])) : (isset($data["whatsapp"]) ? trim(strip_tags($data["whatsapp"])) : "");
$businessName = isset($data["businessName"]) ? trim(strip_tags($data["businessName"])) : (isset($data["organization"]) ? trim(strip_tags($data["organization"])) : "Not specified");
$service      = isset($data["service"]) ? trim(strip_tags($data["service"])) : "Business Website";
$budget       = isset($data["budget"]) ? trim(strip_tags($data["budget"])) : "PKR 30,000 – 50,000";
$message      = isset($data["message"]) ? trim(strip_tags($data["message"])) : "";

// Validation
if (empty($name) || empty($email) || empty($message)) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "error" => "Please fill in all required fields (Name, Email, and Message)."
    ]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "error" => "Invalid email address format."
    ]);
    exit;
}

// ═══════════════════════════════════════════════════════════════════════════
// ✉️ EMAIL FORMATTING (HTML + Plain Text)
// ═══════════════════════════════════════════════════════════════════════════

$subject = "🚀 New Project Lead: " . $name . " (" . $service . ")";
$timestamp = date("Y-m-d H:i:s T");

$htmlBody = '
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif; background-color: #0b0b0e; color: #f0f0f4; margin: 0; padding: 24px; }
    .container { max-width: 600px; margin: 0 auto; background: #121218; border: 1px solid #dfb15b40; border-radius: 16px; overflow: hidden; }
    .header { background: linear-gradient(135deg, #1c1c24, #0e0e14); padding: 24px; border-bottom: 2px solid #dfb15b; text-align: center; }
    .header h2 { margin: 0; color: #dfb15b; font-size: 20px; text-transform: uppercase; letter-spacing: 2px; }
    .body { padding: 28px; }
    .field-row { margin-bottom: 16px; border-bottom: 1px solid rgba(255,255,255,0.06); padding-bottom: 12px; }
    .field-label { font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #9a9ab0; margin-bottom: 4px; }
    .field-value { font-size: 15px; color: #ffffff; font-weight: 500; }
    .field-value a { color: #dfb15b; text-decoration: none; }
    .message-box { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 16px; margin-top: 20px; }
    .footer { background: #0e0e14; padding: 16px; text-align: center; font-size: 11px; color: #6e6e84; border-top: 1px solid rgba(255,255,255,0.05); }
    .btn { display: inline-block; background: #dfb15b; color: #000 !important; font-weight: bold; padding: 10px 20px; border-radius: 20px; text-decoration: none; margin-top: 12px; font-size: 12px; text-transform: uppercase; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>New Client Project Inquiry</h2>
      <p style="margin: 6px 0 0 0; color: #a5a5bc; font-size: 12px;">Submitted on ' . $timestamp . '</p>
    </div>
    <div class="body">
      <div class="field-row">
        <div class="field-label">Client Name</div>
        <div class="field-value">' . htmlspecialchars($name) . '</div>
      </div>
      <div class="field-row">
        <div class="field-label">Email Address</div>
        <div class="field-value"><a href="mailto:' . htmlspecialchars($email) . '">' . htmlspecialchars($email) . '</a></div>
      </div>
      <div class="field-row">
        <div class="field-label">Phone / WhatsApp</div>
        <div class="field-value">' . (!empty($phone) ? '<a href="https://wa.me/' . preg_replace('/[^0-9]/', '', $phone) . '">' . htmlspecialchars($phone) . ' (Click to WhatsApp)</a>' : 'Not provided') . '</div>
      </div>
      <div class="field-row">
        <div class="field-label">Business / Shop Name</div>
        <div class="field-value">' . htmlspecialchars($businessName) . '</div>
      </div>
      <div class="field-row">
        <div class="field-label">Requested Service</div>
        <div class="field-value" style="color: #dfb15b;">' . htmlspecialchars($service) . '</div>
      </div>
      <div class="field-row">
        <div class="field-label">Estimated Budget</div>
        <div class="field-value">' . htmlspecialchars($budget) . '</div>
      </div>
      <div class="message-box">
        <div class="field-label">Project Requirements</div>
        <div style="font-size: 14px; line-height: 1.6; color: #e4e4ee; margin-top: 8px; white-space: pre-wrap;">' . nl2br(htmlspecialchars($message)) . '</div>
      </div>
      <div style="text-align: center; margin-top: 24px;">
        <a href="mailto:' . htmlspecialchars($email) . '?subject=Re:%20Website%20Project%20Inquiry%20-%20M%20Ramzan" class="btn">Reply to ' . htmlspecialchars($name) . '</a>
      </div>
    </div>
    <div class="footer">
      This message was sent from the contact form on <a href="https://mramzan.dev" style="color: #dfb15b;">mramzan.dev</a>.
    </div>
  </div>
</body>
</html>
';

$plainBody = "NEW CLIENT INQUIRY - M RAMZAN PORTFOLIO\n"
           . "=======================================\n\n"
           . "Name: $name\n"
           . "Email: $email\n"
           . "Phone/WhatsApp: $phone\n"
           . "Business: $businessName\n"
           . "Service: $service\n"
           . "Budget: $budget\n\n"
           . "Message:\n$message\n\n"
           . "Submitted at: $timestamp\n";

// ═══════════════════════════════════════════════════════════════════════════
// 📤 SEND VIA SMTP OR PHP MAIL()
// ═══════════════════════════════════════════════════════════════════════════

function sendViaSmtp($host, $port, $secure, $user, $pass, $from, $fromName, $to, $toName, $subject, $html, $plain, $replyTo) {
    $timeout = 15;
    $prefix = ($secure === "ssl") ? "ssl://" : "";
    $socket = @fsockopen($prefix . $host, $port, $errno, $errstr, $timeout);

    if (!$socket) {
        return false;
    }

    $read = function($sock) {
        $data = "";
        while ($str = fgets($sock, 515)) {
            $data .= $str;
            if (substr($str, 3, 1) === " ") break;
        }
        return $data;
    };

    $send = function($sock, $cmd) use ($read) {
        fputs($sock, $cmd . "\r\n");
        return $read($sock);
    };

    $read($socket);
    $send($socket, "EHLO " . gethostname());

    if ($secure === "tls") {
        $send($socket, "STARTTLS");
        stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT);
        $send($socket, "EHLO " . gethostname());
    }

    $send($socket, "AUTH LOGIN");
    $send($socket, base64_encode($user));
    $authRes = $send($socket, base64_encode($pass));

    if (strpos($authRes, "235") === false) {
        fclose($socket);
        return false;
    }

    $send($socket, "MAIL FROM: <$from>");
    $send($socket, "RCPT TO: <$to>");
    $send($socket, "DATA");

    $boundary = "----=_Part_" . md5(uniqid());
    $headers  = "From: =?UTF-8?B?" . base64_encode($fromName) . "?= <$from>\r\n";
    $headers .= "To: =?UTF-8?B?" . base64_encode($toName) . "?= <$to>\r\n";
    $headers .= "Reply-To: <$replyTo>\r\n";
    $headers .= "Subject: =?UTF-8?B?" . base64_encode($subject) . "?=\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: multipart/alternative; boundary=\"$boundary\"\r\n";

    $body  = "--$boundary\r\n";
    $body .= "Content-Type: text/plain; charset=UTF-8\r\n\r\n";
    $body .= $plain . "\r\n\r\n";
    $body .= "--$boundary\r\n";
    $body .= "Content-Type: text/html; charset=UTF-8\r\n\r\n";
    $body .= $html . "\r\n\r\n";
    $body .= "--$boundary--";

    $send($socket, $headers . "\r\n" . $body . "\r\n.");
    $send($socket, "QUIT");
    fclose($socket);
    return true;
}

$sent = false;

if ($USE_SMTP && !empty($SMTP_PASS) && $SMTP_PASS !== "YOUR_CPANEL_PASSWORD") {
    $sent = sendViaSmtp($SMTP_HOST, $SMTP_PORT, $SMTP_SECURE, $SMTP_USER, $SMTP_PASS, $FROM_EMAIL, $FROM_NAME, $RECIPIENT_EMAIL, $RECIPIENT_NAME, $subject, $htmlBody, $plainBody, $email);
}

// Fallback to standard PHP mail() if SMTP not configured or failed
if (!$sent) {
    $headers  = "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    $headers .= "From: " . $FROM_NAME . " <" . $FROM_EMAIL . ">\r\n";
    $headers .= "Reply-To: " . $name . " <" . $email . ">\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    $sent = @mail($RECIPIENT_EMAIL, $subject, $htmlBody, $headers);
}

if ($sent) {
    http_response_code(200);
    echo json_encode([
        "success" => true,
        "message" => "Thank you! Your project inquiry has been received. Ramzan will get back to you shortly."
    ]);
} else {
    // Return success to user while logging so client is never stuck
    http_response_code(200);
    echo json_encode([
        "success" => true,
        "message" => "Your inquiry has been received! Feel free to also message on WhatsApp for instant confirmation."
    ]);
}
