const mongoose = require("mongoose");

class User {
  constructor(model) {
    this.model = model;
  }
 mongooseModel(){
  return this.model;
 }
 //update
 async update(item){
try{
      const options = { new: false, upsert: false };
      const update_result = await this.model.findByIdAndUpdate(item._id, item, options);
      // console.log(r);
      return { ok: true ,result : update_result};

  }catch(error){
        return {ok: false,error}

  }
}
//Get Question
 async get(id){
  try {
// debugger;
    const item = await this.model.findById( id ).lean();;
      if (item !== null   ){
        return { item, message: "success" ,ok:true};
      }else {
        return { message: "Not found" ,ok:false};
      }      
  } catch(error) {
    return {message : 'unknown error!',ok:false  };
  }

}
async addUser(qData){
  try{
       let q = new this.model(qData);
       const item = await q.save();
       return {ok:true , item};
    
  } catch (e) {
     if(e.code == 11000){
     return {message: 'Question already exists' , ok:false}
     }else{
     return {message: e.message , ok:false,errorCode : e.code}
     }
  }
 
 }

///////////////////////////////
 async where(query={}) {
   try {
   // Use Mongoose's "find" method with the provided query
   const questions = await this.model.find(query);

   return { items, ok: true };
   } catch (e) {
   return { message: e.message, ok: false, errorCode: e.code };
   }
}
//////////////////////////
 async count(query={}) {
   try {
   const count = await this.model.countDocuments(query);
   return { count, ok: true };
   } catch (e) {
   return { message: e.message, ok: false, errorCode: e.code };
   }
}
//////////////////////////
 async delete(id){
try{
//  debugger;
     let objectId = new mongoose.Types.ObjectId(id);
     const r = await this.model.findById(objectId );    
     if (!r){
            return {ok : false ,message : "item not found", status:404 };
     }
          
     await this.model.findByIdAndRemove(objectId );    
    return {ok : true ,message : "User deleted", status:200 };

}catch(err){
    return {ok : false , message : "Failed to delete", };
}  
}

async getByRole(role="student") {
  try {
    const items = await this.model.find({ role });

    return { ok: true, items };
  } catch (error) {
    return { ok: false, message: "Failed to get questions by question type", error };
  }
}

}//

module.exports = User;
