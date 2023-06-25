const express = require("express")
const router = express.Router()

// user controller
const UserDashboardController = require("../../controllers/dashboardController/userDashboardController")

const editUserValidator = require("../../validators/editUserValidator")

const uploadUserProfile= require("../../upload/uploadUserProfile")

router.use((req,res,next)=>{
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect("/")
})
router.get("", UserDashboardController.dashboard)

router.post("/edituser", uploadUserProfile.single("avatar"), (req,res,next)=>{
    if(!req.file) {
      req.body.avatar= null
    }else{
      req.body.avatar = req.file.filename;
    }
    next();}, editUserValidator.validate() ,UserDashboardController.edituser
);

module.exports= router;