import { Container, Typography, Stack } from "@mui/material"
import Question from "../components/poll/edit/Question"

export default function PollEditor() {
  return (
    <Container>
      <Typography variant='h4' mt={6}>
        Poll Maker!
      </Typography>
      <Stack spacing={3}>
        <Question pollID='' questionID='' questionNumber={1} />
        <Question pollID='' questionID='' questionNumber={2} />
        <Question pollID='' questionID='' questionNumber={3} />
      </Stack>
    </Container>
  )
}
