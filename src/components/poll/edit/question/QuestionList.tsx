import { Box, LinearProgress, Stack, Typography } from "@mui/material"
import { query } from "firebase/firestore"
import { useCollection } from "react-firebase-hooks/firestore"
import QuestionEditor from "./QuestionEditor"
import api from "@/core/api"

interface Props {
  pid: string
}

export default function QuestionList(props: Props) {
  const { pid } = props
  const qsQuery = query(api.polls.questions.collect(pid))
  const [qs, qsLoading, qsError] = useCollection(qsQuery)

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
    <Stack textAlign={"initial"} spacing={2}>
      {qs.docs.map((x, i) => (
        <QuestionEditor
          key={x.id}
          pid={pid}
          qid={x.id}
          index={i}
          data={x.data()}
        />
      ))}
    </Stack>
  )
}
