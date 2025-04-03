import { Divider, MenuList } from "@mui/material"
import MenuItem from "./MenuItem"
import {
  FileCopy,
  Help,
  Home,
  HowToReg,
  Info,
  Login,
  Security,
  Star,
} from "@mui/icons-material"
import { useAuthContext } from "@/core/hooks"

interface GuestMenuListProps {
  handleClose?: () => void
}

export default function GuestMenuList(props: GuestMenuListProps) {
  const { handleClose } = props
  const { user, loading, error } = useAuthContext()

  if (error) {
    console.error(error)
    return <></>
  }

  if (loading) {
    return <></>
  }

  if (user) {
    return <></>
  }

  return (
    <MenuList>
      <MenuItem icon={Home} to='/' onClick={handleClose}>
        Home
      </MenuItem>
      <MenuItem
        icon={Info}
        to='/'
        opts={{ state: { scrollTo: "about" } }}
        onClick={handleClose}>
        About
      </MenuItem>
      <MenuItem
        icon={Star}
        to='/'
        opts={{ state: { scrollTo: "features" } }}
        onClick={handleClose}>
        Features
      </MenuItem>
      <MenuItem
        icon={Help}
        to='/'
        opts={{ state: { scrollTo: "faqs" } }}
        onClick={handleClose}>
        FAQs
      </MenuItem>
      <Divider />
      <MenuItem icon={FileCopy} to='/terms-of-service' onClick={handleClose}>
        Terms of Service
      </MenuItem>
      <MenuItem icon={Security} to='/privacy-policy' onClick={handleClose}>
        Privacy Policy
      </MenuItem>
      <Divider />
      <MenuItem icon={Login} to='/login' onClick={handleClose}>
        Login
      </MenuItem>
      <MenuItem icon={HowToReg} to='/register' onClick={handleClose}>
        Register
      </MenuItem>
    </MenuList>
  )
}
