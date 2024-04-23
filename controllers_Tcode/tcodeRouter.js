require('dotenv').config(); 
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const express = require('express');

const TcodeRouter = express.Router();
const TCodeSchema = require('../dbLayer/tcode/TCodeSchema');


const getIncomming = require('../fn/getIncomming');
const getMdl = require('../fn/getMdl');
const finalJson = require('../fn/finalJson');

const {getTcode} = require('../dbLayer');
const syllabus = require('./syllabus');
const deleteFn = require('./deleteFn');

///////////////////////////////////////////////////////////////////////
TcodeRouter.post("/get" , async function(req,res) {
    try{ debugger;
    // accept tcode,id return question
  //////////////////===> check incomming -1 <======/////////////////////////////
    const data = await getIncomming(req,["id","tcode"]);
    await getMdl(data);
    //////////////////===> The Process-2 <======//////////////////////////////////
    //TCode is not used here since it is simple.
    const mongoose_mdl =  mongoose.model(data.tcode, TCodeSchema);
    const question = await mongoose_mdl.findById(data.id.toString()).lean();
  //////////////////===> final json-3 <======//////////////////////////////////
      return finalJson({question},['question'],res);
    // }
    //////////////////////////////////////////////////////////////////////////
      } catch (error) {
        return res.status(500).json({message:error.message , error})
      }
  });

////////////////////////////////////////////////////////

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
        return res.status(200).json({ ok:true, message: 'success' });
      }else {
        return res.status(404).json({ message: "failed to save" });
      }

  } catch(error) {
    return res.status(400).json({message : 'unknown error!'  });
  }
});
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
TcodeRouter.post("/create" , async function(req,res) {
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

  /////////////////////////////////////////////////////////////////////////
  const result = await theMdl.addQuestion(tcode,question);
  if(result.ok){
      return res.status(200).json(result);
    }else {
      return res.status(500).json(result);
    }

    /////////////////////////////////////////////////////////////////////////
  } catch(error) {
    return res.status(400).json({message : 'unknown error!'  });
  }
});
////////////////////////////////////////////////////////

////////////////////////////////////////////////////////
TcodeRouter.post("/where" , async function(req,res) {
 try{
   const tcode  = req.body.tcode;
   const query  = req.body.query || {};
   if (!query || !tcode) {return  res.status(400).json({ message: "missing data" }); }
  
   const theMdl = await getTcode(tcode);
   // const theMdl = await getModel(tcode);
   if(!theMdl) { return res.status(404).json({ ok:false, message: "tcode not found" });}
 
   /////////////////////////////////////////////////////////////////////////
   const result = theMdl.where(query);
   if(result.ok){
       return res.status(200).json(result);
     }else {
       return res.status(500).json({ ok:false, message: 'failed' });
     }
     /////////////////////////////////////////////////////////////////////////
  }catch(e){
    return res.status(500).json({ ok:false, message: 'failed' });
  }
  
});
////////////////////////////////////////////////////////
TcodeRouter.post("/count" , async function(req,res) {
 try{
  
   const tcode  = req.body.tcode;
   const query  = req.body.query || {};
   if (!query || !tcode) {return  res.status(400).json({ message: "missing data" }); }
  
   const theMdl = await getTcode(tcode);
   // const theMdl = await getModel(tcode);
   if(!theMdl) { return res.status(404).json({ ok:false, message: "tcode not found" });}
 
   /////////////////////////////////////////////////////////////////////////
   debugger;
   const result = await theMdl.count(query);
   if(result.ok){
       return res.status(200).json(result);
     }else {
       return res.status(500).json({ ok:false, message: 'failed' });
     }
     /////////////////////////////////////////////////////////////////////////
  }catch(e){
    return res.status(500).json({ ok:false, message: 'failed' });
  }
});
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
TcodeRouter.post("/getUniqueChapters" , async function(req,res) {
 try{
   const tcode  = req.body.tcode;
   if (!tcode) {return  res.status(400).json({ message: "missing data" }); }
  
   const theMdl = await getTcode(tcode);
   // const theMdl = await getModel(tcode);
   if(!theMdl) { return res.status(404).json({ ok:false, message: "tcode not found" });}
 
   /////////////////////////////////////////////////////////////////////////
   const result = await theMdl.getUniqueChapters();
   if(result.ok){
       return res.status(200).json(result);
     }else {
       return res.status(500).json({ ok:false, message: 'failed' });
     }
     /////////////////////////////////////////////////////////////////////////
  }catch(e){
    return res.status(500).json({ ok:false, message: 'failed' });
  }
});
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
TcodeRouter.post("/getUniqueExercises" , async function(req,res) {
 try{
   const tcode  = req.body.tcode;
   if (!tcode) {return  res.status(400).json({ message: "missing data" }); }
  
   const theMdl = await getTcode(tcode);
   // const theMdl = await getModel(tcode);
   if(!theMdl) { return res.status(404).json({ ok:false, message: "tcode not found" });}
 
   /////////////////////////////////////////////////////////////////////////
   const result = await theMdl.getUniqueExercises();
   if(result.ok){
       return res.status(200).json(result);
     }else {
       return res.status(500).json({ ok:false, message: 'failed' });
     }
     /////////////////////////////////////////////////////////////////////////
  }catch(e){
    return res.status(500).json({ ok:false, message: 'failed' });
  }
});
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
TcodeRouter.post("/getByStatus" , async function(req,res) {
 try{
   const tcode  = req.body.tcode;
   const status  = req.body.status;
   if (!tcode || !status) {return  res.status(400).json({ message: "missing data" }); }
  
   const theMdl = await getTcode(tcode);
   // const theMdl = await getModel(tcode);
   if(!theMdl) { return res.status(404).json({ ok:false, message: "tcode not found" });}
 
   /////////////////////////////////////////////////////////////////////////
   const result = await theMdl.getByStatus(status);
   if(result.ok){
       return res.status(200).json(result);
     }else {
       return res.status(500).json({ ok:false, message: 'failed' });
     }
     /////////////////////////////////////////////////////////////////////////
  }catch(e){
    return res.status(500).json({ ok:false, message: 'failed' });
  }
});
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
TcodeRouter.post("/getByQuestionType" , async function(req,res) {
 try{
   const tcode  = req.body.tcode;
   const questionType  = req.body.questionType;
   if (!tcode || !questionType) {return  res.status(400).json({ message: "missing data" }); }
  
   const theMdl = await getTcode(tcode);
   // const theMdl = await getModel(tcode);
   if(!theMdl) { return res.status(404).json({ ok:false, message: "tcode not found" });}
 
   /////////////////////////////////////////////////////////////////////////
   const result = await theMdl.getByQuestionType(questionType);
   if(result.ok){
       return res.status(200).json(result);
     }else {
       return res.status(500).json({ ok:false, message: 'failed' });
     }
     /////////////////////////////////////////////////////////////////////////
  }catch(e){
    return res.status(500).json({ ok:false, message: 'failed' });
  }
});
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
TcodeRouter.post("/getChapter" , async function(req,res) {
 try{
   const tcode  = req.body.tcode;
   const chapterNumber  = req.body.chapterNumber;
   if (!tcode || !chapterNumber) {return  res.status(400).json({ message: "missing data" }); }
  
   const theMdl = await getTcode(tcode);
   // const theMdl = await getModel(tcode);
   if(!theMdl) { return res.status(404).json({ ok:false, message: "tcode not found" });}
 
   /////////////////////////////////////////////////////////////////////////
   const result = await theMdl.getChapter(chapterNumber);
   if(result.ok){
       return res.status(200).json(result);
     }else {
       return res.status(500).json({ ok:false, message: 'failed' });
     }
     /////////////////////////////////////////////////////////////////////////
  }catch(e){
    return res.status(500).json({ ok:false, message: 'failed' });
  }
});
////////////////////////////////////////////////////////
TcodeRouter.post("/getExercise" , async function(req,res) {
 try{
   const tcode  = req.body.tcode;
   const exerciseName  = req.body.exerciseName;
   if (!tcode || !exerciseName) {return  res.status(400).json({ message: "missing data" }); }
  
   const theMdl = await getTcode(tcode);
   // const theMdl = await getModel(tcode);
   if(!theMdl) { return res.status(404).json({ ok:false, message: "tcode not found" });}
 
   /////////////////////////////////////////////////////////////////////////
   const result = await theMdl.getExercise(exerciseName);
   if(result.ok){
       return res.status(200).json(result);
     }else {
       return res.status(500).json({ ok:false, message: 'failed' });
     }
     /////////////////////////////////////////////////////////////////////////
  }catch(e){
    return res.status(500).json({ ok:false, message: 'failed' });
  }
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