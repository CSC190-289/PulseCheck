import { useAuthContext } from "@/lib/hooks"
import { Submission } from "@/lib/types"
import { Container, TextField } from "@mui/material"
import { QuerySnapshot } from "firebase/firestore"
import React, { useEffect, useState } from "react"

export default function PollSubmissionHistory() {
  const { user, loading } = useAuthContext()
  const [submissions, setSubmissions] = useState<QuerySnapshot<Submission>>()

  useEffect(() => {
    console.debug("submissions", submissions)
  }, [submissions])

  useEffect(() => {
    if (user && !loading) {
      /* call submissions api and set submissions */
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
