import api from "@/lib/api/firebase"
import { useAuthContext } from "@/lib/hooks"
import { Submission } from "@/lib/types"
import { Container, Grid2, TextField } from "@mui/material"
import React, { ChangeEvent, useEffect, useState } from "react"
import SubmissionCard from "./SubmissionCard"
import { QueryDocumentSnapshot } from "firebase/firestore/lite"
import { RA } from "@/styles"

export default function PollSubmissionHistory() {
  const { user, loading } = useAuthContext()
  const [submissions, setSubmissions] = useState<
    QueryDocumentSnapshot<Submission>[]
  >([])
  const [filteredSubmissions, setFilteredSubmissions] = useState<
    QueryDocumentSnapshot<Submission>[]
  >([])

  const [filter, setFilter] = useState("")

  useEffect(() => {
    setTimeout(() => {
      const filtered = submissions
        .filter((x) =>
          x.data().title.toLowerCase().includes(filter.toLowerCase())
        )
        .sort((x, y) => {
          const xdate = x.data().submitted_at.toMillis()
          const ydate = y.data().submitted_at.toMillis()
          return ydate - xdate
        })
      setFilteredSubmissions(filtered)
    }, 250)
  }, [filter, submissions])

  useEffect(() => {
    if (user && !loading) {
      /* call submissions api and set submissions */
      api.submissions
        .findUserSubmissions(user.uid)
        .then((x) => {
          setSubmissions(x)
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
              label='Filter your submissions by poll title...'
              fullWidth
              onChange={onChange}
            />
          </Grid2>
          {filteredSubmissions.map((x) => (
            <Grid2 key={x.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <RA.Fade triggerOnce cascade>
                <SubmissionCard sid={x.id} submission={x.data()} />
              </RA.Fade>
            </Grid2>
          ))}
        </Grid2>
      </Container>
    </React.Fragment>
  )
}
