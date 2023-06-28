const Controller = require("../controller")
const {validationResult}= require("express-validator")
const User = require("../../models/users/userModel")
const nodemailer = require('nodemailer');
const crypto = require('crypto');


class ForgetPasswordController extends Controller{
    async forgetPasswordForm(req,res,next){
        try {
            res.render("passwordReset/forgetPassword.ejs")
        } catch (err) {
            next(err)
        }
    }

    async forgetPassword(req,res,next){
        try {
            const email = req.body.email
            const user = await User.findOne({ email });

        if (!user) {
            req.flash("errors",'کاربری با این ایمیل یافت نشد');
            return res.redirect("/auth/forget_password")
        }

        const token = crypto.randomBytes(20).toString('hex');
        const expires = Date.now() + 3600000; // 1 hour
        user.resetPasswordToken = token;
        user.resetPasswordExpires = expires;

        const result = await user.save();

        const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.GMAIL_USERNAME,
            pass: process.env.GMAIL_PASSWORD,
        },
        });

        const mailOptions = {
        to: email,
        subject: 'سینماتیکت | تغییر کلمه عبور',
        text: `Hi there,

        You recently requested to reset your password for our application. Click on the link below to reset it:

        http://127.0.0.1:5000/auth/change_password/${token}

        If you did not request a password reset, please ignore this email.

        Thanks,
        The Application Team
            `,
            };

        await transporter.sendMail(mailOptions);

        req.flash("message",'ایمیل تغییر کلمه عبور ارسال شد');
        return res.redirect("/auth/forget_password")
        } catch (err) {
            next(err)
        }
    }

}

module.exports = new ForgetPasswordController