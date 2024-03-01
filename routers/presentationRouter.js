
require('dotenv').config();
const slidesByTcode = require('./slidesByTcode.js');
const updateSlidesByTcode = require('./updateSlidesByTcode.js');

const express = require('express');
const presentationRouter = express.Router();
const Presentation = require('../presentation/presentationSchema.js');
//////////////////////////////////

presentationRouter.post("/readAll" , async function(req,res) {
  try {
  // debugger;
   const items = await Presentation.find({});
      if (items !== null   ){
        return res.status(200).json({ items });
      }else {
        return res.status(404).json({ message: "Not found" });
      }

  } catch(error) {
    return res.status(400).json({message : 'unknown error!'  });
  }
});

presentationRouter.post("/read" , async function(req,res) {
  try {
  // debugger;
  const id  = req.body.id;
  const tcode  = req.body.tcode;
  if (!id || !tcode) {return  res.status(400).json({ message: "missing data" }); }
  
   const {slides,item}  = await slidesByTcode(tcode,id);
      if (slides !== null   ){
        return res.status(200).json({slides,item});
      }else {
        return res.status(404).json({ message: "Not found" });
      }

  } catch(error) {
    return res.status(400).json({message : 'unknown error!'  });
  }
});

presentationRouter.post("/update" , async function(req,res) {
  try {
  debugger;
  const presentation = req.body.presentation;
  const id  = presentation._id;
  const tcode  = req.body.tcode;
  if (!id || !tcode) {return  res.status(400).json({ message: "missing data" }); }
  
   const tf  = await updateSlidesByTcode(tcode,presentation);
      if (tf   ){
        return res.status(200).json({ message: 'success' });
      }else {
        return res.status(404).json({ message: "failed to save" });
      }

  } catch(error) {
    return res.status(400).json({message : 'unknown error!'  });
  }
});
///////////////////////////////////////////////
presentationRouter.post("/create" , async function(req,res) {
try{
    debugger;
    const presentation = req.body.presentation;
    let q = new Presentation(presentation);
            const r = await q.save();
      return res.status(200).json({ ok:true });
   
  }catch(error){
      return res.status(500).json({ ok:false, message:"failed to create" });
  }
});
presentationRouter.post("/delete" , async function(req,res) {
try{
    debugger;
    const id = req.body.id;
    await Presentation.findByIdAndRemove(id );    
      return res.status(200).json({ ok:true });
  }catch(error){
        // return res.status(500).json({status : "error" , msg:"failed to save presentation"   });
        console.log("error", error);
  }
});
////////////////////////////////////////////////////////
module.exports = presentationRouter;
////////////////////////////////////////////////////////
