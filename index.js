require('dotenv').config();
const db = require("./mongo.js");
const mongoose = require('mongoose');
const cors = require('cors');
const express = require('express');
const RestfulExpressRouter = require('restful_express_router'); 
const jwt = require('jsonwebtoken');
const login = require('./middleware/login.js');

const User = require('./schemas/User.js');
const Tcode = require('./schemas/TCode.js');
const SlideTemplate = require('./schemas/slideTemplate.js');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 5000;
//////////////////////////////
const app = express();
app.use(cookieParser())
app.use(express.json());
const corsOptions = {
  origin: ['https://backoffice-navy.vercel.app', 'http://localhost:5173' , 'https://taleem.help'],
  methods: 'POST', // Specify the allowed HTTP methods, e.g., 'GET', 'POST', 'PUT', etc.
  allowedHeaders: ['Content-Type', 'Authorization'], // Specify the allowed headers
};
app.use(cors('*', corsOptions)); //working
//========================================Middlewhere
const logRequest = (req, res, next) => {
  // debugger;
  console.log(`Request Method: ${req.method}, URL: ${req.url}`);
  next(); // Proceed to the next middleware or route handler
};


// Middleware  for Auth
const authenticateJWT = (req, res, next) => {
  debugger;
    const token = req.headers['authorization']?.split(' ')[1]; 
    if (!token) {
        return res.sendStatus(403); // Forbidden if no token
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
          console.log(`Verified: ${req.method}, URL: ${req.url}`);
            return res.sendStatus(403); // Forbidden if token is not valid
        }
        
        req.user = user; // Save user info in request object
        next(); // Proceed to the next middleware or route handler
    });
};

///////////////////////////////////////////////

let restfulExpressRouter = new RestfulExpressRouter(User);

restfulExpressRouter.middlewareForList = [logRequest];
restfulExpressRouter.middlewareForGetById = [logRequest];
restfulExpressRouter.middlewareForUpdate = [authenticateJWT];

debugger;

restfulExpressRouter.addExtraRoute(
  {
    method: 'post',
    path: '/login',
    middlewares: [], // Optional: add any middlewares
    handler: async function(req, res) {
      debugger;
      const rez =  await login(req,res);
      return rez;
      // res.status(200).json({ message: 'This is an additional route (login)' });
    }
  }
);
app.use('/users', restfulExpressRouter.getRouter());


let restfulExpressRouterTcode = new RestfulExpressRouter(Tcode);
app.use('/tcode', restfulExpressRouterTcode.getRouter());

let restfulExpressRouterslideTemplate = new RestfulExpressRouter(SlideTemplate);
app.use('/slideTemplate', restfulExpressRouterslideTemplate.getRouter());


app.get('/', (req, res) => res.status(200).json({ message: "Welcome to ExpressRestRouter 0.0.1" }));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});