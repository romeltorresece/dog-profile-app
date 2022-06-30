const { dogSchema } = require('./schemas');
const ExpressError = require('./utils/ExpressError');
const Dog = require('./models/dogModel');
const asyncHandler = require('./utils/asyncHandler');

const isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        throw new ExpressError('Not Authorized', 401);
    }
    next();
};

const validateDog = (req, res, next) => {
    const { error } = dogSchema.validate(req.body);
    if (error) {
        const message = error.details.map(el => el.message).join(" ");
        throw new ExpressError(message, 400);
    }
    next();
};

const isAuthor = asyncHandler(async (req, res, next) => {
    const dog = await Dog.findById(req.params.id);

    if (!dog.author.equals(req.user._id)) {
        throw new ExpressError('You have no permission', 403);
    }
    next();
});

const errorHandler = (err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Something went wrong!';
    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};

module.exports = {
    errorHandler,
    validateDog,
    isLoggedIn,
    isAuthor,
};