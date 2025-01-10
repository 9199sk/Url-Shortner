const express= require("express");
const { handleGenerateNewUrl, getAnalytics, getShortUrl, handleDeletion } = require("../controller/url");
const router=  express.Router();



router.post("/",handleGenerateNewUrl);

router.get("/:shortId", getShortUrl)



router.post("/:deleteId", handleDeletion)



router.get("/analytics/:shortId", getAnalytics);




module.exports= router;
