require('dotenv').config();
// const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const express = require('express');
const auth = express.Router();
const Student = require("../models/student.js");
const sendGmail = require("./gmail.js");
// const send_Forget_Password_Gmail = require("./forget_password_gmail.js");
const { v4: uuid } = require('uuid');
////////////////////////////////////////////////////////
//-updated on 27-jan-2024
auth.post("/login", async function (req, res) {

});
////////////////////////////////////////////////////////

// auth.post("/forgot_password", async function (req, res) {
//   try {
//     const email = req.body.email;
//     if (!email) {
//       return res.status(400).json({ message: "Email is required" });
//     }

//     const user = await Student.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: "This Email does not  exists" });
//     }
//     const verificationId = uuid();
//     const data = {verificationId }
//         await Student.findOneAndUpdate({ email },{ $set: data },{  new: true});
   
//     await send_Forget_Password_Gmail(email,verificationId);
//     return res.status(200).json({  message: "A link has been sent to you" });
  
//   } catch (error) {
//     return res.status(500).json({  message: "Failed to send link please try later", error });
//   }
// });
auth.post("/change_password", async function (req, res) {

});

 ////////////////////////////////////////////////////////
 // auth.get("/purchase", async function (req, res) {
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
auth.post("/ispaid", async function (req, res) {
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
auth.get("/verify", async function (req, res) {
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

module.exports = auth;
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
