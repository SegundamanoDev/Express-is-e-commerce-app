const router = require('express').Router()
const { requireLogin} = require('../middleware/auth')
const User = require('../models/usermodels')

router.get('/users',requireLogin,  async function(req, res){
    try {
        const user = await User.find().select('-password')
       
        res.status(200).json({user})
    } catch (error) {
        console.log(error)
       
    }
})

router.get('/user/:id',async function(req, res){
    try {
        const user = await User.findById(req.params.id).select('-password')
        res.status(200).json({user})
    } catch (error) {
        console.log(error)
        res.status(500).json(`no user found`)
    }
})

router.delete('/user/:id',requireLogin, async function(req, res){
    try {
        if (req.params.id === req.user.id){

            await User.findByIdAndDelete(req.params.id)
           res.status(200).json(`user has been deleted`)
        }else{
            res.status(500).json(`you can only delete your profile`)
        }
    } catch (error) {
        console.log(error)
        res.status(200).json(`no users available at the moment`)
    }
})

router.put('/user/update/:id',requireLogin, async function(req, res){
    try {
        if (req.params.id === req.user.id){

            await User.findByIdAndUpdate(req.params.id, {...req.body}, {new:true})
           res.status(200).json(`user has been updated`)
        }else{
            res.status(500).json(`you can only update your profile`)
        }
    } catch (error) {
        console.log(error)
        res.status(200).json(`no users available at the moment`)
    }
})


module.exports = router