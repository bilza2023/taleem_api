
const getModel = require('./getModel.js');

async function addQuestion(qData){
try{
 debugger;
   
    // 3: questionType
    qData.questionType = 'paid';
    // 4: status 
    qData.status = 'empty'; 
      // 6: chapter 
    qData.chapter = parseInt(qData.chapter);
    if(!shouldBePositiveNumber(qData.chapter)){
        return {ok:false, message:'Chapter must be a positive number'};
    }

   //7 : check name for url safe
    if(qData.name && qData.name !== ''){
         qData.name = qData.name.replace(/ /g, '_');
    }
    // 8 : exercise
    if(!checkString(qData.exercise)){
        return {ok:false, message:'Exercise must be a string'};
    }
    // 9 : questionNo //can be 0 not nec to be positive
    if(! Number.isInteger(qData.questionNo)){
        return {ok:false, message:'Question No must be a  number'};
    }
    // 10 : part //can be 0 not nec to be positive
    if(!Number.isInteger(qData.part)){
        return {ok:false, message:'Part must be a  number'};
    }

//==checking done now prep the question
     const newQuestion =  { 
     //no need to place qData.tcode here in question
        // board : qData.board,
        // classNo : qData.classNo,
        chapter : qData.chapter,
        exercise : qData.exercise,
        questionNo : qData.questionNo ,
        part: qData.part,
        name : qData.name,
        questionType : 'paid',
        status : 'empty',
        sortOrder : 0,
        filledBy :'',
        filename : '',
        slides : [],
        teacherComments:'',
        adminComments:''
    };
    debugger;

    getFilename(newQuestion,qData.tcode) //last step no 11

//===now save question in appropriate collection
  const tcode  = qData.tcode; 
  
  if (!tcode) {return  {ok:false, message:'missing tcode'}};
  const theMdl = await getModel(tcode);
  if(!theMdl) { return res.status(404).json({ ok:false, message: "tcode not found" });}
 const newQ = await theMdl.create(newQuestion);
      return {ok:true , question:newQ};

}catch(e){
    // console.log(e);
    if(e.code == 11000){
    return {ok:false,message:'Question may already exist'};
    }else{
    return {ok:false,message:e.message};
    }
}

}

module.exports = addQuestion;
////////////////////////////==hELPER fUNCTIONS

function checkString(name){
    if (name === null || name === undefined || name.trim() === '') {
        return false; // Special Questions must have a name
    }
    return true; // Name is valid
}
//so simple if has name attach it if not dont. no matter even if question no and part still attach them . every syllabus page layout should know this rule
function getFilename(question,tcode){
if (question.name &&  question.name !== ''){    
    //even if there is a name the questionNo and part ==0
    question.filename = `${tcode}_ch_${question.chapter}_ex_${question.exercise}_q_${question.questionNo}_pt_${question.part}_${question.name}`;
    
}else {
    question.filename = `${tcode}_ch_${question.chapter}_ex_${question.exercise}_q_${question.questionNo}_pt_${question.part}`;
 }
}


function shouldBePositiveNumber(value) {
    return Number.isInteger(value) && value > 0;
}
