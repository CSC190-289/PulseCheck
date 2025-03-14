import {
  Box,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  TextField,
  Stack,
} from "@mui/material"
import { DragHandle } from "@mui/icons-material"
import MenuItem from "@mui/material/MenuItem"
import { useEffect, useState } from "react"

interface Props {
  //pollID: string
  //questionID: string
  questionNumber: number
  prompt: string
  prompt_img?: string
  options: Record<string, boolean>
  weight: number
  anonymous: boolean
  prompt_type: "multiple-choice" | "multi-select"
  time: number
}

export default function Question(props: Props) {
  const defaultPrompt = "Insert question prompt here"
  const [questionPrompt, setquestionPrompt] = useState<string>(defaultPrompt)

  useEffect(() => {
    if (!questionPrompt) {
      setquestionPrompt(defaultPrompt)
    }
  }, [questionPrompt])

  return (
    <Accordion>
      <AccordionSummary>
        <Box display={"flex"}>
          <DragHandle />
          <Typography sx={{ wordBreak: "break-word" }} marginLeft={1}>
            Q.{props.questionNumber}: {questionPrompt}
          </Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Stack spacing={3}>
          <TextField
            label='Prompt'
            variant='outlined'
            onChange={(e) => setquestionPrompt(e.target.value)}
            //fullWidth
          />
          <TextField
            label='Type of Question'
            variant='outlined'
            select
            defaultValue='multiple-choice'
            //onChange={""}
          >
            <MenuItem value={"multiple-choice"}>Multiple Choice</MenuItem>
            <MenuItem value={"multi-select"}>Multiple Select</MenuItem>
          </TextField>

          {Object.entries(props.options).map(([key]) => (
            <TextField placeholder={key} variant='outlined' key={key}>
              {key}
            </TextField>
          ))}
        </Stack>
      </AccordionDetails>
    </Accordion>
  )
}
