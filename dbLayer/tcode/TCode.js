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
    const questions = await this.model.find({}).select({
      chapter: 1,
      exercise: 1,
      name: 1,
      part: 1,
      questionNo:1,
      questionType: 1,
      status: 1,
      filename: 1,
    });

    // Return the fetched questions if successful
    return { ok: true, questions };

  } catch (error) {
    return prepResp(false,500,"Failed to fetch syllabus data",error);
    }
}
async get(data) { //id
  try {
    const item = await this.model.findById(data.id).lean();

    if (item == null) {
      throw new Error(`Could not find the question`); 
    } else {
      return {item};
    }
  } catch (error) {
      throw error;
  }
}

async update(data) {
  try {
    // new: true mean return the new document and not the old one
    const options = { new: true, upsert: false };
    const item = await this.model.findByIdAndUpdate(data.question._id, data.question, options);
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
async where(data = {}) {
  try {
    const items = await this.model.find(data);

    // Return the items along with success message
    return { items };
  } catch (error) {
    throw error;
  }
}

//////////////////////////
async count(query = {}) {
  try {
    // Count documents matching the query
    const count = await this.model.countDocuments(query);

    // Return the count along with success message
    return { ok: true, count, message: 'Count successful' };
  } catch (error) {
        throw error;
  }
}

//////////////////////////
async delete(id) {
  try {
    // Convert the id to a MongoDB ObjectId
    // const objectId = mongoose.Types.ObjectId(id);

    // Find the question by id
    const question = await this.model.findById(id);

    // Check if the question exists
    if (!question) {
      return { ok: false, message: 'Question not found', status: 404 };
    }

    // Check if the question has slides
    if (question.slides.length > 0) {
      return { ok: false, message: 'Question has content', status: 500 };
    }

    // Delete the question
    await this.model.findByIdAndRemove(id);

    // Return success message
    return { ok: true, message: 'Question deleted', status: 200 };
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
      return { ok: true, chapters: chapters[0].chapters };
    } else {
      return { ok: false, message: "No chapters found" };
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
      return { ok: true, exercises: exercises[0].exercises };
    } else {
      return { ok: false, message: "No exercises found" };
    }
  } catch (error) {
    
    throw error;
  }
}

async getByStatus(status = "final") {
  try {
    const items = await this.model.find({ status });

    return { ok: true, items, message: "Success" };
  } catch (error) {
    throw error;
  }
}

async getByQuestionType(questionType = "free") {
  try {
    // Validate the questionType input
    if (!['free', 'paid', 'other'].includes(questionType)) {
      throw new Error("Invalid question type provided");
    }

    const items = await this.model.find({ questionType });

    return { ok: true, items, message: "Questions retrieved successfully" };
  } catch (error) {
    throw error;
  }
}

async getChapter(chapterNumber) {
  try {
    // Validate the chapterNumber input
    if (typeof chapterNumber !== 'number' || isNaN(chapterNumber)) {
      throw new Error("Invalid chapter number provided");
    }

    const items = await this.model.find({ chapter: chapterNumber });

    return { ok: true, items, message: "Questions retrieved successfully" };
  } catch (error) {
    throw error;
  }
}

async getExercise(exerciseName) {
  try {
    // Validate the exerciseName input
    if (typeof exerciseName !== 'string' || exerciseName.trim() === '') {
      throw new Error("Invalid exercise name provided");
    }

    const items = await this.model.find({ exercise: exerciseName });

    return { ok: true, items, message: "Questions retrieved successfully" };
  } catch (error) {
    throw error;
  }
}
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

    return { ok: true, chapterMap };
  } catch (error) {
    throw error;
  }
}
async getExerciseByChapter(chapterNumber, exerciseName) {
  try {
    // Validate the chapterNumber and exerciseName inputs
    if (typeof chapterNumber !== 'number' || isNaN(chapterNumber)) {
      throw new Error("Invalid chapter number provided");
    }
    if (typeof exerciseName !== 'string' || exerciseName.trim() === '') {
      throw new Error("Invalid exercise name provided");
    }

    const items = await this.model.find({ chapter: chapterNumber, exercise: exerciseName });

    return { ok: true, items, message: "Questions retrieved successfully" };
  } catch (error) {
      throw error;
  }
}

async getChapterSyllabus(chapterNumber) {
  try {
    // Validate the chapterNumber input
    if (typeof chapterNumber !== 'number' || isNaN(chapterNumber)) {
      throw new Error("Invalid chapter number provided");
    }

    const items = await this.model.find({ chapter: chapterNumber })
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

    return { ok: true, items, message: "Chapter syllabus retrieved successfully" };
  } catch (error) {
      throw error;
  }
}

async getExerciseByChapterSyllabus(chapterNumber, exerciseName) {
  try {
    // Validate the chapterNumber and exerciseName inputs
    if (typeof chapterNumber !== 'number' || isNaN(chapterNumber)) {
      throw new Error("Invalid chapter number provided");
    }
    if (typeof exerciseName !== 'string' || exerciseName.trim() === '') {
      throw new Error("Invalid exercise name provided");
    }

    const items = await this.model.find({ chapter: chapterNumber, exercise: exerciseName })
      .select({
        chapter: 1,
        exercise: 1,
        name: 1,
        part: 1,
        questionNo: 1,
        questionType: 1,
        status: 1,
        free: 1,
        filename: 1,
      });

    return { ok: true, items, message: "Exercise syllabus retrieved successfully" };
  } catch (error) {
      throw error;
  }
}
async slidesState(chapterNumber, exerciseName) {
  try {
    // Validate the chapterNumber and exerciseName inputs
    if (typeof chapterNumber !== 'number' || isNaN(chapterNumber)) {
      throw new Error("Invalid chapter number provided");
    }
    if (typeof exerciseName !== 'string' || exerciseName.trim() === '') {
      throw new Error("Invalid exercise name provided");
    }

    const items = await this.model.aggregate([
      { $match: { chapter: chapterNumber, exercise: exerciseName } },
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

    return { ok: true, items, message: "Exercise syllabus retrieved successfully" };
  } catch (error) {
    throw error;
  }
}

}//questions

module.exports = TCode;
