import api from "@/lib/api/firebase"
import useSnackbar from "@/lib/hooks/useSnackbar"
import { PROMPT_TYPE_CHOICES, PromptType } from "@/lib/types"
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
        if (text === props.promptType) {
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
  }, [props.promptType, promptType, pid, qid, snackbar])

  return (
    <React.Fragment>
      <TextField
        label='Type of Question'
        select
        value={promptType}
        onChange={(e) => setPromptType(e.target.value as PromptType)}>
        {PROMPT_TYPE_CHOICES.map((x) => (
          <MenuItem key={x.name} value={x.value}>
            {x.name}
          </MenuItem>
        ))}
      </TextField>
    </React.Fragment>
  )
}
