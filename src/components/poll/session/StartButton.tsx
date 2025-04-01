import { Button } from "@mui/material"
import React from "react"

interface Props {
  callback: () => void
}

export default function StartButton(props: Props) {
  return (
    <React.Fragment>
      <Button onClick={props.callback}>Start</Button>
    </React.Fragment>
  )
}
