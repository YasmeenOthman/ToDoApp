const Task = require("../database/models/task");
const mongoose = require("mongoose");
const user = require("../database/models/user");

// Create a new task
const createTask = async (req, res) => {
  let { text, date } = req.body;
  let authorId = {
    id: req.user.userId,
  };

  try {
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
    if (authorId === req.user.userId) {
      const tasks = await Task.find({ author: authorId });
      res.send(tasks);
    } else {
      res.send("The token id  not matched with the params id");
    }
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
    console.log(error, "error");
  }
};

// update a specific task with a specific id
const updateTask = async (req, res) => {
  const id = req.params.taskId;
  const updatedTask = req.body;
  console.log(updatedTask);
  try {
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).send("Task not found");
    }
    const newValue = await Task.findByIdAndUpdate(id, updatedTask, {
      new: true,
    });
    console.log(newValue);

    res.json({ msg: "updated successfully...", newValue });
  } catch (error) {
    res.status(400).send({ msg: "Can not update", error });
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

// get one specific tasks
// const getTask = async (req, res) => {
//   try {
//     let id = req.params.taskId;

//     let task = await Task.findById(id);

//     if (!task) {
//       return res.status(404).json({ message: "Task not found" });
//     }

//     res.status(200).json(task);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

module.exports = {
  createTask,
  getUserTasks,
  deleteTask,
  updateTask,
};
