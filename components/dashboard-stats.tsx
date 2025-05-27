"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Target, TrendingUp, Calendar, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"

interface Todo {
  id: string
  title: string
  completed: boolean
  priority: "low" | "medium" | "high" | "urgent"
  dueDate?: Date
  timeSpent?: number
  estimatedTime?: number
}

interface DashboardStatsProps {
  todos: Todo[]
  theme: string
}

export function DashboardStats({ todos, theme }: DashboardStatsProps) {
  const activeTodos = todos.filter((t) => !t.completed)
  const completedTodos = todos.filter((t) => t.completed)
  const overdueTodos = activeTodos.filter((t) => t.dueDate && t.dueDate < new Date())
  const todayTodos = activeTodos.filter((t) => {
    if (!t.dueDate) return false
    const today = new Date()
    return t.dueDate.toDateString() === today.toDateString()
  })

  const completionRate = todos.length > 0 ? (completedTodos.length / todos.length) * 100 : 0
  const totalTimeSpent = todos.reduce((acc, todo) => acc + (todo.timeSpent || 0), 0)
  const avgTimePerTask = completedTodos.length > 0 ? totalTimeSpent / completedTodos.length : 0

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

  const stats = [
    {
      title: "Total Tasks",
      value: todos.length,
      icon: <Target className="w-5 h-5" />,
      color: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-900/20",
    },
    {
      title: "Completed",
      value: completedTodos.length,
      icon: <CheckCircle2 className="w-5 h-5" />,
      color: "text-green-600",
      bgColor: "bg-green-100 dark:bg-green-900/20",
    },
    {
      title: "Due Today",
      value: todayTodos.length,
      icon: <Calendar className="w-5 h-5" />,
      color: "text-orange-600",
      bgColor: "bg-orange-100 dark:bg-orange-900/20",
    },
    {
      title: "Overdue",
      value: overdueTodos.length,
      icon: <AlertTriangle className="w-5 h-5" />,
      color: "text-red-600",
      bgColor: "bg-red-100 dark:bg-red-900/20",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                </div>
                <div className={cn("w-10 h-10 rounded-full flex items-center justify-center", stat.bgColor)}>
                  <div className={stat.color}>{stat.icon}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Completion Progress</h3>
              <Badge className={cn("bg-gradient-to-r text-white", getThemeGradient())}>
                {completionRate.toFixed(0)}%
              </Badge>
            </div>
            <Progress value={completionRate} className="mb-4" />
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
              <span>{completedTodos.length} completed</span>
              <span>{activeTodos.length} remaining</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Productivity Insights</h3>
              <TrendingUp className={cn("w-5 h-5", getThemeColor())} />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Total Time Spent</span>
                <span className="font-medium">
                  {Math.round(totalTimeSpent / 60)}h {totalTimeSpent % 60}m
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Avg Time/Task</span>
                <span className="font-medium">{Math.round(avgTimePerTask)}m</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Streak</span>
                <span className="font-medium">7 days 🔥</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
