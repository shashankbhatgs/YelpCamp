// we return a function that accepts a function and then it executes the fn but it catches any error and passes it to next 
module.exports = func =>{
    return (req, res, next)=>{
        func(req, res, next).catch(next); 
    }
}