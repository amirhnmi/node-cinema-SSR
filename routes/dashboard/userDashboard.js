const express = require("express")
const router = express.Router()

// user controller
const UserDashboardController = require("../../controllers/dashboardController/userDashboardController")

router.use((req,res,next)=>{
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect("/")
})
router.get("", UserDashboardController.dashboard)


module.exports= router;