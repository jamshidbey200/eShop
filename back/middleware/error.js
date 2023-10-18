const ErrorHandler = require('../utils/ErrorHandler');

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    //wrong mongodb id error message
    if (err.name === "CastError") {
        const message = `Resourse not found with this id... Invalid ${error.path}`;
        err = new ErrorHandler(message, 400)
    }

    //duplicate key error message
    if (err.name === 11000) {
        const message = `Duplicate key ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHandler(message, 400)
    }

    //jwt error message
    if (err.name === "JsonWebTokenError") {
        const message = `Invalid url please try again`;
        err = new ErrorHandler(message, 400)
    }

    //jwt expired token
    if (err.name === "TokenExpiredError") {
        const message = `Your url has expired please login again`;
        err = new ErrorHandler(message, 400)
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message
    });
}
