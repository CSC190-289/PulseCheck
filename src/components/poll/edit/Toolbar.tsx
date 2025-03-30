import {
  Toolbar as MUIToolbar,
  TextField,
  IconButton,
  Box,
  Typography,
  AppBar,
  Stack,
  FormControlLabel,
  Switch,
  Button,
} from "@mui/material"
import React, { useEffect, useState } from "react"
import api from "@/core/api/firebase"
import useSnackbar from "@/core/hooks/useSnackbar"
import { Description, Done, Edit, MenuOpen } from "@mui/icons-material"
import TimerSwitch from "./TimerSwitch"

interface Props {
  pid: string /* poll id */
  title: string /* poll title from firestore */
  anonymous: boolean | null
  time: number | null
}

/**
 * A toolbar component that allows users to edit the title of a poll.
 * Users can click on the edit icon next to the title to edit it inline and save changes with the Done icon.
 * Below the title it will display the last time the poll was updated.
 * @author VerySirias
 * @returns {JSX.Element}
 */
export default function Toolbar(props: Props) {
  const { pid, time } = props
  const [title, setTitle] = useState(props.title)
  const [isEditing, setIsEditing] = useState(false)
  const snackbar = useSnackbar()
  const [anonymous, setAnonymous] = useState(props.anonymous)

  useEffect(() => {
    async function saveAnonymous(bool: boolean | null) {
      try {
        if (bool === props.anonymous) {
          return
        }
        const ref = api.polls.doc(pid)
        await api.polls.update(ref, {
          anonymous: bool,
        })
      } catch {
        snackbar.show({
          message: "Failed to update",
          type: "error",
        })
      }
    }
    void saveAnonymous(anonymous)
  }, [pid, props.anonymous, anonymous, snackbar])

  async function saveTitle(text: string) {
    const ref = api.polls.doc(pid)
    await api.polls.update(ref, {
      title: text,
    })
  }

  const handleDocClick = () => {
    console.debug("do something")
  }

  const handleTitleClick = () => {
    handleClickEdit()
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
    <AppBar color='inherit' position='relative'>
      <MUIToolbar>
        <Stack direction={"row"} alignItems={"center"} flex={1}>
          <IconButton size='large' color='default' onClick={handleDocClick}>
            <Description fontSize='inherit' />
          </IconButton>
          {isEditing ? (
            <TextField
              size='small'
              placeholder='Poll Title'
              defaultValue={props.title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={handleKeyPress}
              fullWidth
              slotProps={{
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
            <Typography onDoubleClick={handleTitleClick}>{title}</Typography>
          )}
          {!isEditing && (
            <IconButton size='small' color='primary' onClick={handleClickEdit}>
              <Edit />
            </IconButton>
          )}
          <Box flex={1} />
          <FormControlLabel
            label='Anonymous'
            checked={Boolean(anonymous)}
            control={
              <Switch onChange={(e) => setAnonymous(e.target.checked)} />
            }
          />
          <TimerSwitch pid={pid} time={time} />
          <Button>Host Poll</Button>
          <IconButton>
            <MenuOpen />
          </IconButton>
        </Stack>
        {/* <Typography variant='body2'>
          Last Updated:{" "}
          {updatedAt ? updatedAt.toDate().toLocaleDateString() : ""}
        </Typography> */}
      </MUIToolbar>
    </AppBar>
  )
}
