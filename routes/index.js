const express = require("express")
const router = express.Router()


router.use("/user", require("./users/user"))

module.exports= router;