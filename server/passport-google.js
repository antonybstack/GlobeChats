const passport = require("passport");
const BearerStrategy = require("passport-http-bearer").Strategy;
const { OAuth2Client } = require("google-auth-library");
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const User = require("./models/user.model");

passport.use(
  new BearerStrategy((token, done) => {
    console.log(token);
    googleClient
      .verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      })
      .then(async (ticket) => {
        console.log(ticket);
        const payload = ticket.getPayload();
        console.log(payload); // we will replace this later
        //let user = await User.query().findOne('googleId', payload.sub);
        // if (!user) {
        //   user = await User.query().insertAndFetch({
        //     googleId: payload.sub,
        //     familyName: payload.family_name,
        //     givenName: payload.given_name,
        //     email: payload.email,
        //   });
        // }
        const { sub, given_name, family_name, email, picture } = payload;
        //check if username exists first
        //User.findOne({ sub }, (err, user) => {

        try {
          let user = await User.findOne({ googleId: sub });

          if (user) {
            console.log("Google account already exists.");
            done(null, user);
          } else {
            console.log("Creating new record of google account in db");
            const newUser = {
              googleId: sub,
              email: email,
              firstName: given_name,
              lastName: family_name,
              googleImg: picture,
            };
            let user = User.create(newUser);
            done(null, user);
          }
        } catch (err) {
          console.error(err);
        }
      });
  })
);

passport.serializeUser((user, done) => {
  console.log(user);
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log(id);
  done(null, user);
});
