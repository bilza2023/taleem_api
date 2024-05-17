
const TaleemError = require('./taleemError');


async function getIncomming(req, args = []) {
    try {
        const data = {};


        for (let i = 0; i < args.length; i++) {
            const arg = args[i];
            if (!req.body.hasOwnProperty(arg)) {
                throw new TaleemError(`Could not find the required incoming data: ${arg}`, 404);
            }
            data[arg] = req.body[arg];
        }

        return data;
    } catch (error) {
        throw error;
        
    }
}

module.exports = getIncomming;
