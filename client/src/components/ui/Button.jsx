import React from "react";
import { cn } from "../../utils/cn";

const Button = React.forwardRef(
  (
    {
      className,
      variant = "primary",
      size = "md",
      loading = false,
      disabled = false,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-200 border border-transparent whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer select-none shrink-0",
          {
            // Variants
            "bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary/90 shadow-sm hover:shadow-md hover:shadow-primary/20": variant === "primary",
            "bg-secondary text-secondary-foreground hover:bg-secondary-hover active:bg-secondary/90": variant === "secondary",
            "border-border text-foreground hover:bg-surface-hover hover:border-foreground/30 active:bg-surface-active": variant === "outline",
            "text-foreground hover:bg-surface-hover active:bg-surface-active": variant === "ghost",
            "bg-error text-white hover:bg-error/90 active:bg-error/80": variant === "danger",
            
            // Sizes (matching Input height exactly)
            "h-9 px-3 text-xs": size === "sm",
            "h-11 px-4 text-sm sm:text-base": size === "md",
            "h-12 px-6 text-base": size === "lg",
            
            // Loading
            "opacity-80 pointer-events-none": loading,
          },
          className,
        )}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 shrink-0"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
        <span className="truncate">{children}</span>
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
