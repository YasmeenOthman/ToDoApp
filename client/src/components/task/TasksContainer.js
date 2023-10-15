import React, { useState } from "react";
import "./task.css";
import { useDispatch, useSelector } from "react-redux";
import { updateTask } from "../../slices/tasksSlice";
import { deleteTask } from "../../slices/tasksSlice";
import axios from "axios";
import EditTask from "./EditTask";
import DeleteIcon from "@mui/icons-material/Delete";
import Icon from "@mui/material/Icon";
import { yellow } from "@mui/material/colors";

const TasksContainer = () => {
  // tasks state  from redux store
  let tasks = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [showEditOverlay, setShowEditOverlay] = useState(false);

  const handleEdit = (taskId) => {
    let task = tasks.find((task) => task._id === taskId);
    if (task.status === "completed") {
      alert("Can not edit completed tasks ");
      return;
    }
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

  // mark a task as completed
  const handleCheckboxChange = async (taskId) => {
    try {
      let newValue;
      tasks.map((task) => {
        if (task._id === taskId) {
          newValue = {
            ...task,
            status: task.status === "pending" ? "completed" : "pending",
          };
        }
      });
      let res = await axios.put(
        `http://localhost:8000/task/update/${taskId}`,
        newValue
      );

      // console.log(res.data);
      dispatch(updateTask({ taskId, newValue }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      {tasks && tasks.length === 0 ? (
        <p>No tasks to display yet...</p>
      ) : (
        tasks.map((task) => {
          return (
            <div
              key={task._id}
              className={`pending__items ${
                task.status === "completed" ? "completed" : ""
              }`}
            >
              <div className="first-section">
                <input
                  type="checkbox"
                  checked={task.status === "completed"}
                  className="checkbox"
                  onChange={() => handleCheckboxChange(task._id)}
                />
                <p
                  className={
                    task.status === "completed" ? "completed-text" : ""
                  }
                >
                  {task.text}
                </p>
              </div>

              <div className="buttons-section">
                <button
                  className="btn-delete"
                  onClick={() => handleDelete(task._id)}
                >
                  <DeleteIcon sx={{ color: yellow[100], fontSize: 30 }} />
                </button>
                <button
                  className="btn-edit"
                  onClick={() => handleEdit(task._id)}
                >
                  <Icon sx={{ color: yellow[100], fontSize: 30 }}>edit</Icon>
                </button>
              </div>
            </div>
          );
        })
      )}
      {showEditOverlay && (
        <EditTask
          tasks={tasks}
          taskId={editingTaskId}
          closeEditOverlay={handleCancelEdit}
        />
      )}
    </div>
  );
};

export default TasksContainer;
