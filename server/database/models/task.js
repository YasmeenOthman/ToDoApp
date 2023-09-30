const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new mongoose.Schema({
  text: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "user" },
  status: { type: String, default: "pending" },
  subtasks: [
    {
      text: { type: String, required: true },
      completed: { type: Boolean, default: false },
    },
  ],
  attachments: [String],
  startDate: {
    type: Date,
    default: function () {
      return Date.now();
    },
  },
  dueDate: { type: Date }, // Due date field
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
