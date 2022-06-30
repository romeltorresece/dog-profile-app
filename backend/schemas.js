const Joi = require('joi');

const dogSchema = Joi.object({
    name: Joi.string().required(),
    age: Joi.number().min(0).required(),
    breed: Joi.string().required(),
    location: Joi.string().required(),
    description: Joi.string().required()
}).required();

module.exports = {
    dogSchema,
};