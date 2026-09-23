import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-xl font-bold whitespace-nowrap transition-all duration-150 outline-none select-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 cursor-pointer border-3 sm:border-4 border-black shadow-[4px_4px_0px_0px_#000000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#000000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
  {
    variants: {
      variant: {
        default:
          "bg-black text-white hover:bg-neutral-900",
        blue:
          "bg-blue-400 text-black hover:bg-blue-300",
        yellow:
          "bg-amber-300 text-black hover:bg-amber-200",
        pink:
          "bg-pink-400 text-black hover:bg-pink-300",
        lime:
          "bg-lime-400 text-black hover:bg-lime-300",
        outline:
          "bg-white text-black hover:bg-neutral-50",
        secondary:
          "bg-blue-400 text-black hover:bg-blue-300",
        ghost:
          "bg-transparent text-black border-transparent shadow-none hover:translate-x-0 hover:translate-y-0 hover:shadow-none hover:bg-black/10 active:translate-x-0 active:translate-y-0",
        destructive:
          "bg-rose-500 text-white hover:bg-rose-600",
        link: "text-black underline-offset-4 hover:underline border-none shadow-none hover:shadow-none hover:translate-x-0 hover:translate-y-0 active:translate-x-0 active:translate-y-0",
      },
      size: {
        default:
          "h-11 gap-2 px-5 text-sm md:text-base rounded-xl [&_svg:not([class*='size-'])]:size-4.5",
        xs: "h-7 gap-1 px-2.5 text-xs rounded-lg border-2 shadow-[2px_2px_0px_0px_#000000] hover:shadow-[3px_3px_0px_0px_#000000] [&_svg:not([class*='size-'])]:size-3",
        sm: "h-9 gap-1.5 px-3.5 text-xs sm:text-sm rounded-lg border-3 shadow-[3px_3px_0px_0px_#000000] hover:shadow-[4px_4px_0px_0px_#000000] [&_svg:not([class*='size-'])]:size-4",
        lg: "h-14 gap-3 px-8 text-base sm:text-lg font-black rounded-2xl border-4 shadow-[5px_5px_0px_0px_#000000] hover:shadow-[7px_7px_0px_0px_#000000] [&_svg:not([class*='size-'])]:size-5.5",
        icon: "size-11 rounded-xl",
        "icon-xs": "size-7 rounded-lg border-2 shadow-[2px_2px_0px_0px_#000000]",
        "icon-sm": "size-9 rounded-lg border-3 shadow-[3px_3px_0px_0px_#000000]",
        "icon-lg": "size-14 rounded-2xl border-4 shadow-[5px_5px_0px_0px_#000000]",
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
