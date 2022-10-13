const router = require("express").Router();
const {
  getAllTasks,
  createTodo,
  deleteTask,
  updateTask,
} = require("../controllers/todo");

// CRUD operation
router.get("/", getAllTasks);
router.post("/create", createTodo);
router.put("/update/:id", updateTask);
router.delete("/delete/:id", deleteTask);
module.exports = router;
