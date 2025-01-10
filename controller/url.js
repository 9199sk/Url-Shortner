const ids = require("short-id");
const URL = require("../model/url.js")

async function handleGenerateNewUrl(req, res) {
    const { redirectUrl } = req.body;
    if (!redirectUrl) {
        return res.status(400).json({ error: "url is required" })
    }
    let shortId = ids.generate(8);
    await URL.create({
        shortId: shortId,
        redirectUrl: redirectUrl,
        visitHistory: [],
        createdBy: req.user._id

    })
    req.flash("newUrlMessage", "New Url Created  Successfully")


    return res.redirect("/test")

}





async function getAnalytics(req, res) {
    const { shortId } = req.params;
    const Result = await URL.findOne({ shortId });
    return res.json({ clicks: Result.visitHistory.length, analytics: Result.visitHistory })
}


async function getShortUrl(req, res) {
    const { shortId } = req.params
    const urlData = await URL.findOneAndUpdate(
        { shortId },

        {
            $push: {
                visitHistory: {
                    timestamps: Date.now()
                },
            }
        }

    );
    if (!urlData) {
        return res.status(404).json({ error: 'URL not found' });
    }
    res.redirect(urlData.redirectUrl)

}


async function handleDeletion(req,res){
    const {deleteId}= req.params;
    await URL.findOneAndDelete({ shortId: deleteId });
    req.flash("Deleted", "Deleted Successfully")
    res.redirect("/test");
}


module.exports = {
    handleGenerateNewUrl,
    getAnalytics,
    getShortUrl,
    handleDeletion
}