import api from "@/core/api/firebase"
import { useAuthContext } from "@/core/hooks"
import { SessionState, WaitingUser } from "@/core/types"
import { Box, Container, LinearProgress } from "@mui/material"
import { onSnapshot } from "firebase/firestore"
import React, { useEffect } from "react"
import { useCollection, useDocumentData } from "react-firebase-hooks/firestore"
import { useNavigate, useParams } from "react-router-dom"
import RoomCodeTitle from "@/components/poll/session/host/RoomCodeTitle"
import UserSessionGrid from "@/components/poll/session/UserSessionGrid"
import ResultsChart from "@/components/poll/session/ResultsChart"
import Header from "@/components/poll/session/host/Header"
import QuestionBox from "@/components/poll/session/host/QuestionBox"

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

  return (
    <React.Fragment>
      <Header sref={sref} session={session} users={users} />
      <Container sx={{ mt: 2 }}>
        <RoomCodeTitle session={session} />
        {/* render the current question */}
        {question && (
          <Box mb={2}>
            <QuestionBox question={question} />
          </Box>
        )}
        {session?.results && <ResultsChart results={session.results} />}
        {/* render users currently in the poll session */}
        <UserSessionGrid users={users} />
      </Container>
    </React.Fragment>
  )
}
