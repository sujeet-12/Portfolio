"use client"

import { cn } from "@/lib/utils"
import { Heart, Code, Leaf, Gamepad2 } from "lucide-react"

interface LoaderProps {
  theme?: "default" | "programming" | "love" | "nature" | "gaming"
  size?: "sm" | "md" | "lg"
  text?: string
}

export function Loader({ theme = "default", size = "md", text }: LoaderProps) {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  }

  const getThemeIcon = () => {
    switch (theme) {
      case "programming":
        return <Code className={cn(sizeClasses[size], "text-green-500")} />
      case "love":
        return <Heart className={cn(sizeClasses[size], "text-pink-500")} />
      case "nature":
        return <Leaf className={cn(sizeClasses[size], "text-green-600")} />
      case "gaming":
        return <Gamepad2 className={cn(sizeClasses[size], "text-blue-500")} />
      default:
        return <div className={cn(sizeClasses[size], "bg-violet-500 rounded-full")} />
    }
  }

  const getThemeGradient = () => {
    switch (theme) {
      case "programming":
        return "from-green-400 to-emerald-600"
      case "love":
        return "from-pink-400 to-rose-600"
      case "nature":
        return "from-green-400 to-teal-600"
      case "gaming":
        return "from-blue-400 to-cyan-600"
      default:
        return "from-violet-400 to-purple-600"
    }
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative">
        <div
          className={cn(
            "absolute inset-0 rounded-full bg-gradient-to-r animate-spin",
            getThemeGradient(),
            sizeClasses[size],
          )}
          style={{ animationDuration: "1s" }}
        />
        <div className="relative bg-white dark:bg-gray-900 rounded-full p-2 m-1">{getThemeIcon()}</div>
      </div>
      {text && <p className="text-sm text-gray-600 dark:text-gray-400 animate-pulse">{text}</p>}
    </div>
  )
}
