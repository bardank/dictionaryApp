const express = require('express');
const router = express.Router();
const axios = require('axios')
const Word = require('../models/Word');

router.get('/', async (req, res) => {
    try {
        const words = await Word.find().sort({ 'updatedAt': 'desc' });

        res.json(words)

    } catch (error) {
        console.log(error.message)
        res.status(500).json('Server error');
    }
})
router.get('/:searchtext', async (req, res) => {
    try {
        const word_id = req.params.searchtext
        const words = await Word.find({ word: { "$regex": word_id} });
        res.json(words)
    } catch (error) {
        console.log(error.message)
        res.status(500).json('Server error');
    }
})

router.post('/:searchtext', async (req, res) => {
    try {
        const endpoint = "entries"
        const language_code = "en"
        const search_word = req.params.searchtext
        const isWord = await Word.findOne({ word: search_word }).exec();
        if (isWord) {
            return res.json(isWord)

        } else {
            const requestUrl = `${process.env.BASE_URL}/${endpoint}/${language_code}/${search_word}`
            const response = await axios.get(requestUrl, {
                headers: {
                    "app_id": process.env.APP_ID,
                    "app_key": process.env.API_KEY
                }
            });
            const category = response.data.results[0].lexicalEntries[0].lexicalCategory.text;
            const newWord = await new Word({
                word: search_word,
                category: category,
                results: response.data.results
            });
            const word = await newWord.save();
            res.json(word)
        }

    } catch (error) {
        console.log(error.message)
        res.status(500).json('Server error');
    }
})

module.exports = router;