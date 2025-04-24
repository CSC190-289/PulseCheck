import { Timestamp } from "firebase/firestore"
import { Toolbar as MUIToolbar, Typography, Stack, AppBar } from "@mui/material"
import { tstos } from "@/utils"
interface Props {
  title: string
  submitted_at: Timestamp
}

export default function ToolbarParticpant(props: Props) {
  const { title, submitted_at } = props

  return (
    <AppBar color='inherit' position='relative'>
      <MUIToolbar>
        <Stack alignItems={"center"} flexGrow={1}>
          <Typography variant='h6'>{title}</Typography>
          <Typography variant='subtitle2'>
            Submitted at {tstos(submitted_at)}
          </Typography>
        </Stack>
      </MUIToolbar>
    </AppBar>
  )
}
