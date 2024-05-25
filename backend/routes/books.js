const express = require('express');
const router = express.Router();

const { createBook, getBook, showAllBooks, editBookDetails, deleteBook } = require('../controllers/books.js')
const { auth, isAdmin } = require('../middleware/auth.js')

router.get('/getBook/:id', auth, getBook)
router.get('/getAllBooks', showAllBooks)

//Admin routes
router.post('/createBook', auth, isAdmin, createBook)
router.put('/editBook/:id', auth, isAdmin, editBookDetails)
router.delete('/deleteBook/:id', auth, isAdmin, deleteBook)

module.exports = router