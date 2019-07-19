const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const logger = require('./logger');
const app = express();
const PORT = process.env.PORT || 5000;
const routes = require('./routes')

//enable Cross-Origin Resource Sharing.
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

if (process.env.NODE_ENV === "production") {
    morgan.token('json', (req, res) => res.body)
    app.use(morgan(':method :url :status :response-time ms - :res[content-length] :json', { stream: logger.stream }));
} else {
    app.use(morgan('dev'));
}

app.use("/", routes);
app.use((req, res, next) => {
    logger.info("Route not found");
    res.status(404);
    res.json({
        "error": "Error. Route not found"
    });
});
app.use((err, req, res, next) => {
    logger.error("Error");
    let status = err.status? err.status : 500;
    let message = err.message || "Ups. something went wrong!";
    res.status(status).json({status, message});
    next();
});

app.listen(PORT, () => logger.info(`App running on ${PORT}`));

module.exports = app;
