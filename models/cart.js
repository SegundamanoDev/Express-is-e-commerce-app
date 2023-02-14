const mongoose = require('mongoose')

const cartSchema = mongoose.Schema({
    product:[{type:mongoose.Schema.Types.ObjectId, ref:'Product'}],

    quantity:[{type:Number, default:0}],
    
},
{
    timestamps:true
});

const Cart = mongoose.model('Cart', cartSchema)
module.exports = Cart 