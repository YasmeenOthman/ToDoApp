const express = require("express");
const cors = require("cors");
// const socketio = require("./socketio");
const connection = require("./database/connection");

const app = express();
const PORT = process.env.PORT || 8000;

// middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// handle different routes
app.use("/user", require("./routes/user"));
app.use("/task", require("./routes/task"));
app.use("/", require("./routes/filter"));

app.listen(PORT, () => {
  console.log(`Server is start listening on port ${PORT}`);
});
