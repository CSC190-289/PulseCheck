import { Timestamp } from "firebase/firestore"
import { Toolbar, Typography, Stack, AppBar, IconButton } from "@mui/material"
import { tstos } from "@/utils"
import { ArrowBack } from "@mui/icons-material"
import { useLocation, useNavigate } from "react-router-dom"
import { useAuthContext } from "@/lib/hooks"
import api from "@/lib/api/firebase"

interface HeaderProps {
  title: string
  submitted_at: Timestamp
}

export default function Header(props: HeaderProps) {
  const { title, submitted_at } = props
  const navigate = useNavigate()
  const auth = useAuthContext()
  const location = useLocation()

  const onClick = () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (location.state?.finished) {
      if (auth.user?.isAnonymous) {
        void api.auth.logout()
      } else {
        void navigate("/poll/history")
      }
    } else {
      if (auth.user?.isAnonymous) {
        void api.auth.logout()
      } else {
        void navigate(-1)
      }
    }
  }

  return (
    <AppBar color='inherit' position='relative'>
      <Toolbar>
        <Stack direction={"row"} alignItems={"center"} flexGrow={1}>
          <IconButton onClick={onClick}>
            <ArrowBack color='inherit' />
          </IconButton>
          <Stack alignItems={"flex-start"}>
            <Typography variant='h6'>{title}</Typography>
            <Typography variant='subtitle2'>
              Submitted {tstos(submitted_at)}
            </Typography>
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  )
}
