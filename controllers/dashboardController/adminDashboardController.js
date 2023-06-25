const Controller = require("../controller")
const {validationResult}= require("express-validator")
const User = require("../../models/users/userModel")


class AdminDashboardController extends Controller{
    async dashboard(req,res,next){
        try {
            res.render("dashboard/adminDashboard.ejs")
        } catch (err) {
            next(err)
        }
    }

}

module.exports = new AdminDashboardController