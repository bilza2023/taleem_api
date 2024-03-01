# Taleem API

This api provides api for dealing with tcode and user modules.

## The API

```javascript
//===========================Taleem API=====================

1: /signup : {email , password} => {ok:true,  message: "your account has been created" }

2: /login : {email , password} => {ok:true, message: "Login successful", token: token , email} will also set the Authorization token in header
//==========================================================


//===========================tcode Router=====================

1: /tcode/syllabus : 
            {tcode}  => { items, message: "success",ok:true  }
2: /tcode/read : 
            {tcode,id} => {item}
3: /tcode/delete : 
            {tcode,id} => {ok:true, message : 'question deleted',delete_result}
4: /tcode/update : 
            {tcode,question} => {ok:true, message: 'success' }
5: /tcode/create : 
            {tcode,question} => { ok:true, message: 'success' }
6: /tcode/where : 
            {tcode,query?} => { ok: true , items }
7: /tcode/count : 
            {tcode,query?} => { ok: true , count }
8: /tcode/getUniqueChapters : 
            {tcode} => { ok: true, exercises}
9: /tcode/getUniqueExercises : 
            {tcode} => { ok: true, exercises}
10: /tcode/getByStatus : 
            {tcode,status} => { ok: true, items }
11: /tcode/getByQuestionType : 
            {tcode,questionType} => { ok: true, items }
12: /tcode/getChapter : 
            {tcode,chapterNumber} => { ok: true, items }
13: /tcode/getExercise : 
            {tcode,exerciseName} => { ok: true, items }
 
//==========================================================
```