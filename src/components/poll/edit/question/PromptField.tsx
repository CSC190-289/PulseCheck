import { db } from "@/core/api/firebase"
import useSnackbar from "@/core/hooks/useSnackbar"
import { TextField } from "@mui/material"
import { doc, updateDoc } from "firebase/firestore"
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
      const ref = doc(db, "polls", pid, "questions", qid)
      try {
        await updateDoc(ref, {
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
  }, [prompt, pid, qid, snackbar])

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
