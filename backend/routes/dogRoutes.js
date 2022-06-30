const express = require('express');
const router = express.Router();
const { getDogs, showDog, createDog, updateDog, deleteDog } = require('../controllers/dogController');
const { validateDog, isLoggedIn, isAuthor } = require('../middleware');

router.route('/')
    .get(getDogs)
    .post(isLoggedIn, validateDog, createDog);

router.route('/:id')
    .get(showDog)
    .put(isLoggedIn, isAuthor, validateDog, updateDog)
    .delete(isLoggedIn, isAuthor, deleteDog);

module.exports = router;