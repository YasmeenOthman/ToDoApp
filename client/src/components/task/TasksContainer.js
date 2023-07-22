import React from "react";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";

const TasksContainer = ({ tasks }) => {
  console.log(tasks);
  const dragItem = useRef();
  const dragOverItem = useRef();
  // We'll use the useRef hook to hold the item we're dragging located, then we'll use onDragStart to drag it and paste it to all the items in this list:
  const dragStart = (e, position) => {
    dragItem.current = position;
    console.log(e.target.innerHTML);
  };
  const dragEnter = (e, position) => {
    dragOverItem.current = position;
    console.log(e.target.innerHTML);
  };

  return (
    <div className="container">
      <div className="pending__wrapper">
        <h3>Pending Tasks</h3>
        <div className="pending__container">
          {tasks.map((task) => {
            return (
              <div className="pending__items" draggable>
                <p>{task.text}</p>
                <p className="comment">
                  <Link to="/comments">2 Comments</Link>
                </p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="ongoing__wrapper">
        <h3>Ongoing Tasks</h3>
        <div className="ongoing__container">
          <div className="ongoing__items">
            <p>Try to implement the drag and drop</p>
            <p className="comment">
              <Link to="/comments">Add Comment</Link>
            </p>
          </div>
        </div>
      </div>
      <div className="completed__wrapper">
        <h3>Completed Tasks</h3>
        <div className="completed__container">
          <div className="completed__items">
            <p>Debug the Notification center</p>
            <p className="comment">
              <Link to="/comments">2 Comments</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TasksContainer;
