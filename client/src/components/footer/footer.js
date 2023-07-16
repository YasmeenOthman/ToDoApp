import { Link } from "react-router-dom";
import "./footer.css";
function Footer() {
  return (
    <footer>
      <div class="footer-links">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            {" "}
            <Link to="/" href="#about">
              About
            </Link>
          </li>
          <li>
            <Link to="/task">Manage Your Tasks</Link>
          </li>
        </ul>
      </div>

      <div class="footer-contacts">
        <p>Email: example@example.com</p>
        <p>Phone: 123-456-7890</p>
        <p>Address: 123 Main Street, City</p>
      </div>

      <div class="footer-newsletter">
        <h3>Subscribe to our Newsletter</h3>
        <form action="#">
          <input
            type="email"
            name="email"
            placeholder="Your email address"
            required
          />
          <button type="submit">Subscribe</button>
        </form>
      </div>
    </footer>
  );
}

export default Footer;
