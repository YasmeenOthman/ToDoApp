import React, { useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";

const AddTask = () => {
  const [task, setTask] = useState("");
  let token = localStorage.getItem("usertoken");

  function handleChange(e) {
    setTask(e.target.value, () => {
      console.log(task);
    });
  }

  function addNewTask(e) {
    e.preventDefault();

    axios
      .post(
        "http://localhost:8000/task/create",
        { text: task },
        { headers: { Authorization: `Bearer ${token} ` } }
      )
      .then((res) => {
        console.log(res);
        setTask("");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <form className="form__input" onSubmit={addNewTask}>
        <input
          type="text"
          name="task"
          id="task"
          placeholder="What to do..."
          value={task}
          className="taskInput"
          required
          onChange={handleChange}
        />
        <button className="addTodoBtn" type="submit">
          +
        </button>
      </form>
    </>
  );
};

export default AddTask;
