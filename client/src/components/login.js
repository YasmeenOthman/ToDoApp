import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./login.css";
import axios from "axios";

const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    //👇🏻 update the state with the added values
    setUser({ ...user, [e.target.name]: value });
    console.log(user);
  };
  function handleLogin(e) {
    e.preventDefault();
    axios
      .post("http://localhost:8000/user/login", user)
      .then((res) => {
        console.log("login successfully", res);
        //👇🏻 redirects to the Tasks page.
        navigate("/task");
      })
      .catch((err) => {
        console.log("Could not register", err);
      });
  }
  return (
    <div className="loginContainer">
      <div className="formSection">
        {" "}
        <h3 className="formHeader">Login</h3>
        <p className="loginMessage">
          You do not have an account?! signup{" "}
          <Link to="/signup">here</Link>
        </p>
        <form className="login__form" onSubmit={handleLogin}>
          <label htmlFor="email">Email</label>
          <input
            placeholder="Email..."
            type="text"
            name="email"
            id="email"
            value={user.email}
            onChange={handleChange}
            required
          />
          <br />
          <label htmlFor="password">Password</label>
          <input
            placeholder="Password..."
            type="text"
            name="password"
            id="password"
            value={user.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
      <div className="imageSection"></div>
    </div>
  );
};

export default Login;
