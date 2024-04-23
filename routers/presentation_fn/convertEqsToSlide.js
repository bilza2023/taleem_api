//@ts-nocheck


async function convertEqsToSlide(eqs){
const slide = {
            startTime : 0,
            endTime :0,
            type : 'Eqs',
            template : '',
            version : '0.0.0',
            items : [],    
            slideExtra : [],    
        }; 
///////////////////////////////////////////////////////
        for (let j = 0; j < eqs.length; j++) {
            const eq = eqs[j];
            const item =   {name: '' , content : '' , extra : {
                type : eq.type,
                step : eq.step,
                code : eq.code,
                startTime : eq.eqStartTime,
                endTime : 500,
                fsStartTime : null,
                fsEndTime : null,
                sp: eq.sp,
                fs: eq.fs,
        }}; //ends item and item.extra

        slide.items.push(item);
        }//for
const slides = [];   
slides.push(slide);   
return slides
}


module.exports = convertEqsToSlide;