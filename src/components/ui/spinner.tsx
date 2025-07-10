import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const spinnerVariants = cva(
  "animate-spin border-2 border-solid border-current border-r-transparent rounded-full",
  {
    variants: {
      size: {
        sm: "h-4 w-4",
        default: "h-6 w-6",
        lg: "h-8 w-8",
        xl: "h-12 w-12",
      },
      variant: {
        default: "text-primary",
        secondary: "text-secondary",
        muted: "text-muted-foreground",
        white: "text-white",
      },
    },
    defaultVariants: {
      size: "default",
      variant: "default",
    },
  }
)

function Spinner({
  className,
  size,
  variant,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof spinnerVariants>) {
  return (
    <div
      data-slot="spinner"
      className={cn(spinnerVariants({ size, variant }), className)}
      {...props}
    />
  )
}

export { Spinner, spinnerVariants } 