const Task = require("../database/models/task");
const mongoose = require("mongoose");
const user = require("../database/models/user");

// Create a new task
const createTask = async (req, res) => {
  let { text, date } = req.body;
  // get the author data from the jwt(auth)
  let authorId = {
    id: req.user.userId,
  };
  console.log("authorId", authorId);
  try {
    // let authorFound = await user.findById(authorId.id);
    // let authorName = authorFound.username;
    const newTask = await Task.create({ text, date, author: authorId.id });

    res.send(`New task "${newTask.text}" created by ${newTask.author}`);
  } catch (error) {
    res.status(500).send("Can not create a new task ,Internal server error");
  }
};
// Retrieve all tasks for specific user
const getUserTasks = async (req, res) => {
  try {
    const authorId = req.params.authorId;
    const tasks = await Task.find({ author: authorId });
    res.send(tasks);
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
    console.log(error, "error");
  }
};

// update a specific task with a specific id
const updateTask = async (req, res) => {
  const updatedTask = req.body;
  const id = req.params.id;
  const userId = req.user.user_id; // get user ID from JWT token
  try {
    const task = await Task.findById(id);
    console.log(task.author.id);
    if (!task) {
      return res.status(404).send("Task not found");
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).send("Invalid user ID");
    }
    if (!task.author.id.equals(userId)) {
      return res.status(403).send("You are not authorized to update this task");
    }
    // if (task.author.id !== userId) {
    //   return res.status(403).send("You are not authorized to update this task");
    // }
    const newValue = await Task.findByIdAndUpdate(id, updatedTask);
    res.json({ msg: "updated successfully...", newValue });
  } catch (error) {
    res.send("Can not update");
  }
};

// delete a specific task with a specific id
const deleteTask = async (req, res) => {
  const id = req.params.id;
  try {
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).send("Task not found");
    }
    const deletedValue = await Task.findByIdAndDelete(id);

    let tasks = await Task.find();
    res.send({ msg: "task deleted successfully", tasks });
  } catch (error) {
    res.send("Can not delete");
  }
};

module.exports = { createTask, getUserTasks, deleteTask, updateTask };
