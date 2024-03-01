// const Presentation = require('../presentation/presentationSchema');
// const MathFullObj = require('../mathFull/MathFullObj');
// const convertEqsToSlide = require('./convertEqsToSlide');
const {fbise9math} = require('./q_manager/questionSchema/QuestionSchema');

 async function updateSlidesByTcode(tcode,presentation,id){
    debugger;
    try{
    const options = { new: false, upsert: false };
    
    switch (tcode) {
        case 'pre':
    // let p =  await Presentation.findByIdAndUpdate(presentation._id, presentation, options);
        break;

        case 'fbise9math':
        let q =  await fbise9math.findByIdAndUpdate(id,presentation, options);
        break;
    
        default:
        break;
    }
return true;
    }catch(e){
     return e;
    }
}
module.exports  = updateSlidesByTcode;