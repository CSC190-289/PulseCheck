import {
  Box,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Stack,
  AccordionActions,
  Button,
  Skeleton,
} from "@mui/material"
import { Add, DragHandle, ExpandMore } from "@mui/icons-material"
import UploadImageBox from "./UploadImageBox"
import { Question } from "@/lib/types"
import PromptField from "./PromptField"
import PromptTypeField from "./PromptTypeField"
import Settings from "./Settings"
import api from "@/lib/api/firebase"
import PromptOptionList from "./option/PromptOptionList"
import { useDocumentData } from "react-firebase-hooks/firestore"
import { DocumentReference } from "firebase/firestore"
import RemoveButton from "./RemoveButton"
import AddTagButton from "./AddTagButton"

interface Props {
  pid: string
  qid: string
  index: number
  defaultExpanded?: boolean
  qref: DocumentReference<Question>
}

export default function QuestionEditor(props: Props) {
  const { pid, qid, index, qref } = props
  const [data, loading, error] = useDocumentData(qref)

  const handleAddOption = () => {
    const aux = async () => {
      const ocref = api.polls.questions.options.collect({ pid, qid })
      const oref = await api.polls.questions.options.create(ocref)
      await api.polls.questions.appendOption(qref, oref)
    }
    void aux()
  }

  if (error || loading || !data) {
    return <Skeleton sx={{ width: "90vw", height: 65 }} />
  }

  return (
    <Accordion
      defaultExpanded={props.defaultExpanded}
      slotProps={{
        transition: { unmountOnExit: false },
      }}>
      <AccordionSummary expandIcon={<ExpandMore />} draggable>
        <DragHandle color='action' />
        <Typography ml={1} sx={{ wordBreak: "break-word" }}>
          <strong>{index + 1}.</strong> {data.prompt}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack spacing={1}>
          <PromptField pid={pid} qid={qid} prompt={data.prompt} />
          <UploadImageBox pid={pid} qid={qid} url={data.prompt_img} />
          <PromptTypeField pid={pid} qid={qid} promptType={data.prompt_type} />
          <PromptOptionList
            options={data.options}
            promptType={data.prompt_type}
          />
          <Box flex={1} display={"flex"} justifyContent={"center"}>
            <Button startIcon={<Add />} onClick={handleAddOption}>
              Add Option
            </Button>
          </Box>
        </Stack>
        <Settings
          pid={pid}
          qid={qid}
          points={data.points}
          anonymous={data.anonymous}
          time={data.time}
        />
      </AccordionDetails>
      <AccordionActions>
        <AddTagButton pid={pid} qid={qid} />
        <RemoveButton pid={pid} qid={qid} />
      </AccordionActions>
    </Accordion>
  )
}
