const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new mongoose.Schema({
  description: { type: String, required: true },
  date: {
    type: Date,
    default: function () {
      return Date.now();
    },
  },
  user: [{ type: Schema.Types.ObjectId, ref: "User" }],
  isCompleted: { type: Boolean },
  status: { type: String, required: true },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
