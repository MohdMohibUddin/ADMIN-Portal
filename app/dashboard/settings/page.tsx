"use client"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { Moon, Sun, Monitor } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ProfileForm } from "@/components/settings/profile-form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
// No theme-config imports needed

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const { toast } = useToast()
  // const [activeTheme, setActiveTheme] = useState<string>("ocean")

  // useEffect(() => {
  //   // Load saved theme
  //   const savedTheme = localStorage.getItem("admin-theme")
  //   if (savedTheme) {
  //     const themeConfig = themes.find((t) => t.name === savedTheme)
  //     if (themeConfig) {
  //       setActiveTheme(themeConfig.name)
  //       applyTheme(themeConfig)
  //     }
  //   }
  // }, [])

  // const handleThemeChange = (themeConfig: ThemeConfig) => {
  //   setActiveTheme(themeConfig.name)
  //   applyTheme(themeConfig)
  //   localStorage.setItem("admin-theme", themeConfig.name)

  //   // Force refresh theme
  //   const currentTheme = theme
  //   setTheme("light")
  //   setTimeout(() => setTheme(currentTheme), 50)

  //   toast({
  //     title: "Theme Updated",
  //     description: `Applied ${themeConfig.label} theme to all interfaces`,
  //   })
  // }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <h2 className="text-3xl font-bold tracking-tight">Settings</h2>

      <Tabs defaultValue="appearance" className="space-y-4">
        <TabsList>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>

        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Theme</CardTitle>
              <CardDescription>Customize your interface theme</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Theme Mode</h3>
                <div className="flex flex-wrap gap-4">
                  <Button
                    variant={theme === "light" ? "default" : "outline"}
                    className="w-32 justify-start"
                    onClick={() => setTheme("light")}
                  >
                    <Sun className="mr-2 h-4 w-4" />
                    Light
                  </Button>
                  <Button
                    variant={theme === "dark" ? "default" : "outline"}
                    className="w-32 justify-start"
                    onClick={() => setTheme("dark")}
                  >
                    <Moon className="mr-2 h-4 w-4" />
                    Dark
                  </Button>
                  <Button
                    variant={theme === "system" ? "default" : "outline"}
                    className="w-32 justify-start"
                    onClick={() => setTheme("system")}
                  >
                    <Monitor className="mr-2 h-4 w-4" />
                    System
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profile">
          <ProfileForm />
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}

