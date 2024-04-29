const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SlidesSchema = require('./slidesSchema');
/**
 =========================== TcodeSchema =======================
 1 : chapter ***REQUIRED: Number , required
 2 : exercise***REQUIRED: String , required
 3 : filename ***added  : String - required but auto added /unique
 ==============================================================
 4 : questionNo         : Number , -
 5 : part               : Number , -
 6 : name               : String , -
 7 : questionType       : ['paid', 'login' , 'free'],  , "paid"
 8 : status             : ['empty' ,'fill' ,'locked', 'final'], "empty"
 9 : filledBy           : String, -
 10 : slides            : [Slides], -
 11 : tags              : [String]
 12 : sortOrder         : Number, 0

 // for now removed "version" we will see when required, replaced it with "tags"
 // also removed "schemaType" since this is the only schema I have we will se if required but for now this creates confusion.
 */
///////////////////////////////////////////
const TCodeSchema = new Schema({

//1
chapter:{ //===============> ** required 
          type:Number ,
          required:true , 
          },
//2          
exercise:{ //===============> ** required
        type:String ,
        required:true ,
        },
//3        
filename: { //===============> ** required
        type: String,
        required: true,
        unique: true 
      },
//4        
questionNo:{//same as above 
        type:Number ,
        required:false ,
        },
//5        
part:{  
        type:Number ,
        required:false ,
        },
//6
name:{  
      type:String ,
      required:false ,
      },

//7
questionType:{ 
        type: String ,
        enum: ['paid', 'login' , 'free'],
        required: true,
        default : 'paid'
      },
//8      
status:{
	  type: String ,
	  required:true , 
    enum: ['empty' ,'fill' ,'locked', 'final'],
    required: true,
    default : 'empty'
	  },
//9
	filledBy: {
        type: String,
        required: false
        },
//10	
slides: {
        type: [SlidesSchema],
        required: true,
        default : []
        },
//11        
tags: {
          type: [String],
          default: [],
          required: true
        },	
//12        
sortOrder: {
          type: Number,
          default: 0,
          required: true
        }	
  
});
//This is where we can change the table/collection name
// const MathFull = mongoose.model('MathFull', TCodeSchema);

module.exports = TCodeSchema;