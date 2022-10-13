const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoSchema = new mongoose.Schema({
  description: { type: String, required: true },
  date: {
    type: Date,
    default: function () {
      return Date.now();
    },
  },
  user: [{ type: Schema.Types.ObjectId, ref: "User" }],
  isCompleted: { type: Boolean },
  priority: { type: String },
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
