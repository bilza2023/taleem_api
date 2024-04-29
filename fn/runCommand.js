

const getIncomming = require('../fn/getIncomming');
const getMdl = require('../fn/getMdl');
const finalJson = require('../fn/finalJson');

////////////////////////////////////////////////////////////////////
async function runCommand(req,res,command,incomming=[],outgoing=[]){

try{ 
    // debugger;
    //////////////////===> check incomming-1 <======/////////////////////////////
    const incomming_data = await getIncomming(req,incomming);
    await getMdl(incomming_data);

    //////////////////===> The Process-2 <======//////////////////////////////////
    // the operation should always return an object and the outgoing items are insdie this object data
    const data = await incomming_data.theMdl[command](incomming_data);


    //////////////////===> final json-3 <======//////////////////////////////////
        return finalJson(data,outgoing,res);
    //////////////////////////////////////////////////////////////////////////

    
    } catch (error) {
        return res.status(500).json({message:error.message , error})
    }
}


module.exports = runCommand;