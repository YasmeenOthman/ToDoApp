const taskModel = require("../database/models/task");
const mongoose = require("mongoose");
const user = require("../database/models/user");

// Retrieve all the saved data from the database
const getAllTasks = async (req, res) => {
  try {
    const tasks = await taskModel.find();
    res.send(tasks);
    console.log(tasks);
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
    console.log(error, "error");
  }
};
// Create a new task
const createTask = async (req, res) => {
  if (!req.user) {
    return res.status(401).send("Unauthorized");
  }
  let { description, date } = req.body;
  // get the author data from the jwt(auth)
  let author = {
    id: req.user.user_id,
    username: req.user.username,
  };
  console.log("author", author);
  try {
    const newTask = await taskModel.create({ description, date, author });
    res.send(
      `New task "${newTask.description}" created by ${newTask.author.username}`
    );
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating task");
  }
};

// update a specific task with a specific id
const updateTask = async (req, res) => {
  const updatedTask = req.body;
  const id = req.params.id;
  const userId = req.user.user_id; // get user ID from JWT token
  try {
    const task = await taskModel.findById(id);
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
    const newValue = await taskModel.findByIdAndUpdate(id, updatedTask);
    res.json({ msg: "updated successfully...", newValue });
  } catch (error) {
    res.send("Can not update");
  }
};

// delete a specific task with a specific id
const deleteTask = async (req, res) => {
  const id = req.params.id;
  const userId = req.user.user_id; // get user ID from JWT token
  // console.log(id);

  try {
    const task = await taskModel.findById(id);
    console.log(task.author.id);
    if (!task) {
      return res.status(404).send("Task not found");
    }
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).send("Invalid user ID");
    }
    if (!task.author.id.equals(userId)) {
      return res.status(403).send("You are not authorized to delete this task");
    }
    const deletedValue = await taskModel.findByIdAndDelete(id);
    res.send({ msg: "task deleted successfully", deletedValue });
  } catch (error) {
    res.send("Can not delete");
  }
};

module.exports = { createTask, getAllTasks, deleteTask, updateTask };
