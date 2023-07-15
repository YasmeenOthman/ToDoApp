import React from "react";
import Quote from "./Quote";
import Footer from "../footer/footer";
import "./Home.css";

const HomePage = () => {
  return (
    <div className="homePage-container">
      <Quote />
      <div className="HomePage-Body">
        <div className="section">
          <p className="bodyText">
            What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the
            printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type
            specimen book. It has survived not only five centuries, but also the
            leap into electronic typesetting, remaining essentially unchanged.
            It was popularised in the 1960s with the release of Letraset sheets
            containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem
            Ipsum.
          </p>
          <img src="./assets/1.png" width="600px" />
        </div>
        <div className="section">
          <img src="./assets/2.png" width="600px" />
          <p className="bodyText">
            What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the
            printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type
            specimen book. It has survived not only five centuries, but also the
            leap into electronic typesetting, remaining essentially unchanged.
            It was popularised in the 1960s with the release of Letraset sheets
            containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem
            Ipsum.
          </p>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default HomePage;
