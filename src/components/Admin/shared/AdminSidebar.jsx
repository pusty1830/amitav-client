import { NavLink } from "react-router-dom";
import {
  FaChartPie, // Dashboard
  FaInfoCircle, // About
  FaCogs, // Services
  FaWrench, // Skills
  FaFileAlt, // Resume
  FaImages, // Portfolio
  FaBlog, // Blog
  FaEnvelopeOpenText, // Messages
} from "react-icons/fa";

export default function AdminSidebar({ isMobile, onClose }) {
  const handleLinkClick = () => {
    if (isMobile && onClose) onClose(); // auto close on mobile
  };

  return (
    <div
      className={`bg-dark text-white p-3 ${
        isMobile ? "position-fixed top-0 start-0 vh-100" : "vh-100"
      }`}
      style={{
        width: "250px",
        zIndex: isMobile ? 1050 : 1,
        transition: "transform 0.3s ease-in-out",
      }}
    >
      <h4 className="text-center mb-4">Admin Panel</h4>
      <ul className="nav flex-column">
        <li className="nav-item">
          <NavLink
            to="/admin/dashboard"
            onClick={handleLinkClick}
            className="nav-link text-white"
          >
            <FaChartPie className="me-2" /> Dashboard
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink
            to="/admin/about"
            onClick={handleLinkClick}
            className="nav-link text-white"
          >
            <FaInfoCircle className="me-2" />
            About
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink
            to="/admin/services"
            onClick={handleLinkClick}
            className="nav-link text-white"
          >
            <FaCogs className="me-2" /> Services
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink
            to="/admin/skills"
            onClick={handleLinkClick}
            className="nav-link text-white"
          >
            <FaWrench className="me-2" /> Skills
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink
            to="/admin/resume"
            onClick={handleLinkClick}
            className="nav-link text-white"
          >
            <FaFileAlt className="me-2" /> Resume
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink
            to="/admin/portfolio"
            onClick={handleLinkClick}
            className="nav-link text-white"
          >
            <FaImages className="me-2" /> Portfolio
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink
            to="/admin/blog"
            onClick={handleLinkClick}
            className="nav-link text-white"
          >
            <FaBlog className="me-2" /> Blog
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink
            to="/dashboard/messages"
            onClick={handleLinkClick}
            className="nav-link text-white"
          >
            <FaEnvelopeOpenText className="me-2" /> Messages
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
