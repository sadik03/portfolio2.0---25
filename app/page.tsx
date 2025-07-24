"use client"

import Link from "next/link"
import React, { useState, useEffect } from "react"
import { ArrowRight, Github, Linkedin, Mail, Download, Code2, Palette, Database, ArrowUp, Play, Pause, Volume2, VolumeX, Menu, X, Home, User, Briefcase, MessageCircle, Award } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ProjectCard } from "@/components/project-card"
import { SkillBadge } from "@/components/skill-badge"
import { Timeline } from "@/components/timeline"
import { ContactForm } from "@/components/contact-form"
import { CreativeHero } from "@/components/creative-hero"
import { MouseFollower } from "@/components/mouse-follower"
import { ScrollProgress } from "@/components/scroll-progress"
import { SectionHeading } from "@/components/section-heading"
import { GlassmorphicCard } from "@/components/glassmorphic-card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Enhanced FloatingNav Component
function FloatingNav() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('#home') // Fixed: Default to #home
  const [scrolled, setScrolled] = useState(false)

  const navItems = [
    { href: '#home', label: 'Home', icon: Home },
    { href: '#about', label: 'About', icon: User },
    { href: '#services', label: 'Services', icon: Briefcase },
    { href: '#skills', label: 'Skills', icon: Code2 },
    { href: '#projects', label: 'Projects', icon: Award },
    { href: '#contact', label: 'Contact', icon: MessageCircle },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      
      // Fixed: Better section detection logic
      const sections = [
        { id: 'hero', href: '#home' },
        { id: 'services', href: '#services' },
        { id: 'about', href: '#about' },
        { id: 'skills', href: '#skills' },
        { id: 'projects', href: '#projects' },
        { id: 'testimonials', href: '#testimonials' },
        { id: 'experience', href: '#experience' },
        { id: 'contact', href: '#contact' }
      ]
      
      let currentSection = '#home' // Default to home
      
      for (const section of sections) {
        const element = document.getElementById(section.id)
        if (element) {
          const rect = element.getBoundingClientRect()
          // Check if section is in viewport (with some offset for better UX)
          if (rect.top <= 200 && rect.bottom >= 200) {
            currentSection = section.href
            break
          }
        }
      }
      
      setActiveSection(currentSection)
    }

    // Set initial state
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    setIsOpen(false)
    // Fixed: Better navigation logic
    let targetId = ''
    
    switch(href) {
      case '#home':
        targetId = 'hero'
        break
      case '#services':
        targetId = 'services'
        break
      case '#about':
        targetId = 'about'
        break
      case '#skills':
        targetId = 'skills'
        break
      case '#projects':
        targetId = 'projects'
        break
      case '#contact':
        targetId = 'contact'
        break
      default:
        targetId = 'hero'
    }
    
    const element = document.getElementById(targetId)
    if (element) {
      // Fixed: Better scroll behavior with offset for mobile header
      const isMobile = window.innerWidth < 768
      const offset = isMobile ? 80 : 100
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
      
      // Update active section immediately for better UX
      setActiveSection(href)
    }
  }

  const downloadResume = () => {
    const link = document.createElement('a')
    link.href = '/resume.pdf'
    link.download = 'Md_Sadik_Resume.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    setIsOpen(false)
  }

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex fixed top-6 left-1/2 -translate-x-1/2 z-50">
        <div className={`flex items-center gap-2 px-4 py-3 rounded-full backdrop-blur-md border transition-all duration-300 ${
          scrolled 
            ? 'bg-slate-900/90 border-slate-700/50 shadow-lg shadow-slate-900/20' 
            : 'bg-slate-800/80 border-slate-700/30'
        }`}>
          {navItems.map((item) => (
            <Button
              key={item.href}
              variant="ghost"
              size="sm"
              onClick={() => handleNavClick(item.href)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                activeSection === item.href
                  ? 'bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
              }`}
            >
              <item.icon className="h-4 w-4 mr-2" />
              {item.label}
            </Button>
          ))}
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        {/* Mobile Header */}
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-slate-900/95 backdrop-blur-md border-b border-slate-800/50 shadow-xl' 
            : 'bg-slate-900/80 backdrop-blur-sm'
        }`}>
          <div className="flex items-center justify-between px-4 py-4">
            {/* Logo */}
            <Link 
              href="#home"
              className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500"
              onClick={() => handleNavClick('#home')}
            >
              Sadik
            </Link>

            {/* Current Section Indicator */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/50 border border-slate-700/50">
              {(() => {
                const activeItem = navItems.find(item => item.href === activeSection) || navItems[0] // Fallback to first item
                const IconComponent = activeItem.icon
                return (
                  <>
                    <IconComponent className="h-4 w-4 text-cyan-400" />
                    <span className="text-sm text-slate-300 font-medium">
                      {activeItem.label}
                    </span>
                  </>
                )
              })()}
            </div>

            {/* Menu Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="rounded-full w-10 h-10 p-0 bg-slate-800/50 border border-slate-700/50 hover:bg-slate-700/50 hover:border-slate-600/50 text-slate-400 hover:text-white transition-all duration-200"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </header>

        {/* Mobile Menu Overlay */}
        <div className={`fixed inset-0 z-40 transition-all duration-300 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}>
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu Content */}
          <div className={`absolute top-20 left-4 right-4 bg-slate-800/95 backdrop-blur-md rounded-2xl border border-slate-700/50 shadow-2xl transition-all duration-300 ${
            isOpen ? 'translate-y-0 scale-100' : '-translate-y-4 scale-95'
          }`}>
            <div className="p-6">
              <div className="grid grid-cols-1 gap-2">
                {navItems.map((item, index) => (
                  <Button
                    key={item.href}
                    variant="ghost"
                    onClick={() => handleNavClick(item.href)}
                    className={`w-full justify-start p-4 rounded-xl text-left transition-all duration-200 ${
                      activeSection === item.href
                        ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border border-cyan-500/30'
                        : 'text-slate-300 hover:text-white hover:bg-slate-700/50 border border-transparent hover:border-slate-600/50'
                    }`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <item.icon className={`h-5 w-5 mr-3 ${
                      activeSection === item.href ? 'text-cyan-400' : 'text-slate-400'
                    }`} />
                    <span className="font-medium">{item.label}</span>
                    {activeSection === item.href && (
                      <div className="ml-auto w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                    )}
                  </Button>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="px-6 pb-6">
              <div className="border-t border-slate-700/50 pt-4">
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={downloadResume}
                    className="border-slate-600/50 bg-slate-700/30 text-slate-300 hover:bg-slate-600/30 hover:border-slate-500/50 hover:text-white"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download CV
                  </Button>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 border-0"
                    onClick={() => handleNavClick('#contact')}
                  >
                    Let's Talk
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 z-30 md:hidden">
          <div className="bg-slate-900/95 backdrop-blur-md border-t border-slate-800/50 px-2 py-2">
            <div className="flex justify-around items-center">
              {navItems.slice(0, 5).map((item) => (
                <Button
                  key={item.href}
                  variant="ghost"
                  size="sm"
                  onClick={() => handleNavClick(item.href)}
                  className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all duration-200 min-w-0 ${
                    activeSection === item.href
                      ? 'text-cyan-400 bg-cyan-500/10'
                      : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span className="text-xs font-medium truncate">{item.label}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default function Portfolio() {
  const [musicPlaying, setMusicPlaying] = useState(false)
  const [musicMuted, setMusicMuted] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [visitCount, setVisitCount] = useState(0)
  const [typedText, setTypedText] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  
  const roles = ["Full Stack Developer", "UI/UX Enthusiast", "Problem Solver", "Creative Thinker"]
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0)

  // Typing animation effect
  useEffect(() => {
    const currentRole = roles[currentRoleIndex]
    let timeout: NodeJS.Timeout

    if (isTyping) {
      if (typedText.length < currentRole.length) {
        timeout = setTimeout(() => {
          setTypedText(currentRole.slice(0, typedText.length + 1))
        }, 100)
      } else {
        timeout = setTimeout(() => {
          setIsTyping(false)
        }, 2000)
      }
    } else {
      if (typedText.length > 0) {
        timeout = setTimeout(() => {
          setTypedText(typedText.slice(0, -1))
        }, 50)
      } else {
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length)
        setIsTyping(true)
      }
    }

    return () => clearTimeout(timeout)
  }, [typedText, isTyping, currentRoleIndex, roles])

  // Time and visitor count
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    const count = localStorage.getItem('visitCount')
    const newCount = count ? parseInt(count) + 1 : 1
    setVisitCount(newCount)
    localStorage.setItem('visitCount', newCount.toString())
    
    return () => clearInterval(timer)
  }, [])

  // Scroll to top visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const downloadResume = () => {
    const link = document.createElement('a')
    link.href = '/resume.pdf'
    link.download = 'Md_Sadik_Resume.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const stats = [
    { label: "Years Experience", value: "1+" },
    { label: "Projects Completed", value: "12+" },
    // { label: "Happy Clients", value: "25+" },
    { label: "Code Commits", value: "2000+" }
  ]

  const services = [
    {
      icon: Code2,
      title: "Frontend Development",
      description: "Creating responsive, interactive web applications using React, Next.js, and modern CSS frameworks.",
      skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
      gradient: "from-cyan-500/10 via-blue-500/10 to-indigo-500/10",
      iconColor: "text-cyan-400",
      borderColor: "hover:border-cyan-500/30"
    },
    {
      icon: Database,
      title: "Backend Development", 
      description: "Building scalable server-side applications and APIs with Node.js, databases, and cloud services.",
      skills: ["Node.js", "PostgreSQL", "MongoDB", "AWS"],
      gradient: "from-emerald-500/10 via-teal-500/10 to-green-500/10",
      iconColor: "text-emerald-400",
      borderColor: "hover:border-emerald-500/30"
    },
    {
      icon: Palette,
      title: "App Development ",
      description: "Designing intuitive user interfaces and experiences that delight users and drive engagement.",
      skills: ["Flutter", "React-Native", "Android Studio"],
      gradient: "from-purple-500/10 via-violet-500/10 to-fuchsia-500/10",
      iconColor: "text-purple-400",
      borderColor: "hover:border-purple-500/30"
    }
  ]

  // const testimonials = [
  //   {
  //     name: "Sarah Johnson",
  //     role: "Product Manager at TechCorp",
  //     content: "Sadik delivered exceptional work on our e-commerce platform. His attention to detail and technical expertise made the project a huge success.",
  //     rating: 5
  //   },
  //   {
  //     name: "Mike Chen", 
  //     role: "CTO at StartupXYZ",
  //     content: "Working with Sadik was fantastic. He brought fresh ideas and implemented them flawlessly. Highly recommended!",
  //     rating: 5
  //   },
  //   {
  //     name: "Emily Davis",
  //     role: "Design Lead at CreativeStudio", 
  //     content: "Sadik's ability to translate design concepts into pixel-perfect code is remarkable. A true professional.",
  //     rating: 5
  //   }
  // ]
const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-zinc-900 text-white overflow-hidden">
      
      {!isMobile && <MouseFollower />}
      <ScrollProgress />
      <FloatingNav />

      {/* Control Panel */}
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setMusicPlaying(!musicPlaying)}
          className="rounded-full backdrop-blur-sm border-slate-700/50 bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 hover:text-white shadow-lg"
        >
          {musicPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setMusicMuted(!musicMuted)}
          className="rounded-full backdrop-blur-sm border-slate-700/50 bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 hover:text-white shadow-lg"
        >
          {musicMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </Button>
      </div>

      {/* Status Bar */}
      <div className="fixed bottom-4 left-4 z-50 hidden md:block">
        <div className="p-3 rounded-xl backdrop-blur-md border border-slate-700/50 bg-slate-800/80 shadow-lg">
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400/50"></div>
              <span className="text-slate-300 font-medium">Online</span>
            </div>
            <div className="w-px h-4 bg-slate-600"></div>
            <span className="text-slate-400 font-mono">
              {currentTime.toLocaleTimeString()}
            </span>
            <div className="w-px h-4 bg-slate-600"></div>
            <span className="text-slate-400">
              Visitor <span className="text-cyan-400 font-semibold">#{visitCount}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      {showBackToTop && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-24 md:bottom-4 right-4 z-50 rounded-full w-12 h-12 p-0 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 border-0 shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
          size="icon"
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
      )}

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 md:pt-0">
        {/* Animated Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-10 w-80 h-80 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full mix-blend-screen filter blur-3xl animate-blob"></div>
          <div className="absolute top-40 right-10 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-violet-500/20 rounded-full mix-blend-screen filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full mix-blend-screen filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="container relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center px-4">
          <div className="space-y-8 ">
            <div className="inline-block">
              <Badge 
                variant="outline" 
                className="px-4 py-2 text-sm font-medium mb-4 mt-2 backdrop-blur-sm border-slate-600/50 bg-slate-800/50 text-slate-200 hover:border-cyan-500/50 hover:bg-slate-700/50 transition-all duration-300"
              >
                <span className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
                  Software Engineer & Creative Developer
                </span>
              </Badge>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight leading-tight">
              <span className="block text-slate-100">Hi, I'm</span>
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-gradient-x">
                Md Sadik
              </span>
            </h1>
            
            {/* Animated Role Text */}
            <div className="text-xl md:text-2xl lg:text-3xl font-semibold h-12 flex items-center">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                {typedText}
              </span>
              <span className="animate-pulse ml-1 text-cyan-400">|</span>
            </div>
            
            <p className="text-lg md:text-xl text-slate-400 max-w-[600px] leading-relaxed">
              I craft exceptional digital experiences with code, creativity, and a passion for innovation. 
              <span className="text-slate-300"> Let's build something amazing together.</span>
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                    {stat.value}
                  </div>
                  <div className="text-xs md:text-sm text-slate-500 mt-1 group-hover:text-slate-400 transition-colors">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button className="relative overflow-hidden group bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 border-0 shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 px-6 py-3">
                <span className="relative z-10 flex items-center justify-center font-medium">
                  View Projects 
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Button>
              <Button
                variant="outline"
                onClick={downloadResume}
                className="border-slate-600/50 bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 hover:border-slate-500/50 hover:text-white backdrop-blur-sm transition-all duration-300 px-6 py-3"
              >
                <Download className="mr-2 h-4 w-4" />
                Download Resume
              </Button>
            </div>

            <div className="flex gap-4 pt-4 justify-center sm:justify-start">
              {[
                { href: "https://github.com/sadik03", icon: Github, label: "GitHub" },
                { href: "https://www.linkedin.com/in/sadik-md03/", icon: Linkedin, label: "LinkedIn" },
                { href: "mailto:sksadik240@gmail.com", icon: Mail, label: "Email" }
              ].map((social, index) => (
                <Link key={index} href={social.href} target="_blank" rel="noopener noreferrer">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="rounded-full bg-slate-800/50 border border-slate-700/50 hover:bg-slate-700/50 hover:border-slate-600/50 text-slate-400 hover:text-white backdrop-blur-sm transition-all duration-300 hover:scale-110"
                  >
                    <social.icon className="h-5 w-5" />
                    <span className="sr-only">{social.label}</span>
                  </Button>
                </Link>
              ))}
            </div>
          </div>
          <div className="flex justify-center">
            <CreativeHero />
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
          <div className="w-6 h-10 rounded-full border-2 border-slate-600/50 flex justify-center items-start p-1">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-sm shadow-cyan-400/50"></div>
          </div>
        </div>
      </section>

       {/* About Section */}
      <section id="about" className="py-16 md:py-32 relative">
        <div className="container relative z-10 px-4">
          <SectionHeading title="About Me" subtitle="Get to know the person behind the code" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mt-20">
            <div className="relative group">
              <div className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 blur-2xl opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
              <div className="relative aspect-square rounded-2xl overflow-hidden border border-slate-700/50 shadow-2xl">
                <img
                  src="https://qglnorzqt2a4vqss.public.blob.vercel-storage.com/sadik.jpg"
                  alt="Md Sadik"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400/50"></div>
                    <span className="text-sm font-medium text-white">Available for work</span>
                    <Badge className="ml-auto bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                      Open to opportunities
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            <Tabs defaultValue="bio" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3 bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm">
                <TabsTrigger value="bio" className="data-[state=active]:bg-slate-700/50 data-[state=active]:text-cyan-400">
                  Biography
                </TabsTrigger>
                <TabsTrigger value="interests" className="data-[state=active]:bg-slate-700/50 data-[state=active]:text-cyan-400">
                  Interests
                </TabsTrigger>
                <TabsTrigger value="values" className="data-[state=active]:bg-slate-700/50 data-[state=active]:text-cyan-400">
                  Values
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="bio" className="space-y-4">
                <div className="p-8 rounded-2xl backdrop-blur-md border border-slate-700/50 bg-slate-800/30 hover:bg-slate-800/40 transition-colors duration-300">
                  <p className="text-lg text-slate-300 leading-relaxed mb-4">
                    I'm a passionate software engineer with <span className="text-cyan-400 font-semibold">1+ years</span> of experience building web applications and mobile applications. I specialize in frontend development with React and Next.js, and I'm also skilled in mobile app development using Flutter and React Native
                  </p>
                  <p className="text-lg text-slate-300 leading-relaxed">
                    My journey in tech started during my computer science studies, where I discovered my love for creating digital solutions that solve <span className="text-emerald-400 font-medium">real-world problems</span> and make people's lives easier.
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="interests" className="space-y-4">
                <div className="p-8 rounded-2xl backdrop-blur-md border border-slate-700/50 bg-slate-800/30 hover:bg-slate-800/40 transition-colors duration-300">
                  <div className="space-y-6">
                    {[
                      { title: "Technology", color: "text-cyan-400", content: "Exploring new frameworks, contributing to open-source, and staying up-to-date with industry trends." },
                      { title: "Design", color: "text-purple-400", content: "UI/UX design, typography, color theory, and creating beautiful user experiences." },
                      { title: "Learning", color: "text-emerald-400", content: "Continuous learning, teaching others, and sharing knowledge through blog posts and tutorials." }
                    ].map((interest, index) => (
                      <div key={index} className="group">
                        <h4 className={`font-semibold ${interest.color} mb-2 group-hover:scale-105 transition-transform inline-block`}>
                          {interest.title}
                        </h4>
                        <p className="text-slate-300 leading-relaxed group-hover:text-slate-200 transition-colors">
                          {interest.content}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="values" className="space-y-4">
                <div className="p-8 rounded-2xl backdrop-blur-md border border-slate-700/50 bg-slate-800/30 hover:bg-slate-800/40 transition-colors duration-300">
                  <div className="space-y-6">
                    {[
                      { title: "Quality First", color: "text-blue-400", content: "I believe in writing clean, maintainable code and creating products that stand the test of time." },
                      { title: "User-Centric", color: "text-violet-400", content: "Every decision I make is driven by how it will impact the end user's experience." },
                      { title: "Collaboration", color: "text-emerald-400", content: "I thrive in team environments and believe the best solutions come from diverse perspectives." }
                    ].map((value, index) => (
                      <div key={index} className="group">
                        <h4 className={`font-semibold ${value.color} mb-2 group-hover:scale-105 transition-transform inline-block`}>
                          {value.title}
                        </h4>
                        <p className="text-slate-300 leading-relaxed group-hover:text-slate-200 transition-colors">
                          {value.content}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>


      {/* Services Section */}
      <section id="services" className="py-16 md:py-32 relative">
        <div className="container relative z-10 px-4">
          <SectionHeading title="What I Do" subtitle="Services I provide to bring your vision to life" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
            {services.map((service, index) => (
              <Card 
                key={index} 
                className={`backdrop-blur-sm border border-slate-700/50 bg-slate-800/30 ${service.borderColor} transition-all duration-500 group hover:shadow-xl hover:shadow-slate-900/20 hover:scale-[1.02] hover:-translate-y-1`}
              >
                <CardHeader>
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${service.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-300 shadow-inner`}>
                    <service.icon className={`h-7 w-7 ${service.iconColor} group-hover:scale-110 transition-transform duration-300`} />
                  </div>
                  <CardTitle className="text-xl text-slate-100 group-hover:text-white transition-colors">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-400 mb-6 leading-relaxed group-hover:text-slate-300 transition-colors">
                    {service.description}
                  </CardDescription>
                  <div className="flex flex-wrap gap-2">
                    {service.skills.map((skill, skillIndex) => (
                      <Badge 
                        key={skillIndex} 
                        variant="outline" 
                        className="text-xs border-slate-600/50 bg-slate-700/30 text-slate-300 hover:border-slate-500/50 hover:bg-slate-600/30 transition-all duration-200"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

     
      {/* Skills Section */}
      <section id="skills" className="py-16 md:py-32 relative">
        <div className="container relative z-10 px-4">
          <SectionHeading title="My Skills" subtitle="Technologies and tools I use to create amazing experiences" />

          <Tabs defaultValue="frontend" className="mt-20">
            <TabsList className="grid w-full grid-cols-4 bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm mb-12 max-w-md mx-auto">
              <TabsTrigger value="frontend" className="data-[state=active]:bg-slate-700/50 data-[state=active]:text-cyan-400">
                Frontend
              </TabsTrigger>
              <TabsTrigger value="backend" className="data-[state=active]:bg-slate-700/50 data-[state=active]:text-cyan-400">
                Backend
              </TabsTrigger>
              <TabsTrigger value="app" className="data-[state=active]:bg-slate-700/50 data-[state=active]:text-cyan-400">
                App
              </TabsTrigger>
              <TabsTrigger value="tools" className="data-[state=active]:bg-slate-700/50 data-[state=active]:text-cyan-400">
                Tools
              </TabsTrigger>
            </TabsList>

            <TabsContent value="frontend" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  { name: "React", level: 95, gradient: "from-cyan-500 to-blue-500" },
                  { name: "Next.js", level: 90, gradient: "from-blue-500 to-indigo-500" },
                  { name: "TypeScript", level: 85, gradient: "from-indigo-500 to-purple-500" },
                  { name: "Tailwind CSS", level: 90, gradient: "from-cyan-400 to-teal-500" },
                  { name: "JavaScript", level: 95, gradient: "from-yellow-400 to-orange-500" },
                  { name: "HTML/CSS", level: 95, gradient: "from-orange-500 to-red-500" }
                ].map((skill, index) => (
                  <div key={index} className="space-y-3 p-6 rounded-xl bg-slate-800/30 border border-slate-700/50 hover:bg-slate-800/40 transition-all duration-300 group">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-slate-200 group-hover:text-white transition-colors">
                        {skill.name}
                      </span>
                      <span className="text-sm text-slate-400 bg-slate-700/50 px-2 py-1 rounded font-medium">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-700/50 rounded-full h-2 overflow-hidden">
                      <div 
                        className={`bg-gradient-to-r ${skill.gradient} h-2 rounded-full transition-all duration-1000 shadow-sm`}
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="backend" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  { name: "Node.js", level: 80, gradient: "from-green-500 to-emerald-500" },
                  { name: "PostgreSQL", level: 75, gradient: "from-blue-500 to-cyan-500" },
                  { name: "MongoDB", level: 70, gradient: "from-green-600 to-green-400" },
                  { name: "GraphQL", level: 75, gradient: "from-pink-500 to-rose-500" },
                  { name: "AWS", level: 65, gradient: "from-orange-500 to-amber-500" },
                  { name: "Docker", level: 60, gradient: "from-blue-400 to-blue-600" }
                ].map((skill, index) => (
                  <div key={index} className="space-y-3 p-6 rounded-xl bg-slate-800/30 border border-slate-700/50 hover:bg-slate-800/40 transition-all duration-300 group">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-slate-200 group-hover:text-white transition-colors">
                        {skill.name}
                      </span>
                      <span className="text-sm text-slate-400 bg-slate-700/50 px-2 py-1 rounded font-medium">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-700/50 rounded-full h-2 overflow-hidden">
                      <div 
                        className={`bg-gradient-to-r ${skill.gradient} h-2 rounded-full transition-all duration-1000 shadow-sm`}
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

               <TabsContent value="app" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  { name: "Flutter", level: 85, gradient: "from-red-500 to-red-500" },
                  { name: "React-Native", level: 70, gradient: "from-blue-500 to-cyan-500" },
                  { name: "Android Studio", level: 70, gradient: "from-green-600 to-green-400" },
                  { name: "Firebase", level: 75, gradient: "from-pink-500 to-rose-500" },
                  
                ].map((skill, index) => (
                  <div key={index} className="space-y-3 p-6 rounded-xl bg-slate-800/30 border border-slate-700/50 hover:bg-slate-800/40 transition-all duration-300 group">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-slate-200 group-hover:text-white transition-colors">
                        {skill.name}
                      </span>
                      <span className="text-sm text-slate-400 bg-slate-700/50 px-2 py-1 rounded font-medium">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-700/50 rounded-full h-2 overflow-hidden">
                      <div 
                        className={`bg-gradient-to-r ${skill.gradient} h-2 rounded-full transition-all duration-1000 shadow-sm`}
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="tools" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  { name: "Git/Github", level: 90, gradient: "from-red-500 to-red-600" },
                  { name: "Figma", level: 80, gradient: "from-purple-500 to-violet-500" },
                  { name: "VS Code", level: 95, gradient: "from-blue-500 to-blue-600" },
                  { name: "Webpack", level: 70, gradient: "from-blue-400 to-cyan-500" },
                  { name: "Jest", level: 75, gradient: "from-red-400 to-pink-500" },
                  { name: "Cypress", level: 65, gradient: "from-green-500 to-teal-500" }
                ].map((skill, index) => (
                  <div key={index} className="space-y-3 p-6 rounded-xl bg-slate-800/30 border border-slate-700/50 hover:bg-slate-800/40 transition-all duration-300 group">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-slate-200 group-hover:text-white transition-colors">
                        {skill.name}
                      </span>
                      <span className="text-sm text-slate-400 bg-slate-700/50 px-2 py-1 rounded font-medium">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-700/50 rounded-full h-2 overflow-hidden">
                      <div 
                        className={`bg-gradient-to-r ${skill.gradient} h-2 rounded-full transition-all duration-1000 shadow-sm`}
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 md:py-32 relative">
        <div className="container relative z-10 px-4">
          <SectionHeading title="Featured Projects" subtitle="Some of my recent work that I'm proud of" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">
            <ProjectCard
              title="E-commerce Platform"
              description="A full-stack e-commerce platform built with Next.js, Stripe, and Prisma."
              tags={["Next.js", "TypeScript", "Prisma", "Stripe"]}
              image="https://qglnorzqt2a4vqss.public.blob.vercel-storage.com/ecom.png"
              demoUrl="https://e-commerce-25.vercel.app/"
              repoUrl="https://github.com/sadik03/E-commerce-25"
            />
            <ProjectCard
              title="Travel website"
              description="A dubai-based travel website with booking and itinerary management."
              tags={["React", "Firebase", "Tailwind CSS", "Redux"]}
              image="https://qglnorzqt2a4vqss.public.blob.vercel-storage.com/waho.png"
              demoUrl="https://wahawonders.com/"
              repoUrl=""
            />
            <ProjectCard
              title="Construction Management"
              description="An construction management web application for project tracking and collaboration."
              tags={["react", "Html/Css", "Web3form", ]}
              image="https://qglnorzqt2a4vqss.public.blob.vercel-storage.com/elitech.png"
              demoUrl="https://www.elitechdesigns.com/"
              repoUrl="https://github.com/sadik03/ElitechDesigns-25"
            />

            <ProjectCard
              title="Construction Management web"
              description="An construction management web application for project tracking and collaboration."
              tags={["react", "Html/Css", "Web3form", ]}
              image=""
              demoUrl=""
              repoUrl="https://github.com"
            />

            <ProjectCard
              title="Construction Management web"
              description="An construction management web application for project tracking and collaboration."
              tags={["react", "Html/Css", "Web3form", ]}
              image=""
              demoUrl="https://example.com"
              repoUrl="https://github.com"
            />

            <ProjectCard
              title="Construction Management web"
              description="An construction management web application for project tracking and collaboration."
              tags={["react", "Html/Css", "Web3form", ]}
              image=""
              demoUrl="https://example.com"
              repoUrl="https://github.com"
            />
          </div>
        </div>
      </section>

     

      {/* Experience Section */}
      <section id="experience" className="py-16 md:py-32 relative">
        <div className="container relative z-10 px-4">
          <SectionHeading title="Work Experience" subtitle="My professional journey and career milestones" />
          <div className="mt-20">
            <Timeline />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-32 relative pb-32 md:pb-32">
        <div className="container relative z-10 px-4">
          <SectionHeading title="Get In Touch" subtitle="Let's work together on your next project" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mt-20">
            <div className="p-8 rounded-2xl backdrop-blur-md border border-slate-700/50 bg-slate-800/30 hover:bg-slate-800/40 transition-all duration-300">
              <h3 className="text-2xl font-bold mb-8 text-slate-100">Contact Information</h3>
              
              <div className="space-y-8">
                {[
                  { icon: Mail, label: "Email", value: "sksadik240@gmail.com", color: "text-cyan-400" },
                  { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/sadik", color: "text-blue-400" },
                  { icon: Github, label: "GitHub", value: "github.com/sadik03", color: "text-purple-400" }
                ].map((contact, index) => (
                  <div key={index} className="flex items-center gap-4 group">
                    <div className={`w-12 h-12 rounded-xl bg-slate-700/50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <contact.icon className={`h-6 w-6 ${contact.color}`} />
                    </div>
                    <div>
                      <div className="text-sm text-slate-500 mb-1">{contact.label}</div>
                      <div className="font-medium text-slate-300 group-hover:text-slate-200 transition-colors">
                        {contact.value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 pt-8 border-t border-slate-700/50">
                <h4 className="text-lg font-semibold mb-4 text-slate-200">Current Status</h4>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400/50"></div>
                  <span className="text-slate-300">
                    Available for <span className="text-emerald-400 font-medium">freelance work</span> and <span className="text-cyan-400 font-medium">full-time opportunities</span>
                  </span>
                </div>
              </div>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/50 py-16 bg-slate-900/20 backdrop-blur-sm mb-16 md:mb-0">
        <div className="container px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <Link href="#home" className="font-bold text-2xl">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
                Sadik
              </span>
            </Link>
            <p className="text-sm text-slate-500 mt-3">
              © {new Date().getFullYear()} Md Sadik. All rights reserved.
            </p>
            <p className="text-xs text-slate-600 mt-1">
              Built with passion and attention to detail.
            </p>
          </div>
          
          <div className="flex gap-4">
            {[
              { href: "https://github.com/sadik03", icon: Github, label: "GitHub" },
              { href: "https://www.linkedin.com/in/sadik-md03/", icon: Linkedin, label: "LinkedIn" },
              { href: "mailto:sksadik240@gmail.com", icon: Mail, label: "Email" }
            ].map((social, index) => (
              <Link key={index} href={social.href} target="_blank" rel="noopener noreferrer">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-full bg-slate-800/50 border border-slate-700/50 hover:bg-slate-700/50 hover:border-slate-600/50 text-slate-400 hover:text-white backdrop-blur-sm transition-all duration-300 hover:scale-110"
                >
                  <social.icon className="h-5 w-5" />
                  <span className="sr-only">{social.label}</span>
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
