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
    let user =  jwt.verify(token, cert, { algorithms: ['RS256'] });
    if(user.username) {
      res.user = user;
      return next();
    }
  } catch (error) {
    console.log(error);
    res.status(403).send(error);
  }
}


let checkOuthAdim = (req, res, next) => {
  console.log(res.user)
  if(res.user.type === 1) {
    return  next();
  }
  return res.status(403).send({
    status: "You don't hava fobid"
  })
}

let checkOuthMannager = (req, res, next) => {
  console.log(res.user)
  if(res.user.type <= 2) {
    return  next();
  }
  return res.status(403).send({
    status: "You don't hava fobid"
  })
}




module.exports = {
  checklogin,
  checkToken,
  checkOuthAdim,
  checkOuthMannager,
}