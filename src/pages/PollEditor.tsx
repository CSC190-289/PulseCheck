import { Container, Stack } from "@mui/material"
import PromptEditor from "../components/poll/edit/prompt/PromptEditor"
import React from "react"
import Toolbar from "@/components/poll/edit/Toolbar"
import { useParams } from "react-router-dom"

export default function PollEditor() {
  const params = useParams()
  const pollId = params.id
  /* debug params.id (poll id) */
  console.debug("params.id", pollId)
  /* TODO - fetch data for poll to edit */
  return (
    <React.Fragment>
      <Toolbar
        pollId='fixme'
        title='Untitled Poll'
        lastUpdated={new Date(Date.UTC(2024, 11, 6))}
      />
      <Container sx={{ pt: 2 }}>
        <Stack textAlign={"initial"} spacing={3}>
          <PromptEditor
            questionNumber={1}
            prompt='Will Daniel spell the language of English?'
            prompt_img=''
            options={{ Yes: false, No: true }}
            weight={1}
            anonymous={false}
            time={NaN}
            prompt_type='multiple-choice'
          />
          <PromptEditor
            questionNumber={2}
            prompt='Will Michael die from laughing?'
            prompt_img=''
            options={{ Yes: false }}
            weight={1}
            anonymous={false}
            time={NaN}
            prompt_type='multiple-choice'
          />
          <PromptEditor
            questionNumber={3}
            prompt='Fish?'
            prompt_img=''
            options={{ Yes: false }}
            weight={1}
            anonymous={false}
            time={NaN}
            prompt_type='multiple-choice'
          />
        </Stack>
      </Container>
    </React.Fragment>
  )
}
