const Controller = require("../controller")
const {validationResult}= require("express-validator")

const User = require("../../models/users/userModel");


class UserController extends Controller{
    async getUser(req,res,next){
        try {
            let users= await User.find({}); 
            res.render("users/users.ejs",{users: users})
        } catch (err) {
            next(err)
        }
    }

    async getOneUser(req,res,next){
        try {
            const user =await  User.findOne({_id: req.params.id})
            if(!user){
                this.error("چنین کاربری یافت نشد", 404)
            }
            res.render("users/user.ejs", {user: user})
        } catch (err) {
            next(err)
        }
    }

    async createUser(req,res,next){
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                req.flash("errors", errors.array())
                return res.redirect("/user");
            }
        
            req.body.id = parseInt(req.body.id);
            let newUser= new User({
                username: req.body.username,
                email: req.body.email,
                phone_number: req.body.phone_number,
                password: req.body.password
            })
            await newUser.save()
            req.flash("message", "کاربر مورد نظر با موفقیت اضافه شد")
            return res.redirect("/user");
        } catch (err) {
            next(err)
        }
    }

    async updateUser(req,res,next){
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                req.flash("errors", errors.array())
            return res.redirect("/user");
            }
        
            await User.findByIdAndUpdate(req.params.id, {
                username: req.body.username,
                email: req.body.email,
                phone_number: req.body.phone_number,
                password: req.body.password
            })
            req.flash("message", "کاربر مورد نظر با موفقیت به روزرسانی شد")
            res.redirect("/user")
        } catch (err) {
            next(err)
        }
    }

    async deleteUser(req,res,next){
        try{
            await User.findByIdAndRemove(req.params.id)
            req.flash("message", "کاربر مورد نظر با موفقیت حذف شد")
            return res.redirect("/user")
        } catch(err) {
            next(err)
        } 
            

    }
}

module.exports = new UserController