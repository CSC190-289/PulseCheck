import { db } from "@/core/api/firebase"
import useSnackbar from "@/core/hooks/useSnackbar"
import { PromptType } from "@/core/types"
import { MenuItem, TextField } from "@mui/material"
import { doc, updateDoc } from "firebase/firestore"
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
      const ref = doc(db, "polls", pid, "questions", qid)
      try {
        await updateDoc(ref, {
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
