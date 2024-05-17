require('dotenv').config();
const mongoose = require("mongoose");

const db = require("./mongoDb/mongo.js");
const TCodeSchema = require("./dbLayer/tcode/TCodeSchema.js");
// const Fbise10maths = mongoose.model('fbise10math', TCodeSchema,"fbise10maths");
const Fbise9math = mongoose.model('fbise9math', TCodeSchema,"fbise9maths");

const Database = mongoose.model('database', TCodeSchema, 'database');

///////////////////////////////////////////////////////////////////////
db.once('open', async () => {
    console.log("DB started..!");

    await run();
});
///////////////////////////////////////////////////////////////////////
async function run() {
    try {
        // const result = await Database.deleteMany({ tcode: 'fbise9mathOld' });
        // console.log("Documents deleted:", result.deletedCount);
    
        const documents = await Fbise9math.find({});

        for (let i = 0; i < documents.length; i++) {
            const doc = documents[i].toObject();
            
            delete doc._id; // Remove the _id field to avoid conflicts
            delete doc.__v; // Remove the __v field to avoid version conflicts

            // save each doc to Database
            const newDoc = new Database(doc);
            await newDoc.save();

            console.log(`${i} :`, newDoc._id);
        }
    } catch (error) {
        console.error("Error reading documents:", error);
    } finally {
        // Close the database connection
        await mongoose.connection.close();
    }
}
