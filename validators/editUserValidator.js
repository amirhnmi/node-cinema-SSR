const Validator= require("./validator");
const {body, check}= require("express-validator")
const path= require("path")

class editUserValidator extends Validator{
    validate(){
        return [
            body("username", "فیلد نام کاربری نمیتواند خالی باشد").notEmpty(),
            body("avatar","وجود تصویر الزامیست").notEmpty(),
        check("avatar").custom(async value=> {
          if(!value){
            return
          }
          if([".jpg",".jpeg",".png"].includes(path.extname(value))){
              throw new Error("پسوند فایل اپلود شده صحیح نیست")
          }
         })
        ] 
    }
}

module.exports=new editUserValidator;