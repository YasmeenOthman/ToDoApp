import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Nav.css";

const Nav = () => {
  const navigate = useNavigate("");
  const token = localStorage.getItem("token");

  function handleLogOut() {
    if (token) {
      localStorage.removeItem("token");
      navigate("/");
    } else {
      return;
    }
  }

  return (
    <div className="navbar">
      <Link to="/">
        <h1>Plan Your Day...</h1>
      </Link>
      <div>
        {token ? (
          <div>
            <Link to="/Task">
              <button className="btn">Your Tasks</button>
            </Link>
            <Link to="/">
              <button onClick={handleLogOut} className="btn">
                LogOut
              </button>
            </Link>
          </div>
        ) : (
          <div>
            <Link to="/login">
              <button className="btn">Login</button>
            </Link>
            <Link to="/signup">
              <button className="btn">SignUp</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Nav;
