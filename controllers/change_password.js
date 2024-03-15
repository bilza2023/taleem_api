require('dotenv').config();
// const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const sendGmail = require("./gmail.js");
// const send_Forget_Password_Gmail = require("./forget_password_gmail.js");
const { v4: uuid } = require('uuid');
const {getTcode,registerTcode,getUser} = require('../dbLayer');


async function change_password(req, res) {
    try {
        debugger;
         const email = req.body.email;
         const passwordPlain = req.body.password;
       
         if (!email || !passwordPlain) {
           return res.status(400).json({ message: "Email and password are required" });
         }
     //////*********************************************** */
     const Student = getUser().mongooseModel();
     //////*********************************************** */
         const user = await Student.find();
        //  return res.status(200).json({users });
         if (!user) {
           return res.status(404).json({ message: "This Email is not found" });
         }
         // debugger;
         // const verificationId = uuid();
         const hashedPassword = await bcrypt.hash(passwordPlain, 2);
     
         const data = {password: hashedPassword }
           await Student.findOneAndUpdate({ email },{ $set: data },{  new: true});
         return res.status(200).json({  message: "Passsword has been changed" });
     
       } catch (error) {
         return res.status(500).json({  message: "Passsword could not been changed please try later", error });
       }
  }
 
  module.exports = change_password;