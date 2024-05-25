const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,

  },
  books: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
  ],
})

module.exports = mongoose.model('Category', categorySchema);