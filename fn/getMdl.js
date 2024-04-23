const { getTcode } = require('../dbLayer');
const TaleemError = require('../fn/taleemError');


async function getMdl(data) {
    try {
        const theMdl = await getTcode(data.tcode);
        if (!theMdl) {
            throw new TaleemError('Tcode not found', 404);
        } else {
            data.theMdl = theMdl;
            return data;
        }
    } catch (error) {
       throw error;
    }
}

module.exports = getMdl;
