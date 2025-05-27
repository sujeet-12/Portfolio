"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Theme = "nature" | "programming" | "love" | "default" | "gaming"

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  darkMode: boolean
  setDarkMode: (dark: boolean) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("nature") // Nature as default
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem("taskflow-theme") as Theme
    const savedDarkMode = localStorage.getItem("taskflow-dark-mode") === "true"
    if (savedTheme) setTheme(savedTheme)
    setDarkMode(savedDarkMode)

    // Apply theme class to document
    document.documentElement.className = `theme-${savedTheme || "nature"} ${savedDarkMode ? "dark" : ""}`
  }, [])

  useEffect(() => {
    localStorage.setItem("taskflow-theme", theme)
    localStorage.setItem("taskflow-dark-mode", darkMode.toString())

    // Update document class
    document.documentElement.className = `theme-${theme} ${darkMode ? "dark" : ""}`
  }, [theme, darkMode])

  return (
    <ThemeContext.Provider value={{ theme, setTheme, darkMode, setDarkMode }}>
      <div className={`theme-${theme} ${darkMode ? "dark" : ""} transition-colors duration-500`}>{children}</div>
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
