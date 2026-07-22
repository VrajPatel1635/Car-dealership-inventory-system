import React from "react";
import { cn } from "../../utils/cn";

const Container = ({ className, children, ...props }) => {
  return (
    <div className={cn("container", className)} {...props}>
      {children}
    </div>
  );
};

export default Container;
