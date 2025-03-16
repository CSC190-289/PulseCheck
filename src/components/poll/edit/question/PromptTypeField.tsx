import api from "@/core/api"
import useSnackbar from "@/core/hooks/useSnackbar"
import { PromptType } from "@/core/types"
import { MenuItem, TextField } from "@mui/material"
import React, { useEffect, useState } from "react"

interface Props {
  pid: string
  qid: string
  promptType: PromptType
}

const SAVE_DELAY = 1000

export default function PromptTypeField(props: Props) {
  const { pid, qid } = props
  const [promptType, setPromptType] = useState(props.promptType)
  const snackbar = useSnackbar()

  useEffect(() => {
    async function savePromptType(text: PromptType) {
      try {
        if (text === promptType) {
          return
        }
        const ref = api.polls.questions.doc(pid, qid)
        await api.polls.questions.update(ref, {
          prompt_type: text,
        })
      } catch {
        snackbar.show({
          message: "Failed to update question",
          type: "error",
        })
      }
    }
    const timer = setTimeout(() => {
      void savePromptType(promptType)
    }, SAVE_DELAY)
    return () => {
      clearTimeout(timer)
    }
  }, [promptType, pid, qid, snackbar])

  return (
    <React.Fragment>
      <TextField
        label='Type of Question'
        select
        value={promptType}
        onChange={(e) => setPromptType(e.target.value as PromptType)}>
        <MenuItem value={"multiple-choice"}>Multiple Choice</MenuItem>
        <MenuItem value={"multiple-select"}>Multiple Select</MenuItem>
        <MenuItem value={"ranking-poll"}>Ranking Poll</MenuItem>
      </TextField>
    </React.Fragment>
  )
}
