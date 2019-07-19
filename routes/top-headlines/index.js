const key = require('./../../constants').NEWS_API_KEY;
const topHeadlinesURL = require('./../../constants').API_TOP_HEADLINES;
const express = require('express');
const router = express.Router();
const logger = require("winston");
const axios = require("axios");

router.get("/", async (req, res, next) => {
    const country = req.query.country;
    const page = req.query.page || 1;
    if (!country) {
        const err = {status: 400, message: "You should provide a country"}
        logger.error(err);
        next(err);
    }
    try {
    const response = await axios.get(`${topHeadlinesURL}?country=${country}&page=${page}&apiKey=${key}`)
    let { articles } = response.data;
    articles = articles.filter(article => {
        if (article.urlToImage &&
            article.urlToImage.length) {
            return article;
        }
    });
    res.json(articles || [])
    } catch (err) {
        logger.error(err);
        next(err);
    } 
})

router.get("/:id", async (req, res, next) => {
    const country = req.query.country;
    const page = req.query.page || 1;
    const category = req.params.id;
    if (!country) {
        const err = {status: 400, message: "You should provide a country"}
        logger.error(err);
        next(err);
    }
    if (!category) {
        const err = {status: 400, message: "You should provide a category"}
        logger.error(err);
        next(err);
    }
    try {
    const response = await axios.get(`${topHeadlinesURL}?category=${category}&page=${page}&country=${country}&apiKey=${key}`)
    let { articles } = response.data;
    articles = articles.filter(article => {
        if (article.urlToImage && article.urlToImage.length) {
            return article;
        }
    });
    res.json(articles || [])
    } catch (err) {
        logger.error(err);
        next(err);
    } 
})

module.exports = router