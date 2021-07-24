const mongoose = require('mongoose');

const connectToDb =  () => {
    mongoose.connect(process.env.db,{useNewUrlParser: true,useUnifiedTopology: true})
        .then(()=> console.log(`Connected to ${process.env.db}...`))
        .catch(err => console.log(`Could not connect to ${process.env.db}...`,err));
};

module.exports = connectToDb;
