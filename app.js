const express = require("express");
const mongoose = require("mongoose");
const ShortUrl = require("./models/shortUrl");
const shortId = require("shortid");
const path = require('path');
const routes = require("./controllers/index");

const app = express();

mongoose.connect("mongodb://localhost:27017/urlShortener", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", error => console.error(error));
db.once("open", () => { console.log("Connection Open!!!!") });

app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use("/",routes);

app.listen(process.env.PORT || 3000, () => {
    console.log("Serving at port 3000!!!");
});
