require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const userRoutes = require('./routes/user');
const friendshipRoutes = require('./routes/friendship');

const app = express();

//check for jwt key
if(!process.env.jwtPrivateKey){
  console.error('Fatal error: jwtPrivateKey is not defined.');
  process.exit(1);
}

//database connection
require('./utils/db')();

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

//connect to different rutes
app.use('/',userRoutes);
app.use('/',friendshipRoutes);

// sample for express server

const PORT = process.env.PORT || 8080; // port at which server listening

app.listen(
  PORT,
  console.log(`server started in ${process.env.NODE_ENV} mode at port ${PORT}`)
);
