"use client"

import { useState, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { FloatingAddButton } from "./components/floating-add-button"
import { DashboardStats } from "./components/dashboard-stats"
import { PomodoroTimer } from "./components/pomodoro-timer"
import { SidebarNavigation } from "./components/sidebar-navigation"
import { ThemeToggle } from "./components/theme-toggle"
import { useTheme } from "./theme-provider"
import {
  CalendarIcon,
  Flag,
  Circle,
  MoreHorizontal,
  Star,
  Clock,
  Zap,
  Target,
  X,
  ArrowLeft,
  Menu,
  Search,
  Repeat,
  Timer,
  Code,
  Heart,
  Gamepad2,
  Sparkles,
  Leaf,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { CalendarView } from "./components/calendar-view"
import { SettingsView } from "./components/settings-view"

type Priority = "low" | "medium" | "high" | "urgent"
type Category = "personal" | "work" | "shopping" | "health" | "finance" | "other"

interface Subtask {
  id: string
  title: string
  completed: boolean
}

interface Todo {
  id: string
  title: string
  description: string
  completed: boolean
  priority: Priority
  category: Category
  dueDate?: Date
  createdAt: Date
  completedAt?: Date
  archived: boolean
  starred: boolean
  subtasks: Subtask[]
  recurring?: "daily" | "weekly" | "monthly"
  timeSpent: number
  estimatedTime?: number
}

const priorityConfig = {
  low: { color: "from-emerald-400 to-emerald-600", icon: Circle, label: "Low" },
  medium: { color: "from-amber-400 to-amber-600", icon: Clock, label: "Medium" },
  high: { color: "from-orange-400 to-orange-600", icon: Zap, label: "High" },
  urgent: { color: "from-red-400 to-red-600", icon: Target, label: "Urgent" },
}

const categoryConfig = {
  personal: { color: "from-blue-400 to-blue-600", emoji: "🏠" },
  work: { color: "from-purple-400 to-purple-600", emoji: "💼" },
  shopping: { color: "from-pink-400 to-pink-600", emoji: "🛒" },
  health: { color: "from-green-400 to-green-600", emoji: "🏥" },
  finance: { color: "from-yellow-400 to-yellow-600", emoji: "💰" },
  other: { color: "from-gray-400 to-gray-600", emoji: "📝" },
}

interface EnhancedTodoAppProps {
  onBackToLanding?: () => void
}

export default function EnhancedTodoApp({ onBackToLanding }: EnhancedTodoAppProps) {
  const { theme, darkMode } = useTheme()
  const [todos, setTodos] = useState<Todo[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("dashboard")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [focusMode, setFocusMode] = useState(false)

  // Form states
  const [newTodo, setNewTodo] = useState({
    title: "",
    description: "",
    priority: (localStorage.getItem("taskflow-default-priority") || "medium") as Priority,
    category: (localStorage.getItem("taskflow-default-category") || "personal") as Category,
    dueDate: undefined as Date | undefined,
    starred: false,
    estimatedTime: Number.parseInt(localStorage.getItem("taskflow-pomodoro-time") || "30"),
    recurring: undefined as "daily" | "weekly" | "monthly" | undefined,
  })

  // Load todos from localStorage on mount
  useEffect(() => {
    const savedTodos = localStorage.getItem("enhanced-todos")
    if (savedTodos) {
      const parsed = JSON.parse(savedTodos)
      setTodos(
        parsed.map((todo: any) => ({
          ...todo,
          createdAt: new Date(todo.createdAt),
          dueDate: todo.dueDate ? new Date(todo.dueDate) : undefined,
          completedAt: todo.completedAt ? new Date(todo.completedAt) : undefined,
          subtasks: todo.subtasks || [],
          timeSpent: todo.timeSpent || 0,
        })),
      )
    }
  }, [])

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem("enhanced-todos", JSON.stringify(todos))
  }, [todos])

  const addTodo = () => {
    if (!newTodo.title.trim()) return

    const todo: Todo = {
      id: Date.now().toString(),
      title: newTodo.title,
      description: newTodo.description,
      completed: false,
      priority: newTodo.priority,
      category: newTodo.category,
      dueDate: newTodo.dueDate,
      createdAt: new Date(),
      archived: false,
      starred: newTodo.starred,
      subtasks: [],
      recurring: newTodo.recurring,
      timeSpent: 0,
      estimatedTime: newTodo.estimatedTime,
    }

    setTodos([todo, ...todos])
    setNewTodo({
      title: "",
      description: "",
      priority: (localStorage.getItem("taskflow-default-priority") || "medium") as Priority,
      category: (localStorage.getItem("taskflow-default-category") || "personal") as Category,
      dueDate: undefined,
      starred: false,
      estimatedTime: Number.parseInt(localStorage.getItem("taskflow-pomodoro-time") || "30"),
      recurring: undefined,
    })
    setIsAddDialogOpen(false)
  }

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const toggleComplete = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              completed: !todo.completed,
              completedAt: !todo.completed ? new Date() : undefined,
            }
          : todo,
      ),
    )
  }

  const toggleStar = (id: string) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, starred: !todo.starred } : todo)))
  }

  const addSubtask = (todoId: string, subtaskTitle: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === todoId
          ? {
              ...todo,
              subtasks: [
                ...todo.subtasks,
                {
                  id: Date.now().toString(),
                  title: subtaskTitle,
                  completed: false,
                },
              ],
            }
          : todo,
      ),
    )
  }

  const toggleSubtask = (todoId: string, subtaskId: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === todoId
          ? {
              ...todo,
              subtasks: todo.subtasks.map((subtask) =>
                subtask.id === subtaskId ? { ...subtask, completed: !subtask.completed } : subtask,
              ),
            }
          : todo,
      ),
    )
  }

  const filteredTodos = useMemo(() => {
    const filtered = todos.filter((todo) => {
      if (todo.archived) return false

      const matchesSearch =
        todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        todo.description.toLowerCase().includes(searchTerm.toLowerCase())

      if (!matchesSearch) return false

      // Focus mode: hide completed and low priority tasks
      if (focusMode) {
        if (todo.completed || todo.priority === "low") return false
      }

      switch (activeTab) {
        case "today":
          if (!todo.dueDate) return false
          const today = new Date()
          return todo.dueDate.toDateString() === today.toDateString() && !todo.completed
        case "upcoming":
          return !todo.completed
        case "completed":
          return todo.completed
        case "starred":
          return todo.starred && !todo.completed
        default:
          return true
      }
    })

    // Sort by priority and due date
    filtered.sort((a, b) => {
      const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 }
      const aPriority = priorityOrder[a.priority]
      const bPriority = priorityOrder[b.priority]

      if (aPriority !== bPriority) {
        return bPriority - aPriority
      }

      if (a.dueDate && b.dueDate) {
        return a.dueDate.getTime() - b.dueDate.getTime()
      }

      return 0
    })

    return filtered
  }, [todos, searchTerm, activeTab, focusMode])

  const stats = useMemo(() => {
    const activeTodos = todos.filter((t) => !t.archived)
    const completed = activeTodos.filter((t) => t.completed).length
    const pending = activeTodos.filter((t) => !t.completed).length
    const starred = activeTodos.filter((t) => t.starred && !t.completed).length
    const today = activeTodos.filter((t) => {
      if (!t.dueDate || t.completed) return false
      const todayDate = new Date()
      return t.dueDate.toDateString() === todayDate.toDateString()
    }).length
    const overdue = activeTodos.filter((t) => {
      if (!t.dueDate || t.completed) return false
      return t.dueDate < new Date()
    }).length

    return { total: activeTodos.length, completed, pending, starred, today, overdue }
  }, [todos])

  const isOverdue = (todo: Todo) => {
    return todo.dueDate && todo.dueDate < new Date() && !todo.completed
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })
  }

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

  const getThemeIcon = () => {
    switch (theme) {
      case "programming":
        return <Code className="w-4 h-4 text-white" />
      case "love":
        return <Heart className="w-4 h-4 text-white" />
      case "nature":
        return <Leaf className="w-4 h-4 text-white" />
      case "gaming":
        return <Gamepad2 className="w-4 h-4 text-white" />
      default:
        return <Sparkles className="w-4 h-4 text-white" />
    }
  }

  const handleVoiceAdd = () => {
    // Voice recognition implementation would go here
    console.log("Voice add task")
  }

  const handleQuickSchedule = () => {
    // Quick schedule implementation would go here
    console.log("Quick schedule")
  }

  const exportData = () => {
    const data = {
      todos,
      settings: {
        theme,
        darkMode,
      },
      exportDate: new Date().toISOString(),
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `taskflow-backup-${new Date().toISOString().split("T")[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const importData = (data: any) => {
    if (data.todos) {
      setTodos(
        data.todos.map((todo: any) => ({
          ...todo,
          createdAt: new Date(todo.createdAt),
          dueDate: todo.dueDate ? new Date(todo.dueDate) : undefined,
          completedAt: todo.completedAt ? new Date(todo.completedAt) : undefined,
        })),
      )
    }
  }

  const clearAllData = () => {
    if (confirm("Are you sure you want to clear all data? This action cannot be undone.")) {
      setTodos([])
      localStorage.removeItem("enhanced-todos")
    }
  }

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="space-y-6">
            <DashboardStats todos={todos} theme={theme} />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">Recent Tasks</h3>
                <div className="space-y-3">
                  {filteredTodos.slice(0, 5).map((todo) => (
                    <TaskCard key={todo.id} todo={todo} onToggleComplete={toggleComplete} onToggleStar={toggleStar} />
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">Focus Timer</h3>
                <PomodoroTimer theme={theme} />
              </div>
            </div>
          </div>
        )
      case "calendar":
        return <CalendarView todos={todos} onAddTask={() => setIsAddDialogOpen(true)} />
      case "pomodoro":
        return (
          <div className="max-w-md mx-auto">
            <PomodoroTimer theme={theme} />
          </div>
        )
      case "settings":
        return (
          <SettingsView todos={todos} onExportData={exportData} onImportData={importData} onClearData={clearAllData} />
        )
      default:
        return (
          <div className="space-y-6">
            {/* Search and Focus Mode */}
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search tasks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={cn(
                    "pl-10 rounded-xl transition-all duration-300 focus-ring",
                    "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700",
                  )}
                />
              </div>
              <Button
                variant={focusMode ? "default" : "outline"}
                onClick={() => setFocusMode(!focusMode)}
                className={cn(
                  "rounded-xl transition-all duration-300 hover:scale-105 active:scale-95",
                  focusMode && `bg-gradient-to-r text-white ${getThemeGradient()}`,
                )}
              >
                <Target className="w-4 h-4 mr-2" />
                Focus Mode
              </Button>
            </div>

            {/* Task List */}
            <div className="space-y-4">
              {filteredTodos.length === 0 ? (
                <div className="text-center py-16">
                  <div
                    className={cn(
                      "w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center transition-all duration-300",
                      "bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900",
                    )}
                  >
                    <Circle className="w-8 h-8 text-slate-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">No tasks found</h3>
                  <p className="text-slate-500 dark:text-slate-400">
                    {searchTerm ? "Try adjusting your search" : "Create your first task to get started"}
                  </p>
                </div>
              ) : (
                filteredTodos.map((todo) => (
                  <TaskCard
                    key={todo.id}
                    todo={todo}
                    onToggleComplete={toggleComplete}
                    onToggleStar={toggleStar}
                    onDelete={deleteTodo}
                    onAddSubtask={addSubtask}
                    onToggleSubtask={toggleSubtask}
                  />
                ))
              )}
            </div>
          </div>
        )
    }
  }

  return (
    <div
      className={cn(
        "min-h-screen transition-all duration-500",
        darkMode ? "dark" : "",
        theme === "nature"
          ? "bg-gradient-to-br from-green-50/30 to-teal-50/30 dark:from-slate-950 dark:to-slate-900"
          : theme === "programming"
            ? "bg-gradient-to-br from-green-50/30 to-emerald-50/30 dark:from-slate-950 dark:to-slate-900"
            : theme === "love"
              ? "bg-gradient-to-br from-pink-50/30 to-rose-50/30 dark:from-slate-950 dark:to-slate-900"
              : theme === "gaming"
                ? "bg-gradient-to-br from-blue-50/30 to-cyan-50/30 dark:from-slate-950 dark:to-slate-900"
                : "bg-gradient-to-br from-violet-50/30 to-purple-50/30 dark:from-slate-950 dark:to-slate-900",
      )}
    >
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/80 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 transition-colors duration-500">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden rounded-full hover:scale-110 active:scale-95 transition-all duration-300"
              >
                <Menu className="h-4 w-4" />
              </Button>
              {onBackToLanding && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onBackToLanding}
                  className="rounded-full hover:scale-110 active:scale-95 transition-all duration-300"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              )}
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    "w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-3",
                    "bg-gradient-to-br shadow-lg",
                    getThemeGradient(),
                  )}
                >
                  {getThemeIcon()}
                </div>
                <div>
                  <h1 className="text-lg font-bold text-slate-900 dark:text-white">TaskFlow</h1>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-30 w-64 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-r border-slate-200 dark:border-slate-800 transform transition-all duration-300 lg:translate-x-0 lg:static lg:inset-0",
            sidebarOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="p-4 pt-20 lg:pt-4">
            <SidebarNavigation activeTab={activeTab} onTabChange={setActiveTab} stats={stats} theme={theme} />
          </div>
        </aside>

        {/* Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden transition-opacity duration-300"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-6 pt-4">
          <div className="max-w-6xl mx-auto">{renderContent()}</div>
        </main>
      </div>

      {/* Floating Add Button */}
      <FloatingAddButton
        onAddTask={() => setIsAddDialogOpen(true)}
        onVoiceAdd={handleVoiceAdd}
        onQuickSchedule={handleQuickSchedule}
        theme={theme}
      />

      {/* Add Task Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-md rounded-3xl border-0 shadow-2xl bg-white dark:bg-slate-900">
          <DialogHeader>
            <DialogTitle
              className={cn(
                "text-xl font-bold bg-gradient-to-r bg-clip-text text-transparent",
                getThemeGradient().replace("from-", "from-").replace("to-", "to-"),
              )}
            >
              Create New Task
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Task Title
              </Label>
              <Input
                id="title"
                value={newTodo.title}
                onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
                placeholder="What needs to be done?"
                className="rounded-xl focus-ring transition-all duration-300"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Description
              </Label>
              <Textarea
                id="description"
                value={newTodo.description}
                onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
                placeholder="Add more details..."
                className="rounded-xl resize-none focus-ring transition-all duration-300"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">Priority</Label>
                <Select
                  value={newTodo.priority}
                  onValueChange={(value: Priority) => setNewTodo({ ...newTodo, priority: value })}
                >
                  <SelectTrigger className="rounded-xl focus-ring transition-all duration-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    {Object.entries(priorityConfig).map(([key, config]) => (
                      <SelectItem key={key} value={key} className="rounded-lg">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${config.color}`} />
                          {config.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">Category</Label>
                <Select
                  value={newTodo.category}
                  onValueChange={(value: Category) => setNewTodo({ ...newTodo, category: value })}
                >
                  <SelectTrigger className="rounded-xl focus-ring transition-all duration-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    {Object.entries(categoryConfig).map(([key, config]) => (
                      <SelectItem key={key} value={key} className="rounded-lg">
                        <div className="flex items-center gap-2">
                          <span>{config.emoji}</span>
                          <span className="capitalize">{key}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">Due Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start rounded-xl focus-ring transition-all duration-300"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {newTodo.dueDate ? formatDate(newTodo.dueDate) : "Set date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 rounded-xl">
                    <Calendar
                      mode="single"
                      selected={newTodo.dueDate}
                      onSelect={(date) => setNewTodo({ ...newTodo, dueDate: date })}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">Recurring</Label>
                <Select
                  value={newTodo.recurring || ""}
                  onValueChange={(value) =>
                    setNewTodo({ ...newTodo, recurring: value as "daily" | "weekly" | "monthly" | undefined })
                  }
                >
                  <SelectTrigger className="rounded-xl focus-ring transition-all duration-300">
                    <SelectValue placeholder="None" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">Estimated Time (minutes)</Label>
              <Input
                type="number"
                value={newTodo.estimatedTime}
                onChange={(e) => setNewTodo({ ...newTodo, estimatedTime: Number.parseInt(e.target.value) || 30 })}
                className="rounded-xl focus-ring transition-all duration-300"
                min="5"
                max="480"
              />
            </div>
            <div className="flex items-center space-x-3">
              <Checkbox
                id="starred"
                checked={newTodo.starred}
                onCheckedChange={(checked) => setNewTodo({ ...newTodo, starred: !!checked })}
                className="rounded-md"
              />
              <Label
                htmlFor="starred"
                className="text-sm font-medium flex items-center gap-2 text-slate-700 dark:text-slate-300"
              >
                <Star className="w-4 h-4" />
                Mark as important
              </Label>
            </div>
            <Button
              onClick={addTodo}
              className={cn(
                "w-full rounded-xl text-white transition-all duration-300 hover:scale-105 active:scale-95",
                "bg-gradient-to-r shadow-lg hover:shadow-xl",
                getThemeGradient(),
              )}
            >
              Create Task
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Task Card Component
function TaskCard({
  todo,
  onToggleComplete,
  onToggleStar,
  onDelete,
  onAddSubtask,
  onToggleSubtask,
}: {
  todo: Todo
  onToggleComplete: (id: string) => void
  onToggleStar: (id: string) => void
  onDelete?: (id: string) => void
  onAddSubtask?: (todoId: string, title: string) => void
  onToggleSubtask?: (todoId: string, subtaskId: string) => void
}) {
  const [showSubtasks, setShowSubtasks] = useState(false)
  const [newSubtask, setNewSubtask] = useState("")

  const isOverdue = todo.dueDate && todo.dueDate < new Date() && !todo.completed
  const completedSubtasks = todo.subtasks.filter((s) => s.completed).length
  const totalSubtasks = todo.subtasks.length

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })
  }

  const addSubtask = () => {
    if (newSubtask.trim() && onAddSubtask) {
      onAddSubtask(todo.id, newSubtask.trim())
      setNewSubtask("")
    }
  }

  return (
    <Card
      className={cn(
        "group transition-all duration-500 hover:scale-[1.02] hover:shadow-xl card-hover",
        todo.completed && "opacity-60",
        isOverdue && "border-red-300 bg-red-50/50 dark:bg-red-950/20",
        "bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl border-slate-200 dark:border-slate-700",
      )}
    >
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="mt-1">
            <Checkbox
              checked={todo.completed}
              onCheckedChange={() => onToggleComplete(todo.id)}
              className="rounded-full w-5 h-5 transition-all duration-300 hover:scale-110"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3
                    className={cn(
                      "font-semibold text-slate-900 dark:text-white text-lg transition-colors duration-300",
                      todo.completed && "line-through text-slate-500",
                    )}
                  >
                    {todo.title}
                  </h3>
                  {todo.starred && <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 animate-pulse" />}
                  {todo.recurring && <Repeat className="w-4 h-4 text-blue-500" />}
                </div>
                {todo.description && (
                  <p
                    className={cn(
                      "text-slate-600 dark:text-slate-400 mb-4 text-sm transition-colors duration-300",
                      todo.completed && "line-through",
                    )}
                  >
                    {todo.description}
                  </p>
                )}

                {/* Subtasks Progress */}
                {totalSubtasks > 0 && (
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm text-slate-600 dark:text-slate-400">
                        Subtasks: {completedSubtasks}/{totalSubtasks}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowSubtasks(!showSubtasks)}
                        className="h-6 px-2 text-xs hover:scale-105 transition-all duration-300"
                      >
                        {showSubtasks ? "Hide" : "Show"}
                      </Button>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${totalSubtasks > 0 ? (completedSubtasks / totalSubtasks) * 100 : 0}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Subtasks List */}
                {showSubtasks && (
                  <div className="mb-4 space-y-2">
                    {todo.subtasks.map((subtask) => (
                      <div key={subtask.id} className="flex items-center gap-2 pl-4">
                        <Checkbox
                          checked={subtask.completed}
                          onCheckedChange={() => onToggleSubtask?.(todo.id, subtask.id)}
                          className="w-4 h-4 transition-all duration-300 hover:scale-110"
                        />
                        <span
                          className={cn(
                            "text-sm transition-colors duration-300",
                            subtask.completed ? "line-through text-slate-500" : "text-slate-700 dark:text-slate-300",
                          )}
                        >
                          {subtask.title}
                        </span>
                      </div>
                    ))}
                    <div className="flex items-center gap-2 pl-4">
                      <Input
                        placeholder="Add subtask..."
                        value={newSubtask}
                        onChange={(e) => setNewSubtask(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && addSubtask()}
                        className="h-8 text-sm rounded-lg transition-all duration-300"
                      />
                      <Button
                        onClick={addSubtask}
                        size="sm"
                        className="h-8 px-3 transition-all duration-300 hover:scale-105"
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-3 flex-wrap">
                  <Badge
                    variant="outline"
                    className={cn(
                      "rounded-full bg-gradient-to-r text-white border-0 transition-all duration-300 hover:scale-105",
                      priorityConfig[todo.priority].color,
                    )}
                  >
                    <Flag className="w-3 h-3 mr-1" />
                    {priorityConfig[todo.priority].label}
                  </Badge>
                  <Badge
                    variant="outline"
                    className={cn(
                      "rounded-full bg-gradient-to-r text-white border-0 transition-all duration-300 hover:scale-105",
                      categoryConfig[todo.category].color,
                    )}
                  >
                    <span className="mr-1">{categoryConfig[todo.category].emoji}</span>
                    <span className="capitalize">{todo.category}</span>
                  </Badge>
                  {todo.dueDate && (
                    <Badge
                      variant="outline"
                      className={cn(
                        "rounded-full transition-all duration-300 hover:scale-105",
                        isOverdue
                          ? "bg-red-100 text-red-700 border-red-300"
                          : "bg-slate-100 text-slate-700 border-slate-300",
                      )}
                    >
                      <CalendarIcon className="w-3 h-3 mr-1" />
                      {formatDate(todo.dueDate)}
                    </Badge>
                  )}
                  {todo.estimatedTime && (
                    <Badge variant="outline" className="rounded-full transition-all duration-300 hover:scale-105">
                      <Timer className="w-3 h-3 mr-1" />
                      {todo.estimatedTime}m
                    </Badge>
                  )}
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-full hover:scale-110"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="rounded-xl">
                  <DropdownMenuItem
                    onClick={() => onToggleStar(todo.id)}
                    className="rounded-lg transition-all duration-300 hover:scale-105"
                  >
                    <Star className="w-4 h-4 mr-2" />
                    {todo.starred ? "Remove Star" : "Add Star"}
                  </DropdownMenuItem>
                  {onDelete && (
                    <DropdownMenuItem
                      onClick={() => onDelete(todo.id)}
                      className="text-red-600 rounded-lg transition-all duration-300 hover:scale-105"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Delete Task
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
