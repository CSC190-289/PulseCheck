import {
  Container,
  Fab,
  LinearProgress,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material"
import React, { useEffect } from "react"
import Header from "@/components/poll/edit/header/Header"
import { useNavigate, useParams } from "react-router-dom"
import { useDocumentData } from "react-firebase-hooks/firestore"
import QuestionList from "@/components/poll/edit/question/QuestionList"
import { useSnackbar } from "@/lib/hooks"
import api from "@/lib/api/firebase"
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
  const [poll, loading, error] = useDocumentData(pollRef, {
    initialValue: undefined,
    snapshotOptions: {
      serverTimestamps: "previous",
    },
  })



  // console.debug("pe.poll", poll, loading, error)

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
      {poll && <Header pid={id} poll={poll} />}
      <Container sx={{ marginBlock: 2 }} maxWidth='xl'>
        <Stack spacing={2} alignItems={"center"}>
          <QuestionList pid={id} questions={poll?.questions ?? []} />
          <RA.Roll triggerOnce>
            <Tooltip title='New Question'>
              <Fab
                color='secondary'
                disabled={!poll}
                onClick={handleAddQuestion}>
                <Add />
              </Fab>
            </Tooltip>
          </RA.Roll>
        </Stack>
      </Container>
    </React.Fragment>
  )
}
