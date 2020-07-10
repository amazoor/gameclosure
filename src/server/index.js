const express = require("express");
const bodyParser = require("body-parser");
const app = express();
var cors = require('cors');
const fs = require("fs");
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
require("./routes.js")(app, fs);
const server = app.listen(3001, () => {
    console.log("listening on port %s...", server.address().port);
});