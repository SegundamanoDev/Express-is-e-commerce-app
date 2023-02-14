const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config({path: './config/config.env'})
const cookieParser = require('cookie-parser')
const auth = require('./routes/authroute')
const user = require('./routes/userroute')
const order = require('./routes/order')
const morgan = require('morgan')
// const passport = require('passport')
// const { session } = require('passport')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
app.use(auth)
app.use(user)
app.use(order)
app.use(morgan('dev'))



// app.use(session({
//     secret: 'omo',
//     resave:false,
//     saveUninitialized:false
// }))

// app.use(passport.initialize())
// app.use(passport.session())





const URL = process.env.MONGO_URL
try {
    mongoose.connect(URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    },
    console.log(`MongoDB connected`)
    )
} catch (error) {
    console.log(error)
    process.exit(1)
}

const PORT = process.env.PORT||300
app.listen(PORT, function(){
    console.log(`Server is running on port ${PORT}`)
})