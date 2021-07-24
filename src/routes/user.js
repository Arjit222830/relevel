const express = require("express");
const router = express.Router();
const {searchUser} = require('../controllers/user');
const {protect} = require('../middlewares/auth');

// Create routes for user here

//search route
router.post('/search',protect,searchUser);


module.exports = router;
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFyaml0YmhhbmRhcmkyMjI4MzBAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkWGllTE9JZFFFZ1MzZkp1b2V1b1BwZWd6NTJBbjhDWkJnOHRSWXVDa1ZxWDRRS2RSTGVwZkciLCJpYXQiOjE2MjcxMTg0OTh9._u7-h1ZR6vv7_CDBudrvzlDoFEGbbdYp0r22RGWCqG0