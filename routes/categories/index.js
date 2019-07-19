const key = require('./../../constants').NEWS_API_KEY;
const sourcesURL = require('./../../constants').API_SOURCES;
const express = require('express');
const router = express.Router();
const logger = require("winston");
const axios = require("axios");

router.get("/", async (req, res, next) => {
    const country = req.query.country;
    if (!country) {
        const err = {status: 400, message: "You should provide a country"}
        logger.error(err);
        next(err);
    }
    try {
        const response = await axios.get(`${sourcesURL}?country=${country}&apiKey=${key}`)
        const { sources } = response.data;
        let categories = [...new Set(sources.map(source => (source.category[0].toUpperCase() + source.category.slice(1))))];
        res.json(categories)
    } catch (err) {
        logger.error(err);
        next(err);
    }
})

module.exports = router