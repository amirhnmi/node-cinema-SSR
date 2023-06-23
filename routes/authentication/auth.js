const express = require("express");
const router = express.Router();

//controller
const authenticationController= require("../../controllers/authenticationController/authController")

//validator
const authenticationValidator= require("../../validators/authenticationValidator")

router.use((req,res,next)=>{
    if(req.isAuthenticated()){
        return res.redirect("/dashboard")
    }
    next()
})

router.get("/login", authenticationController.loginForm);
router.get("/register", authenticationController.registerForm);

router.post("/login", authenticationValidator.login() ,authenticationController.login);
router.post("/register", authenticationValidator.register() ,authenticationController.register);

module.exports= router;
