import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./register.css";
import axios from "axios";

const SignUp = () => {
  const [user, setUser] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    //👇🏻 update the state with the added values
    setUser({ ...user, [e.target.name]: value });
  };
  function handleSignUp(e) {
    e.preventDefault();
    axios
      .post("http://localhost:8000/user/signup", user)
      .then((res) => {
        alert("SignUp successfully");
        //👇🏻 redirects to the login page.
        navigate("/login");
      })
      .catch((err) => {
        alert("Could not register");
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
          <br />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Your password..."
            value={user.password}
            required
            onChange={handleChange}
          />
          <br />
          <button>Sign-up</button>
        </form>
      </div>
      <div className="signupImageSection"></div>
    </div>
  );
};

export default SignUp;
