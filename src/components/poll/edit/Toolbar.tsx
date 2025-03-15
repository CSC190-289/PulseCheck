import {
  Toolbar as MUIToolbar,
  TextField,
  IconButton,
  Box,
  Typography,
} from "@mui/material"
import { serverTimestamp, Timestamp } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "@/core/api/firebase"
import { doc, updateDoc } from "firebase/firestore"
import useSnackbar from "@/core/hooks/useSnackbar"
import { Done, Edit } from "@mui/icons-material"

interface Props {
  /* TODO - declare props here */
  pollId: string
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
  console.debug("pe.toolbar.props", props)

  const { pollId, lastUpdated } = props
  const [title, setTitle] = useState(props.title)
  const [editTitle, setEditTitle] = useState(true)
  const snackbar = useSnackbar()
  const handleClickEdit = () => {
    if (editTitle === true) {
      setEditTitle(false)
    } else {
      setEditTitle(true)
    }
    return editTitle
  }

  useEffect(() => {
    async function savePrompt(text: string) {
      const ref = doc(db, "polls", pollId)
      try {
        await updateDoc(ref, {
          title: text,
          lastUpdated: serverTimestamp(),
        })
      } catch {
        snackbar.show({
          message: "Failed to update",
          type: "error",
        })
      }
    }
    if (editTitle === true) {
      void savePrompt(title)
    }
  }, [pollId, title, snackbar, editTitle])

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
            label='Title Here'
            hiddenLabel
            defaultValue={props.title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={editTitle}
            fullWidth
          />
          {editTitle ? (
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
