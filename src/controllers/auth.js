const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.signup = async (req, res, next) => {

    const uniqueUser = await User.findOne({email:req.body.email}); 

    if(uniqueUser)
        return res.status(404).send('User already Registered');

    const hash = bcrypt.hashSync(req.body.password, 10);

    const user = new User({...req.body,password:hash});
     
    await user.save();
    res.send('User Sign Up Successful');
}; // Controller for signup

exports.login = async (req, res, next) => {
    const user = await User.findOne({email:req.body.email}); 

    if(!user)
        return res.status(404).send({});
    
    const checkPassword= bcrypt.compareSync(req.body.password, user.password);
    
    if(!checkPassword)
        return res.status(404).send({});
    
    const token = jwt.sign({email: user.email , password: user.password} , process.env.jwtPrivateKey);

    res.status(200).send(token);
};  // Controller for login

