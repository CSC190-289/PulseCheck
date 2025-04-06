import {
  Box,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Stack,
  Grid2,
  AccordionActions,
  Button,
  Skeleton,
} from "@mui/material"
import { Add, DragHandle, ExpandMore } from "@mui/icons-material"
import UploadImageBox from "./UploadImageBox"
import { Question } from "@/core/types"
import PromptField from "./PromptField"
import PromptTypeField from "./PromptTypeField"
import Settings from "./Settings"
import { useSnackbar } from "@/core/hooks"
import api from "@/core/api/firebase"
import PromptOptionList from "./option/PromptOptionList"
import { useDocumentData } from "react-firebase-hooks/firestore"
import { DocumentReference } from "firebase/firestore"

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
  const snackbar = useSnackbar()

  const handleRemove = () => {
    /* delete question in poll(id) */
    const aux = async () => {
      try {
        const ref = api.polls.questions.doc(pid, qid)
        await api.polls.questions.delete(ref)
      } catch {
        snackbar.show({
          type: "error",
          message: "Failed to remove question",
        })
      }
    }
    void aux()
  }

  const handleAddOption = () => {
    const aux = async () => {
      const ocref = api.polls.questions.options.collect({ pid, qid })
      const oref = await api.polls.questions.options.create(ocref)
      await api.polls.questions.appendOption(qref, oref)
    }
    void aux()
  }

  if (error || loading || !data) {
    return <Skeleton />
  }

  return (
    <Accordion defaultExpanded={props.defaultExpanded}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Box display={"flex"} columnGap={2}>
          <Box>
            <DragHandle color='action' />
          </Box>
          <Typography sx={{ wordBreak: "break-word" }}>
            <strong>{index + 1}.</strong> {data.prompt}
          </Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Grid2 spacing={2}>
          <Grid2 size={{ xl: 12, lg: 12, md: 12, sm: 12, xs: 12 }}>
            <Stack spacing={2}>
              <UploadImageBox pid={pid} qid={qid} url={data.prompt_img} />
              <PromptField pid={pid} qid={qid} prompt={data.prompt} />
              <PromptTypeField
                pid={pid}
                qid={qid}
                promptType={data.prompt_type}
              />
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
          </Grid2>
          <Grid2 size={{ xl: 12, lg: 12, md: 12, sm: 12, xs: 12 }}>
            <Settings
              pid={pid}
              qid={qid}
              points={data.points}
              anonymous={data.anonymous}
              time={data.time}
            />
          </Grid2>
        </Grid2>
      </AccordionDetails>
      <AccordionActions>
        <Button color='error' onClick={handleRemove}>
          Remove
        </Button>
      </AccordionActions>
    </Accordion>
  )
}
