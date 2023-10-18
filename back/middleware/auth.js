const ErrorHandler = require('../utils/ErrorHandler');
const catchAsyncErrors = require('./catchErrorHandler');
const jwt = require('jsonwebtoken');
const User = require('../module/userModel');

exports.isAuthenticated = catchAsyncErrors(async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return next(new ErrorHandler("please login to continue"))
    }

    const decoded = jwt.verfiy(token, process.env.JWT_SECRET_KEY)

    req.user = await User.findById(decoded.id)

    next()
})