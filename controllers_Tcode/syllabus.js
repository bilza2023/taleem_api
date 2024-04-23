require('dotenv').config(); 
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const {getTcode} = require('../dbLayer');

///////////////////////////////////////////////////////////////////////
async function syllabus(req, res) {
   try {
   debugger;
  
  const tcode  = req.body.tcode;
    // console.log('tcode:', tcode); 
  
  if (!tcode) {return  res.status(400).json({ message: "missing data" }); }

  const theMdl = await getTcode(tcode);

  if(!theMdl) { return res.status(404).json({ ok:false, message: "tcode not found" });}
 const items = await theMdl.getSyllabus();

      return res.status(200).json({ items, message: "success",ok:true  });

  } catch (error) {
    console.error(error);
     return res.status(500).json({ ok:false, message: "failed to load syllabus" });
    // return res.status(500).json({ message: 'Unknown error!' });
  }
}

module.exports = syllabus;