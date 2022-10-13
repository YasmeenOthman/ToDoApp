const Todo = require("../database/models/todo");

const createTodo = async (req, res) => {
  const newTask = req.body;
  console.log(newTask);
  try {
    if (newTask) {
      await Todo.create(newTask);
      res.send("New task is been added successfully");
    } else {
      res.json({ msg: "Please fill all the field" });
    }
  } catch (error) {}
};

// Retrieve all the saved data from the database
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Todo.find();
    res.send(tasks);
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
    console.log(error);
  }
};

const updateTask = async (req, res) => {
  res.send("update Route");
};

const deleteTask = async (req, res) => {
  res.send("delete Route");
};

module.exports = { createTodo, getAllTasks, deleteTask, updateTask };
