import * as React from "react"
import { cn } from "@/lib/utils"

interface ScrollAreaProps extends React.ComponentProps<"div"> {
  orientation?: "vertical" | "horizontal" | "both"
  maxHeight?: string
  maxWidth?: string
}

function ScrollArea({
  className,
  children,
  orientation = "both",
  maxHeight,
  maxWidth,
  ...props
}: ScrollAreaProps) {
  const getScrollClasses = () => {
    switch (orientation) {
      case "vertical":
        return "overflow-y-auto overflow-x-hidden"
      case "horizontal":
        return "overflow-x-auto overflow-y-hidden"
      case "both":
      default:
        return "overflow-auto"
    }
  }

  const style = {
    ...(maxHeight && { maxHeight }),
    ...(maxWidth && { maxWidth }),
  }

  return (
    <div
      data-slot="scroll-area"
      className={cn(
        "relative",
        getScrollClasses(),
        "scrollbar-thin scrollbar-thumb-muted-foreground/20 scrollbar-track-transparent hover:scrollbar-thumb-muted-foreground/40",
        className
      )}
      style={style}
      {...props}
    >
      {children}
    </div>
  )
}

export { ScrollArea } 