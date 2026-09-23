import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-xl border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all duration-300 outline-none select-none focus-visible:ring-3 focus-visible:ring-white/50 active:translate-y-0.5 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-white text-indigo-950 font-semibold shadow-lg shadow-black/10 hover:bg-white/90 hover:shadow-[0_0_25px_rgba(255,255,255,0.45)] hover:scale-[1.02]",
        glow:
          "bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-semibold border border-white/30 shadow-lg shadow-pink-500/25 hover:shadow-[0_0_30px_rgba(236,72,153,0.6)] hover:border-white/50 hover:scale-[1.03]",
        glass:
          "bg-white/15 backdrop-blur-md border border-white/25 text-white shadow-lg shadow-black/10 hover:bg-white/25 hover:border-white/50 hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] hover:scale-[1.02]",
        outline:
          "border border-white/30 bg-white/5 text-white backdrop-blur-md hover:bg-white/20 hover:border-white/60 hover:shadow-[0_0_20px_rgba(255,255,255,0.35)] hover:scale-[1.02]",
        ghost:
          "text-white/90 hover:bg-white/15 hover:text-white hover:shadow-[0_0_15px_rgba(255,255,255,0.25)]",
        secondary:
          "bg-white/20 text-white backdrop-blur-md border border-white/15 hover:bg-white/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]",
        destructive:
          "bg-red-500/80 text-white backdrop-blur-md hover:bg-red-500 hover:shadow-[0_0_20px_rgba(239,68,68,0.5)]",
        link: "text-white underline-offset-4 hover:underline hover:text-pink-300",
      },
      size: {
        default:
          "h-10 gap-2 px-4 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
        xs: "h-7 gap-1 rounded-lg px-2.5 text-xs [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8.5 gap-1.5 rounded-lg px-3 text-xs [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-12 gap-2.5 rounded-2xl px-6 text-base font-semibold [&_svg:not([class*='size-'])]:size-5",
        icon: "size-10 rounded-xl",
        "icon-xs": "size-7 rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8.5 rounded-lg [&_svg:not([class*='size-'])]:size-3.5",
        "icon-lg": "size-12 rounded-2xl [&_svg:not([class*='size-'])]:size-5",
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
