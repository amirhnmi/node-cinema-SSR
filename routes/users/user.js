const express = require("express")
const router = express.Router()

// user controller
const userController = require("../../controllers/userController/userController")

//validator
const userValidator = require("../../validators/userValidator")

router.get("/", userController.getUser)
router.get("/:id", userController.getOneUser)
router.post("/create", userValidator.validate() ,userController.createUser)
router.put("/update/:id", userValidator.validate() ,userController.updateUser)
router.delete("/delete/:id", userController.deleteUser)

module.exports= router;