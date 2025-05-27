"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { useTheme } from "../theme-provider"
import {
  Settings,
  User,
  Bell,
  Palette,
  Download,
  Upload,
  Trash2,
  Shield,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  Save,
  RefreshCw,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface SettingsViewProps {
  todos: any[]
  onExportData: () => void
  onImportData: (data: any) => void
  onClearData: () => void
}

export function SettingsView({ todos, onExportData, onImportData, onClearData }: SettingsViewProps) {
  const { theme, setTheme, darkMode, setDarkMode } = useTheme()
  const [settings, setSettings] = useState({
    userName: localStorage.getItem("taskflow-username") || "",
    notifications: localStorage.getItem("taskflow-notifications") !== "false",
    soundEffects: localStorage.getItem("taskflow-sounds") !== "false",
    autoSave: localStorage.getItem("taskflow-autosave") !== "false",
    defaultPriority: localStorage.getItem("taskflow-default-priority") || "medium",
    defaultCategory: localStorage.getItem("taskflow-default-category") || "personal",
    pomodoroTime: Number.parseInt(localStorage.getItem("taskflow-pomodoro-time") || "25"),
    breakTime: Number.parseInt(localStorage.getItem("taskflow-break-time") || "5"),
  })

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

  const themes = [
    { id: "nature", name: "Nature", description: "Earth friendly & calming" },
    { id: "programming", name: "Programming", description: "For developers" },
    { id: "love", name: "Love", description: "Romantic vibes" },
    { id: "gaming", name: "Gaming", description: "Level up productivity" },
    { id: "default", name: "Classic", description: "Clean and modern" },
  ]

  const saveSettings = () => {
    Object.entries(settings).forEach(([key, value]) => {
      localStorage.setItem(`taskflow-${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`, value.toString())
    })

    // Show success message (you can implement a toast here)
    console.log("Settings saved successfully!")
  }

  const resetSettings = () => {
    const defaultSettings = {
      userName: "",
      notifications: true,
      soundEffects: true,
      autoSave: true,
      defaultPriority: "medium",
      defaultCategory: "personal",
      pomodoroTime: 25,
      breakTime: 5,
    }
    setSettings(defaultSettings)
  }

  const exportData = () => {
    const data = {
      todos,
      settings,
      theme,
      darkMode,
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

  const importData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string)
        onImportData(data)
        if (data.settings) setSettings(data.settings)
        if (data.theme) setTheme(data.theme)
        if (typeof data.darkMode === "boolean") setDarkMode(data.darkMode)
      } catch (error) {
        console.error("Failed to import data:", error)
      }
    }
    reader.readAsText(file)
  }

  return (
    <div className="space-y-6">
      {/* Settings Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Settings className="w-6 h-6" />
            Settings
          </h2>
          <p className="text-slate-600 dark:text-slate-400">Customize your TaskFlow experience</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={resetSettings} variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <Button onClick={saveSettings} className={cn("bg-gradient-to-r text-white", getThemeGradient())}>
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="userName">Display Name</Label>
              <Input
                id="userName"
                value={settings.userName}
                onChange={(e) => setSettings({ ...settings, userName: e.target.value })}
                placeholder="Enter your name"
              />
            </div>

            <div className="space-y-2">
              <Label>Statistics</Label>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <div className="font-medium">Total Tasks</div>
                  <div className="text-2xl font-bold text-blue-600">{todos.length}</div>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <div className="font-medium">Completed</div>
                  <div className="text-2xl font-bold text-green-600">{todos.filter((t) => t.completed).length}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Appearance Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="w-5 h-5" />
              Appearance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Dark Mode</Label>
                <p className="text-sm text-slate-600 dark:text-slate-400">Toggle between light and dark themes</p>
              </div>
              <div className="flex items-center gap-2">
                <Sun className="w-4 h-4" />
                <Switch checked={darkMode} onCheckedChange={setDarkMode} />
                <Moon className="w-4 h-4" />
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <Label>Theme</Label>
              <div className="grid grid-cols-1 gap-2">
                {themes.map((themeOption) => (
                  <div
                    key={themeOption.id}
                    className={cn(
                      "p-3 rounded-lg border cursor-pointer transition-all duration-300 hover:shadow-md",
                      theme === themeOption.id
                        ? "border-green-500 bg-green-50 dark:bg-green-950/20"
                        : "border-slate-200 dark:border-slate-700 hover:border-slate-300",
                    )}
                    onClick={() => setTheme(themeOption.id as any)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{themeOption.name}</div>
                        <div className="text-sm text-slate-600 dark:text-slate-400">{themeOption.description}</div>
                      </div>
                      {theme === themeOption.id && <Badge className="bg-green-500 text-white">Active</Badge>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Push Notifications</Label>
                <p className="text-sm text-slate-600 dark:text-slate-400">Get notified about due tasks</p>
              </div>
              <Switch
                checked={settings.notifications}
                onCheckedChange={(checked) => setSettings({ ...settings, notifications: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Sound Effects</Label>
                <p className="text-sm text-slate-600 dark:text-slate-400">Play sounds for task completion</p>
              </div>
              <div className="flex items-center gap-2">
                <VolumeX className="w-4 h-4" />
                <Switch
                  checked={settings.soundEffects}
                  onCheckedChange={(checked) => setSettings({ ...settings, soundEffects: checked })}
                />
                <Volume2 className="w-4 h-4" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Default Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Default Task Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Default Priority</Label>
              <Select
                value={settings.defaultPriority}
                onValueChange={(value) => setSettings({ ...settings, defaultPriority: value })}
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

            <div className="space-y-2">
              <Label>Default Category</Label>
              <Select
                value={settings.defaultCategory}
                onValueChange={(value) => setSettings({ ...settings, defaultCategory: value })}
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

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Pomodoro Time (min)</Label>
                <Input
                  type="number"
                  value={settings.pomodoroTime}
                  onChange={(e) => setSettings({ ...settings, pomodoroTime: Number.parseInt(e.target.value) || 25 })}
                  min="5"
                  max="60"
                />
              </div>
              <div className="space-y-2">
                <Label>Break Time (min)</Label>
                <Input
                  type="number"
                  value={settings.breakTime}
                  onChange={(e) => setSettings({ ...settings, breakTime: Number.parseInt(e.target.value) || 5 })}
                  min="1"
                  max="30"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Management */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Data Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button onClick={exportData} variant="outline" className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export Data
              </Button>

              <div>
                <input type="file" accept=".json" onChange={importData} className="hidden" id="import-file" />
                <Button asChild variant="outline" className="w-full">
                  <label htmlFor="import-file" className="flex items-center gap-2 cursor-pointer">
                    <Upload className="w-4 h-4" />
                    Import Data
                  </label>
                </Button>
              </div>

              <Button onClick={onClearData} variant="destructive" className="flex items-center gap-2">
                <Trash2 className="w-4 h-4" />
                Clear All Data
              </Button>
            </div>

            <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-800">
              <p className="text-sm text-amber-800 dark:text-amber-200">
                <strong>Note:</strong> Your data is stored locally in your browser. Export regularly to backup your
                tasks and settings.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
