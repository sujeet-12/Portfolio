"use client"

import { useState, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Plus,
  Search,
  CalendarIcon,
  Flag,
  Circle,
  MoreHorizontal,
  Filter,
  Moon,
  Sun,
  Star,
  Clock,
  Zap,
  Target,
  Sparkles,
  X,
  ArrowLeft,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

type Priority = "low" | "medium" | "high" | "urgent"
type Category = "personal" | "work" | "shopping" | "health" | "finance" | "other"

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

interface ModernTodoAppProps {
  onBackToLanding?: () => void
}

export default function ModernTodoApp({ onBackToLanding }: ModernTodoAppProps) {
  const [todos, setTodos] = useState<Todo[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState<Category | "all">("all")
  const [filterPriority, setFilterPriority] = useState<Priority | "all">("all")
  const [activeFilter, setActiveFilter] = useState<"all" | "pending" | "completed" | "starred">("all")
  const [darkMode, setDarkMode] = useState(false)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [showFilters, setShowFilters] = useState(false)

  // Form states
  const [newTodo, setNewTodo] = useState({
    title: "",
    description: "",
    priority: "medium" as Priority,
    category: "personal" as Category,
    dueDate: undefined as Date | undefined,
    starred: false,
  })

  // Load todos from localStorage on mount
  useEffect(() => {
    const savedTodos = localStorage.getItem("modern-todos")
    if (savedTodos) {
      const parsed = JSON.parse(savedTodos)
      setTodos(
        parsed.map((todo: any) => ({
          ...todo,
          createdAt: new Date(todo.createdAt),
          dueDate: todo.dueDate ? new Date(todo.dueDate) : undefined,
          completedAt: todo.completedAt ? new Date(todo.completedAt) : undefined,
        })),
      )
    }
  }, [])

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem("modern-todos", JSON.stringify(todos))
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
    }

    setTodos([todo, ...todos])
    setNewTodo({
      title: "",
      description: "",
      priority: "medium",
      category: "personal",
      dueDate: undefined,
      starred: false,
    })
    setIsAddDialogOpen(false)
  }

  const updateTodo = (id: string, updates: Partial<Todo>) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, ...updates } : todo)))
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

  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      if (todo.archived) return false

      const matchesSearch =
        todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        todo.description.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesCategory = filterCategory === "all" || todo.category === filterCategory
      const matchesPriority = filterPriority === "all" || todo.priority === filterPriority

      let matchesFilter = true
      if (activeFilter === "pending") matchesFilter = !todo.completed
      if (activeFilter === "completed") matchesFilter = todo.completed
      if (activeFilter === "starred") matchesFilter = todo.starred

      return matchesSearch && matchesCategory && matchesPriority && matchesFilter
    })
  }, [todos, searchTerm, filterCategory, filterPriority, activeFilter])

  const stats = useMemo(() => {
    const activeTodos = todos.filter((t) => !t.archived)
    const completed = activeTodos.filter((t) => t.completed).length
    const pending = activeTodos.filter((t) => !t.completed).length
    const starred = activeTodos.filter((t) => t.starred).length
    return { total: activeTodos.length, completed, pending, starred }
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

  return (
    <div className={cn("min-h-screen transition-all duration-500", darkMode ? "dark bg-gray-950" : "bg-gray-50")}>
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-gray-950/80 border-b border-dashed border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {onBackToLanding && (
                <Button variant="ghost" size="icon" onClick={onBackToLanding} className="rounded-full mr-2">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              )}
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  TaskFlow
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-mono">Organize • Focus • Achieve</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={() => setDarkMode(!darkMode)} className="rounded-full">
                {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="rounded-full bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 shadow-lg">
                    <Plus className="h-4 w-4 mr-2" />
                    New Task
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md rounded-3xl border-0 shadow-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                      Create New Task
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="title" className="text-sm font-medium">
                        Task Title
                      </Label>
                      <Input
                        id="title"
                        value={newTodo.title}
                        onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
                        placeholder="What needs to be done?"
                        className="rounded-xl border-dashed"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description" className="text-sm font-medium">
                        Description
                      </Label>
                      <Textarea
                        id="description"
                        value={newTodo.description}
                        onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
                        placeholder="Add more details..."
                        className="rounded-xl border-dashed resize-none"
                        rows={3}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Priority</Label>
                        <Select
                          value={newTodo.priority}
                          onValueChange={(value: Priority) => setNewTodo({ ...newTodo, priority: value })}
                        >
                          <SelectTrigger className="rounded-xl border-dashed">
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
                        <Label className="text-sm font-medium">Category</Label>
                        <Select
                          value={newTodo.category}
                          onValueChange={(value: Category) => setNewTodo({ ...newTodo, category: value })}
                        >
                          <SelectTrigger className="rounded-xl border-dashed">
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
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Due Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start rounded-xl border-dashed">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {newTodo.dueDate ? formatDate(newTodo.dueDate) : "Set due date"}
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
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id="starred"
                        checked={newTodo.starred}
                        onCheckedChange={(checked) => setNewTodo({ ...newTodo, starred: !!checked })}
                        className="rounded-md"
                      />
                      <Label htmlFor="starred" className="text-sm font-medium flex items-center gap-2">
                        <Star className="w-4 h-4" />
                        Mark as important
                      </Label>
                    </div>
                    <Button
                      onClick={addTodo}
                      className="w-full rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700"
                    >
                      Create Task
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 border border-dashed border-gray-200 dark:border-gray-800">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400 font-mono">Total Tasks</div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 border border-dashed border-gray-200 dark:border-gray-800">
            <div className="text-2xl font-bold text-emerald-600">{stats.completed}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400 font-mono">Completed</div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 border border-dashed border-gray-200 dark:border-gray-800">
            <div className="text-2xl font-bold text-amber-600">{stats.pending}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400 font-mono">Pending</div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 border border-dashed border-gray-200 dark:border-gray-800">
            <div className="text-2xl font-bold text-violet-600">{stats.starred}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400 font-mono">Starred</div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 mb-8 border border-dashed border-gray-200 dark:border-gray-800 shadow-sm">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search your tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 rounded-2xl border-dashed bg-gray-50 dark:bg-gray-800"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="rounded-2xl border-dashed"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>

          {showFilters && (
            <div className="mt-6 pt-6 border-t border-dashed border-gray-200 dark:border-gray-800">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium mb-2 block">Category</Label>
                  <Select value={filterCategory} onValueChange={(value: Category | "all") => setFilterCategory(value)}>
                    <SelectTrigger className="rounded-xl border-dashed">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="all">All Categories</SelectItem>
                      {Object.entries(categoryConfig).map(([key, config]) => (
                        <SelectItem key={key} value={key}>
                          <div className="flex items-center gap-2">
                            <span>{config.emoji}</span>
                            <span className="capitalize">{key}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm font-medium mb-2 block">Priority</Label>
                  <Select value={filterPriority} onValueChange={(value: Priority | "all") => setFilterPriority(value)}>
                    <SelectTrigger className="rounded-xl border-dashed">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="all">All Priorities</SelectItem>
                      {Object.entries(priorityConfig).map(([key, config]) => (
                        <SelectItem key={key} value={key}>
                          <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${config.color}`} />
                            {config.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {[
            { key: "all", label: "All Tasks", count: stats.total },
            { key: "pending", label: "Pending", count: stats.pending },
            { key: "completed", label: "Completed", count: stats.completed },
            { key: "starred", label: "Starred", count: stats.starred },
          ].map((filter) => (
            <Button
              key={filter.key}
              variant={activeFilter === filter.key ? "default" : "outline"}
              onClick={() => setActiveFilter(filter.key as any)}
              className={cn(
                "rounded-full border-dashed",
                activeFilter === filter.key
                  ? "bg-gradient-to-r from-violet-500 to-purple-600 text-white"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800",
              )}
            >
              {filter.label} ({filter.count})
            </Button>
          ))}
        </div>

        {/* Todo List */}
        <div className="space-y-4">
          {filteredTodos.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center">
                <Circle className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No tasks found</h3>
              <p className="text-gray-500 dark:text-gray-400 font-mono">
                {searchTerm ? "Try adjusting your search" : "Create your first task to get started"}
              </p>
            </div>
          ) : (
            filteredTodos.map((todo, index) => (
              <Card
                key={todo.id}
                className={cn(
                  "group rounded-3xl border-dashed transition-all duration-300 hover:shadow-lg hover:scale-[1.02]",
                  todo.completed && "opacity-60",
                  isOverdue(todo) && "border-red-300 bg-red-50/50 dark:bg-red-950/20",
                  "bg-white dark:bg-gray-900",
                )}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="mt-1">
                      <Checkbox
                        checked={todo.completed}
                        onCheckedChange={() => toggleComplete(todo.id)}
                        className="rounded-full w-5 h-5"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3
                              className={cn(
                                "font-semibold text-gray-900 dark:text-white text-lg",
                                todo.completed && "line-through text-gray-500",
                              )}
                            >
                              {todo.title}
                            </h3>
                            {todo.starred && <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />}
                          </div>
                          {todo.description && (
                            <p
                              className={cn(
                                "text-gray-600 dark:text-gray-400 mb-4 font-mono text-sm",
                                todo.completed && "line-through",
                              )}
                            >
                              {todo.description}
                            </p>
                          )}
                          <div className="flex items-center gap-3 flex-wrap">
                            <Badge
                              variant="outline"
                              className={cn(
                                "rounded-full border-dashed bg-gradient-to-r text-white border-0",
                                priorityConfig[todo.priority].color,
                              )}
                            >
                              <Flag className="w-3 h-3 mr-1" />
                              {priorityConfig[todo.priority].label}
                            </Badge>
                            <Badge
                              variant="outline"
                              className={cn(
                                "rounded-full border-dashed bg-gradient-to-r text-white border-0",
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
                                  "rounded-full border-dashed",
                                  isOverdue(todo)
                                    ? "bg-red-100 text-red-700 border-red-300"
                                    : "bg-gray-100 text-gray-700 border-gray-300",
                                )}
                              >
                                <CalendarIcon className="w-3 h-3 mr-1" />
                                {formatDate(todo.dueDate)}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="opacity-0 group-hover:opacity-100 transition-opacity rounded-full"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="rounded-xl">
                            <DropdownMenuItem onClick={() => toggleStar(todo.id)} className="rounded-lg">
                              <Star className="w-4 h-4 mr-2" />
                              {todo.starred ? "Remove Star" : "Add Star"}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => deleteTodo(todo.id)} className="text-red-600 rounded-lg">
                              <X className="w-4 h-4 mr-2" />
                              Delete Task
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-dashed border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-950/50 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-gray-900 dark:text-white">TaskFlow</span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-mono">
              Designed for productivity • Built for simplicity
            </p>
            <div className="flex items-center justify-center gap-4 mt-4 text-xs text-gray-400">
              <span>Made with ❤️</span>
              <span>•</span>
              <span>Stay Organized</span>
              <span>•</span>
              <span>Achieve More</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
