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
import { useLocation, useNavigate } from "react-router-dom"

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
  const location = useLocation()

  const onClick = () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (location.state?.finished) {
      void navigate("/poll/history")
    } else {
      void navigate(-1)
    }
  }

  return (
    <AppBar color='inherit' position='relative'>
      <MUIToolbar>
        <Stack direction={"row"} flexGrow={1} spacing={1}>
          <IconButton onClick={onClick}>
            <ArrowBack color='inherit' />
          </IconButton>
          <Stack alignItems={"flex-start"}>
            <Typography variant='h6'>{title}</Typography>
            <Typography variant='subtitle2'>
              Created {tstos(create_at)}
            </Typography>
          </Stack>
        </Stack>
      </MUIToolbar>
    </AppBar>
  )
}
