const Todo = require("../database/models/todo");

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
// Create a new task
const createTodo = async (req, res) => {
  const newTask = req.body;

  try {
    await Todo.create(newTask);
    res.send("New task is been added successfully");
  } catch (error) {}
};

// update a specific task with a specific id
const updateTask = async (req, res) => {
  const updatedTask = req.body;
  const id = req.params.id;

  try {
    const newValue = await Todo.findByIdAndUpdate(id, updatedTask);
    res.send(newValue);
  } catch (error) {
    res.send("Can not update");
  }
};

// delete a specific task with a specific id
const deleteTask = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    const deletedValue = await Todo.findByIdAndDelete(id);
    res.send(deletedValue);
  } catch (error) {
    res.send("Can not delete");
  }
};

module.exports = { createTodo, getAllTasks, deleteTask, updateTask };
