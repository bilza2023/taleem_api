require('dotenv').config();

const express  =require('express');
const cors = require('cors');
// const mongoose = require('mongoose');
const db = require("./mongoDb/mongo.js");
const DB_NAME = "fbise9math"
const {getTcode,registerTcode} = require('tcode_module');
const signup = require('./controllers/signup.js')
const login = require('./controllers/login.js')
const change_password = require('./controllers/change_password.js')
/////////////////////////////////////////////----->>>>
const tcodeRouter = require('./controllers_Tcode/tcodeRouter.js');
////////////////////////////////////////////////
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 5000;
////////////////////////////////////////////////////
// debugger;
const app = express()
app.use(cookieParser());
//..
app.use(express.json());
app.use(cors( )); //working
app.use(express.urlencoded({ extended: true }));

//.. Route middlewares--/////////////////////////////////////
app.use("/tcode",tcodeRouter);

///////////////////////////Routes////////////////////////
app.post('/signup',async (req,res)=>{
    debugger;
    return signup(req,res);
});
///////////////////////////Routes////////////////////////
app.post('/login',async (req,res)=>{
    debugger;
    return login(req,res);
});
///////////////////////////Routes////////////////////////
// app.post('/change_password',async (req,res)=>{
//     debugger;
//     return change_password(req,res);
// });
///////////////////////////Routes////////////////////////
app.get('/', async (req, res) =>{
res.status(500).json({success :true ,  message : "Welcome to Taleem API"});
});
////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
db.once('open',()=> {
    // debugger;
    console.log("MongoDb ===> connection established")
    registerTcode([ DB_NAME , "testtable"]);
    app.listen(PORT, ()=>{console.log(`listening on port ${PORT}`)});
});
///////////////////////////////////////////////////////////////////////






