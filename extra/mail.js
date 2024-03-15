"use strict";
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "email-smtp.ap-south-1.amazonaws.com",
  port: 25,
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: "AKIAW3MEEG36WJNY6QHX",
    pass: "BH9kugMRwT5CHH/GtJqfZeALKLfYaxg+Ej4BwMCdpb3h",
  },
});

var mailOptions = {
  from: 'bilza2024@gmail.com',
  to: 'bilza2023@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});