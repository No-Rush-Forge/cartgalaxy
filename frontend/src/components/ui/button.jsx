import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-paper dark:focus-visible:ring-offset-night disabled:pointer-events-none disabled:opacity-50 active:scale-[0.97]",
  {
    variants: {
      variant: {
        default:
          "bg-teal-500 text-white shadow-sm shadow-teal-700/20 hover:bg-teal-600",
        gold: "bg-gold-500 text-ink hover:bg-gold-600",
        outline:
          "border border-ink/15 bg-transparent text-ink hover:bg-ink/5 dark:border-paper/20 dark:text-paper dark:hover:bg-paper/10",
        ghost: "bg-transparent text-ink hover:bg-ink/5 dark:text-paper dark:hover:bg-paper/10",
        link: "text-teal-600 underline-offset-4 hover:underline dark:text-teal-100",
      },
      size: {
        default: "h-11 px-6",
        sm: "h-9 px-4 text-sm",
        lg: "h-12 px-8 text-base",
        icon: "h-10 w-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef(({ className, variant, size, ...props }, ref) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = "Button";

export { Button, buttonVariants };
