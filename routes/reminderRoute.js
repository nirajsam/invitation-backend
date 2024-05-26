const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.post('/set-reminder', (req, res) => {
    const { email, reminderDate } = req.body;
  
    // Setup email transport
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'rowan54@ethereal.email',
            pass: 'hBwyvgZdbq2q4A8yB3'
        },
    });
  
    const mailOptions = {
      from: 'nirajsam15@gmail.com',
      to: email,
      subject: 'Wedding Reminder',
      text: `This is a reminder for the wedding on ${reminderDate}`,
    };
  
    // Schedule the email to be sent on reminderDate
    // For demonstration purposes, just send the email immediately
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).send({ success: false, error });
      } else {
        res.send({ success: true });
      }
    });
  });

  module.exports=router
  