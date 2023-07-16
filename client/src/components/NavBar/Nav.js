import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

const Nav = () => {
  return (
    <div className="navbar">
      <Link to="/">
        <h1>Plan Your Day...</h1>
      </Link>
      <div>
        <Link to="/login">
          <button className="btn">Login</button>
        </Link>
        <Link to="/signup">
          <button className="btn">SignUp</button>
        </Link>
      </div>
    </div>
  );
};

export default Nav;
