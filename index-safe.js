require('dotenv').config();

const express = require('express');
const cors = require('cors');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const AWS = require('aws-sdk');
const cookieParser = require('cookie-parser');

const initPassport = require('./passport-config.js');
const { accessControl, ACTIONS, RESOURCES, ROLES } = require('./accessControl/accessControl.js');
const db = require("./dbLayer/mongo.js");
const GroupRouter = require('./dbLayer/groupRouter.js');
const tcodeRouter = require('./dbLayer/tcodeRouter.js');
// const signup = require('./controllers/signup.js');
// const login = require('./controllers/login.js');

const PORT = process.env.PORT || 5000;
const app = express();

// Middleware
app.use(cookieParser());
const corsOptions = {
  origin: ['https://backoffice-navy.vercel.app', 'http://localhost:5173', 'https://taleem.help'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize Passport
app.use(passport.initialize());
initPassport(passport);

// AWS S3 Configuration
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  endpoint: process.env.AWS_ENDPOINT,
});

// Multer configuration
const upload = multer({
  limits: {
    fileSize: 10 * 1024 * 1024, // Allow files up to 10MB in size
  },
});

// Helper functions
const uploadImageToSpace = async (file, tcode) => {
  const params = {
    Bucket: 'taleem-media',
    Key: `images/${tcode}/${file.originalname}`,
    Body: file.buffer,
    ACL: 'public-read',
    ContentType: 'image/jpeg',
  };

  try {
    const data = await s3.upload(params).promise();
    return data.Location;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

// Route middlewares
app.use("/tcode", passport.authenticate('jwt', { session: false }), tcodeRouter);
app.use("/group", passport.authenticate('jwt', { session: false }), GroupRouter);

// Authentication routes
// app.post('/signup', signup);
// app.post('/login', login);

// JWT-protected route example
// app.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
//   try {
//     let permission = await accessControl.can(req.user.role).execute(ACTIONS.READ).on(RESOURCES.COURSES);
//     if (permission.granted) {
//       res.status(200).json({ success: true, message: "Welcome to Taleem API", user: req.user });
//     } else {
//       res.status(403).json({ success: false, message: "You do not have permission to access this resource" });
//     }
//   } catch (error) {
//     res.status(500).json({ success: false, message: "An error occurred", error: error.message });
//   }
// });

// File upload routes
app.post('/upload_mp3', passport.authenticate('jwt', { session: false }), upload.single('mp3'), async (req, res) => {
  try {
    const mp3File = req.file;
    const { tcode, exercise } = req.body;

    if (!mp3File || !tcode || !exercise) {
      return res.status(400).json({ success: false, message: 'No MP3 file or relevant data uploaded' });
    }

    const params = {
      Bucket: 'taleem-media',
      Key: `mp3/${tcode}/${exercise}/${mp3File.originalname}`,
      Body: mp3File.buffer,
      ACL: 'public-read',
      ContentType: 'audio/mpeg',
    };

    await s3.upload(params).promise();
    res.status(200).json({ success: true, message: 'MP3 file uploaded successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to upload', error: error.message });
  }
});

app.post('/upload_image', passport.authenticate('jwt', { session: false }), upload.single('image'), async (req, res) => {
  try {
    const file = req.file;
    const { tcode } = req.body;
    if (!file || !tcode) {
      return res.status(400).json({ success: false, message: 'No image file (or tcode) uploaded' });
    }
    const fileUrl = await uploadImageToSpace(file, tcode);
    res.status(200).json({ success: true, message: 'Image file uploaded successfully', url: fileUrl });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
});

// Database connection and server start
db.once('open', () => {
  console.log("MongoDB connection established");
  app.listen(PORT, () => { console.log(`Server listening on port ${PORT}`); });
});

module.exports = app;