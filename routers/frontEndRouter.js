require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const express = require('express');
const frontEndRouter = express.Router();
const MathFullObj = require('../mathFull/MathFullObj.js');
const User = require("../models/user.js");

/////////////////////////////////////////////////
frontEndRouter.post("/get_question" , async function(req,res) {
  try {
debugger;
  const quizId  = req.body.id;
    const result = await MathFullObj.Get( quizId );
      if (result.ok  ){
        return res.status(200).json({ question: result.question, message: "success" });
      }else {
        return res.status(404).json({ message: "Not found" });
      }      
            

  } catch(error) {
    return res.status(400).json({message : 'unknown error!'  });
  }
});
///////////////////////////////////////////////////////////////////////
frontEndRouter.get("/fbise_math9th_syllabus", async function (req, res) {
  try {
  // debugger;
    const result  = await MathFullObj.GetSyllabus();
    if (result.ok){
      return res.status(200).json({ questions :result.questions, message: "success",ok:true  });
    }else {
      return res.status(500).json({ ok:false, message: "failed to load syllabus" });
    }

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Unknown error!' });
  }
});
frontEndRouter.post("/login", async function (req, res) {
  try {
  // debugger;
    const email = req.body.email;
    const passwordPlain = req.body.password;

    // Input validation
    if (!email || !passwordPlain) {
      return res.status(400).json({ message: "Email and password are required" });
    }
    // if there is no status in the table it will return "teacher" as per the default in the Schema
    const user = await User.findOne({ email });
    // console.log("user", user);
    if (user == null) {
      return res.status(404).json({ msg: "Email address not found" });
    }

    if (await bcrypt.compare(passwordPlain, user.password)) {
      const token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: "7d" });

    const status = user.status;

    res.set("Authorization", `Bearer ${token}`);
    return res.status(200).json({ message: "Login successful",ok:true,  token: token});
    } else {
      return res.status(401).json({ok:false,  message: "Invalid email or password" });
    }
  } catch (error) {
    // console.log(error);
    return res.status(500).json({  msg: "Login failed", error });
  }
});
////////////////////////////////////////////////////////
module.exports = frontEndRouter;
////////////////////////////////////////////////////////

function extractEmailPrefix(email) {
    let atIndex = email.indexOf('@');
    if (atIndex !== -1) {
        return email.substring(0, atIndex);
    } else {
        return 'name not found';
    }
}

function verify(req) {
 try {
  //  debugger;
    const token = req.headers.authorization.split(" ")[1]; // Extract the token from the 'Authorization' header
    if (!token) {
      return res.status(403).json({ msg: "A token is required for authentication" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user; // Add user to request object
    return decoded.user;
  } catch (error) {
    return false;
  }
}

function verifyAdmin(req) {
 try {
  //  debugger;
    const token = req.headers.authorization.split(" ")[1]; // Extract the token from the 'Authorization' header
    if (!token) {
      return false;
    }
    const decodedUser = jwt.verify(token, process.env.JWT_SECRET);
    if ( decodedUser.user.status !== "admin" ){
      return false;
    }else {
      return decodedUser.user;
    }
  ///////////////////////  
  } catch (error) {
    return false;
  }
}




