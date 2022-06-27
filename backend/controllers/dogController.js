const Dog = require('../models/dogModel');
const asyncHandler = require('../utils/asyncHandler');

// @desc    Get Dogs
// @route   GET /api/dogs
// @access  Public 
const getDogs = asyncHandler(async (req, res) => {
    const dogs = await Dog.find({});
    res.status(200).json(dogs);
});

// @desc    Create Dog
// @route   POST /api/dogs
// @access  Private
const createDog = asyncHandler(async (req, res) => {
    const dog = new Dog(req.body);
    await dog.save();
    res.status(200).json(dog);
});

// @desc    Update Dog
// @route   PUT /api/dogs/:id
// @access  Private
const updateDog = asyncHandler(async (req, res) => {
    const config = { new: true, runValidators: true };
    const dog = await Dog.findByIdAndUpdate(req.params.id, req.body, config);
    res.status(200).json(dog);
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
    createDog,
    updateDog,
    deleteDog,
};