
# Question Schema

### 8-Jan-2024

- The question schema is a universal schema for all the questions of any subject of any board.

- Every question has slides and each slide has the same data-type thus we can use it for math, english , islamiat any thing. We may have to add new slides.

- At the front-end we can use different techniuqes to read questions, for example in english questions the exercise field may not be used so dont use it.

- Using models.js we can export as many Models as we want for different tables.

- The layout of the Schema = 

        -   Question Schema
            ===============
            1- board ['Punjab', 'Pakhtoonkhwa', 'Sind', 'Balochistan', 'FBISE']
            2- classNo Number
            3- chapter Number
            4- isSpecial Boolean
            5- partNo :exercise,questionNo,part,name
            6- questionType -['paid', 'login' , 'free']
            7- status - ['empty' ,'fill' ,'locked', 'final']
            8- free Boolean
            9- filename -required
            10- filledBy String
            11- slides  [array of slides]*******
            12- teacherComments
            13- adminComments