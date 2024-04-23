
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

}



//////////////////////////////////////////////////////////////////
module.exports = command;
//////////////////////////////////////////////////////////////////
