require('dotenv').config(); 


const GroupModel = require('./groupSchema');
const getIncomming = require('./getIncomming');
const express = require('express');
const GroupRouter = express.Router();
const finalJson = require('./finalJson');

///////////////////////////////////////////////////////////////////////
GroupRouter.post("/create" , async function(req,res) {
  try { 
    
    const data = await getIncomming(req,["name" , 'description' , 'items']);
    const newGroup = new GroupModel( data );
    const item = await newGroup.save();
    
    if(item){
        return res.status(200).json({item});
    } else {
        return res.status(500).json({"ok" : false, message: "Failed to save document." });
    }
  } catch(error) {
    
    return res.status(400).json({message: errorMessage });
  }
});

///////////////////////////////////////////////////////////////////////
GroupRouter.post("/get" , async function(req,res) {
    try{ 
      // debugger;
    const groups = await GroupModel.find({}).lean();
      return finalJson({groups},['groups'],res);
      } catch (error) {
        return res.status(500).json({message:error.message , error})
      }
  });


////////////////////////////////////////////////////////
GroupRouter.post("/delete" , async function(req,res) {
  debugger;
  const data = await getIncomming(req,[ "id"]);
  const item = await GroupModel.findById(data.id).lean();
    if (!item) {
      throw new Error ("item not found");
    }
    
    const delete_result = await GroupModel.findOneAndDelete({ _id: data.id });
     if(delete_result){
      return res.status(200).json({ok:true, message : "Deleted",delete_result  });
     }else {
      return res.status(200).json({ok:false, message : "failed to get  a delete result" });
     }
});
////////////////////////////////////////////////////////
module.exports = GroupRouter;
////////////////////////////////////////////////////////
