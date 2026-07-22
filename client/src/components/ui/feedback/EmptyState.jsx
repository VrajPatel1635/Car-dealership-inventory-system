import React from "react";
import { cn } from "../../../utils/cn";

const EmptyState = React.forwardRef(
  ({ className, icon, title, description, action, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("empty-state", className)} {...props}>
        {icon && <div className="mb-4 text-muted">{icon}</div>}
        {title && (
          <h3 className="heading text-h4-size mb-2 text-foreground">{title}</h3>
        )}
        {description && (
          <p className="text-body-size text-muted max-w-md mx-auto mb-6">
            {description}
          </p>
        )}
        {action && <div>{action}</div>}
      </div>
    );
  },
);
EmptyState.displayName = "EmptyState";
export default EmptyState;
