// components/Layout/Topbar.js
import React from "react";
import { FaBars } from "react-icons/fa";

export default function AdminNavbar({ onLogout, onToggleSidebar }) {
  return (
    <div className="bg-dark d-flex justify-content-between align-items-center p-3 shadow text-white">
      <div className="d-flex align-items-center">
        <button
          className="btn btn-outline-light btn-sm me-3"
          onClick={onToggleSidebar}
        >
          <FaBars />
        </button>
        <h5 className="mb-0">Admin Dashboard</h5>
      </div>
      <button className="btn btn-outline-danger btn-sm" onClick={onLogout}>
        Logout
      </button>
    </div>
  );
}
