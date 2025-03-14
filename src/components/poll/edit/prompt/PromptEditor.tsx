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
import MenuItem from "@mui/material/MenuItem"
import { useEffect, useState } from "react"
import UploadImageBox from "./UploadImageBox"

interface Props {
  pollId: string
  questionNumber: number
  prompt: string
  prompt_img?: string
  options: Record<string, boolean>
  weight: number
  anonymous: boolean
  prompt_type: "multiple-choice" | "multi-select"
  time: number
}

const GRID_SIZES = {
  xl: 6,
  lg: 6,
  md: 6,
  sm: 12,
  xs: 12,
}

export default function PromptEditor(props: Props) {
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
        <Grid2 container spacing={2}>
          <Grid2 size={GRID_SIZES}>
            <UploadImageBox pollId={props.pollId} />
            <Stack spacing={3}>
              <TextField
                label='Prompt'
                variant='outlined'
                onChange={(e) => setquestionPrompt(e.target.value)}
              />
              <TextField
                label='Type of Question'
                variant='outlined'
                select
                defaultValue='multiple-choice'>
                <MenuItem value={"multiple-choice"}>Multiple Choice</MenuItem>
                <MenuItem value={"multi-select"}>Multiple Select</MenuItem>
              </TextField>

              {Object.entries(props.options).map(([key]) => (
                <TextField placeholder={key} variant='outlined' key={key}>
                  {key}
                </TextField>
              ))}
            </Stack>
          </Grid2>
          <Grid2 size={GRID_SIZES}>
            <Typography>Question Settings Goes Here</Typography>
          </Grid2>
        </Grid2>
      </AccordionDetails>
    </Accordion>
  )
}
