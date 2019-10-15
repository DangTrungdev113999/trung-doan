const express = require("express");
const user = require("./../services/user");
const User = require("./../models/User");

const router = express.Router();

router.get("/login", user.getLogin)

router.post("/login", async function(req, res) {
  try {
    let token = await user.postLogin(req.body.username, req.body.password);
    if (token) {
      let user = await User.findOne({
        username: req.body.username,
        password:  req.body.password
      }, {password: 0}).exec();

      res.session.user = user;

      return res.status(200).send(token);
    }
  } catch (error) {
    res.status(500).send(error)
    console.log(error);
  }

})

router.get("/logout", user.logout)


module.exports = router;