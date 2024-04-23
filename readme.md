# Taleem API

This api provides api for dealing with tcode and user modules.

## The API

```javascript
//===========================Taleem API=====================

1: /signup : {email , password} => {ok:true,  message: "your account has been created" }

2: /login : {email , password} => {ok:true, message: "Login successful", token: token , email} will also set the Authorization token in header
//==========================================================


# Command Interface

## commands

//===========================Command Interface=====================

    Command :'get': (['id','tcode'],['item']);
    
    Command :'update': ('update',['question','tcode'],['item']);
    
    Command :'create': ('create',['question','tcode'],['item']);
    
    Command :'getSyllabus': (['tcode'],['syllabus']);
    
    Command :'where': (['query','tcode'],['items']);
    
    Command :'count': (['query','tcode'],['items']);
    
    Command :'delete': (['id','tcode'],['delete_result']);
    
    Command :'getUniqueChapters': (['tcode'],['chapters']);
    
    Command :'getUniqueExercises': (['tcode'],['exercises']);
    
    Command :'getByStatus': (['status','tcode'],['items']);
    
    Command :'getByQuestionType': (['questionType','tcode'],['items']);
    
    Command :'getChapter': (['chapterNumber','tcode'],['items']);
    
    Command :'getExercise': (['exerciseName','tcode'],['items']);
    
    Command :'chapterMap': (['tcode'],['chapterMap']);
    
    Command :'getExerciseByChapter': (['chapterNumber', 'exerciseName','tcode'],['exercise']);
    
    Command :'getChapterSyllabus': (['chapterNumber','tcode'],['syllabus']);
    
    Command :'getExerciseByChapterSyllabus': (['chapterNumber','exerciseName','tcode'],['syllabus']);
    
    Command :'slidesState': (['chapterNumber','exerciseName','tcode'],['items']);
    
    
//==========================================================
```



