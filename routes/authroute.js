const router = require('express').Router()
const User = require('../models/usermodels')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const sendEmails = require('../utils/transporter')
const cloudinary = require('../utils/cloudinary')
const upload = require('../utils/multer')
const { requireLogin } = require('../middleware/auth')
// const passport = require('passport')

router.post('/signup', upload.single('image'), async function(req, res){
    try{
        const existingUser = await User.findOne({email:req.body.email})
        if(existingUser) {
            res.status(500).json(`email already been register`)
        }

        const result = await cloudinary.uploader.upload(req.file.path)
        const hash = await bcrypt.hash(req.body.password, 12)
       
        const user = new User({
            firstname:req.body.firstname,
             lastname:req.body.lastname,
            email:req.body.email,
            password:hash,
            avatar:result.secure_url,
            cloudinary_id:result.public_id
            })
        await user.save() 
        console.log(user)
        res.status(200).json({status:'success', data:{user}})
    
    } catch (error) {
        console.log(error)
    }
})




router.post('/signin', async function(req, res){
   const {email, password} = req.body;
   try {
    const user = await User.findOne({email}).select('+password')
    if(user && (await bcrypt.compare(password, user.password))){
        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)
        res.status(200).cookie('token', token, {httpOnly:true}).json({token})
    }
   } catch (error) {
    console.log(error)
   }
})


router.delete('/signout', async function(req, res){
    try {
    res.clearCookie('token', '')
    .send(`you have been logged out`)
    } catch (error) {
     console.log(error)
    }
 })

router.put('/forgot-password', async function(req, res){
    const {email} = req.body;
    try {
    const user = await User.findOne({email})
    if (user) {
        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn:'1hr'})
        const url = `${req.protocol}://${req.get('host')}/reset-password/${token}`

        await sendEmails({
            to:user.email,
            subject:`Reset your password`,
            html:`<p>click on this link to reset your password <a href='${url}'>${url}</a></p>`
        })
        res.status(200).send(`a reset link has been sent to ${email}`)

    }else{
        res.status(500).send(`user not found`)
    }
    } catch (error) {
     console.log(error)
    }
 })


 router.put('/reset-password/:token', async function(req, res){
    try {
        
   
    const {id} = jwt.verify(req.params.token, process.env.JWT_SECRET)
    if (id) {
        const {newPassword, confirmPassword} = req.body;
        if (newPassword === confirmPassword) {
            newPassword = await bcrypt.hash(newPassword, 12)
        }
        await User.findByIdAndUpdate(id,{...req.body, password:newPassword}, {new:true})
        
        res.status(200).json(`password has been upated`)
    }
} catch (error) {
    console.log(error)
}
 })

 router.put('/change-password',requireLogin, async function(req, res){
    const {oldPassword} = req.body;
    try {
        const user = await User.findById(req.user.id).select('+password')
        if (user && (await bcrypt.compare(oldPassword, user.password))) {
            const {newPassword , confirmPassword} = req.body;
            if (newPassword === confirmPassword) {
                newPassword = await bcrypt.hash(newPassword, 12)
            }
            user.password = newPassword;
            await user.save()
            res.status(200).send(`password has been changed successfully`)
        }
    } catch (error) {
        console.log(error)
    }
 })

module.exports = router