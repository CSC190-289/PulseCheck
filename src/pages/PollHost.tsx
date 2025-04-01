import LeaveButton from "@/components/poll/session/LeaveButton"
import StartButton from "@/components/poll/session/StartButton"
import UserSessionCard from "@/components/poll/session/UserSessionCard"
import api from "@/core/api/firebase"
import { useAuthContext } from "@/core/hooks"
import { WaitingUser } from "@/core/types"
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
import { doc, onSnapshot, serverTimestamp, setDoc } from "firebase/firestore"
import React, { useEffect, useState } from "react"
import { useCollection, useDocumentData } from "react-firebase-hooks/firestore"
import { useNavigate, useParams } from "react-router-dom"

export default function PollHost() {
  const params = useParams()
  const { user, loading } = useAuthContext()
  const sid = params.id ?? ""
  const sref = api.polls.sessions.doc(sid)
  const [session, sessionLoading] = useDocumentData(sref)
  const [users] = useCollection(api.polls.sessions.users.collect(sid))
  const navigate = useNavigate()
  const [gettingstated, setGettingStated] = useState(false)

  useEffect(() => {
    if (session && !sessionLoading) {
      if (session.state === "closed") {
        void navigate("/dashboard")
      } else if (session.state === "in-progress") {
        setGettingStated(true)
      }
    }
  }, [session, sessionLoading, navigate])

  useEffect(() => {
    /* ensure user is host */
    if (user && !loading) {
      api.polls.sessions
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
    const usersRef = api.polls.sessions.users.collect(sid)
    const wuRef = api.polls.sessions.waiting_users.collect(sid)
    const unsubscribeUsers = onSnapshot(wuRef, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        async function addUser(userId: string, data: WaitingUser) {
          try {
            await setDoc(doc(usersRef, userId), {
              display_name: data.display_name,
              photo_url: data.photo_url,
              joined_at: serverTimestamp(),
              incorrect: false,
            })
          } catch (err) {
            console.debug(err)
          }
        }
        if (change.type === "added") {
          const userId = change.doc.id
          const userData = change.doc.data()
          void addUser(userId, userData)
        }
      })
    })
    // eslint-disable-next-line consistent-return
    return () => {
      unsubscribeUsers()
    }
  }, [sid])

  if (sessionLoading) {
    return <LinearProgress />
  }

  const handleStartSession = () => {
    async function start() {
      try {
        await api.polls.sessions.start(sref)
      } catch (err) {
        console.debug(err)
      }
    }
    void start()
  }

  const handleEndSession = () => {
    async function end() {
      try {
        await api.polls.sessions.close(sref)
        await navigate("/dashboard", { replace: true })
      } catch (err) {
        console.debug(err)
      }
    }
    void end()
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
          {!gettingstated && <StartButton callback={handleStartSession} />}
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 2 }}>
        {!gettingstated && (
          <Typography variant='h5' mb={2}>
            Room Code: {session?.room_code}
          </Typography>
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
    </React.Fragment>
  )
}
