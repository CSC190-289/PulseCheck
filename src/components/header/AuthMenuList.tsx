import { MenuList } from "@mui/material"
import MenuItem from "./MenuItem"
import {
  AccountCircle,
  BarChart,
  Dashboard,
  ExitToApp,
  HowToVote,
} from "@mui/icons-material"
import api from "@/core/api/firebase"
import { useNavigate } from "react-router-dom"
import { useAuthContext } from "@/core/hooks"

interface AuthMenuListProps {
  handleClose: () => void
}

export default function AuthMenuList(props: AuthMenuListProps) {
  const { handleClose } = props
  const navigate = useNavigate()
  const { user, loading, error } = useAuthContext()

  const handleLogout = () => {
    api.auth
      .logout()
      .then(() => {
        console.debug("logged out user!")
        void navigate("/get-started")
        handleClose()
      })
      .catch((err) => console.debug(err))
  }

  if (error) {
    console.error(error)
    return <></>
  }

  if (loading) {
    return <></>
  }

  if (!user || user?.isAnonymous) {
    return <></>
  }

  return (
    <MenuList>
      <MenuItem icon={Dashboard} to='/dashboard' onClick={handleClose}>
        Dashboard
      </MenuItem>
      <MenuItem icon={HowToVote} to='/poll/join' onClick={handleClose}>
        Join Poll
      </MenuItem>
      <MenuItem icon={BarChart} to='/poll/history' onClick={handleClose}>
        Results
      </MenuItem>
      <MenuItem icon={AccountCircle} to={"/profile"} onClick={handleClose}>
        Profile
      </MenuItem>
      <MenuItem icon={ExitToApp} onClick={handleLogout}>
        Logout
      </MenuItem>
    </MenuList>
  )
}
