import React from "react";
import { Link } from "react-router-dom";
import { CarFront, LogOut, LogIn } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { Button } from "../ui";
import { useAuth } from "../../hooks/useAuth";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  
  return (
    <div className="sticky top-4 z-50 px-4 sm:px-6 w-full max-w-[1400px] mx-auto pointer-events-none mb-4">
      <header className="w-full bg-primary/95 backdrop-blur-xl border border-primary-hover shadow-xl shadow-primary/10 rounded-full pointer-events-auto transition-all duration-500">
        <div className="flex h-[68px] items-center justify-between px-6 sm:px-8">
          
          <div className="flex items-center gap-3.5">
            <div className="bg-primary-foreground text-primary p-2 rounded-full shadow-sm">
              <CarFront size={20} strokeWidth={2.5} />
            </div>
            <Link
              to="/inventory"
              className="text-h6-size font-heading font-bold text-primary-foreground tracking-wide hover:opacity-90 transition-opacity"
            >
              AutoInventory
            </Link>
          </div>
          
          <div className="flex items-center gap-3 sm:gap-5">
            <ThemeToggle 
              variant="ghost"
              className="border border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/15 hover:border-primary-foreground/40 transition-colors duration-300"
            />
            
            <div className="w-px h-6 bg-primary-foreground/20 hidden sm:block rounded-full"></div>
            
            {isAuthenticated ? (
              <button 
                onClick={logout}
                className="flex items-center justify-center gap-2 rounded-full border border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-primary transition-all duration-300 px-5 font-semibold group h-9 cursor-pointer"
              >
                <span className="hidden sm:inline">Logout</span>
                <LogOut size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            ) : (
              <Link 
                to="/login"
                className="flex items-center justify-center gap-2 rounded-full border border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary transition-all duration-300 px-6 font-bold tracking-wide group h-9 shadow-md cursor-pointer"
              >
                <span className="hidden sm:inline">Login</span>
                <LogIn size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            )}
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
