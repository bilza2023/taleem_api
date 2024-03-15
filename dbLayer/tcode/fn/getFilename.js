



function getFilename(question,tcode){
    let filename = tcode;
  
    if (question.chapter){    
      filename +=  `_ch_${question.chapter}`
    }
    if (question.exercise){    
      filename +=  `_ex_${question.exercise}`
    }
    if (question.questionNo){    
      filename +=  `_q_${question.questionNo}`
    }
    if (question.part){    
      filename +=  `_pt_${question.part}`
    }
    if (question.name){    
      filename +=  `_n_${question.name}`
    }
    ////////////////////////////////////
    question.filename = filename;
    ////////////////////////////////////
  
    }
module.exports = getFilename;  