import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";
import { Button } from "../ui";

const ThemeToggle = ({ className, variant = "ghost" }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant={variant}
      size="sm"
      className={`btn-icon rounded-full w-9 h-9 p-0 flex items-center justify-center ${className || ""}`}
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
    </Button>
  );
};

export default ThemeToggle;
