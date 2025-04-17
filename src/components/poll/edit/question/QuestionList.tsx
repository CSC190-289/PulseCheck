import { Stack } from "@mui/material"
import { DocumentReference } from "firebase/firestore"
import QuestionEditor from "./QuestionEditor"
import { Question } from "@/core/types"

interface Props {
  pid: string
  questions: DocumentReference<Question>[]
}

export default function QuestionList(props: Props) {
  const { pid, questions } = props

  return (
    <Stack textAlign={"initial"} spacing={0}>
      {questions.map((x, i) => (
        <QuestionEditor key={x.id} pid={pid} qid={x.id} index={i} qref={x} />
      ))}
    </Stack>
  )
}
