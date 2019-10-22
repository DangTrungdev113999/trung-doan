const express = require("express");
const router = express.Router();
const passport = require("passport")

const initPassportFacebook = require("./../controllers/passportController/facebook");

initPassportFacebook();

router.get("/facebook", passport.authenticate("facebook", {scope: "email"}))

router.get("/facebook/callback", passport.authenticate("facebook", {
  successRedirect: "/product",
  failureRedirect: "/user/login"
}))

module.exports = router;