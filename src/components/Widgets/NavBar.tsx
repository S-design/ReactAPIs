import { Link } from "react-router-dom";
import "./styles/NavBar.css";

export default function NavBar() {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <br />
        <li>
          <Link to="./history">Download History</Link>
        </li>
      </ul>
    </nav>
  );
}

