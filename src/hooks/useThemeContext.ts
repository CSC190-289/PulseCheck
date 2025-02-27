import { useContext } from "react"
import { ThemeContext } from "@/context/ThemeContext"

export const useThemeContext = () => {
  const theme = useContext(ThemeContext)
  if (!theme) {
    throw new Error("useThemeContext must be used within ThemeProvider")
  }
  return theme
}
