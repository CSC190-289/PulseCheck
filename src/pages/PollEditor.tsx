import { Container, Typography, Stack } from "@mui/material"
import Question from "../components/poll/edit/Question"

export default function PollEditor() {
  return (
    <Container>
      <Typography variant='h4' mt={6}>
        Poll Maker!
      </Typography>
      <Stack spacing={3}>
        <Question questionNumber={1} prompt="Will Daniel spell the language of English?" prompt_img="" options={{"Yes":false, "No":true}} weight={1} anonymous={false} time={NaN} prompt_type="multiple-choice"/>
        <Question questionNumber={2} prompt="Will Michael die from laughing?" prompt_img="" options={{"Yes":false}} weight={1} anonymous={false} time={NaN} prompt_type="multiple-choice"/>
        <Question questionNumber={3} prompt="Fish?" prompt_img="" options={{"Yes":false}} weight={1} anonymous={false} time={NaN} prompt_type="multiple-choice"/>
      </Stack>
    </Container>
  )
}
