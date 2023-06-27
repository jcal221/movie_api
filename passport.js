const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Models = require("./models.js");
const passportJWT = require("passport-jwt");

let Users = Models.User;
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    (username, password, done) => {
      // Convert username and password to lowercase
      const lowercaseUsername = username.toLowerCase();
      const lowercasePassword = password.toLowerCase();

      console.log(lowercaseUsername + "  " + lowercasePassword);
      Users.findOne({ username: { $regex: new RegExp(`^${lowercaseUsername}$`, "i") } })
        .then((user) => {
          if (!user) {
            console.log("incorrect username");
            return done(null, false, {
              message: "Incorrect username or password.",
            });
          }

          console.log("finished");
          return done(null, user);
        })
        .catch((error) => {
          console.log(error);
          return done(error);
        });
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: "your_jwt_secret",
    },
    (jwtPayload, done) => {
      return Users.findById(jwtPayload._id)
        .then((user) => {
          return done(null, user);
        })
        .catch((error) => {
          return done(error);
        });
    }
  )
);

module.exports = passport;
