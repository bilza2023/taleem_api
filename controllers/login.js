require('dotenv').config();
// const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const sendGmail = require("./gmail.js");
// const send_Forget_Password_Gmail = require("./forget_password_gmail.js");
const { v4: uuid } = require('uuid');
const {getUser} = require('../dbLayer');


async function login(req, res) {
    try {
        debugger;
        const email = req.body.email;
        const passwordPlain = req.body.password;
        // Input validation
        if (!email || !passwordPlain) {
          return res.status(400).json({ message: "Email and password are required" });
        }
        //////*********************************************** */
        const Student = getUser().mongooseModel();
        //////*********************************************** */
       //-check if the user exists
        const user = await Student.findOne({ email });
        if (user == null) {
          return res.status(404).json({ message: "Email address not found" });
        }
    //--disable for now    
        // if (user.verified == false) {
        //   return res.status(404).json({ message: "Your account is not verified",errorcode: "AccountNotVerified" });
        // }
        // encrypt incomming password to compare
      if ( bcrypt.compare(passwordPlain, user.password)) {
            const token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: "365d" });
    
          res.set("Authorization", `Bearer ${token}`);
          return res.status(200).json({ok:true, message: "Login successful", token: token ,email});
      } else {
          return res.status(401).json({  message: "Invalid email or password" });
      }
      
      } catch (error) {
        return res.status(500).json({  message: "Login failed", error });
      }
  }
 
  module.exports = login;