# Taleem API

This api provides api for dealing with tcode and user modules.

## The API

```javascript
//===========================Taleem API=====================

1: /signup : {email , password} => {ok:true,  message: "your account has been created" }

2: /login : {email , password} => {ok:true, message: "Login successful", token: token , email} will also set the Authorization token in header
//==========================================================


//===========================tcode Router=====================

1: /tcode/syllabus : {tcode}  => { items, message: "success",ok:true  }
2: /tcode/read : {tcode,id} => {item}
3: /tcode/delete : {tcode,id} => {ok:true, message : 'question deleted',delete_result}
4: /tcode/update : {tcode,question} => {ok:true, message: 'success' }
5: /tcode/create : {tcode,question} => { ok:true, message: 'success' }




//==========================================================
```