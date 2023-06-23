const passport= require("passport");
const localStrategy= require("passport-local").Strategy;
const User= require("../models/users/userModel");
const bcrypt= require("bcryptjs")

// id user ro ramznegari mikone va dar browser karbar zakhire mikone
passport.serializeUser((user,done)=>{
    done(null, user.id)
})


// barax serialize hast. cookie ra az browser karbar migire va decode mikone
passport.deserializeUser(async(id, done)=>{
    let user= await User.findById(id);
    if(user) done(null, user)
})

passport.use("local-register", new localStrategy(
    {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
    }, async(req, email, password, done)=>{
        try {
            let user= await User.findOne({email: req.body.email});
            if(user) {
                return done(null, false, req.flash("message", "این ایمیل قبلا ثبت نام شده است"))
            }
            const newUser= new User({
                username: req.body.username,
                email: req.body.email,
                phone_number: req.body.phone_number,
                password: bcrypt.hashSync(req.body.password, 8),
            });

            await newUser.save()
            done(null, newUser)
        } catch (error) {
            return done(error, false, {message: error})
        }
    }
))

passport.use("local-login", new localStrategy(
    {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
    }, async(req, email, password, done)=>{
        try {
            let user= await User.findOne({email: req.body.email});
            if(!user || !bcrypt.compareSync(req.body.password, user.password)){
                return done(null, false, req.flash("message","ایمیل یا کلمه عبور نادرست است"))
            }
            done(null, user)
        } catch (error) {
            return done(error, false, {message: error})
        }
    }
        

))