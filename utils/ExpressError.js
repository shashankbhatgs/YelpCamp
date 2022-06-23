class ExpressError extends Error{
    constructor(message, statusCode){
        super(); //its gonna call Error constructor
        this.message = message; 
        this.statusCode = statusCode; 
    }
}

module.exports = ExpressError; 