import { Container, Typography, Box, Stack, Divider } from "@mui/material"
//import { useSnackbar } from "@/core/hooks"
import { useDocumentDataOnce } from "react-firebase-hooks/firestore"
import api from "@/core/api/firebase"
import subAnswerCard from "@/components/poll/submission/SubAnswerCard"
import scoreDetails from "@/components/poll/submission/ScoreDetails"
import subChart from "@/components/poll/submission/Subchart"
import { useParams } from "react-router-dom"

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
  //  const snackbar = useSnackbar()
  //  const user = sub?.user
  const display_name = sub?.display_name
  const total_score = sub?.total_score
  const submitted_at = sub?.submitted_at

  return (
    <Container maxWidth='xs' sx={{ textAlign: "initial" }}>
      <Box mt={2}>
        <Stack sx={{ m: 1 }} spacing={1}>
          <Typography variant='h5' textAlign='center'>
            MICHEAL!!!
          </Typography>
          <Divider></Divider>
          <Typography variant='h6' textAlign='center'>
            {display_name}
          </Typography>
          <Typography variant='subtitle2' textAlign='center'>
            Submitted At{" "}
            {submitted_at ? submitted_at.toDate().toLocaleDateString() : ""}
          </Typography>
          <Typography variant='subtitle2' textAlign='center'>
            Your Total Sorce Is {total_score}
          </Typography>

          {subChart()}
          <Stack> {scoreDetails()} </Stack>
          <Stack> {subAnswerCard()}</Stack>
        </Stack>
      </Box>{" "}
      <Box></Box>
    </Container>
  )
}
