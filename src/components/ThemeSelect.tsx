import { MenuItem, Select, SelectChangeEvent, SelectProps } from "@mui/material"
import React from "react"
import { ThemeType } from "@/core/types"
import { useThemeContext } from "@/core/hooks"

type ThemeSelectProps = SelectProps

const ThemeSelect = (props: ThemeSelectProps) => {
  const theme = useThemeContext()

  const handleChange = (e: SelectChangeEvent<unknown>) => {
    const selectedTheme = e.target.value as ThemeType
    if (Object.values(ThemeType).includes(selectedTheme)) {
      theme.setTheme(selectedTheme)
    }
  }

  return (
    <React.Fragment>
      <Select
        {...props}
        onChange={handleChange}
        defaultValue={ThemeType.SYSTEM_THEME}>
        <MenuItem value={ThemeType.SYSTEM_THEME}>System Theme</MenuItem>
        <MenuItem value={ThemeType.LIGHT}>Light</MenuItem>
        <MenuItem value={ThemeType.DARK}>Dark</MenuItem>
      </Select>
    </React.Fragment>
  )
}

export default ThemeSelect
