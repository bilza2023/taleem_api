require('dotenv').config();

const express = require('express');
const cors = require('cors');

const multer = require('multer');
const AWS = require('aws-sdk');


const db = require("./dbLayer/mongo.js");
const upload = multer({
  limits: {
    fileSize: 10 * 1024 * 1024, // Allow files up to 10MB in size
  },
});

////////////////////////////////////////////////////////////
// const GroupRouter = require('./dbLayer/groupRouter.js')
const signup = require('./controllers/signup.js')
const login = require('./controllers/login.js')
// const change_password = require('./controllers/change_password.js')
/////////////////////////////////////////////----->>>>
const tcodeRouter = require('./dbLayer/tcodeRouter.js');
////////////////////////////////////////////////
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 5000;
////////////////////////////////////////////////////
// debugger;
const app = express()
app.use(cookieParser());
//..
const corsOptions = {
  origin: ['https://backoffice-navy.vercel.app', 'http://localhost:5173' , 'https://taleem.help'],
  methods: 'POST', // Specify the allowed HTTP methods, e.g., 'GET', 'POST', 'PUT', etc.
  allowedHeaders: ['Content-Type', 'Authorization'], // Specify the allowed headers
};
app.use(cors('*', corsOptions)); //working
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//.. Route middlewares--/////////////////////////////////////
app.use("/tcode", tcodeRouter);
// app.use("/group", GroupRouter);

///////////////////////////Routes////////////////////////
app.post('/signup', async (req, res) => {
  // debugger;
  return signup(req, res);
});
///////////////////////////Routes////////////////////////
app.post('/login', async (req, res) => {
  // debugger;
  return login(req, res);
});
///////////////////////////Routes////////////////////////
// app.post('/change_password',async (req,res)=>{
//     debugger;
//     return change_password(req,res);
// });
///////////////////////////Routes////////////////////////
app.get('/', async (req, res) => {
  res.status(200).json({ success: true, message: "Welcome to Taleem API" });
});
////////////////////////////////////////////////////////
const mp3_exists = async (params) => {
  try {
    debugger;
    const data = await s3.listObjectsV2(params).promise();
    return data.Contents.map((obj) => obj.Key);
  } catch (error) {
    console.error('Error listing objects:', error);
    throw error;
  }
};

app.post('/upload_mp3', upload.single('mp3'), async (req, res) => {

  try {
    const mp3File = req.file;
    const tcode = req.body.tcode;
    const exercise = req.body.exercise;

    if (!mp3File || !tcode || !exercise) {
      return res.status(400).json({ success: false, message: 'No MP3 file or relevant data uploaded' });
    }

    ///////////////////////////////////////////////////
    const params = {
      Bucket: 'taleem-media',
      Key: `mp3/${tcode}/${exercise}/${mp3File.originalname}`,
      Body: mp3File.buffer,
      ACL: 'public-read',
      ContentType: 'audio/mpeg',
    };

    const data = await s3.upload(params).promise();
    res.status(200).json({ success: true, message: 'MP3 file uploaded successfully' });

    ////////////////////////////////////////////////////
  } catch (error) {
    res.status(500).json({ success: true, message: 'Failed to upload' });
  }
});

app.post('/upload_image', upload.single('image'), async (req, res) => {
  try {
    const file = req.file;
    const tcode = req.body.tcode;
    if (!file || !tcode) {
      return res.status(400).json({ success: false, message: 'No image file (or tcode) uploaded' });
    }
    const fileUrl = await uploadImageToSpace(file, tcode);
    res.status(200).json({ success: true, message: 'Image file uploaded successfully', url: fileUrl });
  } catch (error) {
    // console.error('Error uploading image:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});


///////////////////////////////////////////////////////////////////////
db.once('open', () => {
  console.log("MongoDb ===> connection established")
  app.listen(PORT, () => { console.log(`listening on port ${PORT}`) });
});
///////////////////////////////////////////////////////////////////////

module.exports = app;