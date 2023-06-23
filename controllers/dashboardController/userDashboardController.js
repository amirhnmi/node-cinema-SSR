const Controller = require("../controller")
const {validationResult}= require("express-validator")


class UserDashboardController extends Controller{
    async dashboard(req,res,next){
        try {
            res.render("dashboard/userDashboard.ejs")
        } catch (err) {
            next(err)
        }
    }

}

module.exports = new UserDashboardController