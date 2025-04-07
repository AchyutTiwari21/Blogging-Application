import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button.jsx"
import { useTheme } from "@/components/theme-provider.jsx"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button 
    variant="outline" 
    size="icon" 
    className="cursor-pointer"
    onClick={() => {
      setTheme(theme === "dark" ? "light" : "dark")
    }}
    >

      {/* Sun Icon (Visible in dark mode) */}
      <Sun className={`absolute h-[1.2rem] w-[1.2rem] transition-transform duration-300 ${
        theme === "dark" ? "rotate-0 scale-100 opacity-100" : "rotate-90 scale-0 opacity-0"  
      }`} />

      {/* Moon Icon (Visible in light mode) */}
      <Moon className={`absolute h-[1.2rem] w-[1.2rem] transition-transform duration-300 ${
        theme === "dark" ? "-rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
      }`} />
      
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
