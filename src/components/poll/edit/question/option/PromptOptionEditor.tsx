import { PromptOption } from "@/core/types"
import { Box, Skeleton, TextField, Typography } from "@mui/material"
import { DocumentReference } from "firebase/firestore"
import React, { useEffect, useState } from "react"
import { useDocumentData } from "react-firebase-hooks/firestore"
import CorrectToggleButton from "./CorrectToggleButton"
import RemoveButton from "./RemoveButton"
import api from "@/core/api/firebase"

interface Props {
  ref: DocumentReference<PromptOption>
  index: number
}

const SAVE_DELAY = 1000

/**
 * Editor for options of a question (prompt).
 * @author Camputron, VerySirias
 */
export default function PromptOptionEditor(props: Props) {
  const { ref, index } = props
  const [opt, loading, error] = useDocumentData(ref)
  const [text, setText] = useState(opt?.text ?? "")

  useEffect(() => {
    async function savePrompt(newText: string) {
      try {
        if (newText === opt?.text) {
          return
        }
        await api.polls.questions.options.updateByRef(ref, {
          text: newText,
        })
      } catch (err) {
        console.debug(err)
      }
    }
    const timeout = setTimeout(() => {
      void savePrompt(text)
    }, SAVE_DELAY)
    return () => {
      clearTimeout(timeout)
    }
  }, [ref, text, opt?.text])

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
