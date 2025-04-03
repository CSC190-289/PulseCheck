import api from "@/core/api/firebase"
import { useAuthContext } from "@/core/hooks"
import { User } from "@/core/types"
import { stoc, stoni } from "@/utils"
import {
  Avatar,
  Badge,
  BadgeOrigin,
  Box,
  CircularProgress,
  styled,
} from "@mui/material"
import { useEffect, useState } from "react"

const origin: BadgeOrigin = {
  vertical: "bottom",
  horizontal: "right",
}

export default function ProfileIcon() {
  const { user } = useAuthContext()
  const [doc, setDoc] = useState<User>()

  useEffect(() => {
    if (!user || user.isAnonymous) {
      return
    }
    api.users
      .get(user.uid)
      .then((x) => {
        setDoc(x)
      })
      .catch((err) => console.debug(err))
  }, [user])

  if (!user) {
    return <></>
  }

  if (user.isAnonymous) {
    return (
      <StyledBadge overlap='circular' anchorOrigin={origin} variant='dot'>
        <Avatar />
      </StyledBadge>
    )
  } else if (doc) {
    return (
      <StyledBadge
        overlap='circular'
        anchorOrigin={origin}
        sx={{ cursor: "pointer" }}
        variant='dot'>
        {doc.photo_url ? (
          <Avatar src={doc.photo_url} />
        ) : (
          <Avatar sx={{ bgcolor: stoc(doc.display_name) }}>
            {stoni(doc.display_name)}
          </Avatar>
        )}
      </StyledBadge>
    )
  } else {
    return (
      <Box alignItems={"center"} justifyContent={"center"}>
        <CircularProgress size={32} />
      </Box>
    )
  }
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
