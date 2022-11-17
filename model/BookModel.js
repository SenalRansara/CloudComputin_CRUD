const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookSchema = new Schema({

    id: {
        type: String,
        required: true
    },

    title: {
        type: String,
        required: true
    },

    author: {
        type: String,
        required: true
    },

    cost: {
        type: String,
        required: true,
    }
})

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;