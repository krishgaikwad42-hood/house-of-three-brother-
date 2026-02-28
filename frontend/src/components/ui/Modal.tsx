"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"

interface ModalProps {
    isOpen: boolean
    onClose: () => void
    title?: string
    children: React.ReactNode
    className?: string
}

export function Modal({ isOpen, onClose, title, children, className }: ModalProps) {
    React.useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "unset"
        }
        return () => {
            document.body.style.overflow = "unset"
        }
    }, [isOpen])

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div
                className={cn(
                    "relative z-50 w-full max-w-lg bg-white p-6 shadow-2xl transition-all",
                    className
                )}
            >
                <div className="flex items-center justify-between mb-6">
                    {title ? (
                        <h2 className="text-xl font-bold uppercase tracking-widest">{title}</h2>
                    ) : (
                        <div />
                    )}
                    <button
                        onClick={onClose}
                        className="rounded-full p-2 hover:bg-gray-100 transition-colors focus:outline-none"
                    >
                        <X className="h-5 w-5" />
                        <span className="sr-only">Close</span>
                    </button>
                </div>

                <div>{children}</div>
            </div>
        </div>
    )
}
