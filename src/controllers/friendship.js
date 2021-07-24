const User = require('../models/User');

exports.addFriend = async (req, res, next) => {
    const user = await User.findByIdAndUpdate(req.params.id,{
        $push : {
            friends: req.params.friendId
        }
    });

    if(!user)
        return res.status(404).send({});

    res.send(user);
}; // Request to add a friend

exports.getFriends = async (req, res, next) => {
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

} // Request to get friends

exports.removeFriend =async (req, res, next) => {
    
    const user1 = await User.findOne({name: req.body.user1});

    if(!user1)
        return res.status(404).send('Username Not Found');

    const user2 = await User.findOne({name: req.body.user2});
    
    await User.findByIdAndUpdate(user1._id,{
        $pull:{
            friends: {
                $in: user2._id
            }
        }
    });

    res.status(201).send(`Removed ${req.body.user2} from friends`);

} // Request to remove a friend
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFzQGZkbWtjLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJDdXTnJ0SGFhaFhhdXUwYXVXVjI4UmU5SEFnRi41aWc1ZFoyMGNVYXpMTU5QakI2bFh6TDJxIiwiaWF0IjoxNjI3MTI0OTc0fQ.JlMSSCxZJp3KKUM4u4b3uaFL4Tb