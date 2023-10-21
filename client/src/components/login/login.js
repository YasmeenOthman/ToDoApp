import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "./login.css";
import axios from "axios";

const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [passwordVisible, setPasswordVisible] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    //👇🏻 update the state with the added values
    setUser({ ...user, [e.target.name]: value });
  };
  function handleLogin(e) {
    e.preventDefault();
    axios
      .post("http://localhost:8000/user/login", user)
      .then((res) => {
        alert("login successfully");
        //👇🏻 redirects to the Tasks page.
        localStorage.setItem("token", res.data.token);
        navigate("/");
      })
      .catch((err) => {
        alert(
          "Could not login, make sure you have an account or you are using the right credential"
        );
      });
  }
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  return (
    <div className="loginContainer">
      <div className="formSection">
        {" "}
        <h3 className="formHeader">Login</h3>
        <p className="formMessage">
          You do not have an account!
          <Link className="formMessageLink" to="/signup">
            signup{" "}
          </Link>
        </p>
        <form className="login__form" onSubmit={handleLogin}>
          <label htmlFor="email">Email</label>
          <input
            placeholder="Email..."
            type="email"
            name="email"
            id="email"
            value={user.email}
            onChange={handleChange}
            required
          />
          <br />
          <label htmlFor="password">Password</label>
          <div className="password-container">
            <input
              placeholder="Password..."
              type={passwordVisible ? "text" : "password"}
              name="password"
              id="password"
              value={user.password}
              onChange={handleChange}
              required
            />
            <button
              className="visibility-btn"
              type="button"
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? <VisibilityOff /> : <Visibility />}
            </button>
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
      <div className="imageSection"></div>
    </div>
  );
};

export default Login;
