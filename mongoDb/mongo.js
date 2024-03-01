require('dotenv').config();
const mongoose = require('mongoose');

//.......................................................
mongoose.connect( process.env.MONGO_URI , { useNewUrlParser: true});
// mongoose.connect( process.env.MONGO_DB_LOCAL_URL , { useNewUrlParser: true});

const db = mongoose.connection;
db.on('error',(error)=> {throw new Error(error)} );


module.exports = db;

