const Controller = require("../controller")
const User= require("../../models/users/userModel")
const {body, validationResult}= require("express-validator")
const passport= require("passport");
const Recaptcha= require("express-recaptcha").RecaptchaV2
const options= {"h1":"fa"};
const recaptcha= new Recaptcha("6LenSqgiAAAAACHuWioZLb6VIpJXXs_OX97299pa", "6LenSqgiAAAAAFb_mIKG8tZXRPi72MsjOUTO3axe", options)
class authController extends Controller{
    async registerForm(req,res,next){
        try {
            res.render("authentication/register.ejs")
        } catch (err) {
            next(err)
        }
    }

    async loginForm(req,res,next){
        try {
            res.render("authentication/login.ejs")        
        } catch (err) {
            next(err)
        }
    }

    async register(req,res,next){
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                req.flash("errors", errors.array())
                return res.redirect("/auth/register");
            }
        passport.authenticate("local-register", {
            successRedirect: "/dashboard",
            failureRedirect: "/auth/register",
            failureFlash: true,
        })(req, res, next)
        } catch (err) {
            next(err)
        }
    }

    async login(req,res,next){
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                req.flash("errors", errors.array())
                return res.redirect("/auth/login");
            }
            passport.authenticate("local-login", (err, user)=>{
                if(!user) return res.redirect("/auth/login")
                req.logIn(user,err=>{ return res.redirect("/dashboard")})
            })(req,res,next)

        } catch (err) {
            next(err)
        }
    }
    
}

module.exports=new authController;