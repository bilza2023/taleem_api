require('dotenv').config(); 
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {getTcode} = require('../dbLayer');


///////////////////////////////////////////////////////////////////////
async function deleteFn(req, res) {
    try {
        const id  = req.body.id;
        const forced  = req.body.forced;
        const tcode  = req.body.tcode;
        if (!id || !tcode) {return  res.status(400).json({ message: "missing data" }); }
        
         const theMdl = await getTcode(tcode);
        if(!theMdl) { return res.status(404).json({ ok:false, message: "tcode not found" });}
            const data = {id,forced} ;
            // debugger;
            const delete_result = await theMdl.delete(data);    
           if(delete_result.ok){
            return res.status(200).json({ok:delete_result.ok, message : "Question Deleted",delete_result  });
           }else {
            return res.status(200).json({ok:false, message : "failed to get  a delete result" });
           }
           
            
        } catch(error) {
          return res.status(400).json({ok:false, message : error.message  });
        }

}

module.exports = deleteFn;