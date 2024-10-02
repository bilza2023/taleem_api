require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require("./mongo.js");
const RestfulRouter = require('restful_express_router'); 
const User = require('./schemas/User.js');
////////////////////////////////////////////////////////////
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

///////////////////////////Routes////////////////////////
app.use("/tcode", tcodeRouter);

let restfulRouter = new RestfulRouter(User);

// Use the RESTful router for the '/users' endpoint
app.use('/users', restfulRouter.getRouter());

app.post('/signup', async (req, res) => {
  return signup(req, res);
});
///////////////////////////Routes////////////////////////
app.post('/login', async (req, res) => {
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
///////////////////////////////////////////////////////////////////////
db.once('open', () => {
  console.log("MongoDb ===> connection established")
  app.listen(PORT, () => { console.log(`listening on port ${PORT}`) });
});
///////////////////////////////////////////////////////////////////////

module.exports = app;