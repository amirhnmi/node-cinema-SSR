const Validator= require("./validator");
const {body, validationResult}= require("express-validator")

class UserValidator extends Validator{
    validate(){
        return [
            body("username", "فیلد نام کاربری نمیتواند خالی باشد").notEmpty(),
            body("email", "ایمیل صحیح نیست").isEmail(),
            body("password", "رمزعبور باید حداقل 5 کاراکتر داشته باشد").isLength({min: 5})
        ] 
    }
}

module.exports=new UserValidator;