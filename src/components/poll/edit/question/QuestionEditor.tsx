import {
  Box,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  TextField,
  Stack,
  Grid2,
} from "@mui/material"
import { DragHandle } from "@mui/icons-material"
import UploadImageBox from "./UploadImageBox"
import { PromptOption, Question } from "@/core/types"
import { useCollection } from "react-firebase-hooks/firestore"
import { collection, DocumentData, DocumentReference, Query, query } from "firebase/firestore"
import { db } from "@/core/api/firebase"
import PromptField from "./PromptField"
import PromptTypeField from "./PromptTypeField"
import Settings from "./Settings"

interface Props {
  pid: string /* poll id */
  qid: string /* question id */
  ref: DocumentReference<DocumentData, DocumentData>
  index: number
  data: Question
}

export default function QuestionEditor(props: Props) {
  const { pid, qid, index, data } = props
  const optQuery = query(
    collection(db, "polls", pid, "questions", qid, "options")
  ) as Query<PromptOption>
  const [opts] = useCollection(optQuery)

  return (
    <Accordion>
      <AccordionSummary>
        <Box display={"flex"}>
          <DragHandle />
          <Typography sx={{ wordBreak: "break-word" }} ml={1}>
            <strong>
              {index + 1}. {data.prompt}
            </strong>
          </Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Grid2 container spacing={2}>
          <Grid2 size={{ xl: 12, lg: 12, md: 12, sm: 12, xs: 12 }}>
            <Stack spacing={3}>
              <UploadImageBox pid={pid} />
              <PromptField pid={pid} qid={qid} prompt={data.prompt} />
              <PromptTypeField
                pid={pid}
                qid={qid}
                promptType={data.prompt_type}
              />
              {opts?.docs.map((x, i) => (
                <TextField
                  key={x.id}
                  placeholder={`Option ${i}`}
                  value={x.data().text}
                />
              ))}
            </Stack>
          </Grid2>
          <Grid2 size={{ xl: 12, lg: 12, md: 12, sm: 12, xs: 12 }}>
            <Settings />
          </Grid2>
        </Grid2>
      </AccordionDetails>
    </Accordion>
  )
}
