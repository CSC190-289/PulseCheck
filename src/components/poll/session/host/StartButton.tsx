import { Button, ButtonProps } from "@mui/material"
import React from "react"

type StartButtonProps = {
  callback: () => void
} & ButtonProps

export default function StartButton(props: StartButtonProps) {
  const { callback, ...etc } = props
  return (
    <React.Fragment>
      <Button onClick={callback} {...etc}>
        Start
      </Button>
    </React.Fragment>
  )
}
