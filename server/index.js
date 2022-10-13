const express = require("express");
const cors = require("cors");
const connection = require("./database/connection");

const app = express();
const PORT = process.env.PORT || 8000;
// middleware
app.use(cors());
app.use(express.json());

// handle different routes
app.use("/todo", require("./routes/todo"));
app.use("/todo", require("./routes/filter"));

app.listen(PORT, () => {
  console.log(`Server is start listening on port ${PORT}`);
});
