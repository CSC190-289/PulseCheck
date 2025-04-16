import { Box, Button, ButtonProps, LinearProgress } from "@mui/material"
import React, { useState } from "react"

type StartButtonProps = {
  callback: () => void
} & ButtonProps

export default function StartButton(props: StartButtonProps) {
  const { callback, ...etc } = props
  const [disable, setDisable] = useState(false)
  const onClick = () => {
    setDisable(true)
    callback()
    setTimeout(() => {
      setDisable(false)
    }, 3000)
  }
  return (
    <React.Fragment>
      <Box position={"relative"}>
        <Button onClick={onClick} disabled={disable} {...etc}>
          Start
        </Button>
        <LinearProgress
          sx={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            display: disable ? "initial" : "none",
          }}
        />
      </Box>
    </React.Fragment>
  )
}
