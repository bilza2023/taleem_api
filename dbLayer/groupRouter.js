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
// ////////////////////////////////////////////////////////
// GroupRouter.post("/update" , async function(req,res) {
//   try {
//   debugger;
//   const data = await getIncomming(req,["question"]);
//         const options = { new: true, upsert: false };
//   const question = await TCode.mongooseModel().findByIdAndUpdate(data.question._id, data.question, options).lean();
//       if (  question ){
//         return res.status(200).json({ ok:true, message: 'success',question });
//       }else {
//         return res.status(404).json({ message: "failed to save" });
//       }

//   } catch(error) {
//     return res.status(400).json({message : 'unknown error!'  });
//   }
// });
// ////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////
// GroupRouter.post("/where" , async function(req,res) {
//  try{
//   debugger;
//   const data = await getIncomming(req,["query" , "tcode"]);
//   data.query.tcode = data.tcode;
//    /////////////////////////////////////////////////////////////////////////
//    const items = await TCode.mongooseModel().find(data.query);
//    if(items){
//        return res.status(200).json(items);
//      }else {
//        return res.status(500).json({ ok:false, message: 'failed' });
//      }
//   /////////////////////////////////////////////////////////////////////////
//   }catch(e){
//     return res.status(500).json({ ok:false, message: 'failed' });
//   }
// });
// ////////////////////////////////////////////////////////
// GroupRouter.post("/delete" , async function(req,res) {
//   debugger;
//   const data = await getIncomming(req,[ "id" , "forced"]);
//   const item = await TCode.mongooseModel().findById(data.id).lean();
//     if (!item) {
//       throw new Error ("item not found");
//     }
//     if (!item.slides) {
//       throw new Error ("slides not found");
//     }

//     if (data.forced == false && item.slides.length > 0) {
//         throw new Error ('Question has content');
//     }
//     const delete_result = await TCode.mongooseModel().findOneAndDelete({ _id: data.id });
//      if(delete_result){
//       return res.status(200).json({ok:true, message : "Question Deleted",delete_result  });
//      }else {
//       return res.status(200).json({ok:false, message : "failed to get  a delete result" });
//      }
// });
////////////////////////////////////////////////////////
module.exports = GroupRouter;
////////////////////////////////////////////////////////
