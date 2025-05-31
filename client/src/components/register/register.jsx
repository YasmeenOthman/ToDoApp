import React, { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import toastOptions from "../../Toastify";
import "./register.css";
import axios from "axios";

const SignUp = () => {
  const [user, setUser] = useState({ username: "", email: "", password: "" });
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [passwordVisible, setPasswordVisible] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    e.preventDefault();

    // Validation rules
    let error = "";
    if (name === "username") {
      if (value.length < 3) {
        error = "Username must be at least 3 characters long";
      }
    } else if (name === "password") {
      if (value.length < 8) {
        error = "Password must be at least 8 characters long";
      } else if (!/[A-Z]/.test(value)) {
        error = "Password must contain at least one capital letter";
      } else if (!/\W/.test(value)) {
        error = "Password must contain at least one symbol @#!^...";
      }
    }

    // Update the user state
    setUser({ ...user, [name]: value });

    // Update the errors state
    setErrors({ ...errors, [name]: error });
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  async function handleSignUp(e) {
    e.preventDefault();
    // Check for validation errors
    if (Object.values(errors).some((error) => error !== "")) {
      alert("Please fix the validation errors before signing up.");
      return;
    }

    axios
      .post("http://localhost:8000/user/signup", user)
      .then((res) => {
        toast.success("SignUp successfully", {
          toastOptions,
          onClose: () => {
            //👇🏻 redirects to the login page.
            navigate("/login");
          },
        });
      })
      .catch((err) => {
        toast.error(err.response.data.msg, toastOptions);
      });
  }

  return (
    <div className="signUpContainer">
      <div className="formSection">
        <h3 className="formHeader">Sign-up</h3>
        <p className="formMessage">
          Already have an account?
          <Link className="formMessageLink" to="/login">
            Login{" "}
          </Link>
        </p>
        <form className="signup__form" onSubmit={handleSignUp}>
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
          <br />
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

          <br />

          <label htmlFor="password">Password</label>
          <div className="password-container">
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Your password..."
              value={user.password}
              required
              onChange={handleChange}
            />
            <button
              className="visibility-btn"
              type="button"
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? <VisibilityOff /> : <Visibility />}
            </button>
          </div>

          {errors.password && (
            <div className="error-message">{errors.password}</div>
          )}
          <br />
          <button>Sign-up</button>
        </form>
      </div>
      <div className="signupImageSection"></div>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
