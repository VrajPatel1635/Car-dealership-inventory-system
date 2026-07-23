import React from "react";
import { ThemeToggle } from "../components/layout";
import { Outlet, Link } from "react-router-dom";
import { LayoutDashboard, LogOut } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

const AdminLayout = () => {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Floating Navbar matching the Inventory page */}
      <div className="sticky top-4 z-50 px-4 sm:px-6 w-full max-w-[1400px] mx-auto pointer-events-none mb-4">
        <header className="w-full bg-primary/95 backdrop-blur-xl border border-primary-hover shadow-xl shadow-primary/10 rounded-full pointer-events-auto transition-all duration-500">
          <div className="flex h-[68px] items-center justify-between px-6 sm:px-8">
            <div className="flex items-center gap-3.5">
              <div className="bg-primary-foreground text-primary p-2 rounded-full shadow-sm">
                <LayoutDashboard size={20} strokeWidth={2.5} />
              </div>
              <Link
                to="/admin"
                className="text-h6-size font-heading font-bold text-primary-foreground tracking-wide hover:opacity-90 transition-opacity flex items-center gap-2"
              >
                AutoInventory
                <span className="text-[10px] font-mono text-primary-foreground/70 tracking-widest uppercase bg-primary-foreground/10 px-2 py-0.5 rounded-full hidden sm:inline-block">Admin</span>
              </Link>
            </div>
            
            <div className="flex items-center gap-3 sm:gap-5">
              <ThemeToggle 
                variant="ghost"
                className="border border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/15 hover:border-primary-foreground/40 transition-colors duration-300"
              />
              
              <div className="w-px h-6 bg-primary-foreground/20 hidden sm:block rounded-full"></div>
              
              <button 
                onClick={logout}
                className="flex items-center justify-center gap-2 rounded-full border border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-primary transition-all duration-300 px-5 font-semibold group h-9 cursor-pointer"
              >
                <span className="hidden sm:inline">Logout</span>
                <LogOut size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </header>
      </div>

      {/* Main Content */}
      <main className="flex-1 w-full flex flex-col">
        <div className="flex-1">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;

