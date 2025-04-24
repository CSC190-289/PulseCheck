import {
  Container,
  Typography,
  Box,
  Stack,
  Grid2,
  Card,
  CardContent,
} from "@mui/material"
//import { useSnackbar } from "@/lib/hooks"
import { useDocumentDataOnce } from "react-firebase-hooks/firestore"
import api from "@/lib/api/firebase"
import ScoreDetails from "@/components/poll/submission/scoreDetails"
import { useParams } from "react-router-dom"
import ToolbarParticpant from "@/components/poll/submission/ToolbarParticpant"
import React, { useEffect, useState } from "react"
import SubAnswerCard from "@/components/poll/submission/subAnswerCard"
import { getDoc } from "firebase/firestore"
import { Session } from "@/lib/types"
import ParticipantScoreDetails from "@/components/poll/submission/ParticipantScoreDetails"
import MostRecentScores from "@/components/graphs/MostRecentScore"

/**
 * Allows users to set the settings for a question of a poll.
 * @author VerySirias
 * @returns {JSX.Element}
 */

// interface Props {
//   //submission: submissionProp
// }

export default function PollResults() {
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
  console.debug(session?.questions)
  return (
    <React.Fragment>
      {session?.title && sub?.submitted_at && (
        <ToolbarParticpant
          title={session?.title}
          submitted_at={sub?.submitted_at}></ToolbarParticpant>
      )}
      <Container maxWidth='xs' sx={{ textAlign: "initial" }}>
        <Box mt={2}>
          <Stack spacing={1}>
            <Card>
              <CardContent>
                <Typography variant='h6' textAlign='center'>
                  {sub?.display_name}
                </Typography>
                <Typography
                  variant='body2'
                  color='textSecondary'
                  textAlign='center'>
                  Your Total Sorce Is {sub?.score}
                </Typography>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <ScoreDetails sum={session?.summary}></ScoreDetails>
              </CardContent>
            </Card>
            {/* {sub?.session && <></>} */}
            {session?.questions?.map((x) => (
              <Grid2 key={x.path} size={{ xl: 30, lg: 30, md: 30, xs: 30 }}>
                <Typography>{JSON.stringify(x.path)}</Typography>
              </Grid2>
            ))}
          </Stack>
        </Box>
      </Container>
    </React.Fragment>
  )
}
