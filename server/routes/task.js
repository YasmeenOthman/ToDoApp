const router = require("express").Router();
const verifyToken = require("../middleware/auth");
const {
  getUserTasks,
  createTask,
  deleteTask,
  updateTask,
} = require("../controllers/task");

// CRUD operation
router.get("/:authorId", verifyToken, getUserTasks);
// router.get("/edit/:taskId", getTask);
router.post("/create", verifyToken, createTask);
router.put("/update/:taskId", updateTask);
router.delete("/delete/:id", deleteTask);

module.exports = router;
