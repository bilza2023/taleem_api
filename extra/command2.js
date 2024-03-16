
const {getTcode} = require('../dbLayer');


async function command(req, res){
    try {
let result;
const tcode  = req.body.tcode;
if (!tcode) {return  res.status(400).json({ message: "missing tcode" }); }

const command  = req.body.command;
if (!command) {return  res.status(400).json({ message: "missing command" }); }

const arg_array  = req.body.arg_array;
if (!arg_array) {return  res.status(400).json({ message: "missing arg_array" }); }

const theMdl = await getTcode(tcode);
// const theMdl = await getModel(tcode);
if(!theMdl) { return res.status(404).json({ ok:false, message: "model not found" });}
// debugger;
 switch (command) {
    case 'count':
        result = await theMdl.count(arg_array.query={});
    break;

    case 'chapterMap':
        result = await theMdl.chapterMap();
    break;

    case 'getExercise':
        result = await theMdl.getExercise(arg_array.exerciseName);
    break;
    case 'getChapter':
        result = await theMdl.getChapter(arg_array.chapterNumber);
    break;

    case 'getByQuestionType':
        result = await theMdl.getByQuestionType(arg_array.questionType);
    break;

    case 'getByStatus':
        result = await theMdl.getByStatus(arg_array.status);
    break;
    
    case 'where':
        result = await theMdl.where(arg_array.query);
    break;
    
    case 'getUniqueChapters':
        result = await theMdl.getUniqueChapters();
    break;
    
    case 'getUniqueExercises':
        result = await theMdl.getUniqueExercises();
    break;

    case 'delete':
        result = await theMdl.delete(arg_array.id);
    break;
    
    case 'get':
        result = await theMdl.get(arg_array.id);
    break;
    
    case 'update':
        result = await theMdl.update(arg_array.question);
    break;
    
    case 'getSyllabus':
        result = await theMdl.getSyllabus();
    break;

    //--i have renamed addQuestion here
    case 'create':
        result = await theMdl.addQuestion(tcode,arg_array.questionData);
    break;
    
    case 'getExerciseByChapter':
        result = await theMdl.getExerciseByChapter(arg_array.chapterNumber, arg_array.exerciseName);
    break;
    
    case 'getChapterSyllabus':
        result = await theMdl.getChapterSyllabus(arg_array.chapterNumber);
    break;
    
    case 'getExerciseByChapterSyllabus':
        result = await theMdl.getExerciseByChapterSyllabus(arg_array.chapterNumber, arg_array.exerciseName);
    break;
    
    case 'slidesState':
        result = await theMdl.slidesState(arg_array.chapterNumber, arg_array.exerciseName);
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



module.exports = command;