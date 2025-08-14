import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer
      className="text-light text-center py-3"
      style={{ backgroundColor: "rgb(25, 25, 25)" }}
    >
      <div className="container">
        <p className="small m-0">
          © {year}. Designed by <span style={{ color: "#eab308" }}>Jagat Jyoti</span>
          . All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
