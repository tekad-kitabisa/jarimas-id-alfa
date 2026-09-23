import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center rounded-lg font-medium whitespace-nowrap transition-colors duration-200 outline-none select-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-indigo-600 text-white shadow-xs hover:bg-indigo-700 active:bg-indigo-800",
        outline:
          "border border-border/80 bg-background text-foreground shadow-xs hover:bg-muted/60 active:bg-muted",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost:
          "text-foreground/80 hover:bg-muted hover:text-foreground",
        destructive:
          "bg-destructive text-destructive-foreground shadow-xs hover:bg-destructive/90",
        link: "text-indigo-600 underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-9.5 gap-2 px-4 text-sm rounded-lg [&_svg:not([class*='size-'])]:size-4",
        xs: "h-7 gap-1 px-2.5 text-xs rounded-md [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8.5 gap-1.5 px-3 text-xs rounded-md [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-11 gap-2.5 px-6 text-sm font-semibold rounded-lg [&_svg:not([class*='size-'])]:size-4.5",
        icon: "size-9.5 rounded-lg",
        "icon-xs": "size-7 rounded-md",
        "icon-sm": "size-8.5 rounded-md",
        "icon-lg": "size-11 rounded-lg",
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
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
