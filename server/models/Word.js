const mongoose = require('mongoose');
const wordScheme = new mongoose.Schema({
    word: {
        type: String,
        required: true
    },
    results: {
        type: Object,
        required: true
    }


}, { timestamps: true });

module.exports = Word = mongoose.model('Word', wordScheme)