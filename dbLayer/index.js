/**
 * 3-Mar-2024
 * - Database-Api specifically for Taleem Projects
 * - This is a set of  models (tcode,user) which consumes mongoose models and provide their own models with specific methods.
 *  - All the models are created on start and kept in "tcodeModels" and passed to use using "getTcode"
 *  - How it works : When we create "tcodes" at start they represent each course in our database and 1 model is made for each course. It also injects "user" table into the mix and that too is delivered using "getTcode" but the user has its own schema. 
 * - So this library using "getTcode" deliver 2 types of Models 1: non tcode type (just user for now) 2: tcode type: They are all created from "TCode model" which provides its own features on top of mongoose model. 
 * - There is no authentication or http at this level, just connect to the database and expose functions.
 * 
 * ******************** Gerneral Idea ***********************************
 *      Point 1::- We create a mongoose-Schema and then give it a string "tcode" which is the name of the table to be used with this schema.
 *      const MathFull = mongoose.model('MathFull', TCodeSchema);
 * So if we have more than 1 tables which use the same schema (all my courses use the same schema) we can get their table-names (tcodes) and pre-compile these models and give to the user the required one by "getTocde" by providing correct tcode.
 *      Point 2:: On top of this the "models" that we provide are not mongoose-models rather out own models "TCode" and "User" which provide features specific to Taleem projects.
 *  
 * 
 * 
 * 
 */
// 2024-Mar-15 i am thinking of exporting user sperately later.
const mongoose = require('mongoose');
const TCodeSchema = require('./tcode/TCodeSchema');
const UserSchema = require('./user/UserSchema');
const TCode = require("./tcode/TCode");
const User = require("./user/User");
let registered = false;

const tcodeModels = [];

function getTcode(tcode_name){
    
    for (let i = 0; i < tcodeModels.length; i++) {
        const tcode_model = tcodeModels[i];
        if(tcode_model.key == tcode_name){
            return tcode_model.value;
        }
    }
 return false;    
}
//--deprecated
function getUser(){
   return  getTcode("user");
}

function registerTcode(list=[]){
    // debugger;
    if(!registered) {registered = true;}
    else {return {ok:false,message : "already registered"}}
    
    for (let i = 0; i < list.length; i++) {    
        
        const tcode_name = list[i];
        if (mongoose.modelNames().includes(tcode_name)) {
            console.warn(`Model "${tcode_name}" already exists, skipping...`);
            return; // Skip registering this TCode
        }
        const mongoose_mdl =  mongoose.model(tcode_name, TCodeSchema);
        const tcode_mdl =  new TCode(mongoose_mdl);
        
        tcodeModels.push ({
            key : tcode_name,
            value : tcode_mdl
        });
    }
    //--push user
    const mongoose_user_mdl =  mongoose.model("User", UserSchema);
    const userObj = new User(mongoose_user_mdl);
    tcodeModels.push ({
        key : "user",
        value : userObj
    });
//   console.log("tcodeModels",tcodeModels);  
}

module.exports = {getTcode,registerTcode,getUser};