const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    email : {type:String, required:true, unique:true},
    username : {type:String},
    first_name : {type:String},
    last_name : {type:String},
    avatar : {type:String},
    phone_number : {type:Number },
    password : {type:String, required:true},
    is_admin : {type:Boolean, default:false},
    regiser_date : {type:Date, default:Date.now()},
    login_date : {type:Date, default:Date.now()},
})

const User = mongoose.model("User", userSchema)

module.exports = User