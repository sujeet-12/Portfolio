"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Calendar, Flag, Timer, X, Play, BarChart3, Target, Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTheme } from "../theme-provider"

interface DemoExamplesProps {
  isOpen: boolean
  onClose: () => void
}

export function DemoExamples({ isOpen, onClose }: DemoExamplesProps) {
  const { theme } = useTheme()
  const [activeExample, setActiveExample] = useState(0)
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set())

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

  const examples = [
    {
      title: "Personal Life Management",
      description: "Organize daily routines with Indian lifestyle",
      user: "Priya Sharma",
      tasks: [
        {
          id: "1",
          title: "Morning yoga and meditation",
          category: "health",
          priority: "high",
          completed: false,
          dueDate: "Today 6:00 AM",
          estimatedTime: "45 min",
        },
        {
          id: "2",
          title: "Prepare masala chai for family",
          category: "personal",
          priority: "medium",
          completed: true,
          dueDate: "Today 7:30 AM",
          estimatedTime: "15 min",
        },
        {
          id: "3",
          title: "Call Nani for her birthday wishes",
          category: "personal",
          priority: "urgent",
          completed: false,
          dueDate: "Today 11:00 AM",
          estimatedTime: "30 min",
        },
        {
          id: "4",
          title: "Buy vegetables from local sabzi mandi",
          category: "shopping",
          priority: "medium",
          completed: false,
          dueDate: "Today 5:00 PM",
          estimatedTime: "60 min",
        },
      ],
    },
    {
      title: "Work & Career Focus",
      description: "Professional tasks for Indian workplace",
      user: "Arjun Patel",
      tasks: [
        {
          id: "5",
          title: "Complete Q4 presentation for Mumbai office",
          category: "work",
          priority: "high",
          completed: false,
          dueDate: "Tomorrow 2:00 PM",
          estimatedTime: "3 hours",
        },
        {
          id: "6",
          title: "Review team performance reports",
          category: "work",
          priority: "medium",
          completed: true,
          dueDate: "Yesterday",
          estimatedTime: "2 hours",
        },
        {
          id: "7",
          title: "Schedule Diwali bonus discussion",
          category: "work",
          priority: "medium",
          completed: false,
          dueDate: "Next Week",
          estimatedTime: "1 hour",
        },
        {
          id: "8",
          title: "Prepare for client meeting in Bangalore",
          category: "work",
          priority: "urgent",
          completed: false,
          dueDate: "Friday 10:00 AM",
          estimatedTime: "2 hours",
        },
      ],
    },
    {
      title: "Student Life Organization",
      description: "Academic and personal tasks for students",
      user: "Kavya Reddy",
      tasks: [
        {
          id: "9",
          title: "Complete Computer Science assignment",
          category: "other",
          priority: "high",
          completed: false,
          dueDate: "Monday 11:59 PM",
          estimatedTime: "4 hours",
        },
        {
          id: "10",
          title: "Study for Mathematics mid-term exam",
          category: "other",
          priority: "urgent",
          completed: false,
          dueDate: "Wednesday",
          estimatedTime: "6 hours",
        },
        {
          id: "11",
          title: "Submit scholarship application",
          category: "finance",
          priority: "high",
          completed: true,
          dueDate: "Last Week",
          estimatedTime: "2 hours",
        },
        {
          id: "12",
          title: "Attend college cultural fest planning",
          category: "personal",
          priority: "medium",
          completed: false,
          dueDate: "Saturday 4:00 PM",
          estimatedTime: "3 hours",
        },
      ],
    },
    {
      title: "Family & Festival Planning",
      description: "Managing Indian festivals and family events",
      user: "Rajesh & Sunita Gupta",
      tasks: [
        {
          id: "13",
          title: "Buy new clothes for Diwali celebration",
          category: "shopping",
          priority: "medium",
          completed: false,
          dueDate: "Next Week",
          estimatedTime: "3 hours",
        },
        {
          id: "14",
          title: "Book train tickets for Goa vacation",
          category: "personal",
          priority: "high",
          completed: true,
          dueDate: "Yesterday",
          estimatedTime: "1 hour",
        },
        {
          id: "15",
          title: "Prepare guest list for wedding anniversary",
          category: "personal",
          priority: "medium",
          completed: false,
          dueDate: "Next Month",
          estimatedTime: "2 hours",
        },
        {
          id: "16",
          title: "Order sweets from local mithai shop",
          category: "shopping",
          priority: "low",
          completed: false,
          dueDate: "Before Diwali",
          estimatedTime: "30 min",
        },
      ],
    },
  ]

  const priorityColors = {
    low: "from-emerald-400 to-emerald-600",
    medium: "from-amber-400 to-amber-600",
    high: "from-orange-400 to-orange-600",
    urgent: "from-red-400 to-red-600",
  }

  const categoryConfig = {
    personal: { emoji: "🏠", color: "from-blue-400 to-blue-600" },
    work: { emoji: "💼", color: "from-purple-400 to-purple-600" },
    shopping: { emoji: "🛒", color: "from-pink-400 to-pink-600" },
    health: { emoji: "🏥", color: "from-green-400 to-green-600" },
    finance: { emoji: "💰", color: "from-yellow-400 to-yellow-600" },
    other: { emoji: "📚", color: "from-gray-400 to-gray-600" },
  }

  const toggleTask = (taskId: string) => {
    const newCompleted = new Set(completedTasks)
    if (newCompleted.has(taskId)) {
      newCompleted.delete(taskId)
    } else {
      newCompleted.add(taskId)
    }
    setCompletedTasks(newCompleted)
  }

  const currentExample = examples[activeExample]
  const completedCount = currentExample.tasks.filter((task) => task.completed || completedTasks.has(task.id)).length

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
              <Play className="w-6 h-6" />
              TaskFlow Demo
            </DialogTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Example Selector */}
          <div className="flex flex-wrap gap-2">
            {examples.map((example, index) => (
              <Button
                key={index}
                variant={activeExample === index ? "default" : "outline"}
                onClick={() => setActiveExample(index)}
                className={cn(
                  "text-sm",
                  activeExample === index && `bg-gradient-to-r text-white ${getThemeGradient()}`,
                )}
              >
                {example.title}
              </Button>
            ))}
          </div>

          {/* Demo Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Task List */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">{currentExample.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    {currentExample.description} • {currentExample.user}
                  </p>
                </div>
                <Badge className={cn("bg-gradient-to-r text-white", getThemeGradient())}>
                  {completedCount}/{currentExample.tasks.length} Complete
                </Badge>
              </div>

              <div className="space-y-3">
                {currentExample.tasks.map((task) => {
                  const isCompleted = task.completed || completedTasks.has(task.id)
                  return (
                    <Card
                      key={task.id}
                      className={cn("transition-all duration-300 hover:shadow-md", isCompleted && "opacity-60")}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <Checkbox
                            checked={isCompleted}
                            onCheckedChange={() => toggleTask(task.id)}
                            className="mt-1"
                          />
                          <div className="flex-1">
                            <h4
                              className={cn(
                                "font-medium text-slate-900 dark:text-white",
                                isCompleted && "line-through text-slate-500",
                              )}
                            >
                              {task.title}
                            </h4>
                            <div className="flex items-center gap-2 mt-2 flex-wrap">
                              <Badge
                                variant="outline"
                                className={cn(
                                  "rounded-full bg-gradient-to-r text-white border-0",
                                  priorityColors[task.priority as keyof typeof priorityColors],
                                )}
                              >
                                <Flag className="w-3 h-3 mr-1" />
                                {task.priority}
                              </Badge>
                              <Badge
                                variant="outline"
                                className={cn(
                                  "rounded-full bg-gradient-to-r text-white border-0",
                                  categoryConfig[task.category as keyof typeof categoryConfig]?.color,
                                )}
                              >
                                <span className="mr-1">
                                  {categoryConfig[task.category as keyof typeof categoryConfig]?.emoji}
                                </span>
                                {task.category}
                              </Badge>
                              <Badge variant="outline" className="rounded-full">
                                <Calendar className="w-3 h-3 mr-1" />
                                {task.dueDate}
                              </Badge>
                              <Badge variant="outline" className="rounded-full">
                                <Timer className="w-3 h-3 mr-1" />
                                {task.estimatedTime}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>

            {/* Stats Sidebar */}
            <div className="space-y-4">
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <BarChart3 className="w-4 h-4" />
                    Progress Overview
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Completion Rate</span>
                      <span className="font-medium">
                        {Math.round((completedCount / currentExample.tasks.length) * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                      <div
                        className={cn("h-2 rounded-full bg-gradient-to-r", getThemeGradient())}
                        style={{
                          width: `${(completedCount / currentExample.tasks.length) * 100}%`,
                        }}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="text-center p-2 bg-slate-50 dark:bg-slate-800 rounded">
                        <div className="font-bold text-green-600">{completedCount}</div>
                        <div className="text-xs">Completed</div>
                      </div>
                      <div className="text-center p-2 bg-slate-50 dark:bg-slate-800 rounded">
                        <div className="font-bold text-amber-600">{currentExample.tasks.length - completedCount}</div>
                        <div className="text-xs">Remaining</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    Priority Breakdown
                  </h4>
                  <div className="space-y-2">
                    {Object.entries(
                      currentExample.tasks.reduce(
                        (acc, task) => {
                          acc[task.priority] = (acc[task.priority] || 0) + 1
                          return acc
                        },
                        {} as Record<string, number>,
                      ),
                    ).map(([priority, count]) => (
                      <div key={priority} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <div
                            className={cn(
                              "w-3 h-3 rounded-full bg-gradient-to-r",
                              priorityColors[priority as keyof typeof priorityColors],
                            )}
                          />
                          <span className="capitalize">{priority}</span>
                        </div>
                        <span className="font-medium">{count}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Time Estimate
                  </h4>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-900 dark:text-white">
                      {currentExample.tasks
                        .filter((task) => !task.completed && !completedTasks.has(task.id))
                        .reduce((total, task) => {
                          const time = task.estimatedTime.match(/\d+/)
                          return total + (time ? Number.parseInt(time[0]) : 0)
                        }, 0)}{" "}
                      min
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">Remaining work time</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Demo Features */}
          <div className="border-t pt-4">
            <h4 className="font-semibold mb-3">✨ Try These Features:</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
              <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded">✅ Check off tasks</div>
              <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded">🎯 Priority levels</div>
              <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded">📅 Due dates</div>
              <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded">⏱️ Time tracking</div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
