import React, { useState, useEffect } from "react";
import axios from "axios";
import "./EditTask.css";
import { useDispatch } from "react-redux";
import { updateTask } from "../../slices/tasksSlice";
import AttachmentsList from "./Attachments";
import CheckList from "./CheckList";

const EditTask = ({ taskId, closeEditOverlay }) => {
  const dispatch = useDispatch();
  const [editedTask, setEditedTask] = useState("");
  const [isAttachment, setIsAttachment] = useState(false);

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

  function addAttachment() {
    setIsAttachment(true);
  }

  function addSubTask() {
    alert("add a subtask");
  }

  return (
    <div className="edit-container">
      <div className="edit-task-form">
        <h1 className="edit-form-header">Edit Form</h1>

        <div className="taskText-edit-section">
          <h2 className="edit-headers">Task</h2>
          <input
            autoFocus
            className="task-text edit-inputs"
            type="text"
            value={editedTask}
            onChange={(e) => setEditedTask(e.target.value)}
          />
        </div>

        <div className="quick-actions">
          <h2 className="edit-headers">Quick Actions</h2>
          <button onClick={addSubTask} className="quick-actions-buttons">
            {" "}
            Add CheckList
          </button>
          <button onClick={addAttachment} className="quick-actions-buttons">
            {" "}
            Add Attachment
          </button>
        </div>

        <div className="task-description">
          <h2 className="edit-headers">Task Description</h2>
          <textarea
            input="text"
            placeholder="Add task description ..."
            className="edit-inputs"
          />
        </div>

        <div className="dates">
          <div className="dates-col1">
            <h2 className="edit-headers">Start date</h2>
            <input
              className=" dates-inputs"
              type="date"
              placeholder="Due Date"
            />
          </div>
          <div className="dates-col2">
            <h2 className="edit-headers">Due Date</h2>
            <input
              className=" dates-inputs"
              type="date"
              placeholder="Due Date"
            />
          </div>
        </div>
        {isAttachment && (
          <div>
            <AttachmentsList />
          </div>
        )}

        {/*<div>
        <CheckList />
      </div> */}
        <div className="save-cancel-buttons">
          <button onClick={handleSave} className="save-button"></button>
          <button onClick={handleCancel} className="cancel-button"></button>
        </div>
      </div>
    </div>
  );
};

export default EditTask;
