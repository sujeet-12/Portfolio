"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, CheckCircle2, Clock, Settings, Star, Target, Timer, BarChart3 } from "lucide-react"
import { cn } from "@/lib/utils"

interface SidebarNavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
  stats: {
    total: number
    pending: number
    completed: number
    starred: number
    today: number
    overdue: number
  }
  theme: string
}

export function SidebarNavigation({ activeTab, onTabChange, stats, theme }: SidebarNavigationProps) {
  const getThemeColor = () => {
    switch (theme) {
      case "programming":
        return "text-green-600"
      case "love":
        return "text-pink-600"
      case "nature":
        return "text-green-600"
      default:
        return "text-violet-600"
    }
  }

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

  const navItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <BarChart3 className="w-4 h-4" />,
      count: null,
    },
    {
      id: "today",
      label: "Today",
      icon: <Calendar className="w-4 h-4" />,
      count: stats.today,
      color: "bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400",
    },
    {
      id: "upcoming",
      label: "Upcoming",
      icon: <Clock className="w-4 h-4" />,
      count: stats.pending,
      color: "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400",
    },
    {
      id: "completed",
      label: "Completed",
      icon: <CheckCircle2 className="w-4 h-4" />,
      count: stats.completed,
      color: "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400",
    },
    {
      id: "starred",
      label: "Starred",
      icon: <Star className="w-4 h-4" />,
      count: stats.starred,
      color: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400",
    },
    {
      id: "calendar",
      label: "Calendar",
      icon: <Target className="w-4 h-4" />,
      count: null,
    },
    {
      id: "pomodoro",
      label: "Focus Timer",
      icon: <Timer className="w-4 h-4" />,
      count: null,
    },
    {
      id: "settings",
      label: "Settings",
      icon: <Settings className="w-4 h-4" />,
      count: null,
    },
  ]

  return (
    <nav className="space-y-2">
      {navItems.map((item) => (
        <Button
          key={item.id}
          variant={activeTab === item.id ? "default" : "ghost"}
          onClick={() => onTabChange(item.id)}
          className={cn(
            "w-full justify-start gap-3 h-10",
            activeTab === item.id && `bg-gradient-to-r text-white ${getThemeGradient()}`,
          )}
        >
          {item.icon}
          <span className="flex-1 text-left">{item.label}</span>
          {item.count !== null && item.count > 0 && (
            <Badge variant="secondary" className={cn("text-xs", item.color)}>
              {item.count}
            </Badge>
          )}
        </Button>
      ))}
    </nav>
  )
}
