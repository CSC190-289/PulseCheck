import { Timestamp } from "firebase/firestore"
import { Toolbar, Typography, Stack, AppBar, IconButton } from "@mui/material"
import { tstos } from "@/utils"
import { ArrowBack } from "@mui/icons-material"
import { useNavigate } from "react-router-dom"
interface HeaderProps {
  title: string
  submitted_at: Timestamp
}

export default function Header(props: HeaderProps) {
  const { title, submitted_at } = props
  const navigate = useNavigate()

  return (
    <AppBar color='inherit' position='relative'>
      <Toolbar>
        <Stack direction={"row"} flexGrow={1} spacing={1}>
          <IconButton
            onClick={() => {
              void navigate("/poll/history")
            }}>
            <ArrowBack />
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
