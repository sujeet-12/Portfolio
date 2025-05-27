"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Loader } from "./components/loader"
import { ThemeToggle } from "./components/theme-toggle"
import { Testimonials, FeaturesGrid, Newsletter } from "./components/website-components"
import { useTheme } from "./theme-provider"
import { DemoExamples } from "./components/demo-examples"
import {
  Leaf,
  ArrowRight,
  CheckCircle2,
  Star,
  Zap,
  Target,
  Calendar,
  Filter,
  Github,
  Twitter,
  Mail,
  Play,
  Users,
  TrendingUp,
  Smartphone,
  Palette,
  BarChart3,
  Heart,
  Code,
  Gamepad2,
  Sparkles,
  TreePine,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface EnhancedLandingPageProps {
  onGetStarted: () => void
}

export default function EnhancedLandingPage({ onGetStarted }: EnhancedLandingPageProps) {
  const { theme, setTheme, darkMode } = useTheme()
  const [isLoading, setIsLoading] = useState(false)
  const [userName, setUserName] = useState("")
  const [partnerName, setPartnerName] = useState("")
  const [activeExample, setActiveExample] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [showDemo, setShowDemo] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleGetStarted = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      onGetStarted()
    }, 2000)
  }

  const themes = [
    {
      id: "nature" as const,
      name: "Nature",
      icon: <Leaf className="w-4 h-4" />,
      gradient: "from-green-500 to-teal-600",
      description: "Earth friendly & calming",
    },
    {
      id: "programming" as const,
      name: "Programming",
      icon: <Code className="w-4 h-4" />,
      gradient: "from-green-500 to-emerald-600",
      description: "For developers",
    },
    {
      id: "love" as const,
      name: "Love",
      icon: <Heart className="w-4 h-4" />,
      gradient: "from-pink-500 to-rose-600",
      description: "Romantic vibes",
    },
    {
      id: "gaming" as const,
      name: "Gaming",
      icon: <Gamepad2 className="w-4 h-4" />,
      gradient: "from-blue-500 to-cyan-600",
      description: "Level up productivity",
    },
    {
      id: "default" as const,
      name: "Classic",
      icon: <Sparkles className="w-4 h-4" />,
      gradient: "from-violet-500 to-purple-600",
      description: "Clean and modern",
    },
  ]

  const getThemeConfig = () => {
    switch (theme) {
      case "programming":
        return {
          heroTitle: "Code Your Productivity",
          heroSubtitle: "// TODO: Organize your life like a pro developer",
          heroDescription:
            "Transform your task management with developer-inspired workflows. JSON-structured organization meets beautiful UI design.",
          bgPattern: "bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.1),transparent_70%)]",
          icon: <Code className="w-6 h-6" />,
        }
      case "love":
        return {
          heroTitle: `${userName && partnerName ? `${userName} ❤️ ${partnerName}'s` : "Love-Powered"} Productivity`,
          heroSubtitle: "Organize your life together, one task at a time",
          heroDescription:
            "Share your goals, dreams, and daily tasks with the one you love. Beautiful heart-themed interface for couples.",
          bgPattern: "bg-[radial-gradient(circle_at_30%_20%,rgba(236,72,153,0.2),transparent_50%)]",
          icon: <Heart className="w-6 h-6" />,
        }
      case "gaming":
        return {
          heroTitle: "Level Up Your Productivity",
          heroSubtitle: "Achievement unlocked: Perfect task management",
          heroDescription:
            "Gamify your productivity with XP points, achievements, and level progression. Turn boring tasks into epic quests.",
          bgPattern: "bg-[radial-gradient(circle_at_70%_30%,rgba(59,130,246,0.15),transparent_60%)]",
          icon: <Gamepad2 className="w-6 h-6" />,
        }
      case "nature":
        return {
          heroTitle: "Grow Your Productivity Naturally",
          heroSubtitle: "🌱 Cultivate habits that bloom into success",
          heroDescription:
            "Embrace sustainable productivity with nature-inspired design. Grow your tasks like a garden of achievements with organic workflows.",
          bgPattern: "bg-[radial-gradient(circle_at_70%_30%,rgba(34,197,94,0.15),transparent_60%)]",
          icon: <TreePine className="w-6 h-6" />,
        }
      default:
        return {
          heroTitle: "Productivity Reimagined",
          heroSubtitle: "The most beautiful way to organize your life",
          heroDescription:
            "Experience the perfect blend of stunning design and powerful functionality. TaskFlow transforms how you manage tasks.",
          bgPattern: "bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)]",
          icon: <Sparkles className="w-6 h-6" />,
        }
    }
  }

  const themeConfig = getThemeConfig()

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title:
        theme === "programming" ? "Lightning Fast APIs" : theme === "gaming" ? "Instant Actions" : "Lightning Fast",
      description:
        theme === "programming"
          ? "Optimized algorithms and efficient data structures for maximum performance"
          : theme === "gaming"
            ? "Zero-latency task creation with instant feedback and smooth animations"
            : "Create and manage tasks in seconds with our intuitive interface",
      gradient:
        theme === "programming"
          ? "from-green-400 to-emerald-500"
          : theme === "gaming"
            ? "from-blue-400 to-cyan-500"
            : "from-yellow-400 to-orange-500",
    },
    {
      icon: <Target className="w-6 h-6" />,
      title:
        theme === "love"
          ? "Shared Goals"
          : theme === "gaming"
            ? "Achievement System"
            : theme === "nature"
              ? "Growth Tracking"
              : "Smart Priorities",
      description:
        theme === "love"
          ? "Set and achieve goals together with your partner in perfect harmony"
          : theme === "gaming"
            ? "Unlock achievements, earn XP, and level up your productivity game"
            : theme === "nature"
              ? "Watch your productivity grow organically with natural progress tracking"
              : "AI-powered priority suggestions to keep you focused",
      gradient:
        theme === "love"
          ? "from-pink-400 to-rose-500"
          : theme === "gaming"
            ? "from-purple-400 to-violet-500"
            : theme === "nature"
              ? "from-green-400 to-teal-500"
              : "from-red-400 to-pink-500",
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: theme === "nature" ? "Seasonal Planning" : theme === "gaming" ? "Quest Scheduling" : "Due Date Magic",
      description:
        theme === "nature"
          ? "Plan your tasks with natural rhythms and seasonal cycles for optimal flow"
          : theme === "gaming"
            ? "Schedule your daily quests and weekly challenges with epic precision"
            : "Never miss a deadline with smart reminders",
      gradient:
        theme === "nature"
          ? "from-green-400 to-teal-500"
          : theme === "gaming"
            ? "from-indigo-400 to-blue-500"
            : "from-blue-400 to-cyan-500",
    },
    {
      icon: <Filter className="w-6 h-6" />,
      title: theme === "programming" ? "Advanced Queries" : "Smart Filtering",
      description:
        theme === "programming"
          ? "SQL-like queries and advanced search with regex support"
          : "Find any task instantly with powerful search and filter options",
      gradient: "from-purple-400 to-violet-500",
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Cross-Platform",
      description: "Perfect experience across all devices with native-like performance",
      gradient: "from-green-400 to-emerald-500",
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: "Beautiful Themes",
      description: "Multiple stunning themes that adapt to your personality and workflow",
      gradient: "from-pink-400 to-rose-500",
    },
  ]

  const stats = [
    { number: "50K+", label: "Active Users", icon: <Users className="w-5 h-5" /> },
    { number: "1M+", label: "Tasks Completed", icon: <CheckCircle2 className="w-5 h-5" /> },
    { number: "99.9%", label: "Uptime", icon: <TrendingUp className="w-5 h-5" /> },
    { number: "4.9★", label: "User Rating", icon: <Star className="w-5 h-5" /> },
  ]

  const faqs = [
    {
      question: "Is TaskFlow free to use?",
      answer:
        "Yes! TaskFlow is completely free with all features included. No hidden costs, no premium tiers - just pure productivity.",
    },
    {
      question: "Does it work offline?",
      answer:
        "TaskFlow stores all your data locally in your browser, so you can access and manage your tasks even without an internet connection.",
    },
    {
      question: "Can I sync across devices?",
      answer:
        "Currently, TaskFlow stores data locally. We're working on cloud sync features that will allow you to access your tasks across all your devices.",
    },
    {
      question: "How secure is my data?",
      answer:
        "Your data never leaves your device. Everything is stored locally in your browser's secure storage, ensuring complete privacy and security.",
    },
    {
      question: "Can I export my tasks?",
      answer:
        "Yes! You can export your tasks in various formats including JSON and CSV for backup or migration purposes.",
    },
  ]

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Product Manager, Bangalore",
      avatar: "/placeholder.svg?height=40&width=40",
      content:
        "TaskFlow has completely transformed how I manage my daily workflow. The nature theme keeps me calm and focused during hectic work days.",
      rating: 5,
    },
    {
      name: "Arjun Patel",
      role: "Software Developer, Mumbai",
      avatar: "/placeholder.svg?height=40&width=40",
      content:
        "As a developer, I love the programming theme. The code-inspired interface makes task management feel natural and intuitive.",
      rating: 5,
    },
    {
      name: "Kavya & Rohan",
      role: "Couple, Delhi",
      avatar: "/placeholder.svg?height=40&width=40",
      content:
        "The love theme is perfect for us! We can organize our shared goals and dreams together beautifully. Planning our wedding was so much easier!",
      rating: 5,
    },
  ]

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader theme={theme} size="lg" text="Loading TaskFlow..." />
      </div>
    )
  }

  if (isLoading) {
    return (
      <div
        className={cn(
          "min-h-screen flex items-center justify-center transition-colors duration-500",
          theme === "nature"
            ? "bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-950/20 dark:to-teal-950/20"
            : theme === "programming"
              ? "bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20"
              : theme === "love"
                ? "bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-950/20 dark:to-rose-950/20"
                : theme === "gaming"
                  ? "bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20"
                  : "bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/20 dark:to-purple-950/20",
        )}
      >
        <div className="text-center">
          <Loader theme={theme} size="lg" text="Preparing your workspace..." />
          <div className="mt-8 space-y-2">
            <p className="text-lg font-semibold text-slate-900 dark:text-white">Almost ready!</p>
            <p className="text-slate-600 dark:text-slate-400">Setting up your personalized experience</p>
          </div>
        </div>
      </div>
    )
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

  return (
    <div
      className={cn(
        "min-h-screen transition-all duration-500",
        darkMode ? "dark" : "",
        theme === "nature"
          ? "bg-gradient-to-br from-green-50/50 to-teal-50/50 dark:from-slate-950 dark:to-slate-900"
          : theme === "programming"
            ? "bg-gradient-to-br from-green-50/50 to-emerald-50/50 dark:from-slate-950 dark:to-slate-900"
            : theme === "love"
              ? "bg-gradient-to-br from-pink-50/50 to-rose-50/50 dark:from-slate-950 dark:to-slate-900"
              : theme === "gaming"
                ? "bg-gradient-to-br from-blue-50/50 to-cyan-50/50 dark:from-slate-950 dark:to-slate-900"
                : "bg-gradient-to-br from-violet-50/50 to-purple-50/50 dark:from-slate-950 dark:to-slate-900",
      )}
    >
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-slate-950/80 border-b border-slate-200/50 dark:border-slate-800/50 transition-colors duration-500">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 hover:rotate-3",
                  "bg-gradient-to-br",
                  getThemeGradient(),
                )}
              >
                {themeConfig.icon}
                <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 transition-opacity duration-300 hover:opacity-100" />
              </div>
              <div>
                <h1
                  className={cn(
                    "text-xl font-bold bg-gradient-to-r bg-clip-text text-transparent transition-all duration-300",
                    getThemeGradient().replace("from-", "from-").replace("to-", "to-"),
                  )}
                >
                  TaskFlow
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                  {theme === "programming"
                    ? "// Productivity Optimized"
                    : theme === "love"
                      ? "Made with ❤️"
                      : theme === "nature"
                        ? "🌱 Naturally Productive"
                        : theme === "gaming"
                          ? "🎮 Level Up Daily"
                          : "Productivity Reimagined"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <nav className="hidden md:flex items-center gap-6">
                {["Features", "Themes", "About", "FAQ"].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className={cn(
                      "text-slate-600 dark:text-slate-300 transition-all duration-300 hover:scale-105 active:scale-95",
                      "hover:text-transparent hover:bg-gradient-to-r hover:bg-clip-text",
                      `hover:${getThemeGradient()}`,
                    )}
                  >
                    {item}
                  </a>
                ))}
              </nav>
              <ThemeToggle />
              <Button
                onClick={handleGetStarted}
                className={cn(
                  "rounded-full shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95",
                  "bg-gradient-to-r text-white",
                  getThemeGradient(),
                )}
              >
                Get Started
                <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Dynamic Background */}
        <div className={cn("absolute inset-0", themeConfig.bgPattern)} />

        {/* Theme-specific decorative elements */}
        {theme === "nature" && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(15)].map((_, i) => (
              <Leaf
                key={i}
                className={cn(
                  "absolute text-green-300/20 animate-pulse",
                  i % 4 === 0 ? "w-8 h-8" : i % 3 === 0 ? "w-6 h-6" : "w-4 h-4",
                )}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${3 + Math.random() * 2}s`,
                }}
              />
            ))}
          </div>
        )}

        {theme === "love" && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <Heart
                key={i}
                className={cn(
                  "absolute text-pink-300/20 animate-pulse",
                  i % 4 === 0 ? "w-8 h-8" : i % 3 === 0 ? "w-6 h-6" : "w-4 h-4",
                )}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 2}s`,
                }}
              />
            ))}
          </div>
        )}

        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className="text-center max-w-5xl mx-auto">
            {/* Theme Badge */}
            <div
              className={cn(
                "inline-flex items-center gap-2 backdrop-blur-sm rounded-full px-4 py-2 mb-8 border transition-all duration-300 hover:scale-105",
                theme === "programming"
                  ? "bg-green-100/80 dark:bg-green-900/80 border-green-200 dark:border-green-800"
                  : theme === "love"
                    ? "bg-pink-100/80 dark:bg-pink-900/80 border-pink-200 dark:border-pink-800"
                    : theme === "nature"
                      ? "bg-green-100/80 dark:bg-green-900/80 border-green-200 dark:border-green-800"
                      : theme === "gaming"
                        ? "bg-blue-100/80 dark:bg-blue-900/80 border-blue-200 dark:border-blue-800"
                        : "bg-white/80 dark:bg-slate-900/80 border-violet-200 dark:border-violet-800",
              )}
            >
              {themes.find((t) => t.id === theme)?.icon}
              <span
                className={cn(
                  "text-sm font-medium",
                  theme === "programming"
                    ? "text-green-600 dark:text-green-400"
                    : theme === "love"
                      ? "text-pink-600 dark:text-pink-400"
                      : theme === "nature"
                        ? "text-green-600 dark:text-green-400"
                        : theme === "gaming"
                          ? "text-blue-600 dark:text-blue-400"
                          : "text-violet-600 dark:text-violet-400",
                )}
              >
                {themes.find((t) => t.id === theme)?.name} Theme Active
              </span>
            </div>

            {/* Love Theme Name Inputs */}
            {theme === "love" && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 max-w-md mx-auto">
                <div className="flex-1">
                  <Input
                    placeholder="Your name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="rounded-full border-pink-200 focus:border-pink-400 text-center transition-all duration-300"
                  />
                </div>
                <Heart className="w-6 h-6 text-pink-500 flex-shrink-0 animate-pulse" />
                <div className="flex-1">
                  <Input
                    placeholder="Partner's name"
                    value={partnerName}
                    onChange={(e) => setPartnerName(e.target.value)}
                    className="rounded-full border-pink-200 focus:border-pink-400 text-center transition-all duration-300"
                  />
                </div>
              </div>
            )}

            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              <span
                className={cn(
                  "bg-gradient-to-r bg-clip-text text-transparent transition-all duration-500",
                  theme === "programming"
                    ? "from-green-600 via-emerald-600 to-teal-600"
                    : theme === "love"
                      ? "from-pink-600 via-rose-600 to-red-600"
                      : theme === "nature"
                        ? "from-green-600 via-teal-600 to-cyan-600"
                        : theme === "gaming"
                          ? "from-blue-600 via-cyan-600 to-indigo-600"
                          : "from-slate-900 via-violet-800 to-purple-800 dark:from-white dark:via-violet-200 dark:to-purple-200",
                )}
              >
                {themeConfig.heroTitle}
              </span>
            </h1>

            <p
              className={cn(
                "text-xl lg:text-2xl mb-6 max-w-3xl mx-auto leading-relaxed transition-colors duration-300",
                theme === "programming"
                  ? "text-green-700 dark:text-green-300 font-mono"
                  : theme === "love"
                    ? "text-pink-700 dark:text-pink-300"
                    : theme === "nature"
                      ? "text-green-700 dark:text-green-300"
                      : theme === "gaming"
                        ? "text-blue-700 dark:text-blue-300"
                        : "text-slate-600 dark:text-slate-300",
              )}
            >
              {themeConfig.heroSubtitle}
            </p>

            <p className="text-lg text-slate-600 dark:text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed">
              {themeConfig.heroDescription}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Button
                onClick={handleGetStarted}
                size="lg"
                className={cn(
                  "rounded-full shadow-xl text-lg px-8 py-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl active:scale-95",
                  "bg-gradient-to-r text-white",
                  getThemeGradient(),
                )}
              >
                <Play className="w-5 h-5 mr-2" />
                {theme === "programming"
                  ? "Initialize App"
                  : theme === "love"
                    ? "Start Together"
                    : theme === "nature"
                      ? "Plant Your Seeds"
                      : theme === "gaming"
                        ? "Start Quest"
                        : "Start Organizing Now"}
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => setShowDemo(true)}
                className={cn(
                  "rounded-full border-2 text-lg px-8 py-6 transition-all duration-300 hover:scale-105 active:scale-95",
                  "hover:bg-gradient-to-r hover:text-white hover:border-transparent",
                  `hover:${getThemeGradient()}`,
                )}
              >
                <BarChart3 className="w-5 h-5 mr-2" />
                View Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-3xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="flex items-center justify-center mb-2">
                    <div
                      className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center text-white mr-2 transition-all duration-300",
                        "bg-gradient-to-r group-hover:scale-110",
                        getThemeGradient(),
                      )}
                    >
                      {stat.icon}
                    </div>
                  </div>
                  <div className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white transition-transform duration-300 group-hover:scale-105">
                    {stat.number}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400 font-mono">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Theme Selector Section */}
      <section
        id="themes"
        className="py-20 lg:py-32 bg-slate-50/50 dark:bg-slate-900/50 transition-colors duration-500"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
              Choose Your Style
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Express your personality with beautiful themes designed for different moods and workflows.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {themes.map((themeOption) => (
              <Card
                key={themeOption.id}
                className={cn(
                  "group cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-2xl active:scale-95",
                  theme === themeOption.id
                    ? "ring-2 ring-offset-2 ring-offset-background scale-105 shadow-xl"
                    : "hover:shadow-lg",
                  theme === themeOption.id && "ring-green-500",
                )}
                onClick={() => setTheme(themeOption.id)}
              >
                <CardContent className="p-6 text-center">
                  <div
                    className={cn(
                      "w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center text-white transition-all duration-500",
                      "bg-gradient-to-r group-hover:scale-110 group-hover:rotate-3",
                      themeOption.gradient,
                    )}
                  >
                    {themeOption.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{themeOption.name}</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">{themeOption.description}</p>
                  {theme === themeOption.id && (
                    <Badge className="mt-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white animate-pulse">
                      Active
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
              Powerful Features
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Everything you need to stay organized, focused, and productive in one beautiful package.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className={cn(
                  "group rounded-3xl border-0 shadow-lg transition-all duration-500 hover:scale-105 hover:shadow-2xl active:scale-95",
                  "bg-white dark:bg-slate-900 hover:bg-gradient-to-br hover:from-white hover:to-slate-50",
                  "dark:hover:from-slate-800 dark:hover:to-slate-900",
                )}
              >
                <CardContent className="p-8">
                  <div
                    className={cn(
                      "w-12 h-12 rounded-2xl flex items-center justify-center text-white mb-6 transition-all duration-500",
                      "bg-gradient-to-r group-hover:scale-110 group-hover:rotate-3",
                      feature.gradient,
                    )}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Website Components */}
      <FeaturesGrid />
      <Testimonials testimonials={testimonials} />
      <Newsletter />

      {/* FAQ Section */}
      <section id="faq" className="py-20 lg:py-32 bg-slate-50/50 dark:bg-slate-900/50 transition-colors duration-500">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Everything you need to know about TaskFlow. Can't find what you're looking for? Contact us!
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className={cn(
                    "border rounded-2xl px-6 transition-all duration-300 hover:shadow-lg",
                    "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800",
                  )}
                >
                  <AccordionTrigger className="text-left font-semibold text-slate-900 dark:text-white hover:no-underline transition-colors duration-300">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className={cn("py-20 lg:py-32 text-white transition-all duration-500", "bg-gradient-to-r", getThemeGradient())}
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            {theme === "programming"
              ? "Ready to Deploy Your Productivity?"
              : theme === "love"
                ? "Ready to Organize Together?"
                : theme === "nature"
                  ? "Ready to Grow Your Potential?"
                  : theme === "gaming"
                    ? "Ready to Level Up?"
                    : "Ready to Transform Your Productivity?"}
          </h2>
          <p className="text-xl lg:text-2xl mb-12 opacity-90 max-w-2xl mx-auto">
            {theme === "programming"
              ? "Join thousands of developers who have optimized their workflow with TaskFlow."
              : theme === "love"
                ? "Start your journey of shared productivity and achieve your dreams together."
                : theme === "nature"
                  ? "Cultivate sustainable habits and watch your productivity bloom naturally."
                  : theme === "gaming"
                    ? "Join the productivity game and unlock your full potential with epic task management."
                    : "Join thousands of users who have already discovered the joy of organized living."}
          </p>
          <Button
            onClick={handleGetStarted}
            size="lg"
            className={cn(
              "rounded-full bg-white text-slate-900 hover:bg-slate-100 shadow-xl text-lg px-8 py-6",
              "transition-all duration-300 hover:scale-105 hover:shadow-2xl active:scale-95",
            )}
          >
            {themes.find((t) => t.id === theme)?.icon}
            <span className="ml-2">Get Started for Free</span>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 dark:bg-slate-950 text-white py-16 transition-colors duration-500">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div
                  className={cn(
                    "w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-110",
                    "bg-gradient-to-br",
                    getThemeGradient(),
                  )}
                >
                  {themeConfig.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold">TaskFlow</h3>
                  <p className="text-sm text-slate-400 font-mono">
                    {theme === "programming"
                      ? "// Productivity Optimized"
                      : theme === "love"
                        ? "Made with ❤️"
                        : theme === "nature"
                          ? "🌱 Naturally Productive"
                          : theme === "gaming"
                            ? "🎮 Level Up Daily"
                            : "Productivity Reimagined"}
                  </p>
                </div>
              </div>
              <p className="text-slate-400 leading-relaxed mb-6 max-w-md">
                {theme === "programming"
                  ? "Built by developers, for developers. Clean code meets beautiful design in the ultimate productivity tool."
                  : theme === "love"
                    ? "Bringing couples together through shared goals and beautiful task management designed for two hearts."
                    : theme === "nature"
                      ? "Sustainable productivity inspired by nature's wisdom. Grow your potential organically with mindful task management."
                      : theme === "gaming"
                        ? "Gamified productivity that turns your daily tasks into epic quests. Level up your life, one achievement at a time."
                        : "The most beautiful and intuitive todo app that transforms how you organize your life."}
              </p>
              <div className="flex items-center gap-4">
                {[Github, Twitter, Mail].map((Icon, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="icon"
                    className={cn(
                      "rounded-full transition-all duration-300 hover:scale-110 active:scale-95",
                      "hover:bg-slate-800 hover:shadow-lg",
                    )}
                  >
                    <Icon className="w-5 h-5" />
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-slate-400">
                {["Features", "Themes", "Pricing", "Changelog"].map((item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase()}`}
                      className="hover:text-white transition-all duration-300 hover:translate-x-1"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-slate-400">
                {["Documentation", "Contact", "Privacy", "Terms"].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-white transition-all duration-300 hover:translate-x-1">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-400">
            <p>
              &copy; 2024 TaskFlow.{" "}
              {theme === "programming"
                ? "Coded with ☕ for productivity enthusiasts worldwide."
                : theme === "love"
                  ? "Made with ❤️ for couples who dream together."
                  : theme === "nature"
                    ? "Grown with 🌱 for sustainable productivity."
                    : theme === "gaming"
                      ? "Crafted with 🎮 for productivity gamers."
                      : "Made with ❤️ for productivity enthusiasts worldwide."}
            </p>
          </div>
        </div>
      </footer>
      {/* Demo Examples Dialog */}
      <DemoExamples isOpen={showDemo} onClose={() => setShowDemo(false)} />
    </div>
  )
}
