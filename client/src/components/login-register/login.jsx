import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import "react-toastify/dist/ReactToastify.css";
import "./login.css";

const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/user/login", user);
      localStorage.setItem("token", res.data.token);
      toast.success("Login successful!", {
        onClose: () => navigate("/"),
      });
    } catch (err) {
      toast.error(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="loginContainer">
      <div className="formSection">
        <h3 className="formHeader">Login</h3>
        <p className="formMessage">
          Don't have an account?
          <Link to="/signup" className="formMessageLink">
            Sign up
          </Link>
        </p>
        <form className="login__form" onSubmit={handleLogin}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            name="email"
            id="email"
            value={user.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="password">Password</label>
          <div className="password-container">
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Enter your password"
              name="password"
              id="password"
              value={user.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="visibility-btn"
              onClick={() => setPasswordVisible(!passwordVisible)}
              aria-label="Toggle password visibility"
            >
              {passwordVisible ? <VisibilityOff /> : <Visibility />}
            </button>
          </div>

          <button type="submit">Login</button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
