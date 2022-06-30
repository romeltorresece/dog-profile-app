const Dog = require('../models/dogModel');
const asyncHandler = require('../utils/asyncHandler');
const ExpressError = require('../utils/ExpressError');

// @desc    Get Dogs
// @route   GET /api/dogs
// @access  Public 
const getDogs = asyncHandler(async (req, res) => {
    const dogs = await Dog.find({});
    res.status(200).json(dogs);
});

// @desc    Show Dog
// @route   GET /api/dogs/:id
// @access  Public 
const showDog = asyncHandler(async (req, res) => {
    const dog = await Dog.findById(req.params.id);
    if (!dog) throw new ExpressError('Dog Profile Not Found', 404);

    res.status(200).json(dog);
});

// @desc    Create Dog
// @route   POST /api/dogs
// @access  Private
const createDog = asyncHandler(async (req, res) => {
    const dog = new Dog(req.body);
    dog.author = req.user._id;
    await dog.save();
    res.status(200).json(dog);
});

// @desc    Update Dog
// @route   PUT /api/dogs/:id
// @access  Private
const updateDog = asyncHandler(async (req, res) => {
    const config = { new: true, runValidators: true };
    const updatedDog = await Dog.findByIdAndUpdate(req.params.id, req.body, config);
    res.status(200).json(updatedDog);
});

// @desc    Delete Dog
// @route   Delete /api/dogs/:id
// @access  Private
const deleteDog = asyncHandler(async (req, res) => {
    const deletedDog = await Dog.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedDog);
});

module.exports = {
    getDogs,
    showDog,
    createDog,
    updateDog,
    deleteDog,
};