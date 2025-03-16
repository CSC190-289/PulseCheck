import { PromptOption } from "@/core/types"
import { Clear } from "@mui/icons-material"
import { IconButton, InputAdornment } from "@mui/material"
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
  }

  return (
    <React.Fragment>
      <InputAdornment position='end'>
        <IconButton onClick={handleRemove}>
          <Clear />
        </IconButton>
      </InputAdornment>
    </React.Fragment>
  )
}
