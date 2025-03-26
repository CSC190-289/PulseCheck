/* eslint-disable react-hooks/exhaustive-deps */
import api from "@/core/api/firebase"
import {
  Typography,
  Container,
  Box,
  Toolbar,
  Button,
  Fab,
  LinearProgress,
} from "@mui/material"
import { useNavigate, useParams } from "react-router-dom"
import React, { useEffect, useState } from "react"
import { Message } from "@mui/icons-material"
import useSnackbar from "@/core/hooks/useSnackbar"
import { useAuthContext } from "@/core/hooks"

const CHECK_INTERVAL_MS = 2000

export default function PollSession() {
  const params = useParams()
  const sid = params.id ?? ""
  const { user, loading } = useAuthContext()
  const snackbar = useSnackbar()
  const navigate = useNavigate()
  const [status, setStatus] = useState("Joining Session...")

  useEffect(() => {
    const aux = async () => {
      if (!user || loading) {
        return
      }
      try {
        const uid = user.uid
        const hasJoined = await api.polls.sessions.hasJoined(sid, uid)
        if (hasJoined) {
          void navigate(`/poll/session/${sid}/participate`)
        }
        const isWaiting = await api.polls.sessions.isWaitingForEntry(sid, uid)
        if (!isWaiting) {
          setStatus("Access Denied!")
          if (user.isAnonymous) {
            await user.delete()
            await navigate("/get-started", { replace: true })
            throw new Error("Unauthorized (Guest-Poll-Session)")
          } else {
            await navigate("/poll/join", { replace: true })
            throw new Error("Unauthorized (User-Poll-Session)")
          }
        } else {
          setStatus("Waiting to Join Session...")
        }
      } catch (err: unknown) {
        console.debug(err)
      }
    }
    /* check every now and then if user has joined the session */
    const int = setInterval(() => {
      void aux()
    }, CHECK_INTERVAL_MS)
    return () => {
      clearInterval(int)
    }
  }, [])

  function handleLeave() {
    async function aux() {
      if (!user) {
        return
      }
      try {
        const uid = user.uid
        if (await api.polls.sessions.isWaitingForEntry(sid, uid)) {
          await api.polls.sessions.leaveQueue(sid, uid)
        } else if (await api.polls.sessions.hasJoined(sid, uid)) {
          await api.polls.sessions.leaveSession(sid, uid)
        }
        snackbar.show({
          message: `You left the session`,
          type: "info",
        })
        if (user.isAnonymous) {
          await user.delete()
          void navigate("/get-started", { replace: true })
        } else {
          void navigate("/poll/join", { replace: true })
        }
      } catch (err: unknown) {
        console.error(err)
      }
    }
    void aux()
  }

  return (
    <Box
      position={"relative"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      height={"80vh"}>
      <Box>
        <Typography variant='h6'>{status}</Typography>
        {/* <Typography variant='h6'>Waiting for host approval...</Typography> */}
        <LinearProgress />
      </Box>
      <Box position={"absolute"} bottom={8} display={"flex"} flex={1}>
        <Button variant='contained' onClick={handleLeave}>
          Leave
        </Button>
      </Box>
    </Box>
  )

  return (
    <React.Fragment>
      <Toolbar
        sx={{
          justifyContent: "center",
          boxShadow: "2px 2px rgba(0,0,0,0.1)",
        }}>
        <Button onClick={handleLeave}>Leave</Button>
        <Box flexGrow={1} />
        <Box position={"absolute"}>
          <Typography variant='h6'>Poll Title Goes Here</Typography>
          {/* <Typography>{itops(session.users.length || 0)}</Typography> */}
        </Box>
      </Toolbar>
      <Container sx={{ mt: 2 }}>
        {/* <Grid2 container spacing={2}>
          {session?.users.map((x) => (
            <Grid2 key={x} size={{ lg: 3, md: 4, sm: 6, xs: 12 }}>
              <RA.Zoom triggerOnce>
                <UserSessionCard userId={x} />
              </RA.Zoom>
            </Grid2>
          ))}
        </Grid2> */}
        <Fab
          color='primary'
          onClick={() =>
            snackbar.show({ type: "error", message: "Not Yet Implemented" })
          }
          sx={{ position: "absolute", bottom: 0, right: 0, mr: 2, mb: 2 }}>
          <Message />
        </Fab>
      </Container>
    </React.Fragment>
  )
}
