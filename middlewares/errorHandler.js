const notFound = (req,res,next) =>{
    const error = new Error(`Not Found : ${req.originalUrl}`);
    res.status(404);
    next(error);
}

const errorHandler = (req,res,next) =>{
    const statusCode = res.status== 200?500 :res.statusCode;
    res.status(statusCode);
    res.json({
        message: err?.message,
        stack: err?.stack
    });
};

module.exports = {notFound,errorHandler};