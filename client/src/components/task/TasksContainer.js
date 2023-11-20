import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { yellow, red } from "@mui/material/colors";
import Icon from "@mui/material/Icon";
import { useDispatch, useSelector } from "react-redux";
import { updateTask } from "../../slices/tasksSlice";
import { deleteTask } from "../../slices/tasksSlice";
import { ToastContainer, toast } from "react-toastify";
import toastOptions from "../../Toastify";
import "react-toastify/dist/ReactToastify.css";
import EditTask from "./EditTask";
import Modal from "../Modal/Modal";
import axios from "axios";
import "./task.css";

const TasksContainer = () => {
  // tasks state  from redux store
  let tasks = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();

  // edit states
  const [showEditOverlay, setShowEditOverlay] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);

  // delete states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteTaskId, setDeleteTaskId] = useState(null);

  // -------- Edit a specific  task ------------
  const handleEdit = (taskId) => {
    let task = tasks.find((task) => task._id === taskId);
    if (task.status === "completed") {
      alert("Can not edit completed tasks ");
      return;
    }
    setEditingTaskId(taskId);
    setShowEditOverlay(true);
  };
  // --------Cancel the edit -----------------
  const handleCancelEdit = () => {
    setEditingTaskId(null);
    setShowEditOverlay(false);
  };

  // -----Delete a specific task---------------
  async function handleDelete(taskId) {
    setDeleteTaskId(taskId);
    setIsModalOpen(true);
  }

  async function handleDeleteConfirm() {
    try {
      let res = await axios.delete(
        `http://localhost:8000/task/delete/${deleteTaskId}`
      );
      toast.success(res.data.msg, toastOptions);
      // Update tasks state locally by filtering out the deleted task
      dispatch(deleteTask(deleteTaskId));
      setIsModalOpen(false);
    } catch (error) {
      toast.error(error, toastOptions);
    }
  }
  // --------- mark a task as completed---------
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
                {isModalOpen && (
                  <Modal
                    modalTitle="Delete Task"
                    onCancel={() => setIsModalOpen(false)}
                    onConfirm={handleDeleteConfirm}
                  />
                )}
                <button
                  className="btn-edit"
                  onClick={() => handleEdit(task._id)}
                >
                  <Icon
                    sx={{
                      color:
                        task.status === "completed" ? red[500] : yellow[100],
                      fontSize: 30,
                      textDecoration:
                        task.status === "completed" ? "line-through" : "none",
                    }}
                  >
                    edit
                  </Icon>
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
      <ToastContainer />
    </div>
  );
};

export default TasksContainer;
