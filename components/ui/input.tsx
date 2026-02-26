import * as React from "react";

import { cn } from "@/lib/tw/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-none border border-[#0a0a0a]/[0.12] bg-white px-4 py-2.5 text-[15px] text-[#0a0a0a] font-light tracking-[0.02em] transition-[border-color,box-shadow] duration-180 placeholder:text-[#1a1a1a]/45",
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#0a0a0a]/[0.18] focus-visible:border-[#0a0a0a]/[0.18]",
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[#f5f5f5]",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
