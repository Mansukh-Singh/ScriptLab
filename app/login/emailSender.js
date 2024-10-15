"use server"
import React from 'react'
import nodemailer from 'nodemailer';

async function sendEmail(toEmail) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
          clientId: process.env.GOOGLE_CLIENTID,
          clientSecret: process.env.GOOGLE_SECRETID,
          refreshToken: process.env.REFRESH_TOKEN,
          accessToken: process.env.ACCESS_TOKEN
        }
      });

    let mailOptions = {
        from: process.env.EMAIL_USER,
        to: toEmail,
        subject: 'Reset Password',
        text: 'This is your password reset link.',
    };

    try {
        let info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

export default sendEmail;