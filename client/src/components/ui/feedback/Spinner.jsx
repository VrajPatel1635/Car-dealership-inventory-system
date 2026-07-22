import React from "react";
import { cn } from "../../../utils/cn";

const Spinner = React.forwardRef(
  ({ className, size = "md", ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="status"
        aria-label="Loading"
        className={cn(
          "spinner",
          {
            "w-4 h-4 border-2": size === "sm",
            "w-6 h-6 border-2": size === "md",
            "w-8 h-8 border-3": size === "lg",
          },
          className,
        )}
        {...props}
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  },
);
Spinner.displayName = "Spinner";
export default Spinner;
