import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

function generateEmailTemplate(userName) {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Custom Email</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 700px; margin: 0 auto; padding: 10px; background-color: #f4f4f4;}
          .header {  padding-top: 10px; text-align: center; }
          .content { padding: 0 20px;}
        //   .message { font-size: 1.125em; }
          .footer { background-color: #f4f4f4; padding: 10px; text-align: center; font-size: 0.8em; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <img src="https://ibb.co/JqP6hPr" alt="ExpenseEase" style="width: 80px;">
          </div>
          <div class="content">
            <h1>Hi ${userName},</h1>
            <div class="message">
                <p>Welcome to <strong>ExpenseEase</strong>!</p>
                <p>We’re excited to have you on board. With ExpenseEase, managing your expenses has never been easier. Track your spending, monitor your budgets, and stay on top of your finances, all in one place.</p>
                <p>If you have any questions or need support, feel free to reach out. We’re here to help you get the most out of our service.</p>
                <p>Best Regards,<br>The ExpenseEase Team</p>
            </div>
          </div>
          <div class="footer">
            <p>This is an automated email. Please do not reply.</p>
          </div>
        </div>
      </body>
      </html>
    `;
}

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_ADDRESS, // Your email
        pass: process.env.PASSWORD // Your email password or an app password
    }
});

export const sendMail = async ({ to, userName }) => {
    try {
        if (!to || !userName) {
            throw new Error('Missing required fields');
        }

        const mailOptions = {
            from: `"ExpenseEase" <${process.env.EMAIL_ADDRESS}>`,
            to: to,
            subject: 'Welcome to ExpenseEase - Your Smart Expense Tracker!',
            html: generateEmailTemplate(userName),
        };

        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully!');
    } catch (error) {
        console.error('Error sending email:', error.message);
        throw error; // Rethrow error to handle it upstream if needed
    }
};
