import React, { useState } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import LogoutIcon from "@mui/icons-material/Logout";
import TaskIcon from "@mui/icons-material/Task";
import HomeIcon from "@mui/icons-material/Home";
import { red } from "@mui/material/colors";

import "./Nav.css";

const Nav = () => {
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const navigate = useNavigate("");
  const token = localStorage.getItem("token");
  let username = "";
  if (token) {
    let decoded = jwt_decode(token);
    username = decoded.username;
  }

  function handleLogOut() {
    if (window.confirm("Are you sure you want to logout?")) {
      if (token) {
        localStorage.removeItem("token");
        navigate("/");
        setIsNavExpanded(!isNavExpanded);
      } else {
        return;
      }
    }
  }

  return (
    <div className="navbar">
      <Link to="/">
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
              <button className="btn">
                <HomeIcon sx={{ fontSize: 35 }} />
              </button>
            </Link>

            <Link to="/task">
              <button
                className="btn"
                title="add tasks"
                onClick={() => {
                  setIsNavExpanded(!isNavExpanded);
                }}
              >
                <TaskIcon sx={{ fontSize: 35 }} />
              </button>
            </Link>
            {/* <button className="btn-username">{username}</button> */}
            <Link to="/">
              <button title="logout" onClick={handleLogOut} className="btn">
                <LogoutIcon sx={{ fontSize: 35 }} />
              </button>
            </Link>
          </div>
        ) : (
          <div>
            <Link to="/login">
              <button
                className="btn"
                onClick={() => {
                  setIsNavExpanded(!isNavExpanded);
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
