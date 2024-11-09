const {User, validateUser} = require('./db')
const mail = require('./sendMail')
const bcrypt = require('bcrypt')
const express = require('express');


const app = express();
app.set('view engine', 'ejs')
const registerRouter = app.post('/register', async(req, res)=> {
    const {error} = validateUser(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    } 
    let user = await User.findOne({email: req.body.email})
    if (user) {
        return res.status(400).send('User already exists. Please sign in')
    }
    else {
        try {
            const salt = await bcrypt.genSalt(10)
            const password = await bcrypt.hash(req.body.password, salt)
            const user = new User({
                username: req.body.username,
                email: req.body.email,
                password: password
            })
            user.save();
            await mail()
        } catch (err) {
            return res.status(400).json({ message: err.message })
        }res.render('home')
    }
})

module.exports = registerRouter;