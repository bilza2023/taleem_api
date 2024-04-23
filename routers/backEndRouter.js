require('dotenv').config(); 
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const express = require('express');
// const addQuestion = require('./addQuestion.js');

const backEndRouter = express.Router();
// const Teacher = require("../models/teacher.js");
// const sendGmail = require("../gmail.js");
const {getTcode} = require('tcode_module');


///////////////////////////////////////////////////////////////////////
backEndRouter.post("/syllabus", async function (req, res) {
   try {
   debugger;
  
  const tcode  = req.body.tcode;
    // console.log('tcode:', tcode); 
  
  if (!tcode) {return  res.status(400).json({ message: "missing data" }); }

  const theMdl = await getTcode(tcode);

  if(!theMdl) { return res.status(404).json({ ok:false, message: "tcode not found" });}
 const questions = await theMdl.getSyllabus();

      return res.status(200).json({ questions, message: "success",ok:true  });

  } catch (error) {
    console.error(error);
     return res.status(500).json({ ok:false, message: "failed to load syllabus" });
    // return res.status(500).json({ message: 'Unknown error!' });
  }
});
////////////////////////////////////////////////////////
backEndRouter.post("/update" , async function(req,res) {
  try {
  debugger;
  /////////////////////////////////////
      // const verifyResp = verify(req); 
      // if(!verifyResp.ok){
      // return res.status(400).json({message:verifyResp.message})
      // }/////////////////////////////////////
  const question = req.body.question;
  // const id  = presentation._id;
  const tcode  = req.body.tcode;
  
  if (!question || !tcode) {return  res.status(400).json({ message: "missing data" }); }
  
  const theMdl = await getTcode(tcode);
  // const theMdl = await getModel(tcode);
  if(!theMdl) { return res.status(404).json({ ok:false, message: "tcode not found" });}

  //  const options = { new: false, upsert: false };
   const tf  = await theMdl.update(question);
      if (tf   ){
        return res.status(200).json({ message: 'success' });
      }else {
        return res.status(404).json({ message: "failed to save" });
      }

  } catch(error) {
    return res.status(400).json({message : 'unknown error!'  });
  }
});
////////////////////////////////////////////////////////
backEndRouter.post("/read" , async function(req,res) {
  try {
  //debugger;
  const id  = req.body.id;
  const tcode  = req.body.tcode;
  if (!id || !tcode) {return  res.status(400).json({ message: "missing data" }); }
  
  //  const theMdl = await getModel(tcode);
  const theMdl = await getTcode(tcode);
  if(!theMdl) { return res.status(404).json({ ok:false, message: "tcode not found" });}

   const item  = await theMdl.get(id);
      if (item !== null   ){
        return res.status(200).json({item});
      }else {
        return res.status(404).json({ message: "Not found" });
      }

  } catch(error) {
    return res.status(400).json({message : 'unknown error!'  });
  }
});
////////////////////////////////////////////////////////

////////////////////////////////////////////////////////
backEndRouter.post("/delete_question" , async function(req,res) {
  try {
  debugger;
  
  const id  = req.body.id;
  const tcode  = req.body.tcode;
  if (!id || !tcode) {return  res.status(400).json({ message: "missing data" }); }
  
   const theMdl = await getTcode(tcode);;
  if(!theMdl) { return res.status(404).json({ ok:false, message: "tcode not found" });}

   let objectId = new mongoose.Types.ObjectId(id);
     const question = await theMdl.delete(objectId );    
     if (!question){
        return res.status(404).json({message : "question not found"});
     }
     if (question.slides.length > 0){
            return res.status(400).json({message : "question has content"});
     }
     
     await theMdl.findByIdAndRemove(objectId );    
     return res.status(200).json({message : 'question deleted'  });
      
  } catch(error) {
    return res.status(400).json({msg : 'unknown error!'  });
  }
});

////////////////////////////////////////////////////////
module.exports = backEndRouter;
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////

function verify(req) {
 try {
  //  debugger;
    const token = req.headers.authorization.split(" ")[1]; // Extract the token from the 'Authorization' header
    if (!token) {
      return {ok:false, message:'missing Authorization token'};
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user; // Add user to request object
      if(req.user.status === "admin"){
            req.isAdmin = true; //very important
          }else {
            req.isAdmin = false; //very important
          }
    return {ok:true};
  } catch (error) {
    return {ok:false, message:'auth error'};
  }
}
//65a2724608f47d00c9267a31,65aa9f91d403c62292b316bd