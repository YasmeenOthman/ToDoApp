import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";

function Footer() {
  return (
    <footer>
      <div className="copy-right">
        <p className="footer-copyright">
          &copy; {new Date().getFullYear()} Yasmeen Othman.
        </p>
        <p className="second">All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
