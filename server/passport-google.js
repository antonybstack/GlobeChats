const passport = require("passport");
const BearerStrategy = require("passport-http-bearer").Strategy;
const { OAuth2Client } = require("google-auth-library");
const googleClient = new OAuth2Client(process.env.CLIENT_ID);

passport.use(
  new BearerStrategy((token, done) => {
    console.log(token);
    googleClient
      .verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID,
      })
      .then(async (ticket) => {
        console.log(ticket);
        const payload = ticket.getPayload();
        console.log(payload); // we will replace this later
        //let user = await User.query().findOne('googleId', payload.sub);
        done(null, payload);
      })
      .catch((error) => {
        console.log(error);
        done(error);
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
