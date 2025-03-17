import api from "@/core/api"
import useSnackbar from "@/core/hooks/useSnackbar"
import { TextField } from "@mui/material"
import React, { useEffect, useState } from "react"

interface Props {
  pid: string
  qid: string
  prompt: string
}

const SAVE_DELAY = 1000

export default function PromptField(props: Props) {
  const { pid, qid } = props
  const [prompt, setPrompt] = useState(props.prompt)
  const snackbar = useSnackbar()

  useEffect(() => {
    async function savePrompt(text: string) {
      try {
        if (text === props.prompt) {
          return
        }
        const ref = api.polls.questions.doc(pid, qid)
        await api.polls.questions.update(ref, {
          prompt: text,
        })
      } catch {
        snackbar.show({
          message: "Failed to update question",
          type: "error",
        })
      }
    }
    const timer = setTimeout(() => {
      void savePrompt(prompt)
    }, SAVE_DELAY)
    return () => {
      clearTimeout(timer)
    }
  }, [props.prompt, prompt, pid, qid, snackbar])

  return (
    <React.Fragment>
      <TextField
        label='Type Your Question Here'
        hiddenLabel
        defaultValue={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
    </React.Fragment>
  )
}
