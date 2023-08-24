import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./EditTask.css";
import { useDispatch } from "react-redux";
import { updateTask } from "../../slices/tasksSlice";

const EditTask = ({ taskId, closeEditOverlay }) => {
  const dispatch = useDispatch();
  const [editedTask, setEditedTask] = useState("");

  useEffect(() => {
    // Fetch the task data that needs to be updated  based on taskId
    async function fetchTask() {
      try {
        const response = await axios.get(
          `http://localhost:8000/task/edit/${taskId}`
        );
        // to render the task data in the edit form
        setEditedTask(response.data.text);
      } catch (error) {
        console.log(error);
      }
    }
    fetchTask();
  }, [taskId]);

  async function handleSave() {
    try {
      await axios.put(`http://localhost:8000/task/update/${taskId}`, {
        text: editedTask,
      });
      dispatch(updateTask({ taskId, editedTask }));
      closeEditOverlay();
    } catch (error) {
      alert("Failed to update the task. Please try again.");
    }
  }

  function handleCancel() {
    closeEditOverlay();
  }

  return (
    <div className="edit-task-form">
      <input
        className="task-text"
        type="text"
        value={editedTask}
        onChange={(e) => setEditedTask(e.target.value)}
        required
      />

      <div className="quick-actions">
        <h3>Quick Actions</h3>
        <button> Add CheckList</button>
        <button> Add Attachment</button>
      </div>
      <div className="task-description">
        <textarea input="text" placeholder="Add task description ..." />
      </div>
      <div>
        <h3>Start date</h3>
        <input type="date" placeholder="Due Date" />
        <h3>Due Date</h3>
        <input type="date" placeholder="Due Date" />
      </div>
      <div>
        <button onClick={handleSave} className="save-button">
          Save
        </button>
        <button onClick={handleCancel} className="save-button">
          cancel
        </button>
      </div>
    </div>
  );
};

export default EditTask;
