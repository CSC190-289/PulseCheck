import { Container, Fab, Stack, Tooltip } from "@mui/material"
import React, { useEffect } from "react"
import Toolbar from "@/components/poll/edit/Toolbar"
import { useNavigate, useParams } from "react-router-dom"
import { useDocumentData } from "react-firebase-hooks/firestore"
import QuestionList from "@/components/poll/edit/question/QuestionList"
import { useSnackbar } from "@/core/hooks"
import api from "@/core/api"
import { Add } from "@mui/icons-material"
import { RA } from "@/styles"

export default function PollEditor() {
  const params = useParams()
  const id = params.id ?? ""
  const navigate = useNavigate()
  const snackbar = useSnackbar()

  useEffect(() => {
    if (!id) {
      console.debug("what the figma?")
      void navigate(-1)
    }
  }, [id, navigate])

  const pollRef = api.polls.doc(id)
  const [poll] = useDocumentData(pollRef)

  useEffect(() => {
    /* debugger */
    if (poll) {
      console.debug("pe.poll", poll)
    }
  }, [poll])

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

  return (
    <React.Fragment>
      {poll && (
        <Toolbar pid={id} title={poll.title} lastUpdated={poll.updated_at} />
      )}
      <Container sx={{ marginBlock: 2 }} maxWidth='xl'>
        <Stack spacing={2} alignItems={"center"}>
          <QuestionList pid={id} />
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
