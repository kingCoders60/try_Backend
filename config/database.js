const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = () => {
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true, // Fixed typo: 'userNewUrlParser' to 'useNewUrlParser'
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("DB Connected Successfully!!!");
    })
    .catch((err) => { // Fixed variable name from 'er' to 'err'
        console.log("DB connection issues!!!");
        console.error(err);
        process.exit(1); // Fixed 'console.exit' to 'process.exit'
    });
}