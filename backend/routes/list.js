const express = require("express");

const User = require("../models/user");
const List = require("../models/list");

const router = express.Router();

router.post("/addTask", async (req, res) => {
  try {
    const { title, body, id } = req.body;
    const existingUser = await User.findById(id);
    if (existingUser) {
      const newList = new List({ title, body, user: existingUser._id });
      await newList.save();
      existingUser.list.push(newList._id);
      await existingUser.save();
      res.status(200).json(newList.toObject());
    } else {
      res.status(404).json({ msg: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
});

router.post("/updateTask/:id", async (req, res) => {
  try {
    const { title, body } = req.body;
    const updatedTask = await List.findByIdAndUpdate(
      req.params.id,
      { title, body },
      { new: true }
    );
    if (updatedTask) {
      res.status(200).json("Task updated");
    } else {
      res.status(404).json({ msg: "Task not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
});

router.delete("/deleteTask/:id", async (req, res) => {
  try {
    const { id } = req.body;
    const existingUser = await User.findByIdAndUpdate(
       id ,
      { $pull: { list: req.params.id } }
    );
    if (existingUser) {
      await List.findByIdAndDelete(req.params.id);
      res.status(200).json("Task deleted");
    } else {
      res.status(404).json({ msg: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
});

router.get("/get/:id", async (req, res) => {
  try {
    const list = await List.find({ user: req.params.id }).sort({ createdAt: -1 }).lean();
    if (list.length !== 0) {
      res.status(200).json({ list: list });
    } else {
      res.status(200).json({ message: "No Task Added" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
