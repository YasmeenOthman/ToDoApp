const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new mongoose.Schema({
  text: { type: String, required: true },
  date: {
    type: Date,
    default: function () {
      return Date.now();
    },
  },
  author: { type: Schema.Types.ObjectId, ref: "user" },
  // status: String,
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
