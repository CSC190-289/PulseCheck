import { Container, Stack } from "@mui/material"
import PromptEditor from "../components/poll/edit/prompt/PromptEditor"
import React, { useEffect } from "react"
import Toolbar from "@/components/poll/edit/Toolbar"
import { useNavigate, useParams } from "react-router-dom"
import { useDocumentData } from "react-firebase-hooks/firestore"
import { doc } from "firebase/firestore"
import { db } from "@/core/api/firebase"

export default function PollEditor() {
  const params = useParams()
  /* debug params.id (poll id) */
  const pollId = params.id ?? ""
  console.debug("params.id", pollId)
  const navigate = useNavigate()
  useEffect(() => {
    if (!pollId) {
      console.debug("what the figma?")
      void navigate(-1)
    }
  }, [pollId, navigate])
  const [snapshot, loading, error] = useDocumentData(doc(db, "poll", pollId), {
    snapshotListenOptions: { includeMetadataChanges: true },
  })

  console.debug("poll.editor.snapshot", snapshot)
  console.debug("poll.editor.loading", loading)
  console.debug("poll.editor.error", error)

  return (
    <React.Fragment>
      <Toolbar
        pollId={pollId}
        title={snapshot?.title as string}
        lastUpdated={new Date(Date.UTC(2024, 11, 6))}
      />
      <Container sx={{ pt: 2 }}>
        <Stack textAlign={"initial"} spacing={3}>
          <PromptEditor
            pollId={pollId}
            questionNumber={1}
            prompt='Will Daniel spell the language of English?'
            prompt_img=''
            options={{ Yes: false, No: true }}
            weight={1}
            anonymous={false}
            time={NaN}
            prompt_type='multiple-choice'
          />
        </Stack>
      </Container>
    </React.Fragment>
  )
}
