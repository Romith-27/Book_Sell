const mongoose = require('mongoose')

const reservedBookSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book'
    },
    book: {
        type: String,
        required: true,
    },
    bookPhoto: {
        type: String,
    },
    publicationYear: {
        required: true,
        type: String,
    },
    author: {
        type: String,
        required: true,
    },
    bookDescription: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    reservedDate: {
        type: Date,
        default: Date.now()
    },
    noOfCopies: {
        type: Number,
    },

}, {
    timestamps: true
})


module.exports = mongoose.model('ReservedBook', reservedBookSchema)