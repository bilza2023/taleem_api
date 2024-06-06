const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SlidesSchema = require('./slidesSchema');
/**
 =========================== TcodeSchema =======================
 1:  tcode **REQUIRED : String, "general"       
 2 : chapter ***REQUIRED: Number , required
 3 : exercise***REQUIRED: String , required
 4 : filename ***added  : String - required but auto added /unique
 ==============================================================
 5 : questionNo         : Number , -
 6 : part               : Number , -
 7 : name               : String , -
 8 : questionType       : ['paid', 'login' , 'free'],  , "paid"
 9 : status             : ['empty' ,'fill' ,'locked', 'final'], "empty"
 10 : filledBy           : String, -
 11 : slides            : [Slides], -
 12 : tags              : [String]
 13 : sortOrder         : Number, 0
 14 : teacherComments   : String, ""
 15 : adminComments     : String, ""
 16 : soundFileType     : String, 'opus

 // for now removed "version" we will see when required, replaced it with "tags"
 // also removed "schemaType" since this is the only schema I have we will se if required but for now this creates confusion.
 */
///////////////////////////////////////////
const TCodeSchema = new Schema({

//1     tcode = table code ===>>> category    
tcode: {
        type: String,
        default: "general",
        required: true
      },	
//2
chapter:{ //===============> ** required 
          type:Number ,
          required:true , 
          },
//3          
exercise:{ //===============> ** required
        type:String ,
        required:true ,
        },
//4        
filename: { //===============> ** required
        type: String,
        required: true,
        unique: true 
      },
//5        
questionNo:{//same as above 
        type:Number ,
        required:false ,
        },
//6        
part:{  
        type:Number ,
        required:false ,
        },
//7
name:{  
      type:String ,
      required:false ,
      },

//8
questionType:{ 
        type: String ,
        enum: ['paid', 'login' , 'free'],
        required: true,
        default : 'paid'
      },
//9      
status:{
	  type: String ,
	  required:true , 
    enum: ['empty' ,'filled' ,'fill','locked', 'final'],
    required: true,
    default : 'empty'
	  },
//10
	filledBy: {
        type: String,
        required: false
        },
//11	
slides: {
        type: [SlidesSchema],
        required: true,
        default : []
        },
//12        
tags: {
          type: [String],
          default: [],
          required: true
        },	
//13        
sortOrder: {
          type: Number,
          default: 0,
          required: true
        },	
//14        
teacherComments: {
          type: String,
          default: "",
          required: false
        },	
//15        
adminComments: {
          type: String,
          default: "",
          required: false
        },
//16        
soundFileType: {
          type: String,
          default: "opus",
          required: true
        }
  
});
//This is where we can change the table/collection name
// const MathFull = mongoose.model('MathFull', TCodeSchema);

module.exports = TCodeSchema;