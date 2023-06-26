const Validator= require("./validator");
const {body, check}= require("express-validator")
const path= require("path")

class CategoryImageValidator extends Validator{
    validate(){
        return [
            body("image","وجود تصویر الزامیست").notEmpty(),
            check("image").custom(async value=> {
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

module.exports=new CategoryImageValidator;