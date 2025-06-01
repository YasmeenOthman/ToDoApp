import React, { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import toastOptions from "../../Toastify";
import "./login.css"; 

import axios from "axios";

const SignUp = () => {
  const [user, setUser] = useState({ username: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    let error = "";

    if (name === "username" && value.length < 3) {
      error = "Username must be at least 3 characters long";
    } else if (name === "password") {
      if (value.length < 8)
        error = "Password must be at least 8 characters long";
      else if (!/[A-Z]/.test(value))
        error = "Password must contain at least one capital letter";
      else if (!/\W/.test(value))
        error = "Password must contain at least one symbol";
    }

    setUser({ ...user, [name]: value });
    setErrors({ ...errors, [name]: error });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (Object.values(errors).some((err) => err)) {
      alert("Please fix the validation errors before signing up.");
      return;
    }

    try {
      await axios.post("http://localhost:8000/user/signup", user);
      toast.success("Sign-up successful!", {
        toastOptions,
        onClose: () => navigate("/login"),
      });
    } catch (err) {
      toast.error(err.response?.data?.msg || "Signup failed", toastOptions);
    }
  };

  return (
    <div className="loginContainer">
      <div className="formSection">
        <h3 className="formHeader">Sign-up</h3>
        <p className="formMessage">
          Already have an account?
          <Link className="formMessageLink" to="/login">
            Login
          </Link>
        </p>
        <form className="login__form" onSubmit={handleSignUp}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Your username..."
            required
            value={user.username}
            onChange={handleChange}
          />
          {errors.username && (
            <div className="error-message">{errors.username}</div>
          )}

          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Your email..."
            required
            value={user.email}
            onChange={handleChange}
          />
          {errors.email && <div className="error-message">{errors.email}</div>}

          <label htmlFor="password">Password</label>
          <div className="password-container">
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Your password..."
              required
              value={user.password}
              onChange={handleChange}
            />
            <button
              className="visibility-btn"
              type="button"
              onClick={() => setPasswordVisible(!passwordVisible)}
              aria-label="Toggle password visibility"
            >
              {passwordVisible ? <VisibilityOff /> : <Visibility />}
            </button>
          </div>
          {errors.password && (
            <div className="error-message">{errors.password}</div>
          )}

          <button type="submit">Sign-up</button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
