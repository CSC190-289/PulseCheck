import LeaveButton from "@/components/poll/session/LeaveButton"
import StartButton from "@/components/poll/session/host/StartButton"
import UserSessionCard from "@/components/poll/session/UserSessionCard"
import api from "@/core/api/firebase"
import { useAuthContext } from "@/core/hooks"
import { SessionQuestion, WaitingUser } from "@/core/types"
import { RA } from "@/styles"
import { ntops } from "@/utils"
import {
  AppBar,
  Box,
  Button,
  Container,
  Grid2,
  LinearProgress,
  Toolbar,
  Typography,
} from "@mui/material"
import {
  doc,
  DocumentReference,
  getDoc,
  onSnapshot,
  serverTimestamp,
  setDoc,
} from "firebase/firestore"
import React, { useEffect, useState } from "react"
import { useCollection, useDocumentData } from "react-firebase-hooks/firestore"
import { useNavigate, useParams } from "react-router-dom"

export default function PollHost() {
  const params = useParams()
  const { user, loading } = useAuthContext()
  const sid = params.id ?? ""
  const sref = api.sessions.doc(sid)
  const [session, sessionLoading] = useDocumentData(sref)
  const [users] = useCollection(api.sessions.users.collect(sid))
  const navigate = useNavigate()
  const [gettingstated, setGettingStated] = useState(false)
  const [question, setQuestion] = useState<SessionQuestion | null>(null)
  const [questions, setQuestions] = useState<
    DocumentReference<SessionQuestion>[]
  >([])

  console.debug("question", question)
  console.debug("questions", questions)

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
        void navigate("/dashboard")
      } else if (session.state === "in-progress") {
        setGettingStated(true)
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
    const usersRef = api.sessions.users.collect(sid)
    const wuRef = api.sessions.waiting_users.collect(sid)
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
        const arr = await api.sessions.start(sref)
        setQuestions(arr)
      } catch (err) {
        console.debug(err)
      }
    }
    void start()
  }

  const handleNextQuestion = () => {
    async function next() {
      try {
        /* TODO - go to next question */
        if (questions.length === 0) {
          console.debug("no mas questions!")
          await api.sessions.updateByRef(sref, {
            question: null,
          })
          return
        }
        setQuestions((prev) => prev.slice(1))
        await api.sessions.updateByRef(sref, {
          question: questions[0],
        })
      } catch (err) {
        console.debug(err)
      }
    }
    void next()
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
          {gettingstated ? (
            <Button onClick={handleNextQuestion}>Next</Button>
          ) : (
            <StartButton callback={handleStartSession} />
          )}
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 2 }}>
        {!gettingstated && (
          <Typography variant='h5' mb={2}>
            Room Code: {session?.room_code}
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
    </React.Fragment>
  )
}
