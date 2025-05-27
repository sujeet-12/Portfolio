"use client"

import { useState } from "react"
import { ThemeProvider } from "./theme-provider"
import EnhancedLandingPage from "./enhanced-landing-page"
import EnhancedTodoApp from "./enhanced-todo-app"

export default function AppWrapper() {
  const [showApp, setShowApp] = useState(false)

  return (
    <ThemeProvider>
      {showApp ? (
        <EnhancedTodoApp onBackToLanding={() => setShowApp(false)} />
      ) : (
        <EnhancedLandingPage onGetStarted={() => setShowApp(true)} />
      )}
    </ThemeProvider>
  )
}
