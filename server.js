const express = require("express");
const app = express();
const mongoose = require("mongoose")
const methodOverride = require("method-override")
require("dotenv").config()

app.use(express.static(__dirname + "/public"))
app.use(express.urlencoded({extended:false}))
app.use(methodOverride("method"))

mongoose.connect(process.env.DB_ADDRESS)
.then(()=> console.log("connected to mongoDB"))
.catch(()=> console.log("could not connect to mongoDB"))


app.use("", require("./routes/route.js"))

app.listen(process.env.PORT,()=>console.log(`connected to server on port ${process.env.PORT}`))