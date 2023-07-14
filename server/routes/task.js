const router = require("express").Router();
const verifyToken = require("../middleware/auth");
const {
  getAllTasks,
  createTask,
  deleteTask,
  updateTask,
} = require("../controllers/task");

// CRUD operation
router.get("/", getAllTasks);
router.post("/create", verifyToken, createTask);
router.put("/update/:id", verifyToken, updateTask);
router.delete("/delete/:id", verifyToken, deleteTask);
module.exports = router;
