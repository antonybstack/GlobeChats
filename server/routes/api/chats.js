const express = require("express");
const Cryptr = require("cryptr");
const cryptr = new Cryptr(process.env.CHAT_ENCRYPT_SECRET);

const chatRoutes = express.Router();

const ChatModel = require("../../models/chat.model");

chatRoutes.route("/").get(function (req, res) {
  ChatModel.find(function (err, chats) {
    if (err) {
    } else {
      Object.keys(chats).forEach(function (i) {
        var decryptedString;
        try {
          decryptedString = cryptr.decrypt(chats[i].message);
        } catch (err) {
          decryptedString = "Error decrypting message: Invalid secret key";
        }
        chats[i].message = decryptedString;
      });
      res.status(200).json({ chats });
    }
  });
});

chatRoutes.route("/:id").get(function (req, res) {
  if (req.params.id) {
    ChatModel.findById(req.params.id, function (err, chat) {
      if (err) {
        return res.status(500).send({ message: { msgBody: "Error retrieving specific chat", msgError: true }, chat });
      }
      return res.status(200).json({ chat });
    });
  }
});

chatRoutes.route("/chatroom/:id").get(function (req, res) {
  if (req.params.id) {
    ChatModel.find({ chatroomId: req.params.id }, function (err, chats) {
      if (err) {
        return res.status(500).send({ message: { msgBody: "Error retrieving chat by chatroom", msgError: true }, chats });
      }
      return res.status(200).json({ chats });
    });
  }
});

chatRoutes.post("/add", (req, res) => {
  const encryptedString = cryptr.encrypt(req.body.message);
  req.body.message = encryptedString;

  let Chat = new ChatModel(req.body);
  Chat.save()
    .then((chat) => {
      ChatModel.find(function (err, chats) {
        if (err) {
        } else {
          Object.keys(chats).forEach(function (i) {
            var decryptedString;
            try {
              decryptedString = cryptr.decrypt(chats[i].message);
            } catch (err) {
              decryptedString = "Error: Invalid encryption key - unable to decrypt chat message ";
            }
            chats[i].message = decryptedString;
          });
          res.status(200).json({ chats });
        }
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ message: { msgBody: "Error creating chat", msgError: true }, chat });
    });
});

chatRoutes.route("/delete/:id").delete(function (req, res) {
  if (req.params.id) {
    ChatModel.findByIdAndRemove(req.params.id, function (err, chat) {
      if (err) {
        return res.status(500).json({ message: { msgBody: "Error deleting chat", msgError: true }, chat });
      }
      return res.status(200).json({ chat });
    });
  }
});

chatRoutes.put("/update/:id", (req, res) => {
  if (req.params.id) {
    ChatModel.findById(req.params.id, function (err, chat) {
      if (!chat) {
        res.status(404).send("data is not found");
      } else {
        if (req.body.message) chat.message = req.body.message;
        chat
          .save()
          .then((chat) => {
            res.json({ chat });
          })
          .catch((err) => {
            res.status(400).json({ message: { msgBody: "Error updating chat", msgError: true } });
          });
      }
    });
  }
});

module.exports = chatRoutes;
