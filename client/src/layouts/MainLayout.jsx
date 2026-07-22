import React from "react";
import { Navbar, Footer } from "../components/layout";

const MainLayout = ({ children }) => {
  return (
    <div className="page">
      <Navbar />
      <main className="page-content">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
