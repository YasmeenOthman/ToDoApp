const mongoose = require("mongoose");
const User = require("./user");
const todoSchema = new mongoose.Schema({
  description: String,
  Date: {
    type: Date,
    default: function () {
      return Date.now();
    },
    user: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
