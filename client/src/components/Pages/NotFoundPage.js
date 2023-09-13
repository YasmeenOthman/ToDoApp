import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFoundPage = () => {
  return (
    <div className="pageNotFound">
      <div className="NotFoundMessage">
        <h1>
          OOPS... <span>!</span>
        </h1>
        <h2>Something's Not Right.</h2>
        <p>
          Please check the URL again or let us take you back to the homepage{" "}
        </p>
        <Link to="/">
          <button className="notFound-btn"> Back To Homepage </button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
