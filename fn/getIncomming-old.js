

const {getTcode} = require('../dbLayer');
const TaleemError = require('./taleemError');


async function getIncomming(req,res,args=[]){
    try{
    // debugger;
    const data = {};

////////////// Finds args including tcode ///////////////////////    
    for (let i = 0; i < args.length; i++) {
        const arg = args[i];
        try{
            data[arg] = req.body[arg];
        }catch(error){
         return res.status(500).json({ok:false, message : `could not find the rquired incomming data : ${arg}` });
        }
    }
////////////////////////////////////////////////////////////////
    //==> every function call must have tcode
    const theMdl = await getTcode(data.tcode);
    if(!theMdl) { 
        return res.status(404).json({ ok:false, message: 'tcode not found' });
    }else {
        data.theMdl = theMdl;
        data.ok = true;
        data.message = 'success';
        return data;
    }
////////////////////////////////////////////////////////////////////
    }catch(error){
        return res.status(500).json({ error, message: 'failed collecting incomming data' });
    }
}

module.exports = getIncomming;