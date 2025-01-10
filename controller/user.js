const User = require("../model/user.js")
const { setUser } = require("../service/auth.js");

async function handleUserSignup(req, res) {
    const { name, email, password } = req.body;
    await User.create({
        name: name,
        email: email,
        password: password
    })

    res.redirect("/test");
}

async function handleUserLogin(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) return res.redirect("/signup");
    
    const token=  setUser(user);
    req.flash("success", "Successful Login");  //flash message for successful login one time message 
    res.cookie("token", token)
    return res.redirect("/test");

}


module.exports = {
    handleUserSignup,
    handleUserLogin
}