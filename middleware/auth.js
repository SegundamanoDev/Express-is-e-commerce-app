const jwt = require('jsonwebtoken')

exports.requireLogin = function(req, res, next){
    const {token} = req.cookies
    if(!token){
        return res.status(500).send(`not authorized, no token`)
    }

    try {
    const user = jwt.verify(token, process.env.JWT_SECRET)
    req.user = user
    
} catch (error) {
        console.log(error)
}
next()
}

 exports.adminUser = function(req, res, next){
    try {
        if (req.user && req.user.isAdmin === 'true'){
            next()
        }else{
            res.status(500).send(`you are not authrized to do this`)
        }
    } catch (error) {
        console.log(error);
    }
 }


 exports.rightUser = function(req, res, next){
    try {
        if (req.params.id === req.user.id) {
            next()
        }else{
            res.status(500).send(`you can only make change to your profile or post`)
        }
    } catch (error) {
        console.log(error);
    }
 }