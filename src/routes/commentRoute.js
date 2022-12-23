const express = require("express");
const router = express.Router();
const Comment = require("../models/commentModel");

router.post("/", async (req, res) => {
  try {
    const comments = await new Comment(req.body);
    await comments.save();
    res.send("Submitted Successfully");
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.get("/getAllComments", async (req, res) => {
  try {
    const comments = await Comment.find();
    res.send(comments);
  } catch (error) {
    return res.status(400).json(error);
  }
});

module.exports = router;
