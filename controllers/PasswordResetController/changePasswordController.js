const Controller = require("../controller")
const User = require("../../models/users/userModel")
const bcrypt= require("bcryptjs")



class ChangePasswordController extends Controller{
    async changePasswordForm(req,res,next){
        try {
            const token = req.params.token;
            res.render("passwordReset/changePassword.ejs",{token})
        } catch (err) {
            next(err)
        }
    }

    async changePassword(req,res,next){
        try {
            const password = req.body.password
            const token = req.body.token
            const user = await User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });

            if (!user) {
              req.flash("errors",'توکن ارسال شده نامعتبر است یا منقضی شده.لطفا مجدد ایمیل را بفرستید');
              return res.redirect("/auth/forget_password")
            }
        
            user.password = bcrypt.hashSync(password, 8);
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;
        
            await user.save();

            req.flash("message",'کلمه عبور شما با موفقیت تغییر کرد');
            return res.redirect("/auth/login")
        } catch (err) {
            next(err)
        }
    }

}

module.exports = new  ChangePasswordController