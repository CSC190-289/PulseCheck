import {
  Toolbar,
  TextField,
  IconButton,
  Box,
  Typography,
  AppBar,
  Stack,
  FormControlLabel,
  Switch,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material"
import React, { useEffect, useState } from "react"
import api from "@/lib/api/firebase"
import useSnackbar from "@/lib/hooks/useSnackbar"
import {
  ArrowBack,
  AutoAwesome,
  Done,
  Edit,
  MenuOpen,
  ScreenShare,
} from "@mui/icons-material"
import { useAuthContext } from "@/lib/hooks"
import { useNavigate } from "react-router-dom"
import { Poll } from "@/lib/types"
import DeleteMenuItem from "./DeleteMenuItem"
import UploadPDFDialog from "../UploadPDFDialog"

interface HeaderProps {
  pid: string /* poll id */
  poll: Poll
  // title: string /* poll title from firestore */
  // anonymous: boolean | null
  // time: number | null
}

/**
 * Allows users to edit the title of a poll.
 * Users can click on the edit icon next to the title to edit it inline and save changes with the Done icon.
 * Below the title it will display the last time the poll was updated.
 * @author VerySirias
 * @returns {JSX.Element}
 */
export default function Header(props: HeaderProps) {
  const { pid, poll } = props
  const auth = useAuthContext()
  const [title, setTitle] = useState(poll.title)
  const [isEditing, setIsEditing] = useState(false)
  const snackbar = useSnackbar()
  const [anonymous, setAnonymous] = useState(poll.anonymous)
  const [anchorElPoll, setAnchorElPoll] = useState<HTMLElement | null>(null)
  const navigate = useNavigate()
  const [generateWithAIModal, setGenerateWithAIModal] = useState(false)

  useEffect(() => {
    async function saveAnonymous(bool: boolean | null) {
      try {
        if (bool === poll.anonymous) {
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
  }, [pid, poll, anonymous, snackbar])

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElPoll(event.currentTarget)
  }

  const openGenerateWithAI = () => {
    setGenerateWithAIModal(true)
    handleClose()
  }

  const handleClose = () => {
    setAnchorElPoll(null)
  }

  async function saveTitle(text: string) {
    const ref = api.polls.doc(pid)
    await api.polls.update(ref, {
      title: text,
    })
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

  const handleHostClick = () => {
    if (auth.user) {
      const user = auth.user
      /* create a poll session and host it */
      api.sessions
        .host(pid, user.uid)
        .then((sessionId) => {
          void navigate(`/poll/session/${sessionId}/host`)
        })
        .catch((err) => console.debug(err))
    }
    handleClose()
  }

  return (
    <React.Fragment>
      <AppBar color='inherit' position='relative'>
        <Toolbar>
          <Stack direction={"row"} alignItems={"center"} flex={1}>
            <IconButton
              onClick={() => {
                void navigate(-1)
              }}>
              <ArrowBack />
            </IconButton>
            {isEditing ? (
              <TextField
                size='small'
                placeholder='Poll Title'
                value={title}
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
              <Typography onDoubleClick={handleTitleClick} textAlign={"left"}>
                {title}
              </Typography>
            )}
            {!isEditing && (
              <IconButton
                size='small'
                color='primary'
                onClick={handleClickEdit}>
                <Edit />
              </IconButton>
            )}
            <Box flex={1} marginInline={2} />
            <Box>
              <IconButton onClick={handleOpen} color='inherit'>
                <MenuOpen />
              </IconButton>
              <Menu
                anchorEl={anchorElPoll}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                open={Boolean(anchorElPoll)}
                onClose={handleClose}>
                <MenuItem>
                  <FormControlLabel
                    label='Anonymous'
                    checked={Boolean(anonymous)}
                    control={
                      <Switch
                        onChange={(e) => setAnonymous(e.target.checked)}
                      />
                    }
                  />
                </MenuItem>
                <Divider />
                <MenuItem onClick={openGenerateWithAI}>
                  <ListItemIcon>
                    <AutoAwesome />
                  </ListItemIcon>
                  <ListItemText>Generate with AI</ListItemText>
                </MenuItem>
                {/* <MenuItem>
                <TimerSwitch pid={pid} time={poll.time} />
              </MenuItem> */}
                <Divider />
                <DeleteMenuItem pid={pid} onClick={handleClose} />
                <Divider />
                <MenuItem onClick={handleHostClick}>
                  <ListItemIcon>
                    <ScreenShare />
                  </ListItemIcon>
                  <ListItemText>Host</ListItemText>
                </MenuItem>
              </Menu>
            </Box>
          </Stack>
          {/* <Typography variant='body2'>
          Last Updated:{" "}
          {updatedAt ? updatedAt.toDate().toLocaleDateString() : ""}
        </Typography> */}
        </Toolbar>
      </AppBar>
      <UploadPDFDialog
        pid={pid}
        open={generateWithAIModal}
        onClose={() => setGenerateWithAIModal(false)}
      />
    </React.Fragment>
  )
}
