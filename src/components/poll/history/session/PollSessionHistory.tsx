import api from "@/lib/api/firebase"
import { useAuthContext } from "@/lib/hooks"
import { Container, Grid2, TextField } from "@mui/material"
import { QueryDocumentSnapshot } from "firebase/firestore"
import React, { ChangeEvent, useEffect, useState } from "react"
import SessionCard from "./SessionCard"
import { Session } from "@/lib/types"
import { RA } from "@/styles"

export default function PollSessionHistory() {
  const { user, loading } = useAuthContext()
  const [sessions, setSessions] = useState<QueryDocumentSnapshot<Session>[]>([])
  const [filteredSessions, setFilteredSession] = useState<
    QueryDocumentSnapshot<Session>[]
  >([])

  const [filter, setFilter] = useState("")

  useEffect(() => {
    setTimeout(() => {
      const filtered = sessions.filter((x) =>
        x.data().title.toLowerCase().includes(filter.toLowerCase())
      )
      setFilteredSession(filtered)
    }, 250)
  }, [filter, sessions])

  useEffect(() => {
    if (user && !loading) {
      /* call session api here and set sessions */
      api.sessions
        .findUserSessions(user.uid)
        .then((x) => {
          setSessions(x)
        })
        .catch((err) => console.debug(err))
    }
  }, [user, loading])

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value)
  }

  return (
    <React.Fragment>
      <Container sx={{ mt: 2 }}>
        <Grid2 container spacing={1}>
          <Grid2 size={12}>
            <TextField
              label='Search your poll sessions by name...'
              fullWidth
              onChange={onChange}
            />
          </Grid2>
          {filteredSessions.map((x) => (
            <Grid2 key={x.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <RA.Fade triggerOnce cascade>
                <SessionCard sid={x.id} session={x.data()} />
              </RA.Fade>
            </Grid2>
          ))}
        </Grid2>
      </Container>
    </React.Fragment>
  )
}
