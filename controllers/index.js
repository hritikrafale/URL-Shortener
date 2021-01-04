const express = require('express');
const ShortUrl = require("../models/shortUrl");
const shortId = require("shortid");

const router = express.Router({ mergeParams: true });

router.get("/", (req, res) => {
    const newShortUrl = new ShortUrl();
    res.render("index", { newShortUrl });

});

router.post("/shortUrls", async (req, res) => {
    const { fullUrl } = req.body;
    const newUrl = await ShortUrl.findOne({ full: fullUrl });
    if (newUrl == null) {
        const shortid = shortId.generate();
        const newShortUrl = new ShortUrl({
            full: fullUrl,
            short: shortid
        });
        await newShortUrl.save();
        res.render("index", { newShortUrl });
    } else {
        const newShortUrl = new ShortUrl({full : newUrl.full , short : newUrl.short});
        res.render("index", { newShortUrl });
    }
});

router.get("/:short", async (req, res) => {
    const { short } = req.params;
    const url = await ShortUrl.findOne({ short: short });
    const fullUrl = url.full;
    res.redirect(fullUrl);
});

module.exports = router;