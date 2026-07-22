import React from "react";
import { cn } from "../../../utils/cn";

const Label = React.forwardRef(
  ({ className, children, required, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn("text-label-size font-medium text-foreground", className)}
        {...props}
      >
        {children}
        {required && (
          <span className="text-error ml-1" aria-hidden="true">
            *
          </span>
        )}
      </label>
    );
  },
);
Label.displayName = "Label";
export default Label;
