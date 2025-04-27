import {
  Toolbar as MUIToolbar,
  Typography,
  Stack,
  AppBar,
  IconButton,
} from "@mui/material"
import { Timestamp } from "firebase/firestore"
import { tstos } from "@/utils"
import { ArrowBack } from "@mui/icons-material"
import { useNavigate } from "react-router-dom"

/**
 * A toolbar component that allows users to edit the title of a poll.
 * Users can click on the edit icon next to the title to edit it inline and save changes with the Done icon.
 * Below the title it will display the last time the poll was updated.
 * @author VerySirias
 * @returns {JSX.Element}
 */
interface HeaderProps {
  title: string | undefined
  create_at: Timestamp
}

export default function Header(props: HeaderProps) {
  const { title, create_at } = props
  const navigate = useNavigate()

  return (
    <AppBar color='inherit' position='relative'>
      <MUIToolbar>
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
              Submitted at {tstos(create_at)}
            </Typography>
          </Stack>
        </Stack>
      </MUIToolbar>
    </AppBar>
  )
}
