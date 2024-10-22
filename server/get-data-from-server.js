require('dotenv').config();
const mongoose = require("mongoose");
const fs = require('fs').promises;
const path = require('path');

const db = require("../mongo.js");
const {TCodeSchema} = require("../schemas/TCode.js");

const Database = mongoose.model('database', TCodeSchema, 'database');

///////////////////////////////////////////////////////////////////////
db.once('open', async () => {
    console.log("DB started..!");
    await run();
});

///////////////////////////////////////////////////////////////////////
async function run() {
    try {
        const documents = await Database.find({});
        
        // Convert documents to a formatted string
        const documentsString = JSON.stringify(documents, null, 2);
        
        // Generate timestamp for unique filename
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const filename = `database_${timestamp}.json`;
        
        // Create full file path in same directory
        const filePath = path.join(__dirname, filename);
        
        // Write to file
        await fs.writeFile(filePath, documentsString);
        
        console.log(`Successfully exported documents to ${filename}`);
        
    } catch (error) {
        console.error("Error processing documents:", error);
        
        // Write error log to file
        const errorLog = {
            timestamp: new Date().toISOString(),
            error: error.message,
            stack: error.stack
        };
        
        await fs.writeFile(
            path.join(__dirname, 'error_log.json'),
            JSON.stringify(errorLog, null, 2)
        );
        
    } finally {
        await mongoose.connection.close();
    }
}

/* Commented section remains unchanged
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
*/