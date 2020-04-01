const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const routesApp = require("./routes");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(routesApp);

module.exports = app;
