# TCode Module

## Introduction

TCode is a wrapper module for a Mongoose model which is created for TCodeSchema.

### Objective

The objective of this module is to provide a Mongoose Schema called "TCodeSchema" and wrap a model around it.

### Components

- **TCodeSchema**: This schema consists of 18 fields, with only 1 required (chapter field) for creating a new question. The other field, filename, is automatically added by the TCode model.
  
- **TCode Model**: This is a wrapper around the Mongoose model, providing functionality related to the TCodeSchema. Internally it uses mongoose models. To create a TCode model we feed the "tcode" string to mongoose.model to get a mongoose model and then that mongoose model is fed to TCode model which internally stores it as "this.mode".

- **{getTcode,registerTcode}**: it exports 2 functions {getTcode,registerTcode}. The registerTcode will take an array of string values and construct a TCode model (which wraps a mongoose model for TCodeSchema) for each string. These TCode models are saved in an internal array. The getTcode will get the required TCode object using tcode_name.
  

### What TCode Module Is Not

- This module needs that the models be registered before they can be used. If a model is not registered the getTcode will return false.
  
- Mongoose is only required within the TCode module to create models using TCodeSchema.

- This project will connect with database when is imported by the top-level api BUT we need .env file in this project and local mongodb connection for testing.
  
- The TCodeSchema includes a "version" field, indicating the current version. Minor changes in version are almost not allowed.
  
- The TCode model requires only 1 required fields (chapter), with the filename field added automatically by TCode.
  
- The filename field is expected to be unique in the table.
  
- Besides the 1 required fields and the addition of the 2nd filename field, the TCode module does not perform any additional checks. If you require checking, add it to your router code.
  
- It is recommended not to mix the router code with the TCode model code.

## TCodeSchema

```javascript
 =========================== TcodeSchema =======================
 1 : chapter ***REQUIRED: Number , required
 2 : exercise***REQUIRED: String , required
 3 : filename ***added  : String - required but auto added
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
```

## tcode function

```javascript

const mongoose = require('mongoose');
const TCodeSchema = require('./TCodeSchema');
const TCode = require("./TCode");
let registered = false;
const tcodeModels = [];

function getTcode(tcode_name){
    
    for (let i = 0; i < tcodeModels.length; i++) {
        
        const tcode_model = tcodeModels[i];
        if(tcode_model.key == tcode_name){
            return tcode_model.value;
        }
    }
 return false;    
}

function registerTcode(list=[]){
    if(!registered) {registered = true;}
    else {return {ok:false,message : "already registered"}}

    for (let i = 0; i < list.length; i++) {    
        
        const tcode_name = list[i];
        if (mongoose.modelNames().includes(tcode_name)) {
            console.warn(`Model "${tcode_name}" already exists, skipping...`);
            return; // Skip registering this TCode
        }
        const mongoose_mdl =  mongoose.model(tcode_name, TCodeSchema);
        const tcode_mdl =  new TCode(mongoose_mdl);
        
        tcodeModels.push ({
            key : tcode_name,
            value : tcode_mdl
        });
    }
}
module.exports = {getTcode,registerTcode};

```



## TCode API

```javascript

1:  mongooseModel() : Return the mongoose orignal Model
2:  getSyllabus() : return { ok: true,questions };
3:  update(question) : return { ok: true ,result : update_result};2
4:  get(id) : return { question, message: "success" ,ok:true};
5:  addQuestion(tcode,qData) : return {ok:true , question};
6:  where(query={}) : return { questions, ok: true };
7:  count(query={}) : return { count, ok: true };
8:  delete(id) : return {ok : true ,message : "Question deleted", status:200 };
9:  getUniqueChapters() : return { ok: true, chapters };
10: getUniqueExercises() : return { ok: true, exercises: exercises[0].exercises };
11: getByStatus(status="final") : return { ok: true, questions };
12: getByQuestionType(questionType="free") : return { ok: true, questions };
13: getChapter(chapterNumber) : return { ok: true, questions };
14: getExercise(exerciseString) : { ok: true, questions }

```

## NOTE: obtaining "User" using "getTcode" is deprecated and in future versions will be removed from "getTcode" , it will be available independently.