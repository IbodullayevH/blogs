const mongoose = require("mongoose");
require("dotenv").config();  

const mongo = () => {
    return mongoose.connect(process.env.MONGO_URL);
};

module.exports = mongo;
