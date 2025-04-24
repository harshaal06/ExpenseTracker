import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import generatesendWelcomeMail from '../emailTemplates/WelcomeMailTemplate.js';
import generateVerificationEmail from '../emailTemplates/VerificationEmailTemplate.js';

dotenv.config();

// function generatesendWelcomeMail(userName) {
//     return `
//       <!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8" />
//   <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
//   <title>Welcome to ExpenseEase</title>
//   <style>
//     @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');

//     body {
//       margin: 0;
//       font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
//       background-color: #f8f9fb;
//       color: #2c3e50;
//       font-size: 14px;
      
//     }

//     .container {
//       max-width: 620px;
//       margin: 20px auto;
//       background-color: #ffffff;
//       border-radius: 8px;
//       border: #e6e8e8 solid 1px;
//       overflow: hidden;
//       box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
//     }

//     .header {
//       display: flex;
//       align-items: center;
//       padding: 20px 0px;
//     }

//     .header img {
//       width: 50px;
//       mix-blend-mode: multiply;
//       margin-right: 12px;
//       border-radius: 50%;
//     }

//     .header p {
//       font-weight: 600;
//       letter-spacing: 1.5px;
//       font-size: 15px;
//       margin: 0;
//       color: #ff6c37;
//       margin-bottom: 5px;
//     }

//     .content {
//       padding: 10px 30px 30px;
//     }

//     .content h1 {
//       font-size: 20px;
//       margin-top: 10px;
//       margin-bottom: 16px;
//       font-weight: 600;
//     }

//     .message p {
//       margin: 10px 0;
//       line-height: 1.6;
//     }

//     .btn {
//       display: inline-block;
//       margin-top: 20px;
//       padding: 10px 20px;
//       background-color: #ff6c37;
//       color: #ffffff;
//       text-decoration: none;
//       border-radius: 4px;
//       font-weight: 500;
//       font-size: 13px;
//     }

//     .footer {
//       background-color: #f0f4f8;
//       text-align: center;
//       font-size: 12px;
//       padding: 15px 20px;
//       color: #7f8c8d;
//     }
//   </style>
// </head>
// <body>
//   <div class="container">
//     <div class="content">
//       <div class="header">
//         <img src="https://i.ibb.co/5zdtbPR/Expense-Ease-Logo-1.png" alt="Expense-Ease-Logo">
//         <p>EXPENSE EASE</p>
//       </div>
//       <h1>Welcome, ${userName} 👋</h1>
//       <div class="message">
//         <p><strong>Thanks for joining ExpenseEase!</strong></p>
//         <p>We’re thrilled to have you with us. Our platform is designed to simplify the way you manage your expenses, track your budgets, and gain insights into your spending habits.</p>
//         <p>To get started, just log in and explore our intuitive dashboard.</p>
//         <a class="btn" href="https://expense-ease-app-harshal.vercel.app/" target="_blank">Go to Dashboard</a>
//         <p>If you need help, our support team is always here to assist you.</p>
//         <p>The ExpenseEase Team</p>
//       </div>
//     </div>
//     <div class="footer">
//       <p>This is an automated email. Please do not reply to this message.</p>
//     </div>
//   </div>
// </body>
// </html>

//     `;
// }

// function generateVerificationEmail(userName, verificationToken) {
//   return `
//       <!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8" />
//   <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
//   <title>Verify Your Email - ExpenseEase</title>
//   <style>
//     @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');

//     body {
//       margin: 0;
//       font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
//       background-color: #f8f9fb;
//       color: #2c3e50;
//       font-size: 14px;
//     }

//     .container {
//       max-width: 620px;
//       margin: 20px auto;
//       background-color: #ffffff;
//       border-radius: 8px;
//       overflow: hidden;
//       box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
//     }

//     .header {
//       display: flex;
//       align-items: center;
//       padding: 20px 0px;
//     }

//     .header img {
//       width: 50px;
//       mix-blend-mode: multiply;
//       margin-right: 12px;
//       border-radius: 50%;
//     }

//     .header p {
//       font-weight: 600;
//       letter-spacing: 1.5px;
//       font-size: 15px;
//       margin: 0;
//       color: #ff6c37;
//       margin-bottom: 5px;
//     }

//     .content {
//       padding: 10px 30px 30px;
//     }

//     .content h1 {
//       font-size: 20px;
//       margin-top: 10px;
//       margin-bottom: 16px;
//       font-weight: 600;
//     }

//     .message p {
//       margin: 10px 0;
//       line-height: 1.6;
//     }

//     .otp-box {
//       margin: 20px 0;
//       font-size: 24px;
//       font-weight: 600;
//       text-align: center;
//       letter-spacing: 8px;
//       color: #0052cc;
//     }

//     .btn {
//       display: inline-block;
//       margin-top: 20px;
//       padding: 10px 20px;
//       background-color: #0052cc;
//       color: #ffffff;
//       text-decoration: none;
//       border-radius: 4px;
//       font-weight: 500;
//       font-size: 13px;
//     }

//     .footer {
//       background-color: #f0f4f8;
//       text-align: center;
//       font-size: 12px;
//       padding: 15px 20px;
//       color: #7f8c8d;
//     }
//   </style>
// </head>
// <body>
//   <div class="container">
//     <div class="content">
//       <div class="header">
//         <img src="https://i.ibb.co/5zdtbPR/Expense-Ease-Logo-1.png" alt="ExpenseEase Logo"/>
//         <p>EXPENSE EASE</p>
//       </div>
//       <h1>Email Verification</h1>
//       <div class="message">
//         <p>Hi ${userName},</p>
//         <p>To verify your email address, please use the one-time password (OTP) below. It is valid for the next 24 hours:</p>
//         <div class="otp-box">${verificationToken}</div>
//         <p>If you didn’t request this, you can safely ignore this email.</p>
//         <p>The ExpenseEase Team</p>
//       </div>
//     </div>
//     <div class="footer">
//       <p>This is an automated email. Please do not reply to this message.</p>
//     </div>
//   </div>
// </body>
// </html>`;
// }

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_ADDRESS, // Your email
        pass: process.env.PASSWORD // Your email password or an app password
    }
});

export const sendWelcomeMail = async ({ to, userName }) => {
    try {
        if (!to || !userName) {
            throw new Error('Missing required fields');
        }

        const mailOptions = {
            from: `"ExpenseEase" <${process.env.EMAIL_ADDRESS}>`,
            to: to,
            subject: 'Welcome to ExpenseEase - Your Smart Expense Tracker!',
            html: generatesendWelcomeMail(userName),
        };

        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending email:', error.message);
        throw error; // Rethrow error to handle it upstream if needed
    }
};

export const sendVerificationEmail = async ({ to, verificationToken, userName }) => {
  try {
      if (!to || !verificationToken || !userName) {
          throw new Error('Missing required fields');
      }

      const mailOptions = {
          from: `"ExpenseEase" <${process.env.EMAIL_ADDRESS}>`,
          to: to,
          subject: 'Verify Your Email Address!',
          html: generateVerificationEmail(userName, verificationToken),
      };

      await transporter.sendMail(mailOptions);
  } catch (error) {
      console.error('Error sending email:', error.message);
      throw error; // Rethrow error to handle it upstream if needed
  }
};
