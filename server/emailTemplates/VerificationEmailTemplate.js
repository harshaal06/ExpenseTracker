function generateVerificationEmail(userName, verificationToken) {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <title>Verify Your Email - ExpenseEase</title>
            <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');
        
            body {
                margin: 0;
                font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background-color: #f8f9fb;
                color: #2c3e50;
                font-size: 14px;
            }
        
            .container {
                max-width: 620px;
                margin: 20px auto;
                background-color: #ffffff;
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
            }
        
            .header {
                display: flex;
                align-items: center;
                padding: 20px 0px;
            }
        
            .header img {
                width: 50px;
                mix-blend-mode: multiply;
                margin-right: 12px;
                border-radius: 50%;
            }
        
            .header p {
                font-weight: 600;
                letter-spacing: 1.5px;
                font-size: 15px;
                margin: 0;
                color: #ff6c37;
                margin-bottom: 5px;
            }
        
            .content {
                padding: 10px 30px 30px;
            }
        
            .content h1 {
                font-size: 20px;
                margin-top: 10px;
                margin-bottom: 16px;
                font-weight: 600;
            }
        
            .message p {
                margin: 10px 0;
                line-height: 1.6;
            }
        
            .otp-box {
                margin: 20px 0;
                font-size: 24px;
                font-weight: 600;
                text-align: center;
                letter-spacing: 8px;
                color: #0052cc;
            }
        
            .btn {
                display: inline-block;
                margin-top: 20px;
                padding: 10px 20px;
                background-color: #0052cc;
                color: #ffffff;
                text-decoration: none;
                border-radius: 4px;
                font-weight: 500;
                font-size: 13px;
            }
        
            .footer {
                background-color: #f0f4f8;
                text-align: center;
                font-size: 12px;
                padding: 15px 20px;
                color: #7f8c8d;
            }
            </style>
        </head>
        <body>
            <div class="container">
            <div class="content">
                <div class="header">
                <img src="https://i.ibb.co/5zdtbPR/Expense-Ease-Logo-1.png" alt="ExpenseEase Logo"/>
                <p>EXPENSE EASE</p>
                </div>
                <h1>Email Verification</h1>
                <div class="message">
                <p>Hi ${userName},</p>
                <p>To verify your email address, please use the one-time password (OTP) below. It is valid for the next 24 hours:</p>
                <div class="otp-box">${verificationToken}</div>
                <p>If you didn’t request this, you can safely ignore this email.</p>
                <p>The ExpenseEase Team</p>
                </div>
            </div>
            <div class="footer">
                <p>This is an automated email. Please do not reply to this message.</p>
            </div>
            </div>
        </body>
        </html>`;
  }

export default generateVerificationEmail;