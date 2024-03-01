require('dotenv').config(); 
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const {getTcode} = require('tcode_module');


///////////////////////////////////////////////////////////////////////
async function read(req, res) {
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
}

module.exports = read;