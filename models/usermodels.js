const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    firstname:{type:String},
    lastname:{type:String},
    email:{type:String},
    avatar:{type:String},
    cloudinary_id:{type:String},
    password:{type:String},
    googleId:{type:String},
    displayname:{type:String},
    isAdmin:{type:Boolean, default:false}
},
{
    timestamps:true
});

const User = mongoose.model('User', userSchema)
module.exports = User