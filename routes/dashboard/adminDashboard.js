const express = require("express")
const router = express.Router()

const AdminDashboardController = require("../../controllers/dashboardController/adminDashboardController")


router.use((req,res,next)=>{
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect("/")
})
router.get("", AdminDashboardController.dashboard)

module.exports = router