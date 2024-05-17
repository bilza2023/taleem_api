

class TaleemError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
        this.message = message;
        this.name = 'TaleemError';
    }
}
    
// Example usage
// const error = new CustomError('An error occurred', 404, 'NotFoundError');
// throw error;


module.exports = TaleemError;