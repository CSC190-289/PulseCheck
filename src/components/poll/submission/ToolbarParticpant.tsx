import api from "@/core/api/firebase"
import { useDocumentDataOnce } from "react-firebase-hooks/firestore"
import { Timestamp } from "firebase/firestore"
import { Toolbar as MUIToolbar, Typography, Stack, AppBar } from "@mui/material"
import { tstos } from "@/utils"
interface Props {
  id: string
  submitted_at: Timestamp
}

export default function ToolbarParticpant(props: Props) {
  const { id, submitted_at } = props
  const ref = api.sessions.doc(id)
  const [session] = useDocumentDataOnce(ref)

  return (
    <AppBar color='inherit' position='relative'>
      <MUIToolbar>
        <Stack alignItems={"center"} flexGrow={1}>
          <Typography variant='h6'>{session?.title}</Typography>
          <Typography variant='subtitle2'>
            Submitted at {tstos(submitted_at)}
          </Typography>
        </Stack>
      </MUIToolbar>
    </AppBar>
  )
}
