import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "group/badge inline-flex h-6 w-fit shrink-0 items-center justify-center gap-1.5 overflow-hidden rounded-lg border-2 border-black px-2.5 py-0.5 text-xs font-bold text-black shadow-[2px_2px_0px_0px_#000000] whitespace-nowrap transition-all uppercase tracking-wider [&>svg]:pointer-events-none [&>svg]:size-3.5!",
  {
    variants: {
      variant: {
        default: "bg-black text-white border-black",
        secondary: "bg-white text-black border-black",
        outline: "bg-white text-black border-black",
        blue: "bg-blue-400 text-black border-black",
        yellow: "bg-amber-300 text-black border-black",
        pink: "bg-pink-400 text-black border-black",
        lime: "bg-lime-400 text-black border-black",
        destructive: "bg-rose-500 text-white border-black",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant }), className),
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  })
}

export { Badge, badgeVariants }
