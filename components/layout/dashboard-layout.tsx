"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { BarChart3, BookOpen, GraduationCap, Menu, Settings, Users, X, Home, LogOut } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const sidebarLinks = [
  {
    title: "Home",
    href: "/dashboard",
    icon: Home,
    gradient: "from-blue-500 to-blue-600",
  },
  {
    title: "Faculty Management",
    href: "/dashboard/faculty",
    icon: Users,
    gradient: "from-purple-500 to-purple-600",
  },
  {
    title: "Student Management",
    href: "/dashboard/students",
    icon: GraduationCap,
    gradient: "from-green-500 to-green-600",
  },
  {
    title: "College Management",
    href: "/dashboard/college",
    icon: BookOpen,
    gradient: "from-yellow-500 to-yellow-600",
  },
  {
    title: "Reports & Analytics",
    href: "/dashboard/reports",
    icon: BarChart3,
    gradient: "from-pink-500 to-pink-600",
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
    gradient: "from-orange-500 to-orange-600",
  },
]

const MotionLink = motion(Link)

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X /> : <Menu />}
      </Button>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        className={cn(
          "fixed top-0 left-0 z-40 w-64 h-screen transition-transform",
          "bg-gradient-to-b from-background via-background/95 to-background/90 backdrop-blur-sm border-r border-primary/10",
          !isOpen && "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="h-full px-3 py-4 overflow-y-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-10 flex items-center justify-between"
          >
            <Link href="/dashboard" className="flex items-center">
              <BookOpen className="h-6 w-6 mr-2 text-primary" />
              <span className="text-xl font-semibold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Admin Portal
              </span>
            </Link>
          </motion.div>
          <ul className="space-y-2 font-medium">
            {sidebarLinks.map((link, index) => {
              const IconComponent = link.icon
              const isActive = pathname === link.href
              
              return (
                <motion.li 
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <MotionLink
                    href={link.href}
                    className={cn(
                      "flex items-center p-2 rounded-lg transition-all duration-200",
                      "hover:bg-primary/10 group relative overflow-hidden",
                      isActive && "bg-primary/20 text-primary"
                    )}
                    onClick={() => setIsOpen(false)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <IconComponent className={cn(
                      "w-5 h-5 transition-colors",
                      isActive ? "text-primary" : "text-muted-foreground",
                      `bg-gradient-to-r ${link.gradient} bg-clip-text`
                    )} />
                    <span className="ml-3">{link.title}</span>
                    {isActive && (
                      <motion.div
                        className="absolute bottom-0 left-0 h-0.5 w-full bg-gradient-to-r from-primary to-primary/60"
                        layoutId="activeTab"
                      />
                    )}
                  </MotionLink>
                </motion.li>
              )
            })}
          </ul>
        </div>
      </motion.aside>

      {/* Main content */}
      <motion.main 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={cn(
          "transition-all duration-200 ease-in-out",
          "min-h-screen bg-gradient-to-b from-background to-primary/5",
          "p-4 md:ml-64"
        )}
      >
        <div className="mb-6 flex items-center justify-between">
          <div />
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    src="/placeholder.svg"
                    alt="Profile"
                    className="h-8 w-8 rounded-full ring-2 ring-primary/20"
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                className="w-56" 
                align="end" 
                forceMount
              >
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Admin User</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      admin@example.com
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/settings" className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-600 focus:text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        {children}
      </motion.main>
    </div>
  )
}

