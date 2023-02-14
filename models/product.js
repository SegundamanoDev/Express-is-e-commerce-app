const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    title:{type:String},
    description:{type:String},
    price:{type:Number},
    brand:{type:String},
    category:{type:String},
    Image:[{type:String}],
    cloudinary_id:{type:String},
    inStock:{type:Boolean, default:false},
    amountInStock:{type:Boolean, default:0},
    
},
{
    timestamps:true
});

const Product = mongoose.model('Product', productSchema)
module.exports = Product