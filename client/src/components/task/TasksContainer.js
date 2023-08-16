import React from "react";
import { Link } from "react-router-dom";

const TasksContainer = ({ tasks, handleDelete, handleEditTak }) => {
  async function handleDeleteClick(id) {
    try {
      await handleDelete(id);
    } catch (error) {
      console.log(error);
    }
  }

  function handleEdit(taskId) {
    alert("clicked,edit");
    handleEditTak(taskId);
  }
  return (
    <div className="container">
      {/* <h3>Pending Tasks</h3> */}
      {tasks.length === 0 ? (
        <p>No tasks to display yet...</p>
      ) : (
        tasks.map((task) => {
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
                <button
                  className="btn-edit"
                  onClick={() => handleEdit(task._id)}
                >
                  edit
                </button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default TasksContainer;
