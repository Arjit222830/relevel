const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User= require('../models/User');
const {protect} = require('../middlewares/auth');

// Create routes for user here

//user sign up route
router.post('/signUp',async (req,res)=>{

    const uniqueUser = await User.findOne({email:req.body.email}); 

    if(uniqueUser)
        return res.status(404).send('User already Registered');

    const hash = bcrypt.hashSync(req.body.password, 10);

    const user = new User({...req.body,password:hash});
     
    await user.save();
    res.send('User Sign Up Successful');
});

//user login Route
router.post('/login',async(req,res)=>{

    const user = await User.findOne({email:req.body.email}); 

    if(!user)
        return res.status(404).send({});
    
    const checkPassword= bcrypt.compareSync(req.body.password, user.password);
    
    if(!checkPassword)
        return res.status(404).send({});
    
    const token = jwt.sign({email: user.email , password: user.password} , process.env.jwtPrivateKey);

    res.status(200).send(token);
});

//search route
router.post('/search',protect,async(req,res)=>{

    const users = await User.find({name:req.body.name}); 

    if(users.length==0)
        return res.status(404).send({});

    var usersname= []; //contain name of user

    for await (let user of users)
        usersname.push(user.name);

    res.status(200).send(usersname);
});


module.exports = router;
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFyaml0YmhhbmRhcmkyMjI4MzBAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkWGllTE9JZFFFZ1MzZkp1b2V1b1BwZWd6NTJBbjhDWkJnOHRSWXVDa1ZxWDRRS2RSTGVwZkciLCJpYXQiOjE2MjcxMTg0OTh9._u7-h1ZR6vv7_CDBudrvzlDoFEGbbdYp0r22RGWCqG0