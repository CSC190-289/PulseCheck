import api from "@/lib/api/firebase"
import { useAuthContext } from "@/lib/hooks"
import { Container, Grid2, TextField } from "@mui/material"
import { QuerySnapshot } from "firebase/firestore"
import React, { useEffect, useState } from "react"
import SessionCard from "./SessionCard"
import { Session } from "@/lib/types"

export default function PollSessionHistory() {
  const { user, loading } = useAuthContext()
  const [sessions, setSessions] = useState<QuerySnapshot<Session>>()

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

  return (
    <React.Fragment>
      <Container sx={{ mt: 2 }}>
        <Grid2 container spacing={1}>
          <Grid2 size={12}>
            <TextField label='Search your poll sessions by name...' fullWidth />
          </Grid2>
          {sessions?.docs.map((x) => (
            <Grid2 key={x.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <SessionCard sid={x.id} session={x.data()} />
            </Grid2>
          ))}
        </Grid2>
      </Container>
    </React.Fragment>
  )
}
