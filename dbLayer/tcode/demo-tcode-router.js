require('dotenv').config(); 
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const express = require('express');
// const addQuestion = require('./addQuestion.js');
const getModel = require('./getModel.js');
const TCodeRouter = express.Router();

// const sendGmail = require("../gmail.js");
/////////////////////////////////////////////////
//////////////////////////////////
// TCodeRouter.use((req, res, next) => {
// //  debugger;
//   if (req.path === '/teacher_login') {
//     // Skip verification for the /teacher_login route sine this path is for login of backend rest routes are used only after login. teacher_login is also for admin (but not for students)
//     next();
//   } else {
//     const user = verify(req);
//     if (user) {
//       req.user = user;
//           if(user.status === "admin"){
//             req.isAdmin = true; //very important
//           }else {
//             req.isAdmin = false; //very important
//           }
//       next();
//     } else {
//       return res.status(403).json({ message: 'Unauthorized access,please login' });
//     }
//   }
// });
///////////////////////////////////////////////////////////////////////
TCodeRouter.post("/syllabus", async function (req, res) {
   try {
   debugger;
  const tcode  = req.body.tcode;
  
  if (!tcode) {return  res.status(400).json({ message: "missing data" }); }
  const theMdl = await getModel(tcode);
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
TCodeRouter.post("/update" , async function(req,res) {
  try {
  debugger;
  /////////////////////////////////////
      // const verifyResp = verify(req); 
      // if(!verifyResp.ok){
      // return res.status(400).json({message:verifyResp.message})
      // }/////////////////////////////////////
  // const presentation = req.body.presentation;
  //659fab981913b0d8e22fd88e
  const question  = req.body.question;
  const tcode  = req.body.tcode;
  
  if (!question || !tcode) {return  res.status(400).json({ message: "missing data" }); }
  
  const theMdl = await getModel(tcode);
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
TCodeRouter.post("/read" , async function(req,res) {
  try {
  //debugger;
  /////////////////////////////////////
      // const verifyResp = verify(req); 
      // if(!verifyResp.ok){
      // return res.status(400).json({message:verifyResp.message})
      // }/////////////////////////////////////
  const id  = req.body.id;
  const tcode  = req.body.tcode;
  if (!id || !tcode) {return  res.status(400).json({ message: "missing data" }); }
  
   const theMdl = await getModel(tcode);
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
// TCodeRouter.post("/add_question" , async function(req,res) {
//   try {
//     debugger;
//     /////////////////////////////////////
//       const verifyResp = verify(req); 
//       if(!verifyResp.ok){
//       return res.status(400).json({message:verifyResp.message})
//       }/////////////////////////////////////
//    const qData  = req.body.qData;
//    const result = await addQuestion(qData);
//     if (result.ok  ){
//       return res.status(200).json({ question: result.question, message: "success" });
//     }else {
//       return res.status(404).json({ message: result.message });
//     }                  
//   } catch(error) {
//     return res.status(400).json({message : 'unknown error!'  });
//   }
// });
////////////////////////////////////////////////////////
TCodeRouter.post("/copy_question" , async function(req,res) {
 try{
   /////////////////////////////////////
    const verifyResp = verify(req); 
    if(!verifyResp.ok){
    return res.status(400).json({message:verifyResp.message})
    }/////////////////////////////////////   

  const idFrom  = req.body.idFrom;
  const idTo  = req.body.idTo;
  const tcodeFrom  = req.body.tcodeFrom;
  const tcodeTo  = req.body.tcodeTo;

  if (!idTo || !tcodeTo) {return res.status(400).json({ message: "missing data" }); }

  if (!idFrom || !tcodeFrom) {return  res.status(400).json({ message: "missing data" }); }

   const theMdlFrom = await getModel(tcodeFrom);
   if(!theMdlFrom) { return res.status(404).json({ ok:false, message: "tcode From not found" });}
    let objectId = new mongoose.Types.ObjectId(idFrom);
    const question = await theMdlFrom.findById(objectId );    
     if (!question){
        return res.status(404).json({message : "question not found"});
     }
  const theMdlTo = await getModel(tcodeTo);
  if(!theMdlTo) { return res.status(404).json({ ok:false, message: "tcode From not found" });}
  debugger;
  let objectIdTo = new mongoose.Types.ObjectId(idTo);
  const questionTo = await theMdlTo.findById(objectIdTo ); 
  if (!questionTo){
        return res.status(404).json({message : "question not found"});
     }
 questionTo.slides = question.slides;
  const options = { new: false, upsert: false };
   const tf  = await theMdlTo.findByIdAndUpdate(objectIdTo,questionTo, options);
      if (tf   ){
        return res.status(200).json({ message: 'success' });
      }else {
        return res.status(404).json({ message: "failed to save" });
      }

 }catch(e){
  return res.status(400).json({msg : 'unknown error!'  });
 }
});
////////////////////////////////////////////////////////
TCodeRouter.post("/delete_question" , async function(req,res) {
  try {
  
  /////////////////////////////////////
      // const verifyResp = verify(req); 
      // if(!verifyResp.ok){
      // return res.status(400).json({message:verifyResp.message})
      // }/////////////////////////////////////   
debugger;
  const id  = req.body.id;
  const tcode  = req.body.tcode;
  if (!id || !tcode) {return  res.status(400).json({ message: "missing data" }); }
  
   const theMdl = await getModel(tcode);
  if(!theMdl) { return res.status(404).json({ ok:false, message: "tcode not found" });}

   let objectId = new mongoose.Types.ObjectId(id);
     const question = await theMdl.findById(objectId );    
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
module.exports = TCodeRouter;
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