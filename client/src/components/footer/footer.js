import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";

function Footer() {
  return (
    <footer>
      <div className="footer-contacts">
        <p>Email:yasmeen.othman20@gmail.com</p>
        <p>Phone: 00972-595121097</p>
        <p>Address: Tulkarm, Palestine</p>
      </div>
      <div>
        <p className="footer-copyright">
          &copy; {new Date().getFullYear()} Yasmeen Othman. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
