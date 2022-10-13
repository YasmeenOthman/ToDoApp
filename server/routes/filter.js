const router = require("express").Router();
const { priorityFilter, isCompletedFilter } = require("../controllers/filter");

router.get("/:priority", priorityFilter);
router.get("/:isCompleted", isCompletedFilter);

module.exports = router;
