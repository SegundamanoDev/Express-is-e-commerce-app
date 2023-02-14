const Order = require('../models/order')
const Cart = require('../models/cart')
const router = require('express').Router()
const resolveOrderItems = require('../routes/cart')
const price = require('../routes/cart')


router.post('/create-order', async function(req, res){
    try {
       const order = new Order({
        userid:req.user.id,
        orderitems:resolveOrderItems,
        totalprice:price,
        address1:req.body.address1,
        address2:req.body.address2,
        zip:req.body.zip,
        country:req.body.country,
        phone:req.body.phone
       })
       res.status(200).send({order})
    } catch (error) {
        console.log(error);
    }
})

router.get('/my-orders', async function(req, res){
try {
    const myOrder = await Order.find({userid:req.user.id})
    if(myOrder) {
        res.status(200).send({myOrder})
    }else{
        res.status(500).send(`no oeder was created, please create one`)
    }
} catch (error) {
    console.log(error)
}
})

router.get('/orders', async function(req, res){
    try {
        const orders = await Order.find()
        if(orders) {
            res.status(200).send({orders})
        }else{
            res.status(500).send(`no orders`)
        }
    } catch (error) {
        console.log(error)
    }
    })

router.get('/order/:id', async function(req, res){
    try {
        const order = await Order.findById(req.params.id)
        if(order) {
            res.status(200).send({order})
        }else{
            res.status(500).send(`no order`)
        }
    } catch (error) {
        console.log(error)
    }
    })

    router.put('/update-orders', async function(req, res){
        try {
         const status = await Order.findByIdAndUpdate(req.params.id, {$set:req.body.status}, {new:true})

         res.status(200).send({status})
        } catch (error) {
            console.log(error)
        }
        })

        router.delete('/delete-orders', async function(req, res){
            try {
              const order = await Order.findByIdAndDelete(req.params.id)
              if (order){
                  await Cart.findByIdAndDelete(req.params.id)
                      res.status(200).send(`order has been deleted`)
              }
            } catch (error) {
                console.log(error)
            }
            })

module.exports = router