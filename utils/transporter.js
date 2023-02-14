const nodemailer = require('nodemailer')

exports.sendEmails = async function(options){
    const transporter = nodemailer.createTransport({
        service:process.env.NODEMAILER_SERVICE,
        auth:{
            user:process.env.NODEMAILER_USER,
            pass:process.env.NODEMAILER_PASS
        }
    })
    const mailOptions ={
        from:process.env.NODEMAILER_USER,
        to:options.email,
        subject:options.subject,
        html:options.text
    }
    await transporter.sendMail(mailOptions)
}