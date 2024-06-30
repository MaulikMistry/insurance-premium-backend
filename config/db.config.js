const { default: mongoose } = require("mongoose");
require('dotenv').config();

const url = process.env.ATLAS_URI   

mongoose.connect(url,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);
let db = mongoose.connection;

module.exports = db
