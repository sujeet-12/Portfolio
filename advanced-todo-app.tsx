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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Plus,
  Search,
  CalendarIcon,
  Flag,
  Tag,
  CheckCircle2,
  Circle,
  MoreHorizontal,
  SortAsc,
  SortDesc,
  BarChart3,
  Moon,
  Sun,
  Archive,
  Star,
  Clock,
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
  tags: string[]
  archived: boolean
  starred: boolean
}

const priorityColors = {
  low: "bg-green-100 text-green-800 border-green-200",
  medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
  high: "bg-orange-100 text-orange-800 border-orange-200",
  urgent: "bg-red-100 text-red-800 border-red-200",
}

const categoryColors = {
  personal: "bg-blue-100 text-blue-800 border-blue-200",
  work: "bg-purple-100 text-purple-800 border-purple-200",
  shopping: "bg-pink-100 text-pink-800 border-pink-200",
  health: "bg-emerald-100 text-emerald-800 border-emerald-200",
  finance: "bg-amber-100 text-amber-800 border-amber-200",
  other: "bg-gray-100 text-gray-800 border-gray-200",
}

export default function AdvancedTodoApp() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState<Category | "all">("all")
  const [filterPriority, setFilterPriority] = useState<Priority | "all">("all")
  const [filterStatus, setFilterStatus] = useState<"all" | "completed" | "pending">("all")
  const [sortBy, setSortBy] = useState<"dueDate" | "priority" | "created" | "title">("created")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [showArchived, setShowArchived] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null)
  const [activeTab, setActiveTab] = useState("all")

  // Form states
  const [newTodo, setNewTodo] = useState({
    title: "",
    description: "",
    priority: "medium" as Priority,
    category: "personal" as Category,
    dueDate: undefined as Date | undefined,
    tags: [] as string[],
    starred: false,
  })

  // Load todos from localStorage on mount
  useEffect(() => {
    const savedTodos = localStorage.getItem("advanced-todos")
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
    localStorage.setItem("advanced-todos", JSON.stringify(todos))
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
      tags: newTodo.tags,
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
      tags: [],
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

  const toggleArchive = (id: string) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, archived: !todo.archived } : todo)))
  }

  const filteredAndSortedTodos = useMemo(() => {
    const filtered = todos.filter((todo) => {
      if (!showArchived && todo.archived) return false
      if (activeTab === "starred" && !todo.starred) return false
      if (activeTab === "completed" && !todo.completed) return false
      if (activeTab === "pending" && todo.completed) return false
      if (activeTab === "overdue" && (!todo.dueDate || todo.dueDate > new Date() || todo.completed)) return false

      const matchesSearch =
        todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        todo.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        todo.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesCategory = filterCategory === "all" || todo.category === filterCategory
      const matchesPriority = filterPriority === "all" || todo.priority === filterPriority
      const matchesStatus =
        filterStatus === "all" ||
        (filterStatus === "completed" && todo.completed) ||
        (filterStatus === "pending" && !todo.completed)

      return matchesSearch && matchesCategory && matchesPriority && matchesStatus
    })

    // Sort todos
    filtered.sort((a, b) => {
      let comparison = 0

      switch (sortBy) {
        case "title":
          comparison = a.title.localeCompare(b.title)
          break
        case "dueDate":
          if (!a.dueDate && !b.dueDate) comparison = 0
          else if (!a.dueDate) comparison = 1
          else if (!b.dueDate) comparison = -1
          else comparison = a.dueDate.getTime() - b.dueDate.getTime()
          break
        case "priority":
          const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 }
          comparison = priorityOrder[b.priority] - priorityOrder[a.priority]
          break
        case "created":
          comparison = a.createdAt.getTime() - b.createdAt.getTime()
          break
      }

      return sortOrder === "asc" ? comparison : -comparison
    })

    return filtered
  }, [todos, searchTerm, filterCategory, filterPriority, filterStatus, sortBy, sortOrder, showArchived, activeTab])

  const stats = useMemo(() => {
    const total = todos.filter((t) => !t.archived).length
    const completed = todos.filter((t) => t.completed && !t.archived).length
    const overdue = todos.filter((t) => t.dueDate && t.dueDate < new Date() && !t.completed && !t.archived).length
    const starred = todos.filter((t) => t.starred && !t.archived).length

    return { total, completed, overdue, starred, completionRate: total > 0 ? (completed / total) * 100 : 0 }
  }, [todos])

  const isOverdue = (todo: Todo) => {
    return todo.dueDate && todo.dueDate < new Date() && !todo.completed
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: date.getFullYear() !== new Date().getFullYear() ? "numeric" : undefined,
    })
  }

  return (
    <div className={cn("min-h-screen transition-colors", darkMode ? "dark bg-gray-900" : "bg-gray-50")}>
      <div className="container mx-auto p-4 max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Advanced Todo List</h1>
            <p className="text-gray-600 dark:text-gray-400">Organize your tasks efficiently</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Task
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Add New Task</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={newTodo.title}
                      onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
                      placeholder="Enter task title"
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={newTodo.description}
                      onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
                      placeholder="Enter task description"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Priority</Label>
                      <Select
                        value={newTodo.priority}
                        onValueChange={(value: Priority) => setNewTodo({ ...newTodo, priority: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="urgent">Urgent</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Category</Label>
                      <Select
                        value={newTodo.category}
                        onValueChange={(value: Category) => setNewTodo({ ...newTodo, category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="personal">Personal</SelectItem>
                          <SelectItem value="work">Work</SelectItem>
                          <SelectItem value="shopping">Shopping</SelectItem>
                          <SelectItem value="health">Health</SelectItem>
                          <SelectItem value="finance">Finance</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label>Due Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {newTodo.dueDate ? formatDate(newTodo.dueDate) : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={newTodo.dueDate}
                          onSelect={(date) => setNewTodo({ ...newTodo, dueDate: date })}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="starred"
                      checked={newTodo.starred}
                      onCheckedChange={(checked) => setNewTodo({ ...newTodo, starred: !!checked })}
                    />
                    <Label htmlFor="starred">Mark as important</Label>
                  </div>
                  <Button onClick={addTodo} className="w-full">
                    Add Task
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Tasks</p>
                  <p className="text-2xl font-bold">{stats.total}</p>
                </div>
                <BarChart3 className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Completed</p>
                  <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
                </div>
                <CheckCircle2 className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Overdue</p>
                  <p className="text-2xl font-bold text-red-600">{stats.overdue}</p>
                </div>
                <Clock className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Completion Rate</p>
                  <p className="text-2xl font-bold">{stats.completionRate.toFixed(0)}%</p>
                </div>
                <Star className="h-8 w-8 text-yellow-500" />
              </div>
              <Progress value={stats.completionRate} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search tasks..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Select value={filterCategory} onValueChange={(value: Category | "all") => setFilterCategory(value)}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="personal">Personal</SelectItem>
                    <SelectItem value="work">Work</SelectItem>
                    <SelectItem value="shopping">Shopping</SelectItem>
                    <SelectItem value="health">Health</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterPriority} onValueChange={(value: Priority | "all") => setFilterPriority(value)}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priorities</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={(value: typeof sortBy) => setSortBy(value)}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="created">Created</SelectItem>
                    <SelectItem value="dueDate">Due Date</SelectItem>
                    <SelectItem value="priority">Priority</SelectItem>
                    <SelectItem value="title">Title</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                >
                  {sortOrder === "asc" ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">All ({todos.filter((t) => !t.archived).length})</TabsTrigger>
            <TabsTrigger value="pending">
              Pending ({todos.filter((t) => !t.completed && !t.archived).length})
            </TabsTrigger>
            <TabsTrigger value="completed">
              Completed ({todos.filter((t) => t.completed && !t.archived).length})
            </TabsTrigger>
            <TabsTrigger value="starred">Starred ({stats.starred})</TabsTrigger>
            <TabsTrigger value="overdue">Overdue ({stats.overdue})</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Todo List */}
        <div className="space-y-3">
          {filteredAndSortedTodos.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Circle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">No tasks found</p>
                <p className="text-sm text-gray-400 dark:text-gray-500">Try adjusting your filters or add a new task</p>
              </CardContent>
            </Card>
          ) : (
            filteredAndSortedTodos.map((todo) => (
              <Card
                key={todo.id}
                className={cn(
                  "transition-all hover:shadow-md",
                  todo.completed && "opacity-75",
                  isOverdue(todo) && "border-red-200 bg-red-50 dark:bg-red-950/20",
                )}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      checked={todo.completed}
                      onCheckedChange={() => toggleComplete(todo.id)}
                      className="mt-1"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <h3
                            className={cn(
                              "font-medium text-gray-900 dark:text-white",
                              todo.completed && "line-through text-gray-500",
                            )}
                          >
                            {todo.title}
                            {todo.starred && <Star className="inline h-4 w-4 text-yellow-500 ml-1" />}
                          </h3>
                          {todo.description && (
                            <p
                              className={cn(
                                "text-sm text-gray-600 dark:text-gray-400 mt-1",
                                todo.completed && "line-through",
                              )}
                            >
                              {todo.description}
                            </p>
                          )}
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => toggleStar(todo.id)}>
                              {todo.starred ? "Unstar" : "Star"}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setEditingTodo(todo)}>Edit</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => toggleArchive(todo.id)}>
                              {todo.archived ? "Unarchive" : "Archive"}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => deleteTodo(todo.id)} className="text-red-600">
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <div className="flex items-center gap-2 mt-3 flex-wrap">
                        <Badge variant="outline" className={priorityColors[todo.priority]}>
                          <Flag className="h-3 w-3 mr-1" />
                          {todo.priority}
                        </Badge>
                        <Badge variant="outline" className={categoryColors[todo.category]}>
                          <Tag className="h-3 w-3 mr-1" />
                          {todo.category}
                        </Badge>
                        {todo.dueDate && (
                          <Badge
                            variant="outline"
                            className={cn(
                              "text-gray-600 border-gray-300",
                              isOverdue(todo) && "text-red-600 border-red-300 bg-red-50",
                            )}
                          >
                            <CalendarIcon className="h-3 w-3 mr-1" />
                            {formatDate(todo.dueDate)}
                          </Badge>
                        )}
                        {todo.archived && (
                          <Badge variant="outline" className="text-gray-500 border-gray-300">
                            <Archive className="h-3 w-3 mr-1" />
                            Archived
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Show Archived Toggle */}
        <div className="mt-6 text-center">
          <Button variant="outline" onClick={() => setShowArchived(!showArchived)}>
            {showArchived ? "Hide" : "Show"} Archived Tasks ({todos.filter((t) => t.archived).length})
          </Button>
        </div>
      </div>
    </div>
  )
}
