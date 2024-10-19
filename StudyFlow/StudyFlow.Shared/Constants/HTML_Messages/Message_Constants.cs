public static class Message_Constants
{
    public static string EmailBodyConfirmation = @"
<!DOCTYPE html>
<html lang='en'>
<head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <title>Welcome to StudyFlow</title>
    <style>
        body {{
            font-family: 'Arial', sans-serif;
            background-color: #f2f2f2;
            padding: 0;
            margin: 0;
        }}
        .email-wrapper {{
            width: 100%;
            background-color: #f2f2f2;
            padding: 20px;
        }}
        .email-container {{
            background-color: #ffffff;
            max-width: 600px;
            margin: 0 auto;
            padding: 40px;
            border-radius: 12px;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
        }}
        .email-header {{
            text-align: center;
            padding-bottom: 20px;
            border-bottom: 2px solid #4169E1;
        }}
        .email-header h2 {{
            color: #4169E1;
            font-size: 28px;
            margin: 0;
            letter-spacing: 1px;
        }}
        .email-body {{
            color: #333;
            font-size: 18px;
            line-height: 1.6;
            text-align: center;
            margin: 20px 0;
        }}
        .email-body p {{
            margin-bottom: 30px;
        }}
        .btn {{
            display: inline-block;
            padding: 15px 30px;
            background-color: #4169E1;
            color: #fff;
            text-decoration: none;
            border-radius: 50px;
            font-size: 18px;
            font-weight: bold;
            box-shadow: 0 4px 10px rgba(65, 105, 225, 0.4);
            transition: all 0.3s ease;
        }}
        .btn:hover {{
            background-color: #365bb0;
            box-shadow: 0 6px 15px rgba(65, 105, 225, 0.6);
        }}
        .footer {{
            font-size: 14px;
            color: #999;
            margin-top: 40px;
            text-align: center;
        }}
    </style>
</head>
<body>
    <div class='email-wrapper'>
        <div class='email-container'>
            <div class='email-header'>
                <h2>Welcome to StudyFlow</h2>
            </div>
            <div class='email-body'>
                <p>Thank you for registering! Please confirm your email by clicking the button below:</p>
                <a href='{0}' class='btn'>Confirm Email</a>
                <p>Please note that this link will expire in 1 hour.</p>
                <p>If you did not request this, please ignore this email.</p>
            </div>
            <div class='footer'>
                &copy; 2024 StudyFlow. All rights reserved.
            </div>
        </div>
    </div>
</body>
</html>";

    public static string EmailBodyForgotPassword = @"
<!DOCTYPE html>
<html lang='en'>
<head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <title>Welcome to StudyFlow</title>
    <style>
        body {{
            font-family: 'Arial', sans-serif;
            background-color: #f2f2f2;
            padding: 0;
            margin: 0;
        }}
        .email-wrapper {{
            width: 100%;
            background-color: #f2f2f2;
            padding: 20px;
        }}
        .email-container {{
            background-color: #ffffff;
            max-width: 600px;
            margin: 0 auto;
            padding: 40px;
            border-radius: 12px;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
        }}
        .email-header {{
            text-align: center;
            padding-bottom: 20px;
            border-bottom: 2px solid #4169E1;
        }}
        .email-header h2 {{
            color: #4169E1;
            font-size: 28px;
            margin: 0;
            letter-spacing: 1px;
        }}
        .email-body {{
            color: #333;
            font-size: 18px;
            line-height: 1.6;
            text-align: center;
            margin: 20px 0;
        }}
        .email-body p {{
            margin-bottom: 30px;
        }}
        .btn {{
            display: inline-block;
            padding: 15px 30px;
            background-color: #4169E1;
            color: #fff;
            text-decoration: none;
            border-radius: 50px;
            font-size: 18px;
            font-weight: bold;
            box-shadow: 0 4px 10px rgba(65, 105, 225, 0.4);
            transition: all 0.3s ease;
        }}
        .btn:hover {{
            background-color: #365bb0;
            box-shadow: 0 6px 15px rgba(65, 105, 225, 0.6);
        }}
        .footer {{
            font-size: 14px;
            color: #999;
            margin-top: 40px;
            text-align: center;
        }}
    </style>
</head>
<body>
    <div class='email-wrapper'>
        <div class='email-container'>
            <div class='email-header'>
                <h2>Welcome to StudyFlow</h2>
            </div>
            <div class='email-body'>
                <p>You have requested to reset your password. Please click the button below to proceed:</p>
                <a href='{0}' class='btn'>Reset Password</a>
                <p>This link will expire in 30 minutes. If you did not request a password reset, please ignore this email.</p>
            </div>
            <div class='footer'>
                &copy; 2024 StudyFlow. All rights reserved.
            </div>
        </div>
    </div>
</body>
</html>";
}