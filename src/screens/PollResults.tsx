import { Container, Typography, Box, Stack, Grid2 } from "@mui/material"
//import { useSnackbar } from "@/core/hooks"
import { useDocumentDataOnce } from "react-firebase-hooks/firestore"
import api from "@/core/api/firebase"
import subAnswerCard from "@/components/poll/submission/subAnswerCard"
import scoreDetails from "@/components/poll/submission/scoreDetails"
import subChart from "@/components/poll/submission/subchart"
import { useParams } from "react-router-dom"
import { useAuthContext } from "@/core/hooks"
import { useCollection, useDocumentData } from "react-firebase-hooks/firestore"
import ToolbarParticpant from "@/components/poll/submission/ToolbarParticpant"
import React, { useEffect, useState } from "react"

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
  const [users] = useCollection(api.sessions.users.collect(id))

  //  const snackbar = useSnackbar()
  //  const user = sub?.user

  return (
    <React.Fragment>
      {sub?.session.id && (
        <ToolbarParticpant
          id={sub?.session.id}
          submitted_at={sub.submitted_at}></ToolbarParticpant>
      )}
      <Container maxWidth='xs' sx={{ textAlign: "initial" }}>
        <Box mt={2}>
          <Stack sx={{ m: 1 }} spacing={1}>
            <Typography variant='h6' textAlign='center'>
              {sub?.display_name}
            </Typography>
            {/* <Typography variant='subtitle2' textAlign='center'>
              Submitted At{" "}
              {submitted_at ? submitted_at.toDate().toLocaleDateString() : ""}
            </Typography> */}
            <Typography variant='subtitle2' textAlign='center'>
              Your Total Sorce Is {sub?.total_score}
            </Typography>

            {subChart()}
            <Stack> {scoreDetails()} </Stack>
            <Grid2></Grid2>
            {/* make a Grid with subAnswerCard() */}
            <Stack> {subAnswerCard()} </Stack>
          </Stack>
        </Box>{" "}
        <Box></Box>
      </Container>
    </React.Fragment>
  )
}
