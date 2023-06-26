const Controller = require("../controller")
const {validationResult}= require("express-validator")
const User = require("../../models/users/userModel")


class UserDashboardController extends Controller{
    async dashboard(req,res,next){
        try {
            res.render("userDashboard/userDashboard.ejs")
        } catch (err) {
            next(err)
        }
    }

    async edituser(req,res,next){
        try {
            const errors= validationResult(req);
            if(!errors.isEmpty()){
              req.flash("errors", errors.array()) 
              return res.redirect("/dashboard");
           }
           let data= {
            username : req.body.username,
           }
           if(req.file){
            data.avatar = req.file.path.replace(/\\/g,"/").substring(6)
           }
           await User.updateOne({_id : req.user.id} , {$set : data})
           res.redirect("/dashboard")
        } catch (err) {
            next(err)
        }
    }

}

module.exports = new UserDashboardController