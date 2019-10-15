const mongoose = require("mongoose");


let URI = 'mongodb://localhost/trung-doan';

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

