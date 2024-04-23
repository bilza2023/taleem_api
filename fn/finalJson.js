
//ok is always true ,status = 200
//message if empth is "success"

function finalJson(data,args=[],res){
    try{
////////////// Finds args including tcode ///////////////////////    
    for (let i = 0; i < args.length; i++) {
        const arg = args[i];
        if (!data.hasOwnProperty(arg)) {
            return res.status(500).json({ ok: false, message: `could not find the required outgoing data: ${arg}` });
        }
    }
////////////////////////////////////////////////////////////////
 //the data already has all that is required we are just checking if it exists 
    return  res.status(200).json({ ok:false , message: 'success',data });
    }catch(error){
        return  res.status(500).json({ ok:false , message: 'failed final response'});
    }
}


module.exports = finalJson;