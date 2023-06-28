const express = require("express")
const router = express.Router()

const changePasswordController = require("../../controllers/PasswordResetController/changePasswordController")

router.get("/:token",changePasswordController.changePasswordForm)
router.post("/",changePasswordController.changePassword)

module.exports = router