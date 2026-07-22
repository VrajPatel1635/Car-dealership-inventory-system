import React from "react";
import Container from "./Container";

const Footer = () => {
  return (
    <footer className="border-t border-border-light bg-background-secondary py-8 mt-auto">
      <Container>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-body-sm-size text-muted">
            &copy; {new Date().getFullYear()} AutoInventory. All rights
            reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="text-body-sm-size text-muted hover:text-foreground transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-body-sm-size text-muted hover:text-foreground transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
