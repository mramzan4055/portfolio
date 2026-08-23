<?php
/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📧 CPANEL EMAIL & SMTP CONFIGURATION
 * ═══════════════════════════════════════════════════════════════════════════
 * Enter your cPanel email and password below.
 * Once set, all contact form submissions will be delivered directly to your inbox.
 */

return [
    // 1. Where do you want to RECEIVE client messages?
    'recipient_email' => 'info@mramzan.dev',   // Change to your email (e.g. your Gmail or cPanel email)
    'recipient_name'  => 'M Ramzan',

    // 2. cPanel SMTP Settings (Created under cPanel > Email Accounts)
    'smtp_host'       => 'mail.mramzan.dev',       // e.g. mail.yourdomain.com
    'smtp_port'       => 465,                     // 465 (SSL) or 587 (TLS)
    'smtp_secure'     => 'ssl',                   // 'ssl' or 'tls'
    'smtp_username'   => 'info@mramzan.dev',   // Your cPanel full email address
    'smtp_password'   => 'YOUR_EMAIL_PASSWORD_HERE', // Put your cPanel email password here

    // 3. From Email Header
    'from_email'      => 'info@mramzan.dev',
    'from_name'       => 'M Ramzan Portfolio Lead',

    // 4. Method: 'smtp' or 'mail'
    'mail_driver'     => 'smtp', // 'smtp' is recommended for cPanel; 'mail' uses PHP mail()
];
