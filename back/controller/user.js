const express = require('express');
const User = require('../module/userModel')
const router = express.Router();
const { upload } = require('../multer');
const ErrorHandler = require('../utils/ErrorHandler');
const { JsonWebTokenError } = require('jsonwebtoken');
const jwt = require('jsonwebtoken');
const sendMail = require('../utils/sendMail');
const sendToken = require('../utils/sendMail');
const catchErrorHandler = require('../middleware/catchErrorHandler');
const { isAuthenticated } = require('../middleware/auth');


router.post('/create', upload.single('file'), async (req, res, next) => {
    try {
        const { email } = req.body;
        const userEmail = User.findOne({ email })
        if (userEmail) {
            return res.status(400).json({ success: false, message: 'Email already exists' });
        }

        const user = new User(req.body);
        await user.save();
        res.status(201).json({ success: true });

        const activationToken = createActivationToken(user);

        const activationUrl = `https://localhost:3000/activation/${activationToken}`;

        try {
            await sendMail({
                email: user.email,
                subject: 'Activate your account',
                message: `Hi ${user.name},<br><br>Please click on the link below to activate your account:<br><br><a href="${activationUrl}">${activationUrl}</a>`
            })
            res.status(201).json({ success: true, message: `please check your ${user.email} to activate your account` })
        } catch (error) {
            return error.message;
        }

    } catch (error) {
        console.log(`Create Error: ${error}`)
    }

});

const createActivationToken = async (user) => {
    return jwt.sign(user, process.env.ACTIVATION_SECRET || 'dwoijfi43%$hgf%csdck@kjnkjcnds%%wkdwjn$435', {
        expiresIn: "5m"
    })
}

router.post('/activation', catchErrorHandler(async (req, res, next) => {
    try {
        const { activationToken } = req.body;
        const newUser = await jwt.verify(activationToken, process.env.ACTIVATION_SECRET);

        if (!newUser) {
            return res.status(400).json({ success: false, message: 'Invalid activation token' });
        }

        const { name, email, password } = newUser;

        User.findOne({ email: email, password: password })

        sendToken(newUser, 201, res)

    } catch (error) {
        return res.status(400).json({ success: false, error: error })
    }
}));

router.post('/login', catchErrorHandler(async (req, res, next) => {
    try {

        const { email, password } = req.body;

        if(!email || !password) { 
            return "Please provide all the fields"
        }

        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return "User not found"
        }

        const isPasswordValid = await user.comparePassword(password)
        
    } catch (error) {
        return "Error: " + error;
    }
}));

router.get("/getme", isAuthenticated, catchErrorHandler(async (req, res, next) => {
    try {

        const user = await User.findById(req.user.id);
        if(!user) {
            return next(new ErrorHandler("User not found"))
        }

        res.status(200).json({success: true, user})
        
    } catch (error) {
        return next(error);
    }
}))

module.exports = router;