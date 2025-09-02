import "./Style.css";
import Home from "./pages/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login";
import Dashboard from "./pages/Admin/Dashboard/Dashboard";
import AdminLayout from "./components/Admin/shared/AdminLayout";
import About from "./pages/Admin/About";
import MySkillsManager from "./pages/Admin/Skill";
import ServiceManager from "./pages/Admin/Services";
import ResumeManager from "./pages/Admin/Resume";
import PortfolioManager from "./pages/Admin/PortfolioManager";
import BlogManager from "./pages/Admin/Blog";
import { ToastContainer } from "react-toastify";
import Layout from "./components/shared/Layout";
import HeroTable from "./pages/Admin/HeroTable";
import MessageTable from "./pages/Admin/Messages";
import BlogDetails from "./pages/Home/BlogDetails";
import Blog from "./pages/Home/Blog";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogDetails />} />
          </Route>

          {/* Admin Route with Layout */}
          <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/hero" element={<HeroTable />} />
            <Route path="/admin/about" element={<About />} />
            <Route path="/admin/skills" element={<MySkillsManager />} />
            <Route path="/admin/services" element={<ServiceManager />} />
            <Route path="/admin/resume" element={<ResumeManager />} />
            <Route path="/admin/portfolio" element={<PortfolioManager />} />
            <Route path="/admin/blog" element={<BlogManager />} />
            <Route path="/admin/message" element={<MessageTable />} />
            {/* <Route path="/dashboard/users" element={<Users />} />
            <Route path="/dashboard/settings" element={<Settings />} />
            <Route path="/dashboard/reports" element={<Reports />} /> */}
          </Route>
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </div>
  );
}

export default App;
