require('dotenv').config();
// const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
// const sendGmail = require("./gmail.js");
// const send_Forget_Password_Gmail = require("./forget_password_gmail.js");
const { v4: uuid } = require('uuid');
// const {getTcode,registerTcode,getUser} = require('tcode_module');
const {getUser} = require('../dbLayer');


async function signup(req, res) {
    try {
     debugger;
     //////*********************************************** */
     const Student = getUser().mongooseModel();
     //////*********************************************** */
      const email = req.body.email;
      const passwordPlain = req.body.password;
      // Input validation
      if (!email || !passwordPlain) {
        return res.status(400).json({ ok:false, message: "Email and password are required" });
    }
  
      const user = await Student.findOne({ email });
      if (user) {
        return res.status(404).json({ ok:false,message: "This Email already exists" });
      }
      // debugger;
      const verificationId = uuid();
      const hashedPassword = await bcrypt.hash(passwordPlain, 2);
      const data = {email, password: hashedPassword, status: 'free',verificationId }
  
      const newuser = await Student.create(data);
      if(newuser){
        // await sendGmail(email,verificationId);
        return res.status(200).json({ok:true,  message: "your account has been created" });
      } else {
        return res.status(500).json({ok:false,  message: "signup failed"});
      }
    } catch (error) {
      return res.status(500).json({ok:false,  message: "signup failed", error });
    }
  }
 
  module.exports = signup;