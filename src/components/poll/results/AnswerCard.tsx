import api from "@/lib/api/firebase"
import { useAuthContext } from "@/lib/hooks"
import { SessionOption, SessionQuestion, SessionResponse } from "@/lib/types"
import { Typography, Card, CardContent, CardMedia } from "@mui/material"
import {
  DocumentReference,
  getDoc,
  QueryDocumentSnapshot,
  refEqual,
} from "firebase/firestore"
import { useEffect, useState } from "react"

interface Props {
  sid: string
  qref: DocumentReference<SessionQuestion>
}

/**
 * UI for answer card showing users what was the right answer
 * @author VerySirias
 * @returns {JSX.Element}
 */
export default function AnswerCard(props: Props) {
  const { sid, qref } = props
  const { user } = useAuthContext()
  /* stores question data */
  const [question, setQuestion] = useState<SessionQuestion | null>(null)
  const [options, setOptions] = useState<
    QueryDocumentSnapshot<SessionOption>[]
  >([])
  const [res, setRes] = useState<SessionResponse | null>(null)

  /* fetch question on mount */
  useEffect(() => {
    getDoc(qref)
      .then((x) => {
        if (x.exists()) {
          setQuestion(x.data())
        }
      })
      .catch((err) => console.debug(err))
  }, [qref])

  useEffect(() => {
    if (question) {
      void api.sessions.questions.options
        .getAllByRef(qref)
        .then((x) => {
          setOptions(x.docs)
        })
        .catch((err) => console.debug(err))
    }
  }, [question, qref])

  useEffect(() => {
    if (!user) return
    if (question) {
      void api.sessions.questions.responses
        .get(sid, qref.id, user.uid)
        .then((x) => {
          if (x.exists()) {
            setRes(x.data())
          }
        })
        .catch((err) => console.debug(err))
    }
  }, [user, question, qref, sid])

  return (
    <Card>
      <CardContent>
        <Typography gutterBottom>{question?.prompt}</Typography>
        {question?.prompt_img && (
          <CardMedia
            component='img'
            sx={{ objectFit: "contain", mb: 1 }}
            image={question?.prompt_img ?? ""}
          />
        )}
        {res?.choices.length === 0 ? (
          <Typography color='textSecondary'>Response left blank</Typography>
        ) : (
          options
            ?.filter((x) => res?.choices.some((y) => refEqual(x.ref, y)))
            .map((x) => (
              <Typography key={x.id} color={res?.correct ? "success" : "error"}>
                {"•"} {x.data().text}
              </Typography>
            ))
        )}
      </CardContent>
    </Card>
  )
}
