import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
        navigate("/tasks");
      })
      .catch((err) => {
        console.log("Could not register", err);
      });
  }
  return (
    <div className="login__container">
      <form className="login__form" onSubmit={handleLogin}>
        <label htmlFor="email">Email</label>
        <input
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
  );
};

export default Login;
