require('dotenv').config();
const fs = require('fs');
const path = require('path');
const db = require("../mongoDb/mongo.js");
const addSyllabus = require("./syllabus/addSyllabus.js");
const partAndNotPartQs = require("./syllabus/partAndNotPartQs.js");
const {MathFull} = require("./models/mathFull.js");
// const backup = require('./syllabus/backup.js');
///////////////////////////////////////////////
///////////////////////////////////////////////
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Promise Rejection:', reason);
});
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send('Something went wrong!');
// });
db.once('open',()=> {
    console.log("MongoDb ===> connection established");
    //////////////////////////////////////////////////////
    console.log('\x1b[34m%s\x1b[0m' ,"Admin Panel Operations unsecure... ===>>");

    async function run(){
    try {
debugger;
    //  await addSyllabus();
        // const total_docs = await MathFull.countDocuments();
        // const total_docs = await MathFull.find({'partNo.part': 0});
        // const total_docs = await MathFull.countDocuments({'partNo.part': { $ne: 0 }});
        const backupFolder = './backup';
  const collection = await MathFull.find();

    // Create the backup folder if it doesn't exist
    if (!fs.existsSync(backupFolder)) {
      fs.mkdirSync(backupFolder, { recursive: true });
    }

    // Iterate through each item in the collection
    for (const item of collection) {
      // Define the file path for the item
      const filePath = path.join(backupFolder, `${item.filename}.json`);

      // Serialize the item to JSON using the MathFull schema
      const serializedItem = JSON.stringify({
  board: item.board,
  classNo: item.classNo,
  chapter: item.chapter,
  isSpecial: item.isSpecial,
  partNo: {
    exercise: item.partNo.exercise,
    questionNo: item.partNo.questionNo,
    part: item.partNo.part,
    name: item.partNo.name, // if isSpecial is true, this will be present
  },
  teacherComments: item.teacherComments,
  adminComments: item.adminComments,
  questionType: item.questionType,
  status: item.status,
  free: item.free,
  filename: item.filename,
  filledBy: item.filledBy,
  eqs: item.eqs,
  grid: item.grid,
}, null, 2);

      // Write the JSON data to the file
      fs.writeFileSync(filePath, serializedItem);

      console.log(`Backup complete for ${item.filename}`);
    }

    console.log('Backup process completed successfully.');


    } catch(error) {
        console.log("final error!",error);
    }
        process.exit(1);
    }

    run();
});

//////////////////////////////////////////////
async function backup() {
  try {
  const backupFolder = './backup';
  const collection = await MathFull.find();

    // Create the backup folder if it doesn't exist
    if (!fs.existsSync(backupFolder)) {
      fs.mkdirSync(backupFolder, { recursive: true });
    }

    // Iterate through each item in the collection
    for (const item of collection) {
      // Define the file path for the item
      const filePath = path.join(backupFolder, `${item.filename}.json`);

      // Serialize the item to JSON using the MathFull schema
      const serializedItem = JSON.stringify({
  board: item.board,
  classNo: item.classNo,
  chapter: item.chapter,
  isSpecial: item.isSpecial,
  partNo: {
    exercise: item.partNo.exercise,
    questionNo: item.partNo.questionNo,
    part: item.partNo.part,
    name: item.partNo.name, // if isSpecial is true, this will be present
  },
  teacherComments: item.teacherComments,
  adminComments: item.adminComments,
  questionType: item.questionType,
  status: item.status,
  free: item.free,
  filename: item.filename,
  filledBy: item.filledBy,
  eqs: item.eqs,
  grid: item.grid,
}, null, 2);

      // Write the JSON data to the file
      fs.writeFileSync(filePath, serializedItem);

      console.log(`Backup complete for ${item.filename}`);
    }

    console.log('Backup process completed successfully.');
  } catch (error) {
    console.error('Error while backing up collection:', error);
  }
}
