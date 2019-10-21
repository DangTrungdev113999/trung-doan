const express = require("express");
const user = require("./../services/user");
const User = require("./../models/User");

const router = express.Router();

router.get("/login", user.getlogin)

router.post("/create", async function(req, res) {
  let newUser = {
    username: req.body.username,
    password: req.body.password,
    type: req.body.type,
  }

  let user = await User.create(newUser);
  res.json(user)
})

router.post("/login", async function(req, res) {
  try {
    let token = await user.postLogin(req.body.username, req.body.password);
    if (token.length) {
      let user = await User.findOne({
        username: req.body.username,
        password:  req.body.password
      }, {password: 0}).exec();
      req.session.user = user;

      return res.status(200).send(token);
    }
  } catch (error) {
    res.status(500).send(error)
    console.log(error);
  }

})

router.get("/logout", user.logout)


module.exports = router;