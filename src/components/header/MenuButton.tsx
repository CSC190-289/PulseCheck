import { IconButton, Menu } from "@mui/material"
import { Menu as MenuIcon } from "@mui/icons-material"
import React, { useState } from "react"
import { useAuthContext } from "@/core/hooks"
import GuestMenuList from "./GuestMenuList"
import AuthMenuList from "./AuthMenuList"
import ProfileIcon from "./ProfileIcon"

export default function MenuButton() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>()
  const { user } = useAuthContext()

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <React.Fragment>
      <IconButton color='inherit' size='large' onClick={handleOpen}>
        {user ? <ProfileIcon /> : <MenuIcon />}
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}>
        <GuestMenuList handleClose={handleClose} />
        <AuthMenuList handleClose={handleClose} />
      </Menu>
    </React.Fragment>
  )
}
