import React from "react";
import EditTask from "./EditTask";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, setTasks } from "../../slices/tasksSlice";
import axios from "axios";

const TasksContainer = ({ handleEditTask }) => {
  let tasks = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();

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

  function handleEdit(taskId) {
    handleEditTask(taskId);
  }
  return (
    <div className="container">
      {/* <h3>Pending Tasks</h3> */}
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
