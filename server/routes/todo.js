const router = require("express").Router();

router.post("/create", async (req, res) => {
  res.send("Create Route");
});

module.exports = router;
