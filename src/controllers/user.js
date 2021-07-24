const User = require('../models/User');

exports.register = async (req, res, next) => {}; // Controller to register a user

exports.getUser = async (req, res, next) => {}; // Controller to read the user

exports.getAllUsers = async (req, res, next) => {}; // Controller to get all the users

exports.searchUser = async (req, res, next) => {
    const users = await User.find({name:req.body.name}); 

    if(users.length==0)
        return res.status(404).send({});

    var usersname= []; //contain name of user

    for await (let user of users)
        usersname.push(user.name);

    res.status(200).send(usersname);
}; // Controller to search the user
