const express = require("express");
const router = express.Router();
const categories = require("./categories");
const topHeadlines = require("./top-headlines");
const logger = require("winston");

router.get("/ping", function (req, res) {
    res.send("pong");
});

router.get("/", (req, res) => res.json({ msg: "welcome to news api" }));
router.use("/categories", categories);
router.use("/top-headlines", topHeadlines);

module.exports = router;