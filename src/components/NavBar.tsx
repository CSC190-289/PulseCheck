import { Login, Menu as MenuIcon } from "@mui/icons-material"
import {
  AppBar,
  Box,
  Button,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Slide,
  Toolbar,
  Typography,
  useScrollTrigger,
} from "@mui/material"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "@/core/api/firebase"
import ProfileIcon from "./ProfileIcon"

export default function NavBar() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>()
  const navigate = useNavigate()
  const [user] = useAuthState(auth)

  const openMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  /** closes the menu */
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogo = () => {
    if (!user) {
      void navigate("/")
    } else if (!user.isAnonymous) {
      void navigate("/dashboard")
    } else {
      void navigate("/")
    }
    handleClose()
  }

  const handleLogin = () => {
    void navigate("/login")
  }

  return (
    <HideOnScroll>
      <AppBar position='sticky'>
        <Toolbar>
          <IconButton size='large' color='inherit' onClick={openMenu}>
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}>
            {user && !user.isAnonymous ? (
              <AuthMenuItems callback={handleClose} />
            ) : (
              <GuestMenuItems callback={handleClose} />
            )}
          </Menu>
          <Typography
            variant='h6'
            component={"div"}
            onClick={handleLogo}
            sx={{ cursor: "pointer" }}>
            PulseCheck
          </Typography>
          <Box flexGrow={1} />
          {user ? (
            <ProfileIcon />
          ) : (
            <Button
              variant='text'
              color='inherit'
              onClick={handleLogin}
              endIcon={<Login />}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  )
}

interface CallbackProps {
  callback: () => void
}

function GuestMenuItems({ callback }: CallbackProps) {
  const navigate = useNavigate()

  const handleHome = () => {
    void navigate("/")
    callback()
  }

  const handleAbout = () => {
    void navigate("/", { state: { scrollTo: "about" } })
    callback()
  }

  const handleFAQs = () => {
    void navigate("/", { state: { scrollTo: "faqs" } })
    callback()
  }

  const handleToS = () => {
    void navigate("/terms-of-service")
    callback()
  }

  const handleFeatures = () => {
    void navigate("/", { state: { scrollTo: "features" } })
    callback()
  }

  const handlePP = () => {
    void navigate("/privacy-policy")
    callback()
  }
  const handleLoginfo = () => {
    void navigate("/login")
    callback()
  }
  const handleReg = () => {
    void navigate("/register")
    callback()
  }

  return (
    <Box>
      <MenuItem onClick={handleHome}>Home</MenuItem>
      <MenuItem onClick={handleAbout}>About</MenuItem>
      <MenuItem onClick={handleFeatures}>Features</MenuItem>
      <MenuItem onClick={handleFAQs}>FAQs</MenuItem>
      <Divider />
      <MenuItem onClick={handleToS}>Terms of Service</MenuItem>
      <MenuItem onClick={handlePP}>Privacy Policy</MenuItem>
      <Divider />
      <MenuItem onClick={handleLoginfo}>Login</MenuItem>
      <MenuItem onClick={handleReg}>Register</MenuItem>
    </Box>
  )
}

function AuthMenuItems({ callback }: CallbackProps) {
  const navigate = useNavigate()

  const handleDashboard = () => {
    void navigate("/dashboard")
    callback()
  }

  const handleJoinPoll = () => {
    void navigate("/poll/join")
    callback()
  }

  const handleResults = () => {
    void navigate("/poll/results")
    callback()
  }

  const handleProfile = () => {
    void navigate("/profile")
    callback()
  }

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        console.debug("user signed out!")
        void navigate("/get-started")
        callback()
      })
      .catch((err) => console.debug(err))
  }

  return (
    <Box>
      <MenuItem onClick={handleDashboard}>Dashboard</MenuItem>
      <MenuItem onClick={handleJoinPoll}>Join Poll</MenuItem>
      <MenuItem onClick={handleResults}>Results</MenuItem>
      <MenuItem onClick={handleProfile}>Profile</MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Box>
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
