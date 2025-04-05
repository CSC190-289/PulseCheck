import {
  Container,
  Typography,
  Box,
  Stack,
  Card,
  CardContent,
  CardActionArea,
} from "@mui/material"
import { Timestamp, DocumentReference } from "firebase/firestore"
import { Session, SessionQuestion } from "@/core/types"
import { User } from "@/core/types"
import { Question } from "@/core/types"
import { useNavigate, useParams } from "react-router-dom"
import { useSnackbar } from "@/core/hooks"
import {
  useDocumentData,
  useDocumentDataOnce,
  useDocumentOnce,
} from "react-firebase-hooks/firestore"
import api from "@/core/api/firebase"
import React from "react"

export default function PollResults() {
  const params = useParams()
  const id = params.id ?? ""
  const ref = api.submissions.doc(id)
  const [sub] = useDocumentDataOnce(ref)
  const snackbar = useSnackbar()
  const user = sub?.user
  const display_name = sub?.display_name
  const total_score = sub?.total_score
  const submitted_at = sub?.submitted_at

  return (
    <Container maxWidth='xs' sx={{ textAlign: "initial" }}>
      <Box mt={2}>
        <Stack sx={{ m: 1 }} spacing={3}>
          <Typography variant='h5' textAlign='center'>
            {" "}
            {display_name}{" "}
          </Typography>
          <Box
            sx={{
              height: 200,
              bgcolor: "Highlight",
            }}
            fulWidth>
            <Typography variant='h5' textAlign='center'>
              {" "}
              REPLACE WITH CHART
            </Typography>
          </Box>
        </Stack>
      </Box>{" "}
      <Box>
        <Stack>
          <Typography variant='h6' textAlign='left'>
            {" "}
            Score Details
          </Typography>{" "}
          <Typography variant='subtitle2' textAlign='left'>
            {" "}
            Lowest Score: [Data]
          </Typography>{" "}
          <Typography variant='subtitle2' textAlign='left'>
            {" "}
            Mean Score: [Data]
          </Typography>{" "}
          <Typography variant='subtitle2' textAlign='left'>
            {" "}
            Highest Score: [Data]
          </Typography>{" "}
          <Typography variant='subtitle2' textAlign='left'>
            {" "}
            Median Score: [Data]
          </Typography>{" "}
          <Typography variant='subtitle2' textAlign='left'>
            {" "}
            Lowest Quartile: [Data]
          </Typography>{" "}
          <Typography variant='subtitle2' textAlign='left'>
            {" "}
            Upper Quartile: [Data]
          </Typography>{" "}
        </Stack>
        <Stack>
          <Typography variant='h6' textAlign='left'>
            {" "}
            REPLACE WITH CHART
          </Typography>{" "}
        </Stack>
        <Stack sx={{ m: 1 }} spacing={3}>
          <Card>
            <CardActionArea>
              <CardContent>
                <Box>
                  <Box
                    sx={{
                      height: 150,
                      bgcolor: "Highlight",
                    }}
                    fulWidth>
                    <Typography variant='h5' textAlign='center'>
                      {" "}
                      REPLACE WITH IMG
                    </Typography>
                  </Box>
                  <Typography variant='h6' gutterBottom>
                    Title
                  </Typography>
                  <Typography variant='body2' color='textSecondary'>
                    You chose [blank]
                  </Typography>
                  <Typography variant='body2' color='textSecondary'>
                    Correct Answer!
                  </Typography>
                </Box>
              </CardContent>
            </CardActionArea>
          </Card>
          <Card sx={{ bgcolor: "coral" }}>
            <CardActionArea>
              <CardContent>
                <Box>
                  <Box
                    sx={{
                      height: 150,
                      bgcolor: "Highlight",
                    }}
                    fulWidth>
                    <Typography variant='h5' textAlign='center'>
                      {" "}
                      REPLACE WITH IMG
                    </Typography>
                  </Box>
                  <Typography variant='h6' gutterBottom>
                    Title
                  </Typography>
                  <Typography variant='body2' color='textSecondary'>
                    You chose [blank]
                  </Typography>
                  <Typography variant='body2' color='textSecondary'>
                    Correct Answer: not the one you picked
                  </Typography>
                </Box>
              </CardContent>
            </CardActionArea>
          </Card>
        </Stack>
      </Box>
    </Container>
  )
}
