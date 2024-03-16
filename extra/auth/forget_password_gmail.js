const nodemailer = require('nodemailer');
const {API_URL} = require("../config.js");
    
async function send_Forget_Password_Gmail(studentemail,verificationId) {
    const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "help.taleem@gmail.com",
    pass: "zmix wfzf wlls lwri",
  },
});
debugger;
    // send mail
    let info = await transporter.sendMail({
        from: 'taleem-help@taleem-student-registeration.iam.gserviceaccount.com', // sender address
        to: studentemail, // list of receivers
        subject: "no reply:Please change you email for taleem.help", // Subject line
        html: `<p>We have got a request for change of password, please click the link below to change the password. If this request was not initiated by you just ignore it.</p>
        <br/>
        <a href='https://taleem.help/change_forgot_password?id=${verificationId}'>Change Password</a>
        ` 
    });

}

module.exports = send_Forget_Password_Gmail;