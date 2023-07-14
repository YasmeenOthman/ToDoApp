import React, { useState } from "react";
import axios from "axios";

const AddTask = () => {
  const [task, setTask] = useState({
    description: "",
  });

  function handleChange(e) {
    e.preventDefault();
    setTask({ description: e.target.value });
    console.log(task);
  }
  function addNewTask(e) {
    e.preventDefault();
    axios
      .post("http://localhost:8000/task/create", task)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <>
      <form className="form__input" onSubmit={addNewTask}>
        <label htmlFor="task">Add new Task</label>
        <input
          type="text"
          name="task"
          id="task"
          value={task.description}
          className="input"
          required
          onChange={handleChange}
        />
        <button className="addTodoBtn">add</button>
      </form>
    </>
  );
};

export default AddTask;
