import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [user, setUser] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    //👇🏻 update the state with the added values
    setUser({ ...user, [e.target.name]: value });
    console.log(user);
  };
  function handleSignUp(e) {
    e.preventDefault();
    axios
      .post("http://localhost:8000/user/signup", user)
      .then((res) => {
        console.log("SignUp successfully", res);
        //👇🏻 redirects to the login page.
        navigate("/login");
      })
      .catch((err) => {
        console.log("Could not register", err);
      });
  }

  return (
    <div className="login__container">
      <form className="login__form" onSubmit={handleSignUp}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          required
          value={user.username}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="email">Provide the email</label>
        <input
          type="text"
          name="email"
          id="email"
          required
          value={user.email}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="password">Provide a password</label>
        <input
          type="text"
          name="password"
          id="password"
          value={user.password}
          required
          onChange={handleChange}
        />
        <br />
        <button>SIGN Up</button>
      </form>
    </div>
  );
};

export default SignUp;
