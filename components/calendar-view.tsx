"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { ChevronLeft, ChevronRight, Plus, CalendarDays } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTheme } from "../theme-provider"

interface Todo {
  id: string
  title: string
  completed: boolean
  priority: "low" | "medium" | "high" | "urgent"
  category: string
  dueDate?: Date
  starred: boolean
}

interface CalendarViewProps {
  todos: Todo[]
  onAddTask: () => void
}

export function CalendarView({ todos, onAddTask }: CalendarViewProps) {
  const { theme } = useTheme()
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date())

  const getThemeGradient = () => {
    switch (theme) {
      case "programming":
        return "from-green-500 to-emerald-600"
      case "love":
        return "from-pink-500 to-rose-600"
      case "nature":
        return "from-green-500 to-teal-600"
      case "gaming":
        return "from-blue-500 to-cyan-600"
      default:
        return "from-violet-500 to-purple-600"
    }
  }

  const priorityColors = {
    low: "bg-emerald-500",
    medium: "bg-amber-500",
    high: "bg-orange-500",
    urgent: "bg-red-500",
  }

  // Get tasks for selected date
  const getTasksForDate = (date: Date) => {
    return todos.filter((todo) => {
      if (!todo.dueDate) return false
      return todo.dueDate.toDateString() === date.toDateString()
    })
  }

  // Get tasks for the current month
  const getTasksForMonth = () => {
    const monthStart = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1)
    const monthEnd = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0)

    return todos.filter((todo) => {
      if (!todo.dueDate) return false
      return todo.dueDate >= monthStart && todo.dueDate <= monthEnd
    })
  }

  const selectedDateTasks = getTasksForDate(selectedDate)
  const monthTasks = getTasksForMonth()

  const navigateMonth = (direction: "prev" | "next") => {
    const newMonth = new Date(currentMonth)
    if (direction === "prev") {
      newMonth.setMonth(newMonth.getMonth() - 1)
    } else {
      newMonth.setMonth(newMonth.getMonth() + 1)
    }
    setCurrentMonth(newMonth)
  }

  return (
    <div className="space-y-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Calendar View</h2>
          <p className="text-slate-600 dark:text-slate-400">Manage your tasks by date</p>
        </div>
        <Button
          onClick={onAddTask}
          className={cn("bg-gradient-to-r text-white transition-all duration-300 hover:scale-105", getThemeGradient())}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Task
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <CalendarDays className="w-5 h-5" />
                {currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={() => navigateMonth("prev")} className="h-8 w-8">
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => navigateMonth("next")} className="h-8 w-8">
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              month={currentMonth}
              onMonthChange={setCurrentMonth}
              className="rounded-md border"
              modifiers={{
                hasTask: (date) => getTasksForDate(date).length > 0,
              }}
              modifiersStyles={{
                hasTask: {
                  backgroundColor: "rgba(34, 197, 94, 0.1)",
                  border: "1px solid rgba(34, 197, 94, 0.3)",
                },
              }}
            />

            {/* Month Overview */}
            <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <h4 className="font-semibold mb-2">This Month</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-slate-600 dark:text-slate-400">Total Tasks: </span>
                  <span className="font-medium">{monthTasks.length}</span>
                </div>
                <div>
                  <span className="text-slate-600 dark:text-slate-400">Completed: </span>
                  <span className="font-medium text-green-600">{monthTasks.filter((t) => t.completed).length}</span>
                </div>
                <div>
                  <span className="text-slate-600 dark:text-slate-400">Pending: </span>
                  <span className="font-medium text-amber-600">{monthTasks.filter((t) => !t.completed).length}</span>
                </div>
                <div>
                  <span className="text-slate-600 dark:text-slate-400">Overdue: </span>
                  <span className="font-medium text-red-600">
                    {monthTasks.filter((t) => !t.completed && t.dueDate && t.dueDate < new Date()).length}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Selected Date Tasks */}
        <Card>
          <CardHeader>
            <CardTitle>
              {selectedDate.toLocaleDateString("en-US", {
                weekday: "long",
                month: "short",
                day: "numeric",
              })}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedDateTasks.length === 0 ? (
              <div className="text-center py-8">
                <CalendarDays className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500 dark:text-slate-400">No tasks for this date</p>
                <Button variant="outline" onClick={onAddTask} className="mt-4">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Task
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {selectedDateTasks.map((task) => (
                  <div
                    key={task.id}
                    className={cn(
                      "p-3 rounded-lg border transition-all duration-300 hover:shadow-md",
                      task.completed ? "opacity-60" : "",
                      "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700",
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <div className={cn("w-3 h-3 rounded-full mt-1", priorityColors[task.priority])} />
                      <div className="flex-1">
                        <h4
                          className={cn(
                            "font-medium text-sm",
                            task.completed ? "line-through text-slate-500" : "text-slate-900 dark:text-white",
                          )}
                        >
                          {task.title}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {task.category}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {task.priority}
                          </Badge>
                          {task.starred && (
                            <Badge variant="outline" className="text-xs text-yellow-600">
                              ⭐ Starred
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
