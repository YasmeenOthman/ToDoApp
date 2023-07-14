import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div className="navbar">
      <Link to="/">
        {" "}
        <div>
          <img
            className="logo"
            src="https://static.semrush.com/blog/uploads/media/84/a3/84a3d71987338dfb855b5d9d4c9d1ee2/photo.svg"
          />
        </div>
      </Link>

      <h3>Plan Your Day</h3>
      <div>
        <Link to="/login">
          <button className="registerbtn">Login</button>
        </Link>
        <Link to="/signup">
          <button className="registerbtn">SignUp</button>
        </Link>
      </div>
    </div>
  );
};

export default Nav;
