const express = require("express");
const router = express.Router();
const User= require('../models/User');
const {protect} = require('../middlewares/auth');

// Create routes for friendship here

router.get('/friends',protect, async function(req,res){
    
    if(!req.query.name)
        return res.status(404).send('Please mention query with name');

    const user= await User.findOne({name: req.query.name}).populate('friends');
    
    if(!user)
        return res.status(404).send({});
    
    var friendsList = [];// contains friendList
    for await (let friend of user.friends)
        friendsList.push(friend.name);
    friendsList.sort();
    res.status(200).send(friendsList);
});

router.post('/addFriend/:id/:friendId',async(req,res)=>{

    const user = await User.findByIdAndUpdate(req.params.id,{
        $push : {
            friends: req.params.friendId
        }
    });

    if(!user)
        return res.status(404).send({});

    res.send(user);
});
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFyaml0YmhhbmRhcmkyMjI4MzBAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkWGllTE9JZFFFZ1MzZkp1b2V1b1BwZWd6NTJBbjhDWkJnOHRSWXVDa1ZxWDRRS2RSTGVwZkciLCJpYXQiOjE2MjcxMTU2NTZ9.XhNX3wHuT76KSWlc295zRMYDHFCYPHZ-v29g3s7ySQk

module.exports = router;
