const Todo = require("../database/models/task");

// Retrieve all the saved data from the database

const priorityFilter = async (req, res) => {
  const priority = req.params.priority;
  try {
    const tasks = await Todo.find({ priority: priority });
    res.send(tasks);
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
    console.log(error);
  }
};

const isCompletedFilter = async (req, res) => {
  const isCompleted = req.params.isCompleted;
  try {
    const completedTasks = await Todo.find({ isCompleted: isCompleted });
    res.send(completedTasks);
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
    console.log(error);
  }
};

module.exports = { priorityFilter, isCompletedFilter };
