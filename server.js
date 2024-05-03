require('dotenv').config();
const mongoose = require("mongoose");

const db = require("./mongoDb/mongo.js");
const TCodeSchema = require("./dbLayer/tcode/TCodeSchema.js");
const Fbise9Math = mongoose.model('fbise9math', TCodeSchema);

///////////////////////////////////////////////////////////////////////
db.once('open', async () => {
    console.log("DB started..!");

    await run();
});
///////////////////////////////////////////////////////////////////////
async function run() {
    try {
        const result = await Fbise9Math.updateMany(
            {}, // Update all documents in the collection
            { $set: { "sortOrder": 99 } } // Set "sortOrder" to 99 for all documents
        );

        console.log("Number of documents updated:", result.nModified);
        // Find all documents in the "fbise9math" collection
        // const documents = await Fbise9Math.find({});

        // console.log("All documents from 'fbise9math' collection:", documents);
    } catch (error) {
        console.error("Error reading documents:", error);
    } finally {
        // Close the database connection
        await mongoose.connection.close();
    }
}
