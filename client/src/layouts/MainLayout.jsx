import React from "react";
import { Navbar, Footer } from "../components/layout";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="page">
      <Navbar />
      <main className="page-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
