import { PromptOption, PromptType } from "@/core/types"
import { Divider, Stack, Typography } from "@mui/material"
import { DocumentReference } from "firebase/firestore"
import React from "react"
import PromptOptionEditor from "./PromptOptionEditor"

interface Props {
  options: DocumentReference<PromptOption>[]
  promptType: PromptType
}

export default function PromptOptionList(props: Props) {
  const { options } = props

  return (
    <React.Fragment>
      <Divider>
        <Typography>Answer Options</Typography>
      </Divider>
      <Stack spacing={1}>
        {options.map((x, i) => (
          <PromptOptionEditor key={x.id} ref={x} index={i} />
        ))}
      </Stack>
    </React.Fragment>
  )
}
