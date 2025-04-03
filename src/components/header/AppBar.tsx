import {
  Box,
  AppBar as MUIAppbar,
  Slide,
  Toolbar,
  useScrollTrigger,
} from "@mui/material"
import AppTitle from "./AppTitle"
import MenuButton from "./MenuButton"

export default function AppBar() {
  return (
    <HideOnScroll>
      <MUIAppbar position='sticky'>
        <Toolbar>
          <AppTitle />
          <Box flexGrow={1} />
          <MenuButton />
        </Toolbar>
      </MUIAppbar>
    </HideOnScroll>
  )
}

interface HideOnScrollProps {
  children: React.ReactElement
}

function HideOnScroll({ children }: HideOnScrollProps) {
  const trigger = useScrollTrigger({ threshold: 50 })
  return (
    <Slide
      appear={false}
      direction='down'
      in={!trigger}
      timeout={{ enter: 500, exit: 300 }}>
      {children}
    </Slide>
  )
}
