"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Quote, ArrowRight, CheckCircle, Users, Award, Zap } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTheme } from "../theme-provider"

// Testimonials Component
export function Testimonials() {
  const { theme } = useTheme()

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

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Product Manager",
      avatar: "/placeholder.svg?height=40&width=40",
      content:
        "TaskFlow has completely transformed how I manage my daily workflow. The nature theme keeps me calm and focused.",
      rating: 5,
    },
    {
      name: "Marcus Rodriguez",
      role: "Software Developer",
      avatar: "/placeholder.svg?height=40&width=40",
      content:
        "As a developer, I love the programming theme. The code-inspired interface makes task management feel natural.",
      rating: 5,
    },
    {
      name: "Emily & James",
      role: "Couple",
      avatar: "/placeholder.svg?height=40&width=40",
      content: "The love theme is perfect for us! We can organize our shared goals and dreams together beautifully.",
      rating: 5,
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
            What Our Users Say
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Join thousands of satisfied users who have transformed their productivity with TaskFlow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className={cn(
                "group relative overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl",
                "bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0",
                "before:absolute before:inset-0 before:bg-gradient-to-br before:opacity-0 before:transition-opacity before:duration-500",
                "hover:before:opacity-10",
                `before:${getThemeGradient()}`,
              )}
            >
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-slate-300 dark:text-slate-600 mb-4" />
                <p className="text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">"{testimonial.content}"</p>
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={testimonial.avatar || "/placeholder.svg"} />
                    <AvatarFallback className={cn("bg-gradient-to-r text-white", getThemeGradient())}>
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">{testimonial.name}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

// Features Grid Component
export function FeaturesGrid() {
  const { theme } = useTheme()

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

  const features = [
    {
      icon: <CheckCircle />,
      title: "Smart Task Management",
      description: "Intelligent prioritization and automated scheduling",
    },
    {
      icon: <Users />,
      title: "Team Collaboration",
      description: "Share tasks and collaborate with your team seamlessly",
    },
    {
      icon: <Award />,
      title: "Achievement System",
      description: "Gamified productivity with rewards and streaks",
    },
    {
      icon: <Zap />,
      title: "Lightning Fast",
      description: "Optimized performance for instant task creation",
    },
  ]

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={cn(
                "group relative p-6 rounded-3xl transition-all duration-500",
                "bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900",
                "border border-slate-200 dark:border-slate-700",
                "hover:scale-105 hover:shadow-2xl hover:border-transparent",
                "hover:bg-gradient-to-br hover:from-white hover:to-slate-100",
                "dark:hover:from-slate-700 dark:hover:to-slate-800",
              )}
            >
              <div
                className={cn(
                  "w-12 h-12 rounded-2xl mb-4 flex items-center justify-center",
                  "bg-gradient-to-r text-white transition-transform duration-500",
                  "group-hover:scale-110 group-hover:rotate-3",
                  getThemeGradient(),
                )}
              >
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{feature.title}</h3>
              <p className="text-slate-600 dark:text-slate-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Newsletter Component
export function Newsletter() {
  const { theme } = useTheme()

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
    <section
      className={cn(
        "py-20 relative overflow-hidden",
        "bg-gradient-to-br",
        theme === "nature"
          ? "from-green-50 to-teal-50 dark:from-green-950/20 dark:to-teal-950/20"
          : theme === "programming"
            ? "from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20"
            : theme === "love"
              ? "from-pink-50 to-rose-50 dark:from-pink-950/20 dark:to-rose-950/20"
              : "from-violet-50 to-purple-50 dark:from-violet-950/20 dark:to-purple-950/20",
      )}
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-slate-900 dark:text-white">
            Stay Updated with TaskFlow
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">
            Get the latest productivity tips, feature updates, and exclusive content delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className={cn(
                "flex-1 px-6 py-4 rounded-2xl border-2 transition-all duration-300",
                "bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm",
                "border-slate-200 dark:border-slate-700",
                "focus:border-transparent focus:ring-4 focus:ring-opacity-20",
                `focus:ring-${theme === "nature" ? "green" : theme === "programming" ? "emerald" : theme === "love" ? "pink" : "violet"}-500`,
                "placeholder:text-slate-500 dark:placeholder:text-slate-400",
              )}
            />
            <Button
              className={cn(
                "px-8 py-4 rounded-2xl font-semibold transition-all duration-300",
                "bg-gradient-to-r text-white shadow-lg",
                "hover:scale-105 hover:shadow-xl active:scale-95",
                getThemeGradient(),
              )}
            >
              Subscribe
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
