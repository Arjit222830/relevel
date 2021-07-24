const express = require("express");
const router = express.Router();
const {signup,login} = require('../controllers/auth');

// Create routes for auth here

//user sign up route
router.post('/signUp',signup);

//user login Route
router.post('/login',login);

module.exports = router;
