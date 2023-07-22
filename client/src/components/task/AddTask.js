import React, { useState } from "react";

const AddTask = ({ addNewTask, handleTaskText, task }) => {
  function handleChange(e) {
    handleTaskText(e.target.value);
  }
  function handleClick(e) {
    addNewTask();
  }

  return (
    <>
      <form className="form__input" onSubmit={handleClick}>
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
