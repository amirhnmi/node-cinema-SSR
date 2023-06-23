const express = require("express");
const app = express();
require("dotenv").config()
const mongoose = require("mongoose")
const methodOverride = require("method-override")
const cookieParser= require("cookie-parser");
const session= require("express-session");
const flash= require("connect-flash");
const MongoStore= require("connect-mongo");
const passport= require("passport");


mongoose.connect(process.env.DB_ADDRESS)
.then(()=> console.log("connected to mongoDB"))
.catch(()=> console.log("could not connect to mongoDB"))

// middleware
app.use(express.static(__dirname + "/public"))
app.use(express.urlencoded({extended:false}))
app.use(methodOverride("method"))
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {expires: new Date(Date.now()+1000*3600*24*100)},
    store: MongoStore.create({mongoUrl: process.env.DB_ADDRESS})
}))
app.use(flash())
require("./passport/passport-local.js")
app.use(passport.initialize());
app.use(passport.session())

// view context
app.use((req,res,next)=>{
    res.locals= {
        errors: req.flash("errors"),
        message: req.flash("message"),
        req:req,
    }
    next()
})

// route
app.use("", require("./routes/route.js"))

// server
app.listen(process.env.PORT,()=>console.log(`connected to server on port ${process.env.PORT}`))