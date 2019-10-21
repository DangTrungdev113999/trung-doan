const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");

let checklogin = (req, res, next) => {
  if (req.session.user) {
    return  next();
  };
  return res.redirect("/user/login");
}

let checkToken = (req, res, next) => {
  try {
    let token = req.headers.token;

    const cert = fs.readFileSync(path.join(__dirname, "../cert.pem"));
    let payload =  jwt.verify(token, cert, { algorithms: ['RS256'] });
    if(payload.user.username) {
      res.user = payload.user;
      return next();
    }
  } catch (error) {
    console.log(error);
    res.status(403).send({
      status: false,
      message: error
    });
  }
}

let checkOuthAdim = (req, res, next) => {
  if(res.user.type === 1) {
    return  next();
  }
  return res.status(403).send({
    status: false,
    message: "You don't have Permission!"
  })
}

let checkOuthMannager = (req, res, next) => {
  if(res.user.type <= 2) {
    return  next();
  }
  return res.status(403).send({
    status: false,
    message: "You don't have Permission!"
  })
}

module.exports = {
  checklogin,
  checkToken,
  checkOuthAdim,
  checkOuthMannager,
}