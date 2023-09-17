import { Link } from "react-router-dom";
import React from "react";
import Quote from "./Quote";
import Footer from "../Footer/Footer";
import "./Home.css";

const HomePage = () => {
  return (
    <>
      <div className="homePage-container">
        <div className="quote-section">
          <Quote />
        </div>

        <div className="HomePage-Body">
          <div className="section">
            <div className="bodyText">
              {" "}
              <p className="upperText" id="about">
                Welcome to our task management app, here organizing your tasks
                has never been easier. With our intuitive and user-friendly
                interface, you can effortlessly manage your daily, weekly, and
                monthly tasks all in one place. Stay on top of your
                responsibilities by creating tasks, setting due dates, and
                assigning priorities.
              </p>
            </div>
            {/* <CalendarComponent /> */}
            <img src="./assets/4.gif" alt="homePageImage" />
          </div>
          <div className="section">
            <img src="./assets/3.gif" alt="homePageImage" />
            <div className="bodyText">
              <h2 className="lowerText">Plan Your Day .....</h2>
              <p className="lowerText2">
                Don't hesitate any longer—take the leap and register now to give
                it a try!
              </p>
              <div className="homePageRegisterButton">
                <button>
                  <Link to="/signup">Sign Up</Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
