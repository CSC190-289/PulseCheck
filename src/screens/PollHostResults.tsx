import { Container, Typography, Box, Stack, Grid2 } from "@mui/material"
import SubChart from "@/components/poll/submission/Subchart"
import Toolbar from "@/components/poll/submission/Toolbar"
import ScoreDetails from "@/components/poll/submission/scoreDetails"
import { useParams } from "react-router-dom"
import api from "@/lib/api/firebase"
import { useDocumentDataOnce } from "react-firebase-hooks/firestore"
import React, { useEffect, useState } from "react"
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore"
import { Submission } from "@/lib/types"
import ParticipantsScoreCard from "@/components/poll/submission/ParticipantsScoreCard"
import { RA } from "@/styles"

/**
 * Allows Host to see the poll results.
 * @author ZairaGarcia17, VerySirias
 * @returns {JSX.Element}
 */

/**
 * Make components for the following:
 *-Toolbar
 *-Chart scores (we can reuse the one I made for participants)
 *-Score Details (we can reuse the one I made for participants)
 * -search up and participants card
 * These components are in compoents/poll/submission
 */

export default function PollHostResults() {
  const params = useParams()
  const id = params.id ?? ""
  const ref = api.sessions.doc(id)
  const [session] = useDocumentDataOnce(ref)
  const [submissions, setSubmissions] = useState<
    QueryDocumentSnapshot<Submission, DocumentData>[]
  >([])

  useEffect(() => {
    if (session) {
      api.submissions
        .findAllBySID(id)
        .then((res) => {
          const docs = res.docs
          setSubmissions(docs)
        })
        .catch((err) => console.debug(err))
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session])

  return (
    <React.Fragment>
      {session && (
        <Toolbar
          title={session?.title}
          create_at={session?.created_at}></Toolbar>
      )}
      <Container maxWidth='xs' sx={{ textAlign: "initial" }}>
        <Box mt={2}>
          <Stack> {SubChart()} </Stack>
          <Stack>
            {" "}
            <ScoreDetails sum={session?.summary}></ScoreDetails>{" "}
          </Stack>
          <Grid2 container spacing={2}>
            <Container>
              <Typography>
                {" "}
                Total Participant: {submissions?.length ?? 0}
              </Typography>
            </Container>
            {submissions?.map((x) => (
              <Grid2 key={x.ref.path} size={{ xl: 30, lg: 30, md: 30, xs: 30 }}>
                <RA.Zoom triggerOnce>
                  <ParticipantsScoreCard sub={x.data()} />
                  {/* <Stack>{participantsScoreCard(x.data)} </Stack> */}
                </RA.Zoom>
              </Grid2>
            ))}
          </Grid2>
        </Box>
      </Container>
    </React.Fragment>
  )
}
