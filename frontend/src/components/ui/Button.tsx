import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "default" | "outline" | "ghost" | "link"
    size?: "default" | "sm" | "lg" | "icon"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "default", size = "default", ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 uppercase tracking-[0.12em] rounded-none",
                    {
                        "bg-black text-white hover:opacity-80": variant === "default",
                        "border border-[#EAEAEA] bg-white hover:bg-gray-50": variant === "outline",
                        "hover:bg-gray-100": variant === "ghost",
                        "text-black underline-offset-4 hover:underline": variant === "link",
                        "h-12 px-8": size === "default",
                        "h-10 px-4 text-xs": size === "sm",
                        "h-14 px-10": size === "lg",
                        "h-12 w-12": size === "icon",
                    },
                    className
                )}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button }
