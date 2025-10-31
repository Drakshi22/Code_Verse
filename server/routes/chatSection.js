const express = require("express");
const Message=require('../models/chatapp');
const router = express.Router();
router.get("/messages", async (req, res) => {
  const messages = await Message.find().sort({ timestamp: 1 });
  res.json(messages);
});

router.post("/messages", async (req, res) => {
  const { text } = req.body;
  if (!text.trim()) return res.status(400).send("Empty message");
  const message = new Message({ user: req.user, text });
   console.log("msg.user:");
  await message.save();
  res.sendStatus(201);
});
module.exports=router;