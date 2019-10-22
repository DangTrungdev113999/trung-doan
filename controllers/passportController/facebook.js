const passport = require("passport");
const passportFacebook = require("passport-facebook");

const User = require("./../../models/User");

let facebookStragery = passportFacebook.Strategy;

let initPassportFacebook = () => {
  passport.use( new facebookStragery(
    {
      clientID: process.env.FB_ID,
      clientSecret: process.env.FB_APP_SECRET,
      callbackURL: process.env.FB_CALLBACK_URL,
      profileFields: ["email", "gender", "displayName"],
      passReqToCallback: true
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ "facebook.uid": profile.id })
        if (user) {
          done(null, user);
        };

        let newUserItem = {
          username: profile.displayName,
          facebook: {
            uid: profile.id,
            email: profile.email,
            token: accessToken
          }
        };

        let newUser = await User.create(newUserItem);
        return done(null, newUser);

      } catch (error) {
        console.log(error);
        return done(null, false)
      }
    }
    ));
  
  passport.serializeUser( (user, done) => {
    done(null, user._id)
  });

  passport.deserializeUser( async (id, done) => {
    try {
      let user = await User.findById(id);
      done(null, user) 
    } catch (error) {
      console.log(error);
      done(error, null);
    }
  })
}

module.exports = initPassportFacebook;