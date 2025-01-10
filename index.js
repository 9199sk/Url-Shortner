require('dotenv').config();
const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const MongoUrl= process.env.MONGO_URI || "mongodb://127.0.0.1:27017/short-url"
const urlRoutes = require("./routes/url.js");
const { connectMongoDb } = require('./connect.js');
const bodyParser = require('body-parser');
const userRoutes=  require("./routes/user.js");
const staticRouter=  require("./routes/staticRouter.js");
const cookiesParser= require("cookie-parser");
const flash = require('connect-flash');
const session = require('express-session');
const { checkForAuthentication, restrictTo } = require('./middleware/auth.js');




// Use body-parser middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true })); 

app.use(cookiesParser());
// Session Middleware
app.use(session({
    secret: 'your_secret_key', // Secret key ko replace karo kisi strong string se
    resave: false,            // Jab tak session change na ho, use save mat karo
    saveUninitialized: true   // Uninitialized sessions ko save karo
}));
app.use(flash());


app.set("view engine", "views");


//this is mongoDb connection-----
connectMongoDb(MongoUrl);


app.use(checkForAuthentication);


//static Routes-----
app.use("/", staticRouter);


//routes
app.use("/url", restrictTo(["NORMAL", "ADMIN"]), urlRoutes);



//authentication routes- 
app.use("/user", userRoutes);


//port connection
app.listen(port, () => console.log(`your app listening on port ${port}!`))