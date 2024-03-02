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

# Command Interface

## commands

```javascript
 
1    command : 'count':
        result = await theMdl.count(arg_array.query={});

2    command : 'chapterMap':
        result = await theMdl.chapterMap();

3    command : 'getExercise':
        result = await theMdl.getExercise(arg_array.exerciseName);
 
4    command : 'getChapter':
        result = await theMdl.getChapter(arg_array.chapterNumber);
    
4    command : 'getByQuestionType':
        result = await theMdl.getByQuestionType(arg_array.questionType);
 
5    command : 'getByStatus':
        result = await theMdl.getByStatus(arg_array.status);
    
6    command : 'where':
        result = await theMdl.where(arg_array.where);

7   command : 'getUniqueChapters':
        result = await theMdl.getUniqueChapters();
    

8    command : 'getUniqueExercises':
        result = await theMdl.getUniqueExercises();
 
 
9    command : 'delete':
        result = await theMdl.delete(arg_array.id);
 
 
10    command : 'get':
        result = await theMdl.delete(arg_array.id);
    
11    command : 'update':
        result = await theMdl.update(arg_array.question);
    
12    command : 'getSyllabus':
        result = await theMdl.getSyllabus();
  
    //--i have renamed addQuestion here
13    command : 'create':
        result = await theMdl.addQuestion(tcode,arg_array.questionData);

    
14    command : 'getExerciseByChapter':
        result = await theMdl.getExerciseByChapter(arg_array.chapterNumber, arg_array.exerciseName);
    
15    command : 'getChapterSyllabus':
        result = await theMdl.getChapterSyllabus(arg_array.chapterNumber);
    
16    command : 'getExerciseByChapterSyllabus':
        result = await theMdl.getExerciseByChapterSyllabus(arg_array.chapterNumber, arg_array.exerciseName);


```