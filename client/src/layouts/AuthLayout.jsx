import React from "react";
import { Outlet } from "react-router-dom";
import { ThemeToggle } from "../components/layout";

const AuthLayout = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-background overflow-hidden p-6 sm:p-8">
      <div className="absolute top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      {/* Decorative Background Layer */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
        {/* Visible dotted grid background */}
        <div
          className="absolute inset-0 opacity-80 dark:opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(var(--foreground-muted) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        
        {/* Soft vignette to fade grid at edges */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 20%, var(--background) 100%)",
          }}
        />
        
        {/* Two offset accent shapes */}
        <div
          className="absolute -top-[10%] -left-[10%] w-[480px] h-[360px] rounded-full bg-primary/20 blur-[80px]"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-[10%] -right-[10%] w-[360px] h-[280px] rounded-full bg-primary/20 blur-[64px]"
          aria-hidden="true"
        />
      </div>


      {/* Content */}
      <div className="relative z-10 w-full max-w-[460px]">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
