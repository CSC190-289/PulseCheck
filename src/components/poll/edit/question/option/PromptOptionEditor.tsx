import { PromptOption } from "@/core/types"
import { Box, Skeleton, TextField, Typography } from "@mui/material"
import { DocumentReference } from "firebase/firestore"
import React, { useState } from "react"
import { useDocumentData } from "react-firebase-hooks/firestore"
import CorrectToggleButton from "./CorrectToggleButton"
import RemoveButton from "./RemoveButton"

interface Props {
  ref: DocumentReference<PromptOption>
  index: number
}

/**
 * @todo add docs
 * @author Camputron, VerySirias
 */
export default function PromptOptionEditor(props: Props) {
  const { ref, index } = props
  const [opt, loading, error] = useDocumentData(ref)
  const [text, setText] = useState(opt?.text ?? "")
  /* TODO - Implement PromptOption textfield editor
  The state is already implemented, there should be a deboucne delay to update
  firestore. Use the API store to update the document.
   */

  if (error) {
    return (
      <Box display={"flex"} alignItems={"center"}>
        <Typography>Failed to load option!</Typography>
      </Box>
    )
  }

  if (loading) {
    return (
      <Box display={"flex"} alignItems={"center"}>
        <Skeleton variant='rounded' animation='wave' />
      </Box>
    )
  }

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }

  return (
    <Box display={"flex"} flex={1} alignItems={"center"}>
      <TextField
        placeholder={`Option ${index + 1}`}
        value={text}
        fullWidth
        onChange={handleTextChange}
        slotProps={{
          input: {
            startAdornment: opt && (
              <CorrectToggleButton ref={ref} correct={opt.correct} />
            ),
            endAdornment: <RemoveButton ref={ref} />,
          },
        }}
      />
    </Box>
  )
}
