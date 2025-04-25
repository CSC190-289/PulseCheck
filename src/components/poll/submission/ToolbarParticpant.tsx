import { Timestamp } from "firebase/firestore"
import {
  Toolbar as MUIToolbar,
  Typography,
  Stack,
  AppBar,
  IconButton,
} from "@mui/material"
import { tstos } from "@/utils"
import { ArrowBack } from "@mui/icons-material"
import { useNavigate } from "react-router-dom"
interface Props {
  title: string
  submitted_at: Timestamp
}

export default function ToolbarParticpant(props: Props) {
  const { title, submitted_at } = props
  const navigate = useNavigate()

  return (
    <AppBar color='inherit' position='relative'>
      <MUIToolbar>
        <Stack direction={"row"} flexGrow={1} spacing={1}>
          <IconButton
            onClick={() => {
              void navigate(-1)
            }}>
            <ArrowBack />
          </IconButton>
          <Stack alignItems={"flex-start"}>
            <Typography variant='h6'>{title}</Typography>
            <Typography variant='subtitle2'>
              Submitted at {tstos(submitted_at)}
            </Typography>
          </Stack>
        </Stack>
      </MUIToolbar>
    </AppBar>
  )
}
