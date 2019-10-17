const jwt = require('jsonwebtoken');
const path = require("path");
const fs = require("fs");
const User = require("./../models/User");

let getlogin = async (req, res) => {
  res.render("user/login");  
}

let postLogin = async (username, password) => {
  return new Promise( async (resolve, reject) => {
    try {
      let user = await User.findOne({
        username, 
        password
      }, {password: 0}).exec();
      
      if (user) {
        const privateKey = fs.readFileSync(path.join(__dirname, "../key.pem"));
        const token = jwt.sign({user}, privateKey, { algorithm: 'RS256'});    
        resolve(token);
      }
    } catch (error) {
      console.log(error)
      reject(error);
    }
  })
}

let logout = async (req, res) => {
  req.session.user = null;
  res.redirect("/user/login");
}

module.exports = {
  getlogin,
  postLogin,
  logout
}

