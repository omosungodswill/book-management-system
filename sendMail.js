const nodeMailer = require("nodemailer");
require("dotenv").config()
const thing = require("./db");
const registerRouter = require("./register");
const receiver = thing.User
const pass = process.env.APP_PASSWORD
const transporter = nodeMailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'gmangodswill@gmail.com',
        pass: process.env.APP_PASSWORD
    },
});

const mailOptions = {
    from: {
        name: 'Book Management',
        address: pass
    },
    to: receiver,
    subject: "Welcome to your.... DOOM",
    text: "Congrats on creating a new account", 
    html: "<b>Congrats on creating a new account</b>"
}

const sendMail = async (transporter, mailOptions) => {
    try {
        registerRouter
        await transporter.sendMail(mailOptions);
        console.log("Email has been sent")
    
    } catch(error) {
        console.error(error)
    }
}


module.exports = sendMail;