import React from "react";
import "./Modal.css";

function Modal({ onCancel, onConfirm }) {
  return (
    <div className="modal">
      <div className="modal_container">
        <div className="modal_header">Logout !!!</div>
        <div className="modal_message">
          <p>Are you sure?</p>
        </div>
        <div className="modal_buttons">
          <button onClick={onCancel} className="cancel_button">
            cancel
          </button>
          <button onClick={onConfirm} className="logout_button">
            LogOut
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;