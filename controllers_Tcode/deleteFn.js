require('dotenv').config(); 
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const {getTcode} = require('tcode_module');


///////////////////////////////////////////////////////////////////////
async function deleteFn(req, res) {
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
           
           const delete_result = await theMdl.findByIdAndRemove(objectId );    
           return res.status(200).json({ok:true, message : 'question deleted',delete_result  });
            
        } catch(error) {
          return res.status(400).json({msg : 'unknown error!'  });
        }

}

module.exports = deleteFn;