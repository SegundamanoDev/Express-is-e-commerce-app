const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    userid:{type:mongoose.Schema.Types.ObjectId, ref:'User'},
    orderitems:[{type:mongoose.Schema.Types.ObjectId, ref:'Product'}],
    totalprice:{type:Number},
    address1:{type:String},
    address2:{type:String},
    zip:{type:String},
    country:{type:String},
    status:{type:Boolean, default:'pending'},
    phone:{type:String},
    
},
{
    timestamps:true
});

const Order = mongoose.model('Order', orderSchema)
module.exports = Order