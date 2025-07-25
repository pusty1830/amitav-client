import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div>
      <Header />
      <main style={{ height: "100%", overflowX: "hidden" }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
