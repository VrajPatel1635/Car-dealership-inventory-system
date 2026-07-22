import React from "react";
import { Link } from "react-router-dom";
import Container from "./Container";
import ThemeToggle from "./ThemeToggle";
import { Button } from "../ui";
import { useAuth } from "../../hooks/useAuth";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  return (
    <header className="sticky top-0 z-sticky w-full border-b border-border-light bg-navbar-background backdrop-blur-md">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <a
              href="/"
              className="text-h5-size font-heading font-medium text-foreground"
            >
              AutoInventory
            </a>
            <nav className="hidden md:flex items-center gap-4">
              <a
                href="#"
                className="text-body-sm-size font-medium text-muted hover:text-foreground transition-colors"
              >
                Vehicles
              </a>
              <a
                href="#"
                className="text-body-sm-size font-medium text-muted hover:text-foreground transition-colors"
              >
                Dealers
              </a>
              <a
                href="#"
                className="text-body-sm-size font-medium text-muted hover:text-foreground transition-colors"
              >
                About
              </a>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            {isAuthenticated ? (
              <Button variant="outline" size="sm" onClick={logout}>
                Logout
              </Button>
            ) : (
              <Link to="/login">
                <Button variant="primary" size="sm">
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Navbar;
