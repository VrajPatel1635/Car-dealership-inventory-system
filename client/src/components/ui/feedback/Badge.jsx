import React from "react";
import { cn } from "../../../utils/cn";

const Badge = React.forwardRef(
  ({ className, variant = "default", children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "badge",
          {
            "badge-success": variant === "success",
            "badge-warning": variant === "warning",
            "badge-error": variant === "error",
            "badge-info": variant === "info",
          },
          className,
        )}
        {...props}
      >
        {children}
      </span>
    );
  },
);
Badge.displayName = "Badge";
export default Badge;
