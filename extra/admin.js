require('dotenv').config();
const fs = require('fs');
const path = require('path');
const db = require("../mongoDb/mongo.js");

const MathFullObj = require("./mathFull/MathFullObj.js");
const {MathFull} = require("./mathFull/mathFull.js");
const addSyllabus = require('./syllabus/addSyllabus.js');
///////////////////////////////////////////////
///////////////////////////////////////////////
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Promise Rejection:', reason);
});


db.once('open',()=> {
    console.log("MongoDb ===> connection established");
    //////////////////////////////////////////////////////
    console.log('\x1b[34m%s\x1b[0m' ,"Admin Panel Operations unsecure... ===>>");

    async function run(){
    try {
// debugger;
//    const filledBy = await MathFullObj.Where({filledBy: 'bils32611@gmail.com'});
debugger;
const specialQ = await MathFullObj.CreateQSpecial("eqs","FBISE",9,1,"testing");
    // console.log("filledBy" , filledBy);
//    const getQ = await MathFullObj.Get('65241c3194cd0f67ca0a9d31');
    // console.log("getQ" , getQ);
//    const updt = await MathFullObj.Update();
    // console.log("updt" , updt);
    //  await addSyllabus();
        // await MathFull.deleteMany({});
        // const r = await MathFullObj.CreateQReg('eqs','FBISE',9,2,"1.1",1,0);

//     const countEqsNotEmpty = await MathFullObj.Count({
//     'eqs': { $exists: true, $not: { $size: 0 } }
//   });
//             console.log('countEqsNotEmpty:', countEqsNotEmpty);

//   const countGridNotEmpty = await MathFullObj.Count({
//     'grid.rows': { $exists: true, $not: { $size: 0 } }
//   });
//             console.log('countGridNotEmpty', countGridNotEmpty);
//////////////////////////////////////////////
        // await getCounts().then((counts) => {
        //     console.log('Unlocked count:', counts.unlockedCount);
        //     console.log('Fill count:', counts.fillCount);
        //     console.log('Locked count:', counts.lockedCount);
        //     console.log('Final count:', counts.finalCount);
        //     console.log('Free count:', counts.freeCount);
        //     console.log('Not Free count:', counts.notFreeCount);
        //     console.log('Eqs count:', counts.eqsCount);
        //     console.log('Grid count:', counts.gridCount);
        //     });
        console.log("done..");

    } catch(error) {
        console.log("final error!",error);
    }
        process.exit(1);
    }

    run();
});


const getCounts = async () => {
   const unlockedCount = await MathFullObj.Count({ status: 'unlocked' });
  const fillCount = await MathFullObj.Count({ status: 'fill' });
  const lockedCount = await MathFullObj.Count({ status: 'locked' });
  const finalCount = await MathFullObj.Count({ status: 'final' });
  const freeCount = await MathFullObj.Count({ free: true });
  const notFreeCount = await MathFullObj.Count({ free: false });
  const eqsCount = await MathFullObj.Count({ questionType: 'eqs' });
  const gridCount = await MathFullObj.Count({ questionType: 'grid' });

  return {
    unlockedCount,
    fillCount,
    lockedCount,
    finalCount,
    freeCount,
    notFreeCount,
    eqsCount,
    gridCount,
  };
};

// Usage
