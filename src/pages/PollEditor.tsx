import {
  Container,
  Fab,
  LinearProgress,
  Skeleton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material"
import React, { useEffect } from "react"
import Toolbar from "@/components/poll/edit/Toolbar"
import { useNavigate, useParams } from "react-router-dom"
import { useDocumentData } from "react-firebase-hooks/firestore"
import QuestionList from "@/components/poll/edit/question/QuestionList"
import { useSnackbar } from "@/core/hooks"
import api from "@/core/api/firebase"
import { Add } from "@mui/icons-material"
import { RA } from "@/styles"

export default function PollEditor() {
  const params = useParams()
  const id = params.id ?? ""
  const navigate = useNavigate()
  const snackbar = useSnackbar()

  useEffect(() => {
    if (!id) {
      void navigate(-1)
    }
  }, [id, navigate])

  const pollRef = api.polls.doc(id)
  const [poll, loading, error] = useDocumentData(pollRef)

  console.debug("pe.poll", poll)

  const handleAddQuestion = () => {
    const aux = async () => {
      try {
        const ref = api.polls.questions.collect(id)
        await api.polls.questions.add(ref)
      } catch {
        snackbar.show({
          type: "error",
          message: "Failed to create question",
        })
      }
    }
    void aux()
  }

  if (loading) {
    return <LinearProgress />
  }

  if (error) {
    return <Typography>Failed to load Poll ({id})</Typography>
  }

  return (
    <React.Fragment>
      {poll ? (
        <Toolbar pid={id} title={poll.title} updatedAt={poll.updated_at} />
      ) : (
        <Skeleton />
      )}
      <Container sx={{ marginBlock: 2 }} maxWidth='xl'>
        <Stack spacing={2} alignItems={"center"}>
          <QuestionList pid={id} questions={poll?.questions ?? []} />
          <RA.Roll triggerOnce>
            <Tooltip title='New Question'>
              <Fab color='secondary' onClick={handleAddQuestion}>
                <Add />
              </Fab>
            </Tooltip>
          </RA.Roll>
        </Stack>
      </Container>
    </React.Fragment>
  )
}
