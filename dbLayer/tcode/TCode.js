//@ts-nocheck
/**
 * 3-Mar-2024
 * What are rules implemented at this level
 *  1- The item can not be deleted if has slides.
 *  2- The file path is calculated as per 1 exclusive function thus it is kept unique.
 *  3- "chapter" & "exercise" are only variables required but at create time "filename" is added into automatically.
 * 4- You can expose the mongoose-model using "mongooseModel()"
 * 5- I have decided to keep debugging-mode/non-debugging-mode out of this level (on top). This means that tcode_module is always in debugging mode and it is the api on top (Taleem_Api) to decide to expose it or not. From here we are sending all errors using "error"
 */
// const mongoose = require("mongoose");
const prepResp = require('./fn/prepResp');
const getFilename = require('./fn/getFilename');


class TCode {
  constructor(model) {
    this.model = model;
  }
 mongooseModel(){
  return this.model;
 }
 async getSyllabus() {
  try {
    // Attempt to fetch syllabus data from the database
    const syllabus = await this.model.find({}).select({
      chapter: 1,
      exercise: 1,
      name: 1,
      part: 1,
      questionNo:1,
      questionType: 1,
      status: 1,
      sortOrder: 1,
      filename: 1,
    });

    // Return the fetched questions if successful
    return { syllabus };

  } catch (error) {
      throw error;
    }
}
async get(data) { //id
  try {
    const item = await this.model.findById(data.id).lean();

    // if (item == null) {
    //   throw new Error(`Could not find the question`); 
    // } else {
      return {item};
    // }
  } catch (error) {
      throw error;
  }
}

async update(data) {
  try {

    // new: true mean return the new document and not the old one
    const options = { new: true, upsert: false };
    debugger;
    const item = await this.model.findByIdAndUpdate(data.question._id, data.question, options).lean();
      return { item };
  } catch (error) {
      throw error;
  }
}

async create(data) {
  try {
    getFilename(data.question, data.tcode);
    const newQuestion = new this.model(data.question);
    const item = await newQuestion.save();
    return { item };

  } catch (error) {
      throw error;
  }
}

///////////////////////////////
async where(data = {query:{}}) {
  try {
    const items = await this.model.find(data.query);
    return { items };
  } catch (error) {
    throw error;
  }
}

//////////////////////////
async count(data = {query:{}}) {
  try {
    const items = await this.model.countDocuments(data.query);
    return { items };
  } catch (error) {
        throw error;
  }
}

//////////////////////////
async delete(data) {
  try {
    const item = await this.model.findById(data.id);
    if (!item) {
      throw new Error ("item not found");
    }

    if (item.slides.length > 0) {
        throw new Error ('Question has content');
    }
    const delete_result = await this.model.findByIdAndRemove(data.id);
    return { delete_result };
  } catch (error) {
    throw error;
  }
}
 
async getUniqueChapters() {
  try {
    const chapters = await this.model.aggregate([
      {
        $match: { chapter: { $exists: true } }
      },
      {
        $group: {
          _id: null,
          chapters: { $addToSet: "$chapter" }
        }
      },
      {
        $project: {
          _id: 0,
          chapters: 1
        }
      }
    ]);

    if (chapters.length > 0) {
      return { chapters: chapters[0].chapters };
    } else {
      return { chapters: 0 };
    }
  } catch (error) {
    throw error;
  }
}

async getUniqueExercises() {
  try {
    const exercises = await this.model.aggregate([
      {
        $match: { exercise: { $exists: true } }
      },
      {
        $group: {
          _id: null,
          exercises: { $addToSet: "$exercise" }
        }
      },
      {
        $project: {
          _id: 0,
          exercises: 1
        }
      }
    ]);

    if (exercises.length > 0) {
      return {  exercises: exercises[0].exercises };
    } else {
      return { exercises:0 };
    }
  } catch (error) {
    throw error;
  }
}

async getByStatus(data= {status: "final"}) {
  try {
    const items = await this.model.find({ status: data.status });

    return { items };
  } catch (error) {
    throw error;
  }
}
async getByFilename(data = {filename:""}) {
  try {
    const item = await this.model.findOne({ filename : data.filename }).lean();

    // if (!item) {
    //   throw new Error(`Document with filename ${data.filename} not found`);
    // }

    return { item };
  } catch (error) {
    throw error;
  }
}

async getByQuestionType( data= {questionType: "free"} ) {
  try {
    if (!['free', 'paid', 'other'].includes(data.questionType)) {
      throw new Error("Invalid question type provided");
    }

    const items = await this.model.find({ questionType: data.questionType });

    return { items };
  } catch (error) {
    throw error;
  }
}


async getChapter(data) {
  try {
    if (typeof data.chapterNumber !== 'number' || isNaN(data.chapterNumber)) {
      throw new Error("Invalid chapter number provided");
    }
    const items = await this.model.find({ chapter: data.chapterNumber });
    return { items };
  } catch (error) {
    throw error;
  }
}

async getExercise(data) {
  try {
    if (typeof data.exerciseName !== 'string' || data.exerciseName.trim() === '') {
      throw new Error("Invalid exercise name provided");
    }
    const items = await this.model.find({ exercise: data.exerciseName });
    return { items };
  } catch (error) {
    throw error;
  }
}

//////////////////////////////////////////////////////

async chapterMap() {
  try {
    const chapterMap = [];

    // Step 1: Aggregate unique chapters
    const uniqueChapters = await this.model.aggregate([
      { $group: { _id: "$chapter" } }
    ]);

    // Step 2: Sort chapters
    const sortedChapters = uniqueChapters.map(chapter => chapter._id).sort((a, b) => a - b);

    // Step 3: Generate chapter map
    for (const chapter of sortedChapters) {
      const exercises = await this.model.distinct("exercise", { chapter });
      chapterMap.push({ chapter, exercises });
    }

    return { chapterMap };
  } catch (error) {
    throw error;
  }
}
async getExerciseByChapter(data) {
  try {
    if (typeof data.chapterNumber !== 'number' || isNaN(data.chapterNumber)) {
      throw new Error("Invalid chapter number provided");
    }
    if (typeof data.exerciseName !== 'string' || data.exerciseName.trim() === '') {
      throw new Error("Invalid exercise name provided");
    }

    const exercise = await this.model.find({ chapter: data.chapterNumber, exercise: data.exerciseName });

    return { exercise };
  } catch (error) {
      throw error;
  }
}

async getChapterSyllabus(data) {
  try {
    if (typeof data.chapterNumber !== 'number' || isNaN(data.chapterNumber)) {
      throw new Error("Invalid chapter number provided");
    }

    const syllabus = await this.model.find({ chapter: data.chapterNumber })
      .select({
        chapter: 1,
        exercise: 1,
        name: 1,
        part: 1,
        questionNo: 1,
        questionType: 1,
        status: 1,
        filename: 1,
      });

    return { syllabus };
  } catch (error) {
      throw error;
  }
}

async getExerciseByChapterSyllabus(data) {
  try {
    if (typeof data.chapterNumber !== 'number' || isNaN(data.chapterNumber)) {
      throw new Error("Invalid chapter number provided");
    }
    if (typeof data.exerciseName !== 'string' || data.exerciseName.trim() === '') {
      throw new Error("Invalid exercise name provided");
    }

    const syllabus = await this.model.find({ chapter: data.chapterNumber, exercise: data.exerciseName })
      .select({
        chapter: 1,
        exercise: 1,
        name: 1,
        part: 1,
        questionNo: 1,
        questionType: 1,
        status: 1,
        filename: 1,
      });

    return { syllabus };
  } catch (error) {
      throw error;
  }
}


async slidesState(data) {
  try {
    // Validate the chapterNumber and exerciseName inputs
    if (typeof data.chapterNumber !== 'number' || isNaN(data.chapterNumber)) {
      throw new Error("Invalid chapter number provided");
    }
    if (typeof data.exerciseName !== 'string' || data.exerciseName.trim() === '') {
      throw new Error("Invalid exercise name provided");
    }

    const items = await this.model.aggregate([
      { $match: { chapter: data.chapterNumber, exercise: data.exerciseName } },
      { 
        $project: {
          chapter: 1,
          exercise: 1,
          name: 1,
          part: 1,
          questionNo: 1,
          questionType: 1,
          status: 1,
          filename: 1,
          slidesCount: { $size: "$slides" } // Step 3: Counting the number of items in the "slides" array
        } 
      }
    ]);

    return {  items };
  } catch (error) {
    throw error;
  }
}

}//questions

module.exports = TCode;
