const express = require('express');
const router = express.Router();
const passport = require('passport');
const { registerUser, loginUser, logoutUser } = require('../controllers/userController');

router.post('/', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

module.exports = router;