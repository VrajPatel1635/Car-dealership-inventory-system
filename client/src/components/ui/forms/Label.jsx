import React from "react";
import { cn } from "../../../utils/cn";

const Label = React.forwardRef(
  ({ className, children, required, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(
          "text-sm font-medium text-foreground/90 select-none cursor-pointer tracking-tight",
          className
        )}
        {...props}
      >
        {children}
        {required && (
          <span className="text-error ml-1 font-semibold" aria-hidden="true">
            *
          </span>
        )}
      </label>
    );
  },
);
Label.displayName = "Label";
export default Label;
