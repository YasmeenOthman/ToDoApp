import React, { useState } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import LogoutIcon from "@mui/icons-material/Logout";
import TaskIcon from "@mui/icons-material/Task";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Modal from "../Modal/Modal";

import "./Nav.css";

const Nav = () => {
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate("");

  const token = localStorage.getItem("token");
  let username = "";

  if (token) {
    let decoded = jwt_decode(token);
    username = decoded.username;
  }

  function handleLogOut() {
    setIsModalOpen(true);
  }

  function onConfirm() {
    if (token) {
      localStorage.removeItem("token");
      navigate("/");
      setIsNavExpanded(!isNavExpanded);
    } else {
      return;
    }
    setIsModalOpen(false);
  }
  return (
    <div className="navbar">
      <Link id="mainTitle" to="/">
        <h1>Plan Your Day...</h1>
      </Link>
      {/* Conditionally render the menu icon */}
      <div
        className="menu-icon"
        onClick={() => {
          setIsNavExpanded(!isNavExpanded);
        }}
      >
        <FontAwesomeIcon icon={faBars} />
      </div>

      <div className={isNavExpanded ? "menu-expanded" : "menu-items"}>
        {token ? (
          <div>
            <Link to="/">
              <button
                title="Home"
                className="btn"
                onClick={() => {
                  setIsNavExpanded(false);
                }}
              >
                <HomeIcon sx={{ fontSize: 30 }} />
              </button>
            </Link>

            <Link to="/task">
              <button
                className="btn"
                title="add tasks"
                onClick={() => {
                  setIsNavExpanded(false);
                }}
              >
                <TaskIcon sx={{ fontSize: 30 }} />
              </button>
            </Link>

            <Link to="/">
              <button title="logout" onClick={handleLogOut} className="btn">
                <LogoutIcon sx={{ fontSize: 25 }} />
              </button>
            </Link>
            {isModalOpen && (
              <Modal
                onCancel={() => setIsModalOpen(false)}
                onConfirm={onConfirm}
              />
            )}
          </div>
        ) : (
          <div>
            <Link to="/login">
              <button
                className="btn"
                onClick={() => {
                  setIsNavExpanded(false);
                }}
              >
                Login
              </button>
            </Link>
            <Link to="/signup">
              <button
                className="btn"
                onClick={() => {
                  setIsNavExpanded(!isNavExpanded);
                }}
              >
                SignUp
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Nav;
