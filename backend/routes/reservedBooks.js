const express = require('express')
const router = express.Router()

const { auth, isUser } = require('../middleware/auth.js')
const { reserveBook, deleteBook, editBook, getAllBooks } = require('../controllers/reservedBook.js')

router.put('/dd/:bookId', auth, isUser, reserveBook)
router.delete('/deleteReserveBook/:bookId', auth, isUser, deleteBook)
router.put('/editBook/:id', auth, isUser, editBook)
router.get('/getAllReservedBooks/:id', auth, isUser, getAllBooks)

module.exports = router;