import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AdminNavbar from "./Navbar";
import AdminSidebar from "./AdminSidebar";
import { logout } from "../../../services/axiosClient";

export default function AdminLayout() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
    if (window.innerWidth >= 768) {
      setIsSidebarOpen(true); // always show on desktop
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    logout();
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      {isSidebarOpen && (
        <AdminSidebar isMobile={isMobile} onClose={closeSidebar} />
      )}

      {/* Overlay for mobile when sidebar is open */}
      {isMobile && isSidebarOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
          style={{ zIndex: 1040 }}
          onClick={closeSidebar}
        ></div>
      )}

      <div className="flex-grow-1" style={{ minHeight: "100vh" }}>
        <AdminNavbar onLogout={handleLogout} onToggleSidebar={toggleSidebar} />
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
