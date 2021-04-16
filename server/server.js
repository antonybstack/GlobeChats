const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors());
console.log(require("dotenv").config());

app.use(express.json());
app.use(cookieParser());

// ----- Google Auth stuff -----------start
const session = require("express-session");
const passport = require("passport");

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

var db = "";
if (process.env.DATABASE_URL) {
  db = process.env.DATABASE_URL;
} else {
  db = process.env.MONGO_URI;
}
// ----- Google Auth stuff ------------end

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-type,Authorization");
  res.setHeader("Access-Control-Allow-Methods", "*");
  next();
});

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log("mongoose connection error!", err));

app.use("/api/users", require("./routes/api/users"));
app.use("/api/events", require("./routes/api/events"));
app.use("/api/profile", require("./routes/api/profile"));

//serve static assets if in heroku production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("../app/build"));
  app.get("*", (req, res) => {
    // creating an index.html file in the directory and serve our html in there
    res.sendFile(path.resolve(__dirname, "app", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
  });
}

app.listen(PORT, () => console.log(`Server is running on port:  ${PORT}`));
