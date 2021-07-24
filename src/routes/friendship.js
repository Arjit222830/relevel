const express = require("express");
const router = express.Router();
const {protect} = require('../middlewares/auth');
const {addFriend, getFriends, removeFriend} = require('../controllers/friendship');

// Create routes for friendship here

//get friend lists
router.get('/friends',protect, getFriends);

//add friend
router.post('/addFriend/:id/:friendId',addFriend);
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFyaml0YmhhbmRhcmkyMjI4MzBAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkWGllTE9JZFFFZ1MzZkp1b2V1b1BwZWd6NTJBbjhDWkJnOHRSWXVDa1ZxWDRRS2RSTGVwZkciLCJpYXQiOjE2MjcxMTU2NTZ9.XhNX3wHuT76KSWlc295zRMYDHFCYPHZ-v29g3s7ySQk

//remove friend
router.delete('/remove-friend',removeFriend);

module.exports = router;
