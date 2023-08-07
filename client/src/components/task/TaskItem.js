import React from "react";

const TaskItem = () => {
  return (
    <div className="container">
      {tasks.map((task) => {
        return (
          <div key={task._id} className="pending__items">
            <div className="first-section">
              <input type="checkbox" />
              <p>{task.text}</p>
            </div>
            <div className="buttons-section">
              <button
                className="btn-delete"
                onClick={() => handleDeleteClick(task._id)}
              >
                delete
              </button>
              <button className="btn-edit" onClick={() => handleEdit(task._id)}>
                edit
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TasksContainer;
