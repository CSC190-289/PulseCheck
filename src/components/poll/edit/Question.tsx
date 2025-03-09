import {
  Box,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material"

interface Props {
  pollID: string
  questionID: string
  questionNumber: number
}

export default function Question(props: Props) {
  return (
    <Accordion>
      <AccordionSummary>
        <Box>
          <Typography sx={{ wordBreak: "break-word" }}>
            Question {props.questionNumber}
          </Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>hhhhhhhhhhhhhhh</Typography>
      </AccordionDetails>
    </Accordion>
  )
}
