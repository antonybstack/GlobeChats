const passport = require("passport");
const BearerStrategy = require("passport-http-bearer").Strategy;
const { OAuth2Client } = require("google-auth-library");
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const User = require("./models/user.model");
const JwtStrategy = require("passport-jwt").Strategy;
const request = require("request");

// Bearer Token ---------------
passport.use(
  new BearerStrategy(async (token, done) => {
    googleClient
      .verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      })
      .then(async (ticket) => {
        const payload = ticket.getPayload();
        const { sub, given_name, family_name, email, picture } = payload;

        var base64Image = "";
        var request = require("request").defaults({ encoding: null });
        let temp = await request.get(picture, function (error, response, body) {
          if (!error && response.statusCode == 200) {
            data = "data:" + response.headers["content-type"] + ";base64," + Buffer.from(body).toString("base64");
            base64Image = data;
            return data;
          }
        });

        //check if this google account is in our database, if it isnt, we add it
        try {
          let user = await User.findOne({ googleId: sub });
          if (user) {
            console.log("Google account already exists.");
            return done(null, user);
          } else {
            console.log("Creating new record of google account in db");
            const newUser = {
              googleId: sub,
              email: email,
              firstName: given_name,
              lastName: family_name,
              googleImg: base64Image,
            };
            let user = await User.create(newUser);
            return done(null, user);
          }
        } catch (err) {
          // console.error(err);
        }
      });
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  done(null, user);
});

// JWT Token --------------------------
//for saving the "access_token" on user's browser

const cookieExtractor = (req) => {
  let token = null;
  //if both exist,
  if (req && req.cookies) {
    token = req.cookies["access_token"];
  }
  return token;
};

// authorization (used whenever we want to protect endpoints of the webapp)
passport.use(
  new JwtStrategy(
    //options object
    {
      jwtFromRequest: cookieExtractor, //to extract the jwt token from the request
      secretOrKey: process.env.SESSION_SECRET, //verifies if this cookie is legitimate
    },
    (payload, done) => {
      //payload is the data within the JWT token that we set
      User.findById({ _id: payload.sub }, (err, user) => {
        //if error
        if (err) return done(err, false);
        //if user is not null, return user
        if (user) return done(null, user);
        //there is not user so return false
        else return done(null, false);
      });
    }
  )
);
