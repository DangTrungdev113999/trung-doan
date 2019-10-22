const mongoose = require("mongoose");


// let URI = 'mongodb://trung-doan:trung-doan@ds137508.mlab.com:37508/heroku_gv549r6m';
let URI = 'mongodb://heroku_gv549r6m:7ahk2k3c3cgt93437ipuggdcf3@ds137508.mlab.com:37508/heroku_gv549r6m';

let connectDB = async () => {
  try {
    mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  } catch (error) {
    console.log(error)
  }
}

module.exports = connectDB;

