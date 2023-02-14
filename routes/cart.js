const Cart = require('../models/cart')

        exports.resolveOrderItems = await Promise.all(orderitems.map(async function(items){
            const newOrderItemsId = new Cart({
                product: items.product,
        
                quantity: items.quantity
            })
            await newOrderItemsId.save()
            return newOrderItemsId._id
        }))
  
        exports.price = await Promise.all(resolveOrderItems.map(async function(id){
            const everyItems = await Cart.findById(id)
            const priceAndQuantity = everyItems.price*everyItems.quantity
            return priceAndQuantity;
        }))
        const total = price.reduce(function(a,b){
            a+b
            return total
        })

        
