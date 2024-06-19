require('dotenv').config(); 
const jwt = require('jsonwebtoken');

const express = require('express');
const getFilename = require('../dbLayer/tcode/fn/getFilename');

const TcodeRouter = express.Router();
const TCode = require('../dbLayer/tcode/TCode');

const getIncomming = require('./getIncomming');
const finalJson = require('./finalJson');

///////////////////////////////////////////////////////////////////////
TcodeRouter.post("/create" , async function(req,res) {
  try { 
    // debugger;
    //--> question must have tcode
    const data = await getIncomming(req,["question"]);
    getFilename(data.question   ,  data.question.tcode);
    const mongoose_model = TCode.mongooseModel();
    const newQuestion = new mongoose_model(data.question);
    const item = await newQuestion.save();
    if(item){
        return res.status(200).json({item});
    } else {
        return res.status(500).json({"ok" : false, message: "Failed to save document." });
    }
  } catch(error) {
    let errorMessage;
    if (error.code === 11000) { // Duplicate key error
        errorMessage = "Duplicate key error. The document already exists.";
    } else {
        errorMessage = error.message || 'Unknown error!';
    }
    return res.status(400).json({message: errorMessage });
  }
});
///////////////////////////////////////////////////////////////////////
TcodeRouter.post("/get" , async function(req,res) {
    try{ 
    const data = await getIncomming(req,["id"]);
    // const question =  await TCode.get(data);
    const question = await TCode.mongooseModel().findById(data.id).lean();
      return finalJson({question},['question'],res);
      } catch (error) {
        return res.status(500).json({message:error.message , error})
      }
  });
////////////////////////////////////////////////////////
TcodeRouter.post("/syllabus", async function (req, res) {
  debugger;
  const data = await getIncomming(req,["tcode"]);
   const items =  await TCode.getSyllabus(data.tcode);
   return res.status(200).json({ items, message: "success",ok:true  });
});
////////////////////////////////////////////////////////
TcodeRouter.post("/update" , async function(req,res) {
  try {
  debugger;
  const data = await getIncomming(req,["question"]);
        const options = { new: true, upsert: false };
  const question = await TCode.mongooseModel().findByIdAndUpdate(data.question._id, data.question, options).lean();
      if (  question ){
        return res.status(200).json({ ok:true, message: 'success',question });
      }else {
        return res.status(404).json({ message: "failed to save" });
      }

  } catch(error) {
    return res.status(400).json({message : 'unknown error!'  });
  }
});
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
TcodeRouter.post("/where" , async function(req,res) {
 try{
  debugger;
  const data = await getIncomming(req,["query" , "tcode"]);
  data.query.tcode = data.tcode;
   /////////////////////////////////////////////////////////////////////////
   const items = await TCode.mongooseModel().find(data.query);
   if(items){
       return res.status(200).json(items);
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
  const data = await getIncomming(req,["query" , "tcode"]);
  data.query.tcode = data.tcode;
   /////////////////////////////////////////////////////////////////////////
   const count = await TCode.mongooseModel().countDocuments(data.query);
   if(count){
      return res.status(200).json({ "count" : count });
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
  debugger;
  const data = await getIncomming(req,["tcode"]);
  const result = await TCode.getUniqueChapters(data.tcode);
   if(result){
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
TcodeRouter.post("/getUniqueExercises" , async function(req,res) {
 try{
  debugger;
  const data = await getIncomming(req,["tcode"]);
  const result = await TCode.getUniqueExercises(data.tcode);
 
  if(result){
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
TcodeRouter.post("/getByFilename" , async function(req,res) {
 try{
  // debugger;
  const data = await getIncomming(req,["tcode" , "filename"]);
  
   /////////////////////////////////////////////////////////////////////////
   const item = await TCode.mongooseModel().findOne({ "tcode": data.tcode, "filename": data.filename });

   if(item){
       return res.status(200).json({item});
     }else {
       return res.status(500).json({ ok:false, message: 'failed' });
     }
     /////////////////////////////////////////////////////////////////////////
  }catch(e){
    return res.status(500).json({ ok:false, message: 'failed' });
  }
});
TcodeRouter.post("/getByStatus" , async function(req,res) {
 try{
  debugger;
  const data = await getIncomming(req,["tcode" , "status"]);
  
   /////////////////////////////////////////////////////////////////////////
   const items = await TCode.mongooseModel().find({ "tcode": data.tcode, "status": data.status });

   if(items){
       return res.status(200).json(items);
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
  debugger;
  const data = await getIncomming(req,["tcode" , "questionType"]);
  
   /////////////////////////////////////////////////////////////////////////
   const items = await TCode.mongooseModel().find({ "tcode": data.tcode, "questionType": data.questionType });

   if(items){
       return res.status(200).json(items);
     }else {
       return res.status(500).json({ ok:false, message: 'failed' });
     }
     /////////////////////////////////////////////////////////////////////////
  }catch(e){
    return res.status(500).json({ ok:false, message: 'failed' });
  }
});
////////////////////////////////////////////////////////
TcodeRouter.post("/getChapter" , async function(req,res) {
 try{
  debugger;
  const data = await getIncomming(req,["tcode" , "chapter"]);
   /////////////////////////////////////////////////////////////////////////
   const items = await TCode.mongooseModel().find({"tcode" :data.tcode, "chapter": data.chapter });
   if(items){
       return res.status(200).json(items);
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
  debugger;
  const data = await getIncomming(req,["tcode" , "exercise"]);
  /////////////////////////////////////////////////////////////////////////
  const items = await TCode.mongooseModel().find({"tcode" :data.tcode, "exercise": data.exercise });
  if(items){
      return res.status(200).json(items);
    }else {
      return res.status(500).json({ ok:false, message: 'failed' });
    }
    /////////////////////////////////////////////////////////////////////////
 }catch(e){
   return res.status(500).json({ ok:false, message: 'failed' });
 }
});
////////////////////////////////////////////////////////
TcodeRouter.post("/delete" , async function(req,res) {
  debugger;
  const data = await getIncomming(req,[ "id" , "forced"]);
  const item = await TCode.mongooseModel().findById(data.id).lean();
    if (!item) {
      throw new Error ("item not found");
    }
    if (!item.slides) {
      throw new Error ("slides not found");
    }

    if (data.forced == false && item.slides.length > 0) {
        throw new Error ('Question has content');
    }
    const delete_result = await TCode.mongooseModel().findOneAndDelete({ _id: data.id });
     if(delete_result){
      return res.status(200).json({ok:true, message : "Question Deleted",delete_result  });
     }else {
      return res.status(200).json({ok:false, message : "failed to get  a delete result" });
     }
});
////////////////////////////////////////////////////////
module.exports = TcodeRouter;
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