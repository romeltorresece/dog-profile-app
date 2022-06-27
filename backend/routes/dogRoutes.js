const express = require('express');
const router = express.Router();
const { getDogs, createDog, updateDog, deleteDog } = require('../controllers/dogController');

router.route('/')
    .get(getDogs)
    .post(createDog);

router.route('/:id')
    .put(updateDog)
    .delete(deleteDog);

module.exports = router;