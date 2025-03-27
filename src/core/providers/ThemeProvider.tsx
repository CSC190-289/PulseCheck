import React from "react"
import { useEffect, useMemo, useState } from "react"
import {
  ThemeProvider as MuiThemeProvider,
  PaletteMode,
} from "@mui/material/styles"
import { CssBaseline } from "@mui/material"
import { createCustomTheme } from "@/styles/theme"
import { ThemeContext } from "@/core/contexts/ThemeContext"

/**
 * `ThemeProvider` is a context provider that manages the theme mode (light or dark)
 * for the entire application. It provides the current theme mode and a function
 * to toggle between light and dark modes through the `ThemeContext`.
 *
 * The component:
 * - Detects the system's theme preference (dark or light mode).
 * - Allows users to toggle between light and dark themes.
 * - Applies the appropriate theme using Material-UI's `MuiThemeProvider`.
 * - Provides a `ThemeContext` to other components so they can access the current theme mode
 *   and toggle it.
 *
 * @param {React.ReactNode} children - The child components that will be rendered with the current theme.
 *
 * @returns {JSX.Element} The JSX element that applies the theme context and renders the theme
 *                        using Material-UI's `MuiThemeProvider`.
 */
export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  /* detect system preference */
  // const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)")
  const prefersDarkMode = false

  /* state for theme mode, defaulting to system preference */
  const [mode, setMode] = useState<PaletteMode>(
    prefersDarkMode ? "dark" : "light"
  )

  useEffect(() => {
    setMode(prefersDarkMode ? "dark" : "light")
  }, [prefersDarkMode]) // update when system theme changes

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"))
  }

  const theme = useMemo(() => createCustomTheme(mode), [mode])

  return (
    <ThemeContext.Provider value={{ toggleTheme, mode }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  )
}
