import {
  Toolbar as MUIToolbar,
  TextField,
  IconButton,
  Box,
  Typography,
} from "@mui/material"
import { Timestamp } from "firebase/firestore"
import { useEffect, useState } from "react"
import api from "@/core/api"
import useSnackbar from "@/core/hooks/useSnackbar"
import { Done, Edit } from "@mui/icons-material"

interface Props {
  /* TODO - declare props here */
  pid: string
  title: string /* poll title from firestore */
  lastUpdated: Timestamp
}

/**
 * A toolbar component that allows users to edit the title of a poll.
 * Users can click on the edit icon next to the title to edit it inline and save changes with the Done icon.
 * Below the title it will display the last time the poll was updated.
 * @author VerySirias
 * @returns {JSX.Element}
 */
export default function Toolbar(props: Props) {
  const { pid, lastUpdated } = props
  const [title, setTitle] = useState(props.title)
  const [isEditing, setIsEditing] = useState(true)
  const snackbar = useSnackbar()

  const handleClickEdit = () => {
    if (isEditing === true) {
      setIsEditing(false)
    } else {
      setIsEditing(true)
    }
    return isEditing
  }

  useEffect(() => {
    async function savePrompt(text: string) {
      try {
        /* keep this to skip first onMount */
        if (text === props.title) {
          return
        }
        const ref = api.polls.doc(pid)
        await api.polls.update(ref, {
          title: text,
        })
      } catch {
        snackbar.show({
          message: "Failed to update",
          type: "error",
        })
      }
    }
    if (isEditing === true) {
      void savePrompt(title)
    }
  }, [pid, props.title, title, snackbar, isEditing])

  return (
    <MUIToolbar
      sx={{
        boxShadow: "2px 2px rgba(0,0,0,0.1)",
        justifyContent: "center",
      }}>
      <Box>
        <Box
          sx={{
            display: "flex",
            flexGrow: 1,
            marginTop: 1,
            alignItems: "center",
            justifyContent: "center",
          }}>
          <TextField
            size='small'
            placeholder='Poll Title'
            hiddenLabel
            defaultValue={props.title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isEditing}
            fullWidth
          />
          {isEditing ? (
            <IconButton color='primary' onClick={handleClickEdit}>
              <Edit />
            </IconButton>
          ) : (
            <IconButton color='primary' onClick={handleClickEdit}>
              <Done />
            </IconButton>
          )}
        </Box>
        <Box
          sx={{
            alignItems: "center",
            justifyContent: "center",
          }}>
          <Typography variant='caption'>
            Last Updated: {lastUpdated.toDate().toDateString()}
          </Typography>
        </Box>
      </Box>
    </MUIToolbar>
  )
}
