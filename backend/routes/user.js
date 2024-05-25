const express = require('express');
const router = express.Router();

const { signUp, login } = require('../controllers/user.js');
const { auth, isAdmin } = require('../middleware/auth.js');

router.post('/signup', signUp);
router.post('/signin', login);

//Admin Routes
router.post('/deleteUser/:id', auth, isAdmin,)

module.exports = router;