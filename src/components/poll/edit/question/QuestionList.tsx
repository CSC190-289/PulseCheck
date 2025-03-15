import { db } from "@/core/api/firebase"
import { Question } from "@/core/types"
import { Box, LinearProgress, Stack, Typography } from "@mui/material"
import { collection, doc, query, Query } from "firebase/firestore"
import { useCollection } from "react-firebase-hooks/firestore"
import QuestionEditor from "./QuestionEditor"

interface Props {
  pid: string
}

export default function QuestionList(props: Props) {
  const { pid } = props
  const qsQuery = query(
    collection(db, "polls", pid, "questions")
  ) as Query<Question>
  const [qs, qsLoading, qsError] = useCollection(qsQuery)

  console.debug("pe.qb.qs", qs)

  if (qsLoading) {
    return <LinearProgress />
  }

  if (qsError) {
    return (
      <Box>
        <Typography>OOF</Typography>
      </Box>
    )
  }

  if (!qs || qs.empty) {
    return (
      <Box>
        <Typography>NO QUESTIONS FOUND</Typography>
      </Box>
    )
  }

  return (
    <Stack textAlign={"initial"} spacing={3}>
      {qs.docs.map((x, i) => (
        <QuestionEditor
          key={x.id}
          ref={doc(db, "polls", pid, "questions", x.id)}
          pid={pid}
          qid={x.id}
          index={i}
          data={x.data()}
        />
      ))}
    </Stack>
  )
}
