const express = require('express');
const router = express.Router();

const { createCategory, getCategory, showAllCategories } = require('../controllers/category.js')
const { auth, isAdmin } = require('../middleware/auth.js')

router.post('/createCategory', auth, isAdmin, createCategory)

router.get('/getCategory/:id', auth, getCategory)
router.get('/getCategories', showAllCategories)

module.exports = router