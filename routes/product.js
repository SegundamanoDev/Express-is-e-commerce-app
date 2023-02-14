const upload = require('../utils/multer')
const cloudinary = require('../utils/cloudinary')
const Product = require('../models/product')
const router = require('express').Router()

router.post('/create-product', upload.single('image'), async function(req, res){
    try {
        const result = await cloudinary.uploader.upload(req.file.path)
        const product = new Product({
            title:req.body.title,
            description:req.body.description,
            price:req.body.price,
            brand:req.body.brand,
            category:req.body.category,
            image:result.secure_url,
            cloudinary_id:result.public_id
        })
        await product.save()
        res.status(200).send({product})
    } catch (error) {
        console.log(error)
    }
})

router.get('/products', async function(req, res){
    try {
        const product = await Product.find()
        res.status(200).send({product})
    } catch (error) {
        console.log(error)
    }
})

router.get('/product/:id', async function(req, res){
    try {
        const product = await Product.find({id:req.params.id})
        res.status(200).send({product})
    } catch (error) {
        console.log(error)
    }
})

router.put('/product-update',upload.array('image',10), async function(req, res){
    try {
        const result = await cloudinary.uploader.upload(req.files.path)
        const product = await Product.find({id:req.params.id})
        if (!product) {
            return res.status(500).send(`product not found`)
        }
        const newProduct = await Product.findByIdAndUpdate(
            req.params.id,
             {title:req.body.title,
                description:req.body.description,
                price:req.body.price,
                brand:req.body.brand,
                category:req.body.category,
                image:result.secure_url,
                cloudinary_id:result.public_id

        },
        {new:true}
        
        )
        await newProduct.save()
        res.status(200).send({newProduct})
    } catch (error) {
        console.log(error)
    }
})


router.delete('/delete-product/:id', async function(req, res){
    try {
     const product = await Product.find({id:req.params.id})
     if(!product) {
        res.status(500).send(`product does not exist`)
     }

     for (i=0; i<product.image.length; i++){
        await cloudinary.uploader.destroy(product.image[i].public_id)
     }
     await product.remove()
     //OR
     const imageId = product.image.public_id;
     await cloudinary.uploader.destroy(imageId)
     await Product.findByIdAndDelete(req.params.id)

     res.status(200).send(`product has been removed`)
    } catch (error) {
        console.log(error)
    }
})



module.exports = router