import React from "react";
import { cn } from "../../../utils/cn";

const Skeleton = React.forwardRef(
  ({ className, width, height, rounded = "md", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "skeleton",
          {
            "rounded-full": rounded === "full",
            "rounded-md": rounded === "md",
            "rounded-lg": rounded === "lg",
            "rounded-sm": rounded === "sm",
            "rounded-none": rounded === "none",
          },
          className,
        )}
        style={{ width, height }}
        {...props}
      />
    );
  },
);
Skeleton.displayName = "Skeleton";
export default Skeleton;
