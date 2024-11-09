// const {name} = require('ejs');
const mongoose = require('mongoose');
const Joi = require('joi')
require("dotenv").config();
const db_url=process.env.db_url
const connect = async () => {mongoose.connect(db_url)
.then(() => {
    console.log('Connected to MongoDB');
})
.catch(err => {
console.error('Connection error', err);
});}

const userSchema = new mongoose.Schema({
    username:   {type: String, required: true},
    email:      {type: String, required: true, unique: true},
    password:   {type: String, required: true}
}, {timestamps: true});


function validateUser(user) {
    const schema = Joi.object({
        username: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required()
    })
    return schema.validate(user)
}

const User = mongoose.model('User', userSchema)

module.exports = {connect, User, validateUser};