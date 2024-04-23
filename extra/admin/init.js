require('dotenv').config();
const bcrypt = require('bcryptjs');
const express = require('express');
const init = express.Router();
// const Student = require("../models/student.js");
const Teacher = require("../models/teacher.js");
////////////////////////////////////////////////////////

//-updated on 27-jan-2024
init.post("/create_admin", async function (req, res) {
  try {
    debugger;
    const email = req.body.email;
    const password = req.body.password;
    
    if ( !email || !password ) {
      return res.status(400).json({ message: "Email and password are required" });
    }
    if (email !== "bilza2023@gmail.com"){
      return res.status(400).json({ message: "Email is not correct" });
    }
    if (password !== "123456"){
      return res.status(400).json({ message: "Password is not correct" });
    }
    const admin_exists = await Teacher.findOne({email:"bilza2023@gmail.com"});

    if(!admin_exists ){
      // if(!admin_exists){
      const hashedPassword = await bcrypt.hash(password, 2);  
      Teacher.create({
          email:"bilza2023@gmail.com",
          password : hashedPassword,
          role : "admin"
      });
      return res.status(200).json({ message: "admin added successfully" });
    }else {
      return res.status(400).json({ message: "Admin already exists" });
    }


  }catch(e){
    return res.status(500).json({ message: "Unknow error happened while creating Admin" });
  }
});
////////////////////////////////////////////////////////
module.exports = init;
////////////////////////////////////////////////////////
