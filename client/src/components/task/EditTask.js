import React, { useState, useEffect } from "react";
import axios from "axios";
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
    // Trim the editedTask to remove leading and trailing whitespace
    const trimmedTask = editedTask.trim();

    if (trimmedTask === "") {
      // If the trimmed task is empty, display an error message and do not proceed with the update
      alert("Task text cannot be empty.");
    } else {
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
  }

  function handleCancel() {
    closeEditOverlay();
  }

  return (
    <div className="edit-task-form">
      <h1 className="edit-form-header">Edit Form</h1>
      <h3 className="edit-headers">Task</h3>
      <input
        className="task-text edit-inputs"
        type="text"
        value={editedTask}
        onChange={(e) => setEditedTask(e.target.value)}
      />
      <hr />
      <div className="quick-actions">
        <h3 className="edit-headers">Quick Actions</h3>
        <button className="edit-buttons"> Add CheckList</button>
        <button className="edit-buttons"> Add Attachment</button>
      </div>
      <hr />
      <div className="task-description">
        <h3 className="edit-headers">Task Description</h3>
        <textarea
          input="text"
          placeholder="Add task description ..."
          className="edit-inputs"
        />
      </div>
      <hr />
      <div className="dates">
        <div className="dates-col1">
          {" "}
          <h3 className="edit-headers">Start date</h3>
          <input className=" dates-inputs" type="date" placeholder="Due Date" />
        </div>
        <div className="dates-col2">
          <h3 className="edit-headers">Due Date</h3>
          <input className=" dates-inputs" type="date" placeholder="Due Date" />
        </div>
      </div>
      <hr />
      <div className="buttons">
        <button onClick={handleSave} className="save-button ">
          Save
        </button>
        <button onClick={handleCancel} className="cancel-button ">
          cancel
        </button>
      </div>
    </div>
  );
};

export default EditTask;
