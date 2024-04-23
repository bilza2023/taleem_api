require('dotenv').config(); 
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {getTcode} = require('../dbLayer');


///////////////////////////////////////////////////////////////////////
async function deleteFn(req, res) {
    try {
        debugger;
        
        const id  = req.body.id;
        const tcode  = req.body.tcode;
        if (!id || !tcode) {return  res.status(400).json({ message: "missing data" }); }
        
         const theMdl = await getTcode(tcode);
        if(!theMdl) { return res.status(404).json({ ok:false, message: "tcode not found" });}
      
           const delete_result = await theMdl.delete(id );    
           return res.status(delete_result.status).json({ok:delete_result.ok, message : delete_result.message  });
            
        } catch(error) {
          return res.status(400).json({ok:false, msg : 'unknown error!'  });
        }

}

module.exports = deleteFn;