const router = require("express").Router();
const { createTodo, getAllTasks, deleteTask,updateTask } = require("../controllers/todo");


// CRUD operation

router.post("/create", createTodo);
router.get("/", getAllTasks);
router.put("/update",updateTask)
router.delete("/delete", deleteTask);
module.exports = router;
