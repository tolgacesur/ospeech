const mongoose = require('mongoose')
const Joi = require('joi')
const jwt = require('jsonwebtoken');
const config = require('../../config')

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true }, 
    password: { type: String,  required: true },
    email: {type: String, required: true}
  });

  UserSchema.methods.generateAuthToken = function() { 
    const token = jwt.sign({ _id: this._id}, config.secretKey); 
    return token;
  }

const User = mongoose.model('User', UserSchema)

function validateUser(user) {
    const schema = {
        username : Joi.string().required(),
        password : Joi.string().required(),
        email : Joi.string().required().email()
    }
    return Joi.validate(user,schema)
}
exports.User = User;
exports.validate = validateUser; 

