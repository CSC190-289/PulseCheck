import api from "@/lib/api/firebase"
import { useAuthContext } from "@/lib/hooks"
import { Submission } from "@/lib/types"
import { Container, TextField } from "@mui/material"
import { QuerySnapshot } from "firebase/firestore"
import React, { useEffect, useState } from "react"

export default function PollSessionHistory() {
  const { user, loading } = useAuthContext()
  const [sessions, setSessions] = useState<QuerySnapshot<Submission>>()

  useEffect(() => {
    console.debug("sessions", sessions)
  }, [sessions])

  useEffect(() => {
    if (user && !loading) {
      /* call session api here and set sessions */
    }
  }, [user, loading])

  return (
    <React.Fragment>
      <Container sx={{ mt: 2 }}>
        <TextField fullWidth />
      </Container>
    </React.Fragment>
  )
}
