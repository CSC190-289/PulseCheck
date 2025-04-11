import LeaveButton from "@/components/poll/session/LeaveButton"
import ResponseDialog from "@/components/poll/session/participate/ResponseDialog"
import UserSessionGrid from "@/components/poll/session/UserSessionGrid"
import api from "@/core/api/firebase"
import { useAuthContext, useSnackbar } from "@/core/hooks"
import { SessionState } from "@/core/types"
import { ntops } from "@/utils"
import {
  AppBar,
  Box,
  Container,
  LinearProgress,
  Toolbar,
  Typography,
} from "@mui/material"
import { deleteDoc, doc } from "firebase/firestore"
import React, { useEffect, useState } from "react"
import { useCollection, useDocumentData } from "react-firebase-hooks/firestore"
import { useNavigate, useParams } from "react-router-dom"

const CHECK_INTERVAL_MS = 2000

export function PollParticipate() {
  const params = useParams()
  const sid = params.id ?? ""
  const { user, loading } = useAuthContext()
  const navigate = useNavigate()
  const snackbar = useSnackbar()
  const sref = api.sessions.doc(sid)
  const [session, sessionLoading] = useDocumentData(sref)
  const [users] = useCollection(api.sessions.users.collect(sid))
  const [gettingstated, setGettingStated] = useState(false)
  /** the current questiont to be shown */
  // const question = session?.question

  useEffect(() => {
    if (session && !sessionLoading) {
      if (session.state === SessionState.CLOSED) {
        snackbar.show({
          message: "Host Ended Session",
          type: "info",
        })
        void navigate("/poll/join")
      } else if (session.state === SessionState.IN_PROGRESS) {
        setGettingStated(true)
      }
    }
  }, [session, sessionLoading, snackbar, navigate])

  useEffect(() => {
    const int = setInterval(() => {
      const aux = async () => {
        if (!user && !loading) {
          void navigate("/")
        }
        if (!user) {
          return
        }
        const uid = user.uid
        const hasJoined = await api.sessions.hasJoined(sid, uid)
        if (!hasJoined) {
          if (user.isAnonymous) {
            await user.delete()
            await navigate("/get-started")
          } else {
            await navigate("/poll/join")
          }
        } else {
          const wuref = api.sessions.waiting_users.collect(sid)
          void deleteDoc(doc(wuref, user.uid))
        }
      }
      void aux()
    }, CHECK_INTERVAL_MS)
    return () => {
      clearInterval(int)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function leaveSession() {
    async function aux() {
      if (!user) {
        return
      }
      try {
        const uid = user.uid
        await api.sessions.leaveSession(sid, uid)
        snackbar.show({
          message: "You left the session",
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
    <React.Fragment>
      {/* @tdhillion113 If you're reading this, then you're on the track.
            I need you to implement this component below.
      */}
      <ResponseDialog session={session} sref={sref} />
      <AppBar color='inherit' position='relative'>
        <Toolbar>
          <LeaveButton
            callback={leaveSession}
            dialogTitle='Are you sure you want to leave?'
            dialogContent='All answers you submitted will be discarded.'
          />
          <Box textAlign={"initial"}>
            <Typography>{session?.title}</Typography>
            <Typography
              variant='caption'
              component={"div"}
              color='textSecondary'>
              {ntops(users?.docs.length ?? 0)}
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
      {!gettingstated && <LinearProgress />}
      <Container sx={{ mt: 2 }}>
        {!gettingstated && (
          <Typography variant='h5' mb={2}>
            Waiting for Host...
          </Typography>
        )}
        {/* render the current question here */}
        {/* {question && (
          <Box mb={3}>
            {question.prompt_img && (
              <img
                style={{ width: 300, objectFit: "contain" }}
                src={question.prompt_img}
              />
            )}
            <Typography variant='h6'>{question.prompt}</Typography>
            <Stack spacing={3} mt={3} direction={"column"}>
              {question.options.map((x) => (
                <Button key={x} variant='outlined'>
                  {x}
                </Button>
              ))}
            </Stack>
          </Box>
        )} */}
        {/* render the users who are in the poll session */}
        <UserSessionGrid users={users} />
      </Container>
    </React.Fragment>
  )
}
