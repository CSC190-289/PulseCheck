import { IconButton, Radio } from "@mui/material"
import React, { useEffect, useState } from "react"
import useSnackbar from "@/core/hooks/useSnackbar"
import api from "@/core/api/firebase"
import { DocumentReference } from "firebase/firestore"
import { PromptOption } from "@/core/types"

interface Props {
  ref: DocumentReference<PromptOption>
  correct: boolean
}

const SAVE_DELAY = 1000

/**
 * @todo add docs
 * @author Camputron, VerySirias
 * @returns {JSX.Element}
 */
export default function CorrectToggleButton(props: Props) {
  const { ref } = props
  const [correct, setCorrect] = useState(props.correct)
  const snackbar = useSnackbar()
  /* TODO - Implement PromptOption toggle to update firestore
  The state is already implement, there is a debounce delay to update
  firestore. API store update the document.
   */

  useEffect(() => {
    async function saveChecked(bool: boolean) {
      try {
        await api.polls.questions.options.updateByRef(ref, {
          correct: bool,
        })
      } catch {
        snackbar.show({
          message: "Failed to update option",
          type: "error",
        })
      }
    }
    const timer = setTimeout(() => {
      void saveChecked(correct)
    }, SAVE_DELAY)
    return () => {
      clearTimeout(timer)
    }
  }, [props.correct, correct, ref, snackbar])

  const handleCheckToggle = () => {
    setCorrect(!correct)
  }

  return (
    <React.Fragment>
      <IconButton>
        <Radio checked={correct} onClick={handleCheckToggle} />
      </IconButton>
    </React.Fragment>
  )
}
