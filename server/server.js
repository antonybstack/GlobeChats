const express = require("express");
const mongoose = require("mongoose");
// const http = require("http");
const moment = require("moment-timezone");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors());

app.use(express.json());
app.use(cookieParser());

// ----- Google Auth stuff -----------start
const session = require("express-session");
const passport = require("passport");

//express-session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// if production, it will use heroku variable that provides mongo uri
var db = "";
if (process.env.DATABASE_URL) {
  db = process.env.DATABASE_URL;
} else {
  db = process.env.MONGO_URI;
}
// ----- Google Auth stuff ------------end

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Headers", "Content-type,Authorization");
//   res.setHeader("Access-Control-Allow-Methods", "*");
//   next();
// });

//connection to mongoDB
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log("mongoose connection error!", err));

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

// const server = http.createServer(app);
//initialize a new instance of socket.io by passing the http (the HTTP server) object
// const io = socketio(server);
// io(server, {
//   cors: {
//     origin: "*",
//   },
// });

//express routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/events", require("./routes/api/events"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/chatrooms", require("./routes/api/chatrooms"));
app.use("/api/chats", require("./routes/api/chats"));
app.use("/api/reports", require("./routes/api/reports"));

const options = {
  cors: true,
};

const http = require("http").createServer(app);
const io = require("socket.io")(http, options);
// Make io accessible to our router

// global io variable
connections = [];

io.on("connection", (socket) => {
  //on socket connection, new guest account is created
  // console.log("USER CONNECTED...", socket.id);
  // let num = Math.floor(Math.random() * Math.floor(999999));
  // let date = moment().tz("America/New_York");
  // newUser = {
  //   socketid: socket.id,
  //   username: "guest" + num,
  //   userid: "0",
  //   avatar: "99",
  //   timestamp: date,
  // };
  // connections.push(newUser);
  // console.log("Current IO connections: ", connections);

  // GET CONNECTION custom event
  socket.on("get connections", () => {
    //returns connections to client
    io.emit("get connections", connections);
  });

  //CHAT MESSAGE custom event
  // socket.on("chat message", (msg) => {
  //   io.emit("chat message", msg);

  //   // server side HTTP request
  //   const addChat = async () => {
  //     await axios
  //       .post("http://localhost:5000/api/chats/add", msg)
  //       .then((res) => {
  //         console.log("chat added!", msg);
  //       })
  //       .catch(function (error) {
  //         console.log(error);
  //         axios
  //           .post("http://tonysgrotto.herokuapp.com/api/chats/add", msg)
  //           .then((res) => {
  //             console.log("chat added!", msg);
  //           })
  //           .catch(function (error) {
  //             console.log(error);
  //           });
  //       });
  //   };
  //   addChat();

  //   console.log(msg);
  // });

  //AUTHENTICATED USER custom event
  socket.on("authenticated user", function (data) {
    let date = moment().tz("America/New_York");
    // console.log(data);
    newUser = {
      socketid: socket.id,
      _id: data._id,
      firstName: data.firstName,
      lastName: data.lastName,
      joinedChatroomIds: data.joinedChatroomIds,
      friendlist: data.friendlist,
      email: data.email,
      googleImg: data.googleImg,
      timestamp: date,
    };

    if (connections.length > 0) {
      for (var i = 0; i < connections.length; i++) {
        if (connections[i].socketid === data.socketid || connections[i]._id === data._id) {
          connections.splice(i, 1);
        }
      }
    }
    connections.push(newUser);

    console.log("authenticated user");
    //print connection ids
    for (var i = 0; i < connections.length; i++) {
      console.log(connections[i].socketid);
    }
    console.log(connections);
    console.log("authenticated user");

    //returns connections to client
    io.emit("authenticated user", connections);

    // console.log("authenticated user function --> Current Users: ", connections);
  });

  // console.log(io);

  // DISCONNECT custom event
  socket.on("logout user", () => {
    console.log("before logged out user");
    //print connection ids
    for (var i = 0; i < connections.length; i++) {
      console.log(connections[i].socketid);
    }
    console.log("before logged out user");

    for (var i = 0; i < connections.length; i++) {
      if (connections[i].socketid === socket.id) {
        connections.splice(i, 1);
      }
    }

    console.log("after logged out user");
    //print connection ids
    for (var i = 0; i < connections.length; i++) {
      console.log(connections[i].socketid);
    }
    console.log("after logged out user");

    //returns connections to client
    io.emit("logout user", connections);

    // console.log("disconnected data: ", socket.id);
    // console.log("Client disconnected.", "Current Users: ", connections);
  });

  // DISCONNECT custom event
  socket.on("disconnect", () => {
    for (var i = 0; i < connections.length; i++) {
      if (connections[i].socketid === socket.id) {
        connections.splice(i, 1);
      }
    }
    // io.emit("disconnect", connections);

    console.log("disconnect");
    //print connection ids
    for (var i = 0; i < connections.length; i++) {
      console.log(connections[i].socketid);
    }
    console.log("disconnect");

    io.emit("disconnected", connections);

    // console.log("disconnected data: ", socket.id);
    // console.log("Client disconnected.", "Current Users: ", connections);
  });
});

http.listen(PORT, () => console.log("Server is running on Port: " + PORT));

// app.listen(PORT, () => console.log(`Server is running on port:  ${PORT}`));
