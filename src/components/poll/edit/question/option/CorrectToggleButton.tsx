import { IconButton, Radio } from "@mui/material"
import React, { useState } from "react"

interface Props {
  checked: boolean
}

/**
 * @todo add docs
 * @author Camputron, VerySirias
 * @returns {JSX.Element}
 */
export default function CorrectToggleButton(props: Props) {
  const [checked, setChecked] = useState(props.checked)
  /* TODO - Implement PromptOption toggle to update firestore
  The state is already implement, there should be a debounce delay to update
  firestore. Use the API store to update the document.
   */

  const handleCheckToggle = () => {
    setChecked(!checked)
  }

  return (
    <React.Fragment>
      <IconButton>
        <Radio checked={checked} onClick={handleCheckToggle} />
      </IconButton>
    </React.Fragment>
  )
}
