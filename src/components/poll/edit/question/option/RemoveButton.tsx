import api from "@/lib/api/firebase"
import { PromptOption } from "@/lib/types"
import { Clear } from "@mui/icons-material"
import { IconButton } from "@mui/material"
import { DocumentReference } from "firebase/firestore"
import React from "react"

interface Props {
  ref: DocumentReference<PromptOption>
}

/**
 * @todo add docs
 * @author Camputron, VerySirias
 */
export default function RemoveButton({ ref }: Props) {
  /* TODO - Implement PromptOption remove function
  Use the API store to delete this option in firestore.
   */

  const handleRemove = () => {
    /* TODO - delete this option */
    console.debug(`remove option(${ref.id})`)
    void api.polls.questions.options.deleteByRef(ref)
  }

  return (
    <React.Fragment>
      <IconButton onClick={handleRemove}>
        <Clear />
      </IconButton>
    </React.Fragment>
  )
}
