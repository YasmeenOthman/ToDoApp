import React, { useState } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
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
    if (token) {
      localStorage.removeItem("token");
      navigate("/");
      setIsNavExpanded(!isNavExpanded);
    } else {
      return;
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
            <Link to="/task">
              <button
                className="btn"
                onClick={() => {
                  setIsNavExpanded(!isNavExpanded);
                }}
              >
                Your Tasks
              </button>
            </Link>

            <Link to="/">
              <button onClick={handleLogOut} className="btn">
                LogOut
              </button>
            </Link>

            <button className="btn-username">{username}</button>
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
