import { Container, Typography, Box, Stack, Grid2 } from "@mui/material"
//import { useSnackbar } from "@/lib/hooks"
import { useDocumentDataOnce } from "react-firebase-hooks/firestore"
import api from "@/lib/api/firebase"
import PollMetricsCard from "@/components/poll/results/PollMetricsCard"
import { useParams } from "react-router-dom"
import Header from "@/components/poll/results/submission/Header"
import React, { useEffect, useState } from "react"
import AnswerCard from "@/components/poll/results/AnswerCard"
import { getDoc } from "firebase/firestore"
import { Session } from "@/lib/types"
import SubmissionGaugeCard from "@/components/graphs/SubmissionGaugeCard"

/**
 * Allows users to set the settings for a question of a poll.
 * @author VerySirias
 * @returns {JSX.Element}
 */

// interface Props {
//   //submission: submissionProp
// }

export default function SubmissionResults() {
  const params = useParams()
  const id = params.id ?? ""
  const ref = api.submissions.doc(id)
  const [sub] = useDocumentDataOnce(ref)
  const [session, setSession] = useState<Session>()

  useEffect(() => {
    if (sub !== null && sub !== undefined) {
      getDoc(sub.session)
        .then((x) => {
          setSession(x.data())
        })
        .catch((err) => console.debug(err))
    }
  }, [sub])
  // const [users] = useCollection(api.sessions.users.collect(id))

  //  const snackbar = useSnackbar()
  //  const user = sub?.user
  return (
    <React.Fragment>
      {session?.title && sub?.submitted_at && (
        <Header
          title={session?.title}
          submitted_at={sub?.submitted_at}></Header>
      )}
      <Container sx={{ mt: 2, textAlign: "initial" }}>
        <Stack spacing={1}>
          <Typography variant='h6'>{sub?.display_name}</Typography>
          <SubmissionGaugeCard mrpsd={0} />
          <Stack>
            {sub?.session && (
              <PollMetricsCard sum={session?.summary}></PollMetricsCard>
            )}
          </Stack>
          <Grid2></Grid2>
          <Stack>
            {session?.questions.map((x) => <AnswerCard key={x.id} qref={x} />)}
          </Stack>
        </Stack>
      </Container>
    </React.Fragment>
  )
}
