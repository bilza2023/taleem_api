require('dotenv').config();
// const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const express = require('express');
const admin = express.Router();
const Student = require("../models/student.js");
const Teacher = require("../models/teacher.js");


const { v4: uuid } = require('uuid');
////////////////////////////////////////////////////////
const verifyUser = async (req, res, next) => {
  // debugger;
  const email = req.body.email;
  const passwordPlain = req.body.password;
  
  // Input validation
  if (!email || !passwordPlain) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  
  // Check if the user exists
  const teacher_db = await Teacher.findOne({ email });
  if (teacher_db == null) {
    return res.status(404).json({ message: "Email address not found" });
  }
  if ( bcrypt.compare(passwordPlain, teacher_db.password)) {
    next();
  } else {
    return res.status(500).json({ message: "failed to authenticate"});
  }

   // Proceed to the next middleware or route handler
};
//////////////////////////////////////// 
admin.use(verifyUser);

//-updated on 27-jan-2024
admin.post("/download_students", async function (req, res) {
  try {
    debugger;     
      const students = await Student.find().lean();
      return res.status(200).json({  students });
  } catch (error) {
    return res.status(500).json({  message: "failed to down load students list", error });
  }
});
////////////////////////////////////////////////////////

////////////////////////////////////////////////////////
module.exports = admin;
////////////////////////////////////////////////////////
