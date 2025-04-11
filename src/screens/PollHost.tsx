import LeaveButton from "@/components/poll/session/LeaveButton"
import UserSessionCard from "@/components/poll/session/UserSessionCard"
import api from "@/core/api/firebase"
import { useAuthContext } from "@/core/hooks"
import { SessionState, WaitingUser } from "@/core/types"
import { RA } from "@/styles"
import { ntops } from "@/utils"
import {
  AppBar,
  Box,
  Container,
  Grid2,
  LinearProgress,
  Toolbar,
  Typography,
} from "@mui/material"
import { onSnapshot } from "firebase/firestore"
import React, { useEffect } from "react"
import { useCollection, useDocumentData } from "react-firebase-hooks/firestore"
import { useNavigate, useParams } from "react-router-dom"
import HostButton from "@/components/poll/session/host/HostButton"
import RoomTitle from "@/components/poll/session/host/RoomTitle"
import Image from "mui-image"

export default function PollHost() {
  const params = useParams()
  const { user, loading } = useAuthContext()
  const sid = params.id ?? ""
  const sref = api.sessions.doc(sid)
  const [session, sessionLoading] = useDocumentData(sref)
  const [users] = useCollection(api.sessions.users.collect(sid))
  const navigate = useNavigate()
  /** the current questiont to be shown */
  const question = session?.question

  useEffect(() => {
    /* if session exists and is done loading */
    if (session && !sessionLoading) {
      if (session.state === SessionState.CLOSED) {
        void navigate("/dashboard")
      }
    }
  }, [session, sessionLoading, navigate])

  useEffect(() => {
    /* ensure user is host */
    if (user && !loading) {
      api.sessions
        .isHost(sid, user.uid)
        .then((isHost) => {
          if (!isHost) {
            if (user.isAnonymous) {
              void navigate("/get-started")
            } else {
              void navigate("/poll/join")
            }
          }
        })
        .catch((err) => console.debug(err))
    }
  }, [user, loading, navigate, sid])

  useEffect(() => {
    if (!sid) {
      return
    }
    // const usersRef = api.sessions.users.collect(sid)
    const wuRef = api.sessions.waiting_users.collect(sid)
    const unsubscribeUsers = onSnapshot(wuRef, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        async function addUser(userId: string, data: WaitingUser) {
          try {
            await api.sessions.users.set(sid, userId, {
              display_name: data.display_name,
              photo_url: data.photo_url,
              incorrect: false,
            })
          } catch (err) {
            console.debug(err)
          }
        }
        if (change.type === "added") {
          const userId = change.doc.id
          const userData = change.doc.data()
          /* if the session state is open, then allow the user to join */
          if (session && session.state === SessionState.OPEN) {
            void addUser(userId, userData)
          }
        }
      })
    })
    // eslint-disable-next-line consistent-return
    return () => {
      unsubscribeUsers()
    }
  }, [sid, session])

  if (sessionLoading) {
    return <LinearProgress />
  }

  const handleStartSession = () => {
    async function start() {
      try {
        await api.sessions.start(sref)
      } catch (err) {
        console.debug(err)
      }
    }
    void start()
  }

  const handleNextQuestion = () => {
    async function next() {
      try {
        await api.sessions.nextQuestion(sref)
      } catch (err) {
        console.debug(err)
      }
    }
    void next()
  }

  const handleDoneSession = () => {
    /* TOOD - handle when the session is done */
    console.debug("do something!")
  }

  const handleEndSession = () => {
    async function kill() {
      try {
        await api.sessions.close(sref)
        await navigate("/dashboard", { replace: true })
      } catch (err) {
        console.debug(err)
      }
    }
    void kill()
  }

  return (
    <React.Fragment>
      <AppBar color='inherit' position='relative'>
        <Toolbar>
          <LeaveButton
            callback={handleEndSession}
            dialogTitle='Are you sure you want to end the session?'
            dialogContent='All answers submitted will be discarded!'
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
          <Box flex={1} marginInline={2} />
          <HostButton
            state={session?.state}
            startCallback={handleStartSession}
            nextCallback={handleNextQuestion}
            doneCallback={handleDoneSession}
          />
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 2 }}>
        <RoomTitle session={session} />
        {/* render the current question here */}
        {question && (
          <Box mb={3}>
            {question.prompt_img && (
              <Image
                style={{ width: 700, height: 300, objectFit: "contain" }}
                src={question.prompt_img}
              />
            )}
            <Typography variant='h6'>{question.prompt}</Typography>
          </Box>
        )}
        {/* render users currently in the poll session */}
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
    </React.Fragment>
  )
}
