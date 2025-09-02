import { useState, useEffect } from "react";
import { FaPhoneAlt, FaBars, FaTimes, FaCode } from "react-icons/fa";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const navLinks = [
    "HOME",
    "ABOUT",
    "SERVICE",
    "RESUME",
    "PORTFOLIO",
    "BLOG",
    "CONTACT",
  ];

  // 🔹 Detect active section while scrolling
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.6 } // 60% visible = active
    );

    sections.forEach((sec) => observer.observe(sec));

    return () => {
      sections.forEach((sec) => observer.unobserve(sec));
    };
  }, []);

  return (
    <header className="bg-dark text-white sticky-top shadow-sm">
      <div className="container py-3 d-flex justify-content-between align-items-center">
        {/* Logo Section */}
        <div className="d-flex align-items-center gap-2">
          <div
            className="d-flex justify-content-center align-items-center border border-warning rounded-circle"
            style={{ width: "35px", height: "35px" }}
          >
            <FaCode className="text-warning" />
          </div>
          <h1 className="h5 fw-bold m-0">
            <span className="text-warning">A</span>mitav
          </h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="d-none d-md-flex gap-4 align-items-center">
          {navLinks.map((link) => {
            const id = link.toLowerCase();
            return (
              <a
                key={link}
                href={link === "BLOG" ? "/blog" : `/#${id}`}
                className={`text-decoration-none ${
                  activeSection === id ? "text-warning" : "text-white"
                } fw-medium small`}
              >
                {link}
              </a>
            );
          })}
        </nav>

        {/* Desktop Contact */}
        <div className="d-none d-md-flex align-items-center gap-2 border-start border-secondary ps-3">
          <FaPhoneAlt className="text-secondary" />
          <span className="text-warning fw-medium small">+91 6371372865</span>
        </div>

        {/* Mobile Toggle */}
        <div className="d-md-none">
          <button
            className="btn btn-outline-warning btn-sm"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="bg-black border-top border-secondary d-md-none px-4 pt-3 pb-4">
          {navLinks.map((link) => {
            const id = link.toLowerCase();
            return (
              <a
                key={link}
                href={link === "BLOG" ? "/blog" : `/#${id}`}
                className={`d-block py-1 text-decoration-none ${
                  activeSection === id ? "text-warning" : "text-white"
                } fw-medium`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link}
              </a>
            );
          })}

          <hr className="border-secondary" />
          <div className="d-flex align-items-center gap-2">
            <FaPhoneAlt className="text-secondary" />
            <span className="text-warning fw-medium small">+91 6371372865</span>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
