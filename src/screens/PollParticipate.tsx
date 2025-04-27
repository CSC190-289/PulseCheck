import Header from "@/components/poll/session/participate/Header"
import ResponseDialog from "@/components/poll/session/participate/ResponseDialog"
import ResultsChart from "@/components/poll/session/ResultsChart"
import UserSessionGrid from "@/components/poll/session/UserSessionGrid"
import api from "@/lib/api/firebase"
import { useAuthContext, useSnackbar } from "@/lib/hooks"
import { SessionState } from "@/lib/types"
import { Box, Container, LinearProgress, Typography } from "@mui/material"
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
      } else if (session.state === SessionState.FINISHED) {
        snackbar.show({
          message: "Poll Session Finished!",
          type: "success",
        })
        /* navigate to submission */
        if (!user) return
        api.sessions.submissions
          .get(sref.id, user.uid)
          .then((x) => {
            void navigate(`/poll/submission/${x.ref.id}/results`, {
              state: {
                finished: true,
              },
            })
          })
          .catch((err) => console.debug(err))
      }
    }
  }, [session, sessionLoading, snackbar, navigate, sref.id, user])

  useEffect(() => {
    const int = setInterval(() => {
      /* check to ensure user is in session every few seconds */
      const aux = async () => {
        if (!user && !loading) {
          void navigate("/")
        }
        if (!user) return
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

  return (
    <React.Fragment>
      <ResponseDialog session={session} sref={sref} />
      <Header sid={sid} session={session} users={users} />
      {!gettingstated && <LinearProgress />}
      <Container sx={{ mt: 2 }}>
        {!gettingstated && (
          <Typography variant='h5' mb={2}>
            Waiting for Host...
          </Typography>
        )}
        {session?.results && (
          <Box marginBlock={2}>
            <ResultsChart results={session.results} />
          </Box>
        )}
        {/* render the users who are in the poll session */}
        <UserSessionGrid
          users={users}
          results={session?.results}
          anonymous={
            Boolean(session?.anonymous) ||
            Boolean(session?.results?.question?.anonymous)
          }
        />
      </Container>
    </React.Fragment>
  )
}
