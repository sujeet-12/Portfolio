"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus, Mic, Calendar } from "lucide-react"
import { cn } from "@/lib/utils"

interface FloatingAddButtonProps {
  onAddTask: () => void
  onVoiceAdd: () => void
  onQuickSchedule: () => void
  theme: string
}

export function FloatingAddButton({ onAddTask, onVoiceAdd, onQuickSchedule, theme }: FloatingAddButtonProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const getThemeGradient = () => {
    switch (theme) {
      case "programming":
        return "from-green-500 to-emerald-600"
      case "love":
        return "from-pink-500 to-rose-600"
      case "nature":
        return "from-green-500 to-teal-600"
      default:
        return "from-violet-500 to-purple-600"
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Expanded Options */}
      {isExpanded && (
        <div className="absolute bottom-16 right-0 space-y-3 animate-in slide-in-from-bottom-2 duration-200">
          <Button
            onClick={onVoiceAdd}
            size="icon"
            className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 shadow-lg hover:shadow-xl transition-all"
          >
            <Mic className="w-5 h-5" />
          </Button>
          <Button
            onClick={onQuickSchedule}
            size="icon"
            className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 shadow-lg hover:shadow-xl transition-all"
          >
            <Calendar className="w-5 h-5" />
          </Button>
        </div>
      )}

      {/* Main FAB */}
      <Button
        onClick={() => {
          if (isExpanded) {
            setIsExpanded(false)
            onAddTask() // Call onAddTask when expanded and clicked
          } else {
            setIsExpanded(true) // Just expand on first click
          }
        }}
        onBlur={() => setTimeout(() => setIsExpanded(false), 200)}
        className={cn(
          "w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r",
          getThemeGradient(),
          isExpanded && "rotate-45",
        )}
      >
        <Plus className="w-6 h-6 text-white" />
      </Button>
    </div>
  )
}
