// const Presentation = require('../presentation/presentationSchema');
// const fbise9math = require('./q_manager/questionSchema/QuestionSchema');
// const convertEqsToSlide = require('./presentation_fn/convertEqsToSlide');

 async function slidesByTcode(tcode,id){
 let slides = null;
 let item = null;
    switch (tcode) {
        case 'pre':
        // const presentation = await Presentation.findById( id ).lean();
        // if (presentation){slides = presentation.slides; item = presentation}
        break;

        case 'fbise9math':
         debugger;
        const resp = await fbise9math.findById(id);
            if (resp){
            try{
            slides = resp.question.slides;
            item = resp.question;
                if (!slides){
                slides = [];
                // slides = await convertEqsToSlide(resp.question.eqs);
                }
            }catch(e){
               slides = []; //added on 17-nov-2023
            }
            }
        break;
    
        default:
        break;
    }
return {slides,item};
}
module.exports  = slidesByTcode;