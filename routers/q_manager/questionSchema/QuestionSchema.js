const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SlidesSchema = require('./slidesSchema');

///////////////////////////////////////////
const QuestionSchema = new Schema({
 
  chapter:{ // Chapter number 
	type:Number ,
	required:true , 
	},

exercise:{ 
type:String ,
required:true ,
},
//optional means if not given = 0 so we can use name instead
questionNo:{ 
type:Number ,
required:true ,
default:0
},
//optional means if not given = 0 so we can use name instead
part:{ 
type:Number ,
required:true ,
default:0
},
//if part==0 and questionNo==0 use name, even if it is not present it should not break the code since we can print "".
name:{  //same as above
type:String ,
required:false,
default : ''
},
sortOrder:{ 
type:Number ,
required:true ,
default:0
},
questionType:{ 
	type: String ,
enum: ['paid', 'login' , 'free'],
required: true,
default : 'paid'
},

status:{
	type: String ,
	required:true ,
enum: ['empty' ,'fill' ,'locked', 'final'],
required: true,
default : 'empty'
},
//--if this is free or paid content
free:{
	type: Boolean ,
	required:true ,
default : false 
},

filename: {
type: String,
required: true,
unique: true  //important to avoid dublication
},

filledBy: {
type: String,
required: false
},

slides: {
type: [SlidesSchema],
required: true,
default : []
},

teacherComments:{
type:String ,
required:false ,
},

adminComments:{ 
type:String ,
required:false ,
}

});

const fbise9math = mongoose.model('fbise9math', QuestionSchema);
const fbise10math = mongoose.model('fbise10math', QuestionSchema);
const fbise8math = mongoose.model('fbise8math', QuestionSchema);
const experimental = mongoose.model('experimental', QuestionSchema);
const fbise9english = mongoose.model('fbise9english', QuestionSchema);
const matrices = mongoose.model('matrices', QuestionSchema);

module.exports = {QuestionSchema,fbise9math,fbise10math,fbise8math,experimental,fbise9english,matrices};