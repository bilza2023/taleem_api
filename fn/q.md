I have a problem in my svelte-express-app .
I send back data including "slideExtra" from the front end but at the backend all the data gets recieved except "slideExtra" field. keep in mind that "slideExtra" field has recently been added to Mongoose Schema as "mixed type" . 

This is the front-end function upto this point the slides has "slideExtra" field

export default async function saveFinal(slides,tcode,id,item){
  
//--first slide start time = 0;
if (slides && slides.length > 0){
  slides[0].startTime = 0;
  updateSlideStartTimes(slides);
}
const question = item;
question.slides = slides;
debugger; 
///////////////////////////////////////////////////////////////////
  const resp = await ajaxPost( `${BASE_URL}/command` , { command : "update" ,tcode,	question } );

  if(resp.ok){
    toast.push('saved');}
    else {toast.push('failed to saved');
  }
}




Here is the Mongoose Schema at backend-api

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

////////////////////////
const ItemSchema = new Schema({
 name:{ 
	type:String ,
	required:false ,
	},
 content:{ 
	type:String ,
	required:false ,
	},
 showAt:{ 
	type:Number ,
	required:true ,
	default:0
	},
 extra:{ 
 	type: Schema.Types.Mixed,
    required: true,
    default: {},
    },
 arr:{ 
 	type: [Schema.Types.Mixed],
    required: true,
    default: [],
    }
});

const SlidesSchema = new Schema({
    startTime:{ 
	type:Number ,
	required:false ,
	},
    endTime:{ 
	type:Number ,
	required:false ,
	},
    type:{ 
	type:String ,
	required:false ,
	},
    template:{ 
	type:String ,
	required:true ,
	default : ''
	},//  
    items:{ 
	type:[ItemSchema] ,
	required:true ,
	default : []
	},
    slideExtra:{ //==new
		type: Schema.Types.Mixed,
		required: true,
		default: {},
	}, 
    
});


module.exports = SlidesSchema;


Here is the route that catches this api-call
app.post("/command", async function (req, res) {
  debugger;
    return await command(req,res);
});

and here is the command

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
    
    case 'getSyllabus':
        debugger;
        await runCommand(req,res,'getSyllabus',['tcode'],['syllabus']);
    break;
    
    case 'where':
        await runCommand(req,res,'where',['query','tcode'],['items']);
    break;
    
    case 'count':
        await runCommand(req,res,'count',['query','tcode'],['items']);
    break;
    
    case 'delete':
        await runCommand(req,res,'delete',['id','tcode'],['delete_result']);
    break;
    
    case 'getUniqueChapters':
        await runCommand(req,res,'getUniqueChapters',['tcode'],['chapters']);
    break;
    
    case 'getUniqueExercises':
        await runCommand(req,res,'getUniqueExercises',['tcode'],['exercises']);
    break;
    
    case 'getByStatus':
        await runCommand(req,res,'getByStatus',['status','tcode'],['items']);
    break;
    
    case 'getByQuestionType':
        await runCommand(req,res,'getByQuestionType',['questionType','tcode'],['items']);
    break;
    
    case 'getChapter':
        await runCommand(req,res,'getChapter',['chapterNumber','tcode'],['items']);
    break;
    
    case 'getExercise':
        await runCommand(req,res,'getExercise',['exerciseName','tcode'],['items']);
    break;
    
    case 'chapterMap':
        await runCommand(req,res,'chapterMap',['tcode'],['chapterMap']);
    break;
    
    case 'getExerciseByChapter':
        await runCommand(req,res,'getExerciseByChapter',['chapterNumber', 'exerciseName','tcode'],['exercise']);
    break;
    
    case 'getChapterSyllabus':
        await runCommand(req,res,'getChapterSyllabus',['chapterNumber','tcode'],['syllabus']);
    break;
    
    case 'getExerciseByChapterSyllabus':
        await runCommand(req,res,'getExerciseByChapterSyllabus',['chapterNumber','exerciseName','tcode'],['syllabus']);
    break;
    
    
    case 'slidesState':
        await runCommand(req,res,'slidesState',['chapterNumber','exerciseName','tcode'],['items']);
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


and finally here we get the data from req in run command


const getIncomming = require('../fn/getIncomming');
const getMdl = require('../fn/getMdl');
const finalJson = require('../fn/finalJson');

////////////////////////////////////////////////////////////////////
async function runCommand(req,res,command,incomming=[],outgoing=[]){

try{ 
    
    //////////////////===> check incomming-1 <======/////////////////////////////
    const incomming_data = await getIncomming(req,incomming);
    debugger;
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
