const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    email : {type:String, required:true, unique:true},
    username : {type:String, required:true},
    first_name : {type:String, default:undefined},
    last_name : {type:String, default:undefined},
    avatar : {type:String, default:undefined},
    phone_number : {type:Number,required:true},
    password : {type:String, required:true},
    is_admin : {type:Boolean, default:false},
    regiser_date : {type:Date, default:Date.now()},
    login_date : {type:Date, default:Date.now()},
    resetPasswordToken : {type:String, default:undefined},
    resetPasswordExpires : {type:String, default:undefined}
})

const User = mongoose.model("User", userSchema)

module.exports = User