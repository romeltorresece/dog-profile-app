const User = require('../models/userModel');
const asyncHandler = require('../utils/asyncHandler');
const ExpressError = require('../utils/ExpressError');

// @desc    Register User
// @route   POST /api/users
// @access  Public 
const registerUser = asyncHandler(async (req, res, next) => {
    const { email, username, password } = req.body;
    const user = new User({ username, email });
    const registeredUser = await User.register(user, password);
    
    req.login(registeredUser, (err) => {
        if (err) return next(err);
        if (registeredUser) {
            res.status(201).json({
                id: registeredUser._id,
                username: registeredUser.username,
                email: registeredUser.email,
            });
        } else {
            throw new ExpressError('Invalid User Data', 400);
        }
    });
});

// @desc    Login User
// @route   POST /api/users/login
// @access  Public 
const loginUser = asyncHandler(async (req, res, next) => {
    const { username, password } = req.body;

    const authenticate = User.authenticate();
    const result = await authenticate(username, password);
    if (!result.user) throw new ExpressError(result.error.message, 400);
    
    req.login(result.user, (err) => {
        if (err) return next(err);
        res.status(200).json({
            id: req.user._id,
            email: req.user.email,
            username: req.user.username,
        });
    });
});

// @desc    Logout User
// @route   POST /api/users/logout
// @access  Public 
const logoutUser = (req, res) => {
    req.logout();
    res.status(200).json({
        message: 'Logout Successful!',
    });
};


module.exports = {
    registerUser,
    loginUser,
    logoutUser,
};