// const mongoose = require('mongoose')
// const User = require('../models/usermodels')
// const passport = require('passport')
// const GoogleStrategy = require('passport-google-oauth20').Strategy


// passport.use(new GoogleStrategy({
//     clientID:process.env,
//     clientSecret:process.env,
//     callbackURL:process.env,
// },
// async function(accessToken, refreshToken, profile, cb){
//     const newUser = {
//         googleId: profile.id,
//         displayname: profile.displayname,
//         firstname:profile.name.givenName,
//         lastname:profile.name.familyName,
//         image:profile.photos[0].value
//     }

//     try {
//         const user = await User.findOne({googleId:profile.id})
//         if(user){
//             cb(null, user)
//         }else{
//             user = await User.create(newUser)
//             cb(null, user)
//         }
//     } catch (error) {
//         console.log(error)
//     }
// }
// ))

// passport.serializeUser(function(user, cb){
//     cb(null, user.id)
// })

// passport.deserializeUser(async function(id, cb){
//    await User.findById(id,function(error, user){
//     cb(error, user)
//    })
// })
