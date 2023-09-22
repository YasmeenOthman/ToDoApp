import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask } from "../../slices/tasksSlice";
import axios from "axios";
import EditTask from "./EditTask";

const TasksContainer = () => {
  // tasks state  from redux store
  let tasks = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [showEditOverlay, setShowEditOverlay] = useState(false);

  const handleEdit = (taskId) => {
    setEditingTaskId(taskId);
    setShowEditOverlay(true);
  };

  const handleCancelEdit = () => {
    setEditingTaskId(null);
    setShowEditOverlay(false);
  };

  // -----Delete a specific task---------------
  async function handleDelete(taskId) {
    try {
      if (window.confirm("You are going to delete the tasks, are you sure?")) {
        let res = await axios.delete(
          `http://localhost:8000/task/delete/${taskId}`
        );
        alert(res.data.msg);
        // Update tasks state locally by filtering out the deleted task
        dispatch(deleteTask(taskId));
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container">
      {tasks && tasks.length === 0 ? (
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
                  onClick={() => handleDelete(task._id)}
                >
                  Delete
                </button>
                <button
                  className="btn-edit"
                  onClick={() => handleEdit(task._id)}
                >
                  Edit
                </button>
              </div>
            </div>
          );
        })
      )}
      {showEditOverlay && (
        <EditTask taskId={editingTaskId} closeEditOverlay={handleCancelEdit} />
      )}
    </div>
  );
};

export default TasksContainer;
