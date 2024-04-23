const nodemailer = require('nodemailer');

async function sendGmail(studentemail,verificationId) {
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

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: 'taleem-help@taleem-student-registeration.iam.gserviceaccount.com', // sender address
        to: studentemail, // list of receivers
        subject: "noreply:Welcome to taleem.help", // Subject line
        html: `<p>Congratulation..!  Your account has been created. Please click the link below to verify your account </p>
        <br/>
        <a href=https://backofficeapi.cyclic.cloud/auth/verify?id=${verificationId}&email=${studentemail}>VERIFY</a>
        ` 
    });

    // keep in mind this https://backofficeapi.cyclic.cloud needs to be changed if the backend deployment changes 
}

module.exports = sendGmail;