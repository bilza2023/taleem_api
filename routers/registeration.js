require('dotenv').config();
const mongoose = require('mongoose'); 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const express = require('express');
const registeration = express.Router();
const Student = require("../models/student.js");
const sendGmail = require("../gmail.js");
const { v4: uuid } = require('uuid');
//////////////////////////////////////////////////////// 
//-updated on 27-jan-2024
registeration.post("/login", async function (req, res) {
  try {
  debugger;
    const email = req.body.email;
    const passwordPlain = req.body.password;
    // Input validation
    if (!email || !passwordPlain) {
      return res.status(400).json({ message: "Email and password are required" });
    }
   //-check if the user exists
    const user = await Student.findOne({ email });
    if (user == null) {
      return res.status(404).json({ message: "Email address not found" });
    }
    if (user.verified == false) {
      return res.status(404).json({ message: "Your account is not verified",errorcode: "AccountNotVerified" });
    }
    // encrypt incomming password to compare
  if (bcrypt.compare(passwordPlain, user.password)) {
        const token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: "7d" });

      // const status = user.status;
      // const email = email ;

      res.set("Authorization", `Bearer ${token}`);
      return res.status(200).json({ message: "Login successful", token: token ,email});
  } else {
      return res.status(401).json({  message: "Invalid email or password" });
  }
  
  } catch (error) {
    return res.status(500).json({  message: "Login failed", error });
  }
});
////////////////////////////////////////////////////////
registeration.post("/signup", async function (req, res) {
  try {
   debugger;
    const email = req.body.email;
    const passwordPlain = req.body.password;
    // Input validation
    if (!email || !passwordPlain) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await Student.findOne({ email });
    if (user) {
      return res.status(404).json({ message: "This Email already exists" });
    }
    // debugger;
    const verificationId = uuid();
    const hashedPassword = await bcrypt.hash(passwordPlain, 2);
    const data = {email, password: hashedPassword, status: 'free',verificationId }

    const newuser = await Student.create(data);
    if(newuser){
      await sendGmail(email,verificationId);
      return res.status(200).json({  message: "your account has been created" });
    } else {
      return res.status(500).json({  message: "signup failed"});
    }
  } catch (error) {
    return res.status(500).json({  message: "signup failed", error });
  }
});

////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
// registeration.get("/purchase", async function (req, res) {
//   try {
   
//     // const email = req.query.email;
//     const email = 'bilza2023@gmail.com';
//     const tcode = 'fbise9math';
//     // const passwordPlain = req.body.password;
//     // Input validation
//     if (!email) {
//       return res.status(400).json({ message: "Email is required" });
//     }

//     const user = await Student.findOne({ email }).lean();
//     const purchases = user.purchases;
//     debugger; 
//     const startDate =  new Date();
//     let endDate = new Date(startDate.getTime());
//     endDate.setFullYear(endDate.getFullYear() + 1); // Add one year
    
//     purchases.push({tcode , startDate:new Date() , endDate}) 
    
//     user.purchases = purchases;
//      const options = { new: false, upsert: false };
//      const tf  = await Student.findByIdAndUpdate(user._id,user, options);
//       if (tf   ){
//         return res.status(200).json({ message: 'success' });
//       }else {
//         return res.status(404).json({ message: "failed to verify" });
//       }


//   } catch (error) {
//     return res.status(500).json({  message: "purchase failed", error });
//   }
// });
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
registeration.post("/ispaid", async function (req, res) {
  try {
   debugger;
    const email = req.body.email;
    const tcode = req.body.tcode;
    // const email = 'bilza2023@gmail.com';
    // const tcode = 'fbise9math';
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await Student.findOne({ email }).lean();
    const today = new Date();
    const purchases = user.purchases;

    for (let i = 0; i < purchases.length; i++) {
      const element = purchases[i];
        if (element.tcode === tcode){

                if(element.endDate.getTime() > today.getTime()){
                return res.status(200).json({allowed:true });
                }else{
                // console.log("Allowed");
                return res.status(404).json({allowed:false });
                }
        }
    }
        return res.status(404).json({ message: "failed to verify",allowed:false });

  } catch (error) {
    return res.status(500).json({  message: "signup failed", error });
  }
});
////////////////////////////////////////////////////////
registeration.get("/verify", async function (req, res) {
  try {
    debugger;
    const id = req.query.id;
    const email = req.query.email;
    const user = await Student.findOne({ email:email , verificationId:id });
    if (!user) {
      return res.status(404).json({ message: "This link is not valid" });
    }else {
    user.verified = true;
    user.verificationId = '';
     const options = { new: false, upsert: false };
     const tf  = await Student.findByIdAndUpdate(user._id,user, options);
      if (tf   ){
        return res.status(200).json({ message: 'success' });
      }else {
        return res.status(404).json({ message: "failed to verify" });
      }
    }

  } catch (error) {
    return res.status(500).json({  message: "failed to verify", error });
  }
});
////////////////////////////////////////////////////////
module.exports = registeration;
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
