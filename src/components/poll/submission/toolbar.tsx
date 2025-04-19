import { Toolbar as MUIToolbar, Typography, Stack, AppBar } from "@mui/material"
import { Timestamp } from "firebase/firestore"
import { tstos } from "@/utils"

/**
 * A toolbar component that allows users to edit the title of a poll.
 * Users can click on the edit icon next to the title to edit it inline and save changes with the Done icon.
 * Below the title it will display the last time the poll was updated.
 * @author VerySirias
 * @returns {JSX.Element}
 */
interface Props {
  title: string | undefined
  create_at: Timestamp
}

export default function Toolbar(props: Props) {
  const { title, create_at } = props
  return (
    <AppBar color='inherit' position='relative'>
      <MUIToolbar>
        <Stack alignItems={"center"} flexGrow={1}>
          <Typography variant='h6'>{title}</Typography>
          <Typography variant='subtitle2'>
            Submitted at {tstos(create_at)}
          </Typography>
        </Stack>
      </MUIToolbar>
    </AppBar>
  )
}
