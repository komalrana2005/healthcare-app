import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h2>HealthCare+</h2>
      <div>
        <Link to="/">Patient</Link>
        <Link to="/volunteer">Volunteer</Link>
        <Link to="/support">Support</Link>
        <Link to="/chatbot">Chatbot</Link>
      </div>
    </nav>
  );
}
