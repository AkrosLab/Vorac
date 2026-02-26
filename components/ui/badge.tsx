import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/tw/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-none border px-3 py-1 text-[10px] font-light uppercase tracking-[0.12em] w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1.5 [&>svg]:pointer-events-none focus-visible:ring-1 focus-visible:ring-[#0a0a0a]/20 transition-[color,box-shadow,border-color] overflow-hidden",
  {
    variants: {
      variant: {
        default: "border-[#0a0a0a]/[0.12] bg-white text-[#0a0a0a] [a&]:hover:border-[#0a0a0a]/[0.2]",
        secondary: "border-[#0a0a0a]/[0.08] bg-[#f5f5f5] text-[#0a0a0a] [a&]:hover:bg-[#ebebeb]",
        destructive: "border-red-200/80 bg-white text-red-600 [a&]:hover:bg-red-50",
        outline: "border-[#0a0a0a]/[0.12] bg-transparent text-[#0a0a0a] [a&]:hover:bg-[#f5f5f5]",
      },
    },
    defaultVariants: { variant: "default" },
  }
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return <Comp data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
