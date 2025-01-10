const express = require('express')
const router = express.Router();
const URL = require("../model/url.js");
const { restrictTo } = require('../middleware/auth.js');






router.get("/", (req, res) => res.render('home.ejs'));



// show all  data & urls info if user is admin

router.get("/admin/url", restrictTo(['ADMIN']), async (req, res) => {
    if (!req.user) return res.redirect("/login");
    let allData = await URL.find({ });
    req.flash("success", "Welcome Admin")
    res.render("url.ejs", { urlData: allData, 
        LoginMessage: req.flash("success"),
        deleteMessage: req.flash("Deleted") ,
        newUrlMessage: req.flash("newUrlMessage") 
     })})
 



//show only one single user data Data routes----
router.get("/test", async (req, res) => {
    if (!req.user) return res.redirect("/login");
    let allData = await URL.find({ createdBy: req.user._id });
  
    res.render("url.ejs",  { 
        urlData: allData, 
        LoginMessage: req.flash("success"),
        deleteMessage: req.flash("Deleted") ,
        newUrlMessage: req.flash("newUrlMessage") 
    })
})


// signup routes-- 
router.get("/signup", (req, res) => {
    res.render("signup.ejs")
})

//  login routes---
router.get("/login", (req, res) => {
    res.render("login.ejs")
})


module.exports = router;