import React from "react";
import { ThemeToggle } from "../components/layout";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="page bg-background-secondary">
      <header className="sticky top-0 z-sticky w-full border-b border-border bg-surface px-6 py-3 flex items-center justify-between">
        <h1 className="text-h6-size font-heading font-medium">
          Admin Dashboard
        </h1>
        <ThemeToggle />
      </header>
      <div className="flex flex-1">
        {/* Sidebar placeholder */}
        <aside className="hidden md:block w-64 border-r border-border bg-surface p-4">
          <nav className="flex flex-col gap-2">
            <div className="p-2 bg-surface-hover rounded-md text-body-sm-size font-medium">
              Dashboard
            </div>
            <div className="p-2 text-muted hover:bg-surface-hover rounded-md text-body-sm-size font-medium cursor-pointer">
              Inventory
            </div>
            <div className="p-2 text-muted hover:bg-surface-hover rounded-md text-body-sm-size font-medium cursor-pointer">
              Users
            </div>
          </nav>
        </aside>
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
