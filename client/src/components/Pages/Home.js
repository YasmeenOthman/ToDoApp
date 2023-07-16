import React from "react";
import Quote from "./Quote";
import Footer from "../footer/Footer";
import "./Home.css";

const HomePage = () => {
  return (
    <>
      <div className="homePage-container">
        <Quote />
        <div className="HomePage-Body">
          <div className="section">
            <p className="bodyText">
              Welcome to our task management app, where organizing your tasks
              has never been easier. With our intuitive and user-friendly
              interface, you can effortlessly manage your daily, weekly, and
              monthly tasks all in one place. Stay on top of your
              responsibilities by creating tasks, setting due dates, and
              assigning priorities.
            </p>
            <img src="./assets/4.gif" />
          </div>
          <div className="section">
            <img src="./assets/3.gif" />
            <p className="bodyText">
              What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the
              printing and typesetting industry. Lorem Ipsum has been the
              industry's standard dummy text ever since the 1500s, when an
              unknown
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
