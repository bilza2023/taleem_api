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
debugger;
    // send mail
    let info = await transporter.sendMail({
        from: 'taleem-help@taleem-student-registeration.iam.gserviceaccount.com', // sender address
        to: studentemail, // list of receivers
        subject: "noreply:Welcome to taleem.help", // Subject line
        html: `<p>Congratulations! Your account on taleem.help has been successfully created. To get started with our educational tutorials, please verify your account by clicking on the link provided below. We're excited to support your learning journey!
</p>
        <br/>
        <a href='https://joyous-tan-jodhpurs.cyclic.app/auth/verify?id=${verificationId}&email=${studentemail}'>VERIFY</a>
        ` 
    });

    // keep in mind this https://backofficeapi.cyclic.cloud needs to be changed if the backend deployment changes 
}

module.exports = sendGmail;