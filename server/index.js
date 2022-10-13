const express = require("express");
const cors = require("cors");
const connection = require("./database/connection");
const todoRoutes = require("./routes/todo");
const app = express();
const PORT = process.env.PORT || 8000;
// middleware
app.use(cors());
app.use(express.json());

// handle different routes
app.use("/todo", todoRoutes);

app.listen(PORT, () => {
  console.log(`Server is start listening on port ${PORT}`);
});
