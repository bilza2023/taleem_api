
// const {getTcode} = require('./dbLayer');
const getIncomming = require('./fn/getIncomming');
const getMdl = require('./fn/getMdl');
const finalJson = require('./fn/finalJson');
const TCodeSchema = require('./dbLayer/tcode/TCodeSchema');
const mongoose = require('mongoose');


/////////////////////////////////////////////////////////////////
async function command(req, res){
    try {

let result;
const tcode  = req.body.tcode;
if (!tcode) {return  res.status(400).json({ message: "missing tcode" }); }

const command  = req.body.command;
if (!command) {return  res.status(400).json({ message: "missing command" }); }



//////////////////////////////////////////////////////////////////////////
 switch (command) {

    case 'get':
        
        result = await runCommand(req,res,['id','tcode'],['question']);
    break;
    
 ////////////////////////////////////////////////////////////////////
 ////////////////////////////////////////////////////////////////////
    default:
        result =  {ok:false , message:"command not found"}
    break;
 }

    if(result.ok){
        return res.status(200).json(result);
    }else{
        return res.status(500).json(result);
    }

} catch(error) {
    return res.status(400).json({ok:false,message : 'unknown error!'  });
}

}//fn ends



//////////////////////////////////////////////////////////////////
module.exports = command;
//////////////////////////////////////////////////////////////////
async function runCommand(req,res,incomming=[],outgoing=[]){

    try{ debugger;
        // accept tcode,id return question
      //////////////////===> check incomming -1 <======/////////////////////////////
        const data = await getIncomming(req,incomming);
        await getMdl(data);
        //////////////////===> The Process-2 <======//////////////////////////////////
        //TCode is not used here since it is simple.
        const mongoose_mdl =  mongoose.model(data.tcode, TCodeSchema);
        const question = await mongoose_mdl.findById(data.id.toString()).lean();
      //////////////////===> final json-3 <======//////////////////////////////////
          return finalJson({question},outgoing,res);
        // }
        //////////////////////////////////////////////////////////////////////////
          } catch (error) {
            return res.status(500).json({message:error.message , error})
          }
}