
const runCommand = require('./fn/runCommand');

/////////////////////////////////////////////////////////////////
async function command(req, res){
    try {

const tcode  = req.body.tcode;
if (!tcode) {return  res.status(400).json({ message: "missing tcode" }); }

const command  = req.body.command;
if (!command) {return  res.status(400).json({ message: "missing command" }); }



//////////////////////////////////////////////////////////////////////////
 switch (command) {

    case 'get':
        await runCommand(req,res,'get',['id','tcode'],['item']);
    break;
    
    case 'update':
        await runCommand(req,res,'update',['question','tcode'],['item']);
    break;
    
    case 'create':
        await runCommand(req,res,'create',['question','tcode'],['item']);
    break;
    
 ////////////////////////////////////////////////////////////////////
 ////////////////////////////////////////////////////////////////////
    default:
        return res.status(500).json({message:"command not found"});
 }

} catch(error) {
    return res.status(500).json({ok:false,message : 'command failed'  });
}

}//fn ends



//////////////////////////////////////////////////////////////////
module.exports = command;
//////////////////////////////////////////////////////////////////
