import { useAuthContext } from "@/core/hooks"
import { Avatar, Badge, styled } from "@mui/material"
import { useNavigate } from "react-router-dom"

export default function ProfileIcon() {
  const auth = useAuthContext()
  const navigate = useNavigate()

  const handleClick = () => {
    if (!auth.user) {
      return
    }
    if (!auth.user.isAnonymous) {
      void navigate("/profile")
    }
  }

  return (
    <StyledBadge
      overlap='circular'
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      sx={auth.user?.isAnonymous ? {} : { cursor: "pointer" }}
      variant='dot'
      onClick={handleClick}>
      {auth.user?.photoURL ? <Avatar src={auth.user.photoURL} /> : <Avatar />}
    </StyledBadge>
  )
}

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}))
