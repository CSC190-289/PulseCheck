import {
  Toolbar as MUIToolbar,
  TextField,
  IconButton,
  Box,
  Typography,
  Skeleton,
} from "@mui/material"
import { Timestamp } from "firebase/firestore"
import { useState } from "react"
import api from "@/core/api/firebase"
import useSnackbar from "@/core/hooks/useSnackbar"
import { Done, Edit } from "@mui/icons-material"

interface Props {
  pid: string /* poll id */
  title: string /* poll title from firestore */
  updatedAt: Timestamp
}

/**
 * A toolbar component that allows users to edit the title of a poll.
 * Users can click on the edit icon next to the title to edit it inline and save changes with the Done icon.
 * Below the title it will display the last time the poll was updated.
 * @author VerySirias
 * @returns {JSX.Element}
 */
export default function Toolbar(props: Props) {
  const { pid, updatedAt } = props
  const [title, setTitle] = useState(props.title)
  const [isEditing, setIsEditing] = useState(false)
  const snackbar = useSnackbar()

  async function saveTitle(text: string) {
    const ref = api.polls.doc(pid)
    await api.polls.update(ref, {
      title: text,
    })
  }

  const handleClickEdit = () => {
    if (isEditing) {
      saveTitle(title)
        .then(() => {
          setIsEditing(false)
        })
        .catch(() => {
          setIsEditing(true)
          snackbar.show({
            type: "error",
            message: "Failed to update poll",
          })
        })
    } else {
      setIsEditing(true)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.code === "Enter") {
      handleClickEdit()
    }
  }

  return (
    <MUIToolbar
      sx={{
        boxShadow: "2px 2px rgba(0,0,0,0.1)",
      }}>
      <Box flex={1}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
          {isEditing ? (
            <TextField
              size='small'
              placeholder='Poll Title'
              hiddenLabel
              defaultValue={props.title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={handleKeyPress}
              fullWidth
              sx={{ mt: 1 }}
              slotProps={{
                htmlInput: {
                  style: { textAlign: "center" },
                },
                input: {
                  endAdornment: isEditing && (
                    <IconButton color='primary' onClick={handleClickEdit}>
                      <Done />
                    </IconButton>
                  ),
                },
              }}
            />
          ) : (
            <Typography variant='h6'>{title}</Typography>
          )}
          {!isEditing && (
            <IconButton size='small' color='primary' onClick={handleClickEdit}>
              <Edit />
            </IconButton>
          )}
        </Box>
        {updatedAt ? (
          <Typography variant='body2'>
            Last Updated: {updatedAt.toDate().toLocaleDateString()}
          </Typography>
        ) : (
          <Skeleton variant='text' />
        )}
      </Box>
    </MUIToolbar>
  )
}
