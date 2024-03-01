require('dotenv').config(); 
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const express = require('express');

const TcodeRouter = express.Router();
const {getTcode} = require('tcode_module');
const syllabus = require('./syllabus');
const read = require('./read');
const deleteFn = require('./deleteFn');


///////////////////////////////////////////////////////////////////////
TcodeRouter.post("/syllabus", async function (req, res) {
   return syllabus(req,res);
});
////////////////////////////////////////////////////////
TcodeRouter.post("/update" , async function(req,res) {
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
TcodeRouter.post("/read" , async function(req,res) {
 return read(req,res);
});
////////////////////////////////////////////////////////

////////////////////////////////////////////////////////
TcodeRouter.post("/delete" , async function(req,res) {
  return deleteFn(req,res);
});

////////////////////////////////////////////////////////
module.exports = TcodeRouter;
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