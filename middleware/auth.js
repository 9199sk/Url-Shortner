const { getUser } = require("../service/auth");

function checkForAuthentication(req, res, next) {
    // Cookies se token ko access karen
    const tokenCookie = req.cookies?.token; 
    req.user = null;


    if (!tokenCookie) {
        return next();
    }

    const token = tokenCookie;
    const user = getUser(token);

    if (!user) {
        req.user = null;
    } else {
        req.user = user; // User ko request object par set karen
    }

    return next(); // Next middleware ya route handler ko call karen
}

function restrictTo(roles = []) {
    return function (req, res, next) {
        if (!req.user) {
            return res.redirect("/login");
        }


        if (!roles.includes(req.user.role)) {
            return res.end("Unauthorized");
        }

        next(); // Next middleware ya route handler ko call karen
    }
}

module.exports = {
    checkForAuthentication,
    restrictTo
};
