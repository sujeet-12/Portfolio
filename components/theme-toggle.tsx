"use client"

import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "../theme-provider"
import { cn } from "@/lib/utils"

export function ThemeToggle() {
  const { darkMode, setDarkMode } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setDarkMode(!darkMode)}
      className={cn(
        "relative rounded-full transition-all duration-300 hover:scale-110 active:scale-95",
        "bg-gradient-to-r from-amber-100 to-orange-100 dark:from-slate-800 dark:to-slate-700",
        "border border-amber-200 dark:border-slate-600",
        "shadow-lg hover:shadow-xl dark:shadow-slate-900/50",
        "w-10 h-10 flex items-center justify-center", // Add explicit centering
      )}
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        <Sun
          className={cn(
            "absolute transition-all duration-500 text-amber-600",
            darkMode ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100",
          )}
          size={18}
        />
        <Moon
          className={cn(
            "absolute transition-all duration-500 text-slate-300",
            darkMode ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0",
          )}
          size={18}
        />
      </div>
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
