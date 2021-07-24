// User Model
const mongoose =require('mongoose');

//Schema for user model
const User= mongoose.model('users', new mongoose.Schema({
    name: {
        type: String
    },
    email:{
        type: String,
        unique: true,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    contact: {
        type: Number
    },
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }]
},{  timestamps: true }
));

module.exports = User;