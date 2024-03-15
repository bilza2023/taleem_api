

function getIncomming(req,args=[]){
    debugger;
    const incomming_data = {ok:true , message : ""};
    
    for (let i = 0; i < args.length; i++) {
        const arg = args[i];
        try{
            incomming_data[arg] = req.body[arg];
        }catch(error){
         return {ok:false , message : `could not find the rquired incomming data : ${arg}`}
        }
    }
    return incomming_data;
}

module.exports = getIncomming;