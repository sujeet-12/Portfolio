"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Play, Pause, RotateCcw, Coffee } from "lucide-react"
import { cn } from "@/lib/utils"

interface PomodoroTimerProps {
  theme: string
  onSessionComplete?: () => void
}

export function PomodoroTimer({ theme, onSessionComplete }: PomodoroTimerProps) {
  const [timeLeft, setTimeLeft] = useState(25 * 60) // 25 minutes
  const [isActive, setIsActive] = useState(false)
  const [isBreak, setIsBreak] = useState(false)
  const [sessions, setSessions] = useState(0)

  const totalTime = isBreak ? 5 * 60 : 25 * 60
  const progress = ((totalTime - timeLeft) / totalTime) * 100

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      if (!isBreak) {
        setSessions((s) => s + 1)
        onSessionComplete?.()
      }
      setIsBreak(!isBreak)
      setTimeLeft(isBreak ? 25 * 60 : 5 * 60)
      setIsActive(false)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, timeLeft, isBreak, onSessionComplete])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
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

  const reset = () => {
    setIsActive(false)
    setIsBreak(false)
    setTimeLeft(25 * 60)
  }

  return (
    <Card className="w-full max-w-sm">
      <CardContent className="p-6 text-center">
        <div className="mb-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            {isBreak ? <Coffee className="w-5 h-5 text-orange-500" /> : <Play className="w-5 h-5 text-blue-500" />}
            <h3 className="text-lg font-semibold">{isBreak ? "Break Time" : "Focus Time"}</h3>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Session {sessions + 1} • {sessions} completed
          </p>
        </div>

        <div className="mb-6">
          <div className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{formatTime(timeLeft)}</div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="flex justify-center gap-2">
          <Button
            onClick={() => setIsActive(!isActive)}
            className={cn("bg-gradient-to-r text-white", getThemeGradient())}
          >
            {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </Button>
          <Button onClick={reset} variant="outline">
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
