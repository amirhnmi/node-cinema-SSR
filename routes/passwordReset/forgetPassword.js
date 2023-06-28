const express = require("express")
const router = express.Router()

const forgetPasswordController = require("../../controllers/PasswordResetController/forgetPasswordController")

router.get("/",forgetPasswordController.forgetPasswordForm)
router.post("/",forgetPasswordController.forgetPassword)

module.exports = router