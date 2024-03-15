

function prepResp(ok=false,status=500,message='unknow final error',error=null){

        return {ok,status,message,error};

}

module.exports = prepResp;