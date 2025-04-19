import { PromptOption, PromptType } from "@/core/types"
import { Box, Divider, Stack, Typography } from "@mui/material"
import { DocumentReference } from "firebase/firestore"
import React from "react"
import PromptOptionEditor from "./PromptOptionEditor"
// import { DragIndicator } from "@mui/icons-material"

interface Props {
  options: DocumentReference<PromptOption>[]
  promptType: PromptType
}

export default function PromptOptionList(props: Props) {
  const { options, promptType } = props

  return (
    <React.Fragment>
      <Divider>
        <Typography>Answer Options</Typography>
      </Divider>
      <Stack spacing={2}>
        {options.map((x, i) => (
          <Box
            key={x.id}
            // draggable
            style={{ display: "flex", alignItems: "center" }}>
            {/* <DragIndicator color='action' /> */}
            <PromptOptionEditor
              key={x.id}
              ref={x}
              index={i}
              promptType={promptType}
            />
          </Box>
        ))}
      </Stack>
    </React.Fragment>
  )
}
