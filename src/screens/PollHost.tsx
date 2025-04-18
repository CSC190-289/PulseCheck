import LeaveButton from "@/components/poll/session/LeaveButton"
import api, { DEPLOY_URL } from "@/core/api/firebase"
import { useAuthContext } from "@/core/hooks"
import { SessionState, WaitingUser } from "@/core/types"
import { ntops } from "@/utils"
import {
  AppBar,
  Box,
  Container,
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
import UserSessionGrid from "@/components/poll/session/UserSessionGrid"
import { QRCodeSVG } from "qrcode.react"

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

  const handleKillSession = () => {
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
            callback={handleKillSession}
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
          <HostButton sref={sref} session={session} />
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 2 }}>
        <RoomTitle session={session} />
        {session?.state === SessionState.OPEN && (
          <QRCodeSVG
            value={`${DEPLOY_URL}/get-started?code=${session.room_code}`}
            width={256}
            height={256}
          />
        )}
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
        <UserSessionGrid users={users} />
      </Container>
    </React.Fragment>
  )
}
