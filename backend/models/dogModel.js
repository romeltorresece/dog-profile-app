const mongoose = require('mongoose');
const { Schema } = mongoose;

const opts = { timestamps: true };
const dogSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    age: Number,
    breed: String,
    location: String,
    description: String
}, opts);

const Dog = mongoose.model('Dog', dogSchema);

module.exports = Dog;