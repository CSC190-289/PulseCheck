import api from "@/core/api/firebase"
import { useAuthContext } from "@/core/hooks"
import { WaitingUser } from "@/core/types"
import { AppBar, Button, Toolbar } from "@mui/material"
import { doc, onSnapshot, serverTimestamp, setDoc } from "firebase/firestore"
import React, { useEffect } from "react"
import { useCollection } from "react-firebase-hooks/firestore"
import { useNavigate, useParams } from "react-router-dom"

export default function PollHost() {
  const params = useParams()
  const { user, loading } = useAuthContext()
  const sid = params.id ?? ""
  const ref = api.polls.sessions.doc(sid)
  const [users] = useCollection(api.polls.sessions.users.collect(sid))
  const navigate = useNavigate()

  console.debug("session.ref", ref)
  console.debug("session.users", users)

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
    const usersRef = api.polls.sessions.users.collect(sid)
    const wuRef = api.polls.sessions.waiting_users.collect(sid)
    const unsubscribe = onSnapshot(wuRef, (snapshot) => {
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
    return () => unsubscribe()
  }, [sid])

  return (
    <React.Fragment>
      <AppBar color='inherit' position='relative'>
        <Toolbar>
          <Button>Finish</Button>
          <Button>Next Question</Button>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  )
}
