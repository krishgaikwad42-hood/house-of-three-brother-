import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: "default" | "secondary" | "outline" | "destructive"
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
    return (
        <div
            className={cn(
                "inline-flex items-center rounded-none border px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none uppercase tracking-widest",
                {
                    "border-transparent bg-black text-white": variant === "default",
                    "border-transparent bg-gray-100 text-black": variant === "secondary",
                    "border-transparent bg-red-600 text-white": variant === "destructive",
                    "text-black border-[#EAEAEA]": variant === "outline",
                },
                className
            )}
            {...props}
        />
    )
}

export { Badge }
