const mongoose = require("mongoose");


let URI = 'mongodb://trung-doan:trung-doan@ds137508.mlab.com:37508/heroku_gv549r6m';

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

