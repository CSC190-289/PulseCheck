import { Container } from "@mui/material"
import React, { useEffect } from "react"
import Toolbar from "@/components/poll/edit/Toolbar"
import { useNavigate, useParams } from "react-router-dom"
import { useDocumentData } from "react-firebase-hooks/firestore"
import { doc, DocumentReference, Timestamp } from "firebase/firestore"
import { db } from "@/core/api/firebase"
import { Poll } from "@/core/types"
import QuestionList from "@/components/poll/edit/question/QuestionList"

export default function PollEditor() {
  const params = useParams()
  /* debug params.id (poll id) */
  const id = params.id ?? ""
  console.debug("params.id", id)
  const navigate = useNavigate()

  useEffect(() => {
    if (!id) {
      console.debug("what the figma?")
      void navigate(-1)
    }
  }, [id, navigate])

  const pollRef = doc(db, "polls", id) as DocumentReference<Poll>
  const [poll] = useDocumentData<Poll>(pollRef)

  console.debug("pe.poll", poll)

  return (
    <React.Fragment>
      <Toolbar
        pollId={id}
        title={poll?.title ?? "MISSING TITLE"}
        lastUpdated={poll?.updated_at ?? Timestamp.now()}
      />
      <Container sx={{ pt: 2 }} maxWidth='xl'>
        <QuestionList pid={id} />
      </Container>
    </React.Fragment>
  )
}
