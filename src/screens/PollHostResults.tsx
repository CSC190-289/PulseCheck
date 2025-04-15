import {
  Container,
  Typography,
  Box,
  Stack,
  Divider,
  Grid2,
} from "@mui/material"
import subChart from "@/components/poll/submission/Subchart"
import scoreDetails from "@/components/poll/submission/ScoreDetails"
import Toolbar from "@/components/poll/submission/toolbar"
import { useParams } from "react-router-dom"
import api from "@/core/api/firebase"
import {
  useCollection,
  useDocumentDataOnce,
} from "react-firebase-hooks/firestore"
import { useDocumentData } from "react-firebase-hooks/firestore"
import React, { useEffect, useState } from "react"
import {
  DocumentData,
  onSnapshot,
  QueryDocumentSnapshot,
} from "firebase/firestore"
import { Submission } from "@/core/types"
import participantsScoreCard from "@/components/poll/submission/ParticipantsScoreCard"
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
  const [users] = useCollection(api.sessions.users.collect(sid))
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

  // const userRef = api.sessions.users.collect(id)
  // const usersub = onSnapshot(userRef, (snapshot) => {
  //   snapshot.docChanges().forEach((change) => {
  //     async function addUser(userId: string, data: users) {

  //     }
  //   })
  // })

  return (
    <React.Fragment>
      {<Toolbar></Toolbar>}
      <Container maxWidth='xs' sx={{ textAlign: "initial" }}>
        <Box mt={2}>
          <Stack> {subChart()} </Stack>
          <Stack> {scoreDetails()} </Stack>
          <Grid2 container spacing={2}>
            {submissions?.length ?? 0}
            {users?.docs.map((x) => (
              <Grid2 key={x.id} size={{ xl: 3, lg: 3, md: 3, xs: 12 }}>
                <RA.Zoom triggerOnce>
                  <participantsScoreCard user={x.data} />
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
