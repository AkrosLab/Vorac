import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/tw/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-none text-sm font-medium transition-all duration-200 ease-out disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-1 focus-visible:ring-offset-1 border motion-safe:active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-white text-zinc-950 border-zinc-200/90 hover:bg-zinc-50 hover:border-zinc-300/90 focus-visible:ring-zinc-300",
        primary:
          "bg-zinc-950 text-white border-zinc-950 hover:bg-zinc-800 hover:border-zinc-800 focus-visible:ring-zinc-400",
        destructive:
          "bg-white text-red-600 border-red-200/80 hover:bg-red-50 hover:border-red-300 focus-visible:ring-red-200",
        outline:
          "border border-zinc-200/90 bg-transparent text-zinc-950 hover:bg-zinc-50 hover:border-zinc-300/90 focus-visible:ring-zinc-300 dark:border-zinc-600/80 dark:text-zinc-100 dark:hover:bg-zinc-800/50 dark:hover:border-zinc-500/80 dark:focus-visible:ring-zinc-500",
        secondary:
          "bg-zinc-100 text-zinc-900 border-zinc-200/80 hover:bg-zinc-200/80 hover:border-zinc-300/80 focus-visible:ring-zinc-300 dark:bg-zinc-800/50 dark:border-zinc-600/60 dark:text-zinc-100 dark:hover:bg-zinc-700/50 dark:focus-visible:ring-zinc-500",
        ghost:
          "border-transparent bg-transparent text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 focus-visible:ring-zinc-200 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-100 dark:focus-visible:ring-zinc-600",
        link:
          "border-transparent text-zinc-700 underline-offset-4 hover:underline focus-visible:ring-zinc-200 dark:text-zinc-300",
      },
      size: {
        default: "h-10 px-5 py-2.5 has-[>svg]:px-4 border",
        sm: "h-9 gap-1.5 px-4 has-[>svg]:px-3 border text-xs",
        lg: "h-12 px-7 text-base has-[>svg]:px-5 border",
        icon: "size-10 border",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
