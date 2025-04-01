import LeaveButton from "@/components/poll/session/LeaveButton"
import UserSessionCard from "@/components/poll/session/UserSessionCard"
import api from "@/core/api/firebase"
import { useAuthContext, useSnackbar } from "@/core/hooks"
import { SessionQuestion } from "@/core/types"
import { RA } from "@/styles"
import { ntops } from "@/utils"
import {
  AppBar,
  Box,
  Button,
  Container,
  Grid2,
  LinearProgress,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material"
import { deleteDoc, doc, getDoc } from "firebase/firestore"
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
  const [session, sessionLoading] = useDocumentData(api.polls.sessions.doc(sid))
  const [users] = useCollection(api.polls.sessions.users.collect(sid))
  const [gettingstated, setGettingStated] = useState(false)
  const [question, setQuestion] = useState<SessionQuestion | null>(null)

  console.debug("question", question)

  useEffect(() => {
    async function aux() {
      if (!(session && !sessionLoading && session.question)) {
        return
      }
      try {
        const ss = await getDoc(session?.question)
        if (!ss.exists()) {
          throw new Error(`question(${ss.id}) does not exist!`)
        }
        const q = ss.data()
        setQuestion(q)
      } catch (err) {
        console.debug(err)
      }
    }
    void aux()
  }, [session, sessionLoading, session?.question])

  useEffect(() => {
    if (session && !sessionLoading) {
      if (session.state === "closed") {
        snackbar.show({
          message: "Host Ended Session",
          type: "info",
        })
        void navigate("/poll/join")
      } else if (session.state === "in-progress") {
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
        const hasJoined = await api.polls.sessions.hasJoined(sid, uid)
        if (!hasJoined) {
          if (user.isAnonymous) {
            await user.delete()
            await navigate("/get-started")
          } else {
            await navigate("/poll/join")
          }
        } else {
          const wuref = api.polls.sessions.waiting_users.collect(sid)
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
        await api.polls.sessions.leaveSession(sid, uid)
        /* TODO - confirm to leave, because this will affect their results */
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
        {question && (
          <Box mb={3}>
            {question.prompt_img && (
              <img
                style={{ width: 700, height: 300, objectFit: "contain" }}
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
        )}
        <Grid2 container spacing={2}>
          {users?.docs.map((x) => (
            <Grid2 key={x.id} size={{ xl: 3, lg: 3, md: 3, sm: 4, xs: 12 }}>
              <RA.Zoom triggerOnce>
                <UserSessionCard user={x.data()} />
              </RA.Zoom>
            </Grid2>
          ))}
        </Grid2>
      </Container>
      {/* <Dialog open={showDialog}>
        <DialogTitle>Are you sure you want to leave?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            All of your answers you submitted so far will be saved.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDialog(false)}>No</Button>
          <Button onClick={handleLeave}>Yes</Button>
        </DialogActions>
      </Dialog> */}
    </React.Fragment>
  )
}
