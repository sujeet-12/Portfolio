"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Star,
  Zap,
  Target,
  Calendar,
  Filter,
  Moon,
  Sun,
  Github,
  Twitter,
  Mail,
  Play,
  Users,
  TrendingUp,
  Shield,
  Smartphone,
  Palette,
  Clock,
  BarChart3,
  Heart,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface LandingPageProps {
  onGetStarted: () => void
  darkMode: boolean
  setDarkMode: (dark: boolean) => void
}

export default function LandingPage({ onGetStarted, darkMode, setDarkMode }: LandingPageProps) {
  const [activeExample, setActiveExample] = useState(0)

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Lightning Fast",
      description: "Create and manage tasks in seconds with our intuitive interface",
      gradient: "from-yellow-400 to-orange-500",
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Smart Priorities",
      description: "AI-powered priority suggestions to keep you focused on what matters",
      gradient: "from-red-400 to-pink-500",
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Due Date Magic",
      description: "Never miss a deadline with smart reminders and calendar integration",
      gradient: "from-blue-400 to-cyan-500",
    },
    {
      icon: <Filter className="w-6 h-6" />,
      title: "Advanced Filtering",
      description: "Find any task instantly with powerful search and filter options",
      gradient: "from-purple-400 to-violet-500",
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Mobile Ready",
      description: "Perfect experience across all devices - desktop, tablet, and mobile",
      gradient: "from-green-400 to-emerald-500",
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: "Beautiful Design",
      description: "Stunning gradients and modern UI that makes productivity enjoyable",
      gradient: "from-pink-400 to-rose-500",
    },
  ]

  const examples = [
    {
      title: "Personal Life Management",
      description: "Organize your daily routines, hobbies, and personal goals",
      tasks: [
        { title: "Morning workout routine", category: "health", priority: "high", completed: true },
        { title: "Read 20 pages of 'Atomic Habits'", category: "personal", priority: "medium", completed: false },
        { title: "Call mom for her birthday", category: "personal", priority: "urgent", completed: false },
      ],
    },
    {
      title: "Work & Career Focus",
      description: "Stay on top of deadlines, meetings, and professional development",
      tasks: [
        { title: "Prepare Q4 presentation slides", category: "work", priority: "high", completed: false },
        { title: "Review team performance reports", category: "work", priority: "medium", completed: true },
        { title: "Schedule 1:1 with direct reports", category: "work", priority: "medium", completed: false },
      ],
    },
    {
      title: "Creative Projects",
      description: "Track your creative endeavors and artistic pursuits",
      tasks: [
        { title: "Finish digital art commission", category: "other", priority: "high", completed: false },
        { title: "Edit podcast episode #47", category: "other", priority: "medium", completed: true },
        { title: "Write blog post about productivity", category: "other", priority: "low", completed: false },
      ],
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
    {
      question: "Is there a mobile app?",
      answer:
        "TaskFlow is a progressive web app (PWA) that works perfectly on mobile browsers. You can add it to your home screen for an app-like experience.",
    },
  ]

  const priorityColors = {
    low: "from-emerald-400 to-emerald-600",
    medium: "from-amber-400 to-amber-600",
    high: "from-orange-400 to-orange-600",
    urgent: "from-red-400 to-red-600",
  }

  const categoryEmojis = {
    personal: "🏠",
    work: "💼",
    health: "🏥",
    other: "📝",
  }

  return (
    <div className={cn("min-h-screen transition-all duration-500", darkMode ? "dark bg-gray-950" : "bg-white")}>
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-gray-950/80 border-b border-gray-200/50 dark:border-gray-800/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                  TaskFlow
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-mono">Productivity Reimagined</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <nav className="hidden md:flex items-center gap-6">
                <a
                  href="#features"
                  className="text-gray-600 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                >
                  Features
                </a>
                <a
                  href="#examples"
                  className="text-gray-600 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                >
                  Examples
                </a>
                <a
                  href="#about"
                  className="text-gray-600 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                >
                  About
                </a>
                <a
                  href="#faq"
                  className="text-gray-600 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                >
                  FAQ
                </a>
              </nav>
              <Button variant="ghost" size="icon" onClick={() => setDarkMode(!darkMode)} className="rounded-full">
                {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
              <Button
                onClick={onGetStarted}
                className="rounded-full bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 shadow-lg"
              >
                Get Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50 dark:from-violet-950/20 dark:via-purple-950/20 dark:to-pink-950/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.1),transparent_50%)]" />

        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-full px-4 py-2 mb-8 border border-violet-200 dark:border-violet-800">
              <Sparkles className="w-4 h-4 text-violet-600" />
              <span className="text-sm font-medium text-violet-600 dark:text-violet-400">Introducing TaskFlow 2.0</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-violet-800 to-purple-800 dark:from-white dark:via-violet-200 dark:to-purple-200 bg-clip-text text-transparent leading-tight">
              Productivity
              <br />
              <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                Reimagined
              </span>
            </h1>

            <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              The most beautiful and intuitive todo app that transforms how you organize your life. Built with modern
              design principles and powered by cutting-edge technology.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Button
                onClick={onGetStarted}
                size="lg"
                className="rounded-full bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 shadow-xl text-lg px-8 py-6"
              >
                <Play className="w-5 h-5 mr-2" />
                Start Organizing Now
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="rounded-full border-2 border-violet-200 dark:border-violet-800 text-lg px-8 py-6"
              >
                <BarChart3 className="w-5 h-5 mr-2" />
                View Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-3xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-violet-500 to-purple-600 flex items-center justify-center text-white mr-2">
                      {stat.icon}
                    </div>
                  </div>
                  <div className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">{stat.number}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 font-mono">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 lg:py-32 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Everything you need to stay organized, focused, and productive in one beautiful package.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group rounded-3xl border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white dark:bg-gray-900"
              >
                <CardContent className="p-8">
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Examples Section */}
      <section id="examples" className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Real-World Examples
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              See how TaskFlow adapts to different aspects of your life with these practical examples.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {examples.map((example, index) => (
                <Button
                  key={index}
                  variant={activeExample === index ? "default" : "outline"}
                  onClick={() => setActiveExample(index)}
                  className={cn(
                    "rounded-full",
                    activeExample === index
                      ? "bg-gradient-to-r from-violet-500 to-purple-600 text-white"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800",
                  )}
                >
                  {example.title}
                </Button>
              ))}
            </div>

            <Card className="rounded-3xl border-0 shadow-xl bg-white dark:bg-gray-900">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {examples[activeExample].title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">{examples[activeExample].description}</p>
                </div>

                <div className="space-y-4">
                  {examples[activeExample].tasks.map((task, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-gray-800 transition-all hover:shadow-md"
                    >
                      <div className="flex-shrink-0">
                        {task.completed ? (
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                        ) : (
                          <div className="w-5 h-5 rounded-full border-2 border-gray-300 dark:border-gray-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4
                          className={cn(
                            "font-medium text-gray-900 dark:text-white",
                            task.completed && "line-through text-gray-500",
                          )}
                        >
                          {task.title}
                        </h4>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          className={cn(
                            "rounded-full bg-gradient-to-r text-white border-0",
                            priorityColors[task.priority as keyof typeof priorityColors],
                          )}
                        >
                          {task.priority}
                        </Badge>
                        <Badge variant="outline" className="rounded-full">
                          {categoryEmojis[task.category as keyof typeof categoryEmojis]} {task.category}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="py-20 lg:py-32 bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/20 dark:to-purple-950/20"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl lg:text-5xl font-bold mb-8 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              About TaskFlow
            </h2>
            <div className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 leading-relaxed space-y-6">
              <p>
                TaskFlow was born from a simple belief: productivity tools should be beautiful, intuitive, and joyful to
                use. We've reimagined the traditional todo app with modern design principles, cutting-edge technology,
                and a deep understanding of how people actually work.
              </p>
              <p>
                Built with React, TypeScript, and Tailwind CSS, TaskFlow combines the power of modern web technologies
                with thoughtful UX design. Every gradient, every animation, every interaction has been carefully crafted
                to make your daily planning not just efficient, but delightful.
              </p>
              <p>
                Whether you're managing personal goals, professional projects, or creative endeavors, TaskFlow adapts to
                your workflow while maintaining the beautiful, consistent experience you deserve.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-violet-500 to-purple-600 flex items-center justify-center text-white mx-auto mb-4">
                  <Heart className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Made with Love</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Every pixel crafted with care and attention to detail
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-600 flex items-center justify-center text-white mx-auto mb-4">
                  <Shield className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Privacy First</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Your data stays on your device, always secure and private
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center text-white mx-auto mb-4">
                  <Clock className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Always Improving</h3>
                <p className="text-gray-600 dark:text-gray-400">Regular updates with new features and improvements</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Everything you need to know about TaskFlow. Can't find what you're looking for? Contact us!
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border border-gray-200 dark:border-gray-800 rounded-2xl px-6"
                >
                  <AccordionTrigger className="text-left font-semibold text-gray-900 dark:text-white hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-r from-violet-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">Ready to Transform Your Productivity?</h2>
          <p className="text-xl lg:text-2xl mb-12 opacity-90 max-w-2xl mx-auto">
            Join thousands of users who have already discovered the joy of organized living with TaskFlow.
          </p>
          <Button
            onClick={onGetStarted}
            size="lg"
            className="rounded-full bg-white text-violet-600 hover:bg-gray-100 shadow-xl text-lg px-8 py-6"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Get Started for Free
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-gray-950 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">TaskFlow</h3>
                  <p className="text-sm text-gray-400 font-mono">Productivity Reimagined</p>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed mb-6 max-w-md">
                The most beautiful and intuitive todo app that transforms how you organize your life. Built with modern
                design principles and powered by cutting-edge technology.
              </p>
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-800">
                  <Github className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-800">
                  <Twitter className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-800">
                  <Mail className="w-5 h-5" />
                </Button>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#features" className="hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#examples" className="hover:text-white transition-colors">
                    Examples
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Changelog
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#faq" className="hover:text-white transition-colors">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 TaskFlow. Made with ❤️ for productivity enthusiasts worldwide.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
