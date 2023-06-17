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
                throw new Error("چنین کاربری یافت نشد")
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
                throw new Error("validation eeror")
            }
        
            req.body.id = parseInt(req.body.id);
            let newUser= new User({
                username: req.body.username,
                email: req.body.email,
                phone_number: req.body.phone_number,
                password: req.body.password
            })
            await newUser.save()
            return res.redirect("/user");
        } catch (err) {
            next(err)
        }
    }

    async updateUser(req,res,next){
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw new Error("validation eeror")
            }
        
            await User.findByIdAndUpdate(req.params.id, {
                username: req.body.username,
                email: req.body.email,
                phone_number: req.body.phone_number,
                password: req.body.password
            })
            res.redirect("/user")
        } catch (err) {
            next(err)
        }
    }

    async deleteUser(req,res,next){
        try{
            await User.findByIdAndRemove(req.params.id)
        } catch(err) {
            next(err)
        } 
            

    }
}

module.exports = new UserController