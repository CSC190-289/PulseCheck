import { Box, Button, ButtonProps, LinearProgress } from "@mui/material"
import React, { useState } from "react"

type AsyncButtonProps<T> = {
  callback: () => Promise<T>
  onError?: (err: unknown) => void
} & ButtonProps

export default function AsyncButton<T>(props: AsyncButtonProps<T>) {
  const { callback, onError, ...etc } = props
  const [disabled, setDisabled] = useState(false)

  const onClick = () => {
    async function aux() {
      setDisabled(true)
      try {
        await callback()
      } catch (err: unknown) {
        console.debug(err)
        if (onError) {
          onError(err)
        }
      } finally {
        setDisabled(false)
      }
    }
    void aux()
  }

  return (
    <React.Fragment>
      <Box position={"relative"}>
        <Button
          onClick={onClick}
          disabled={disabled || etc.disabled}
          {...etc}
        />
        <LinearProgress
          sx={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            display: disabled ? "initial" : "none",
          }}
        />
      </Box>
    </React.Fragment>
  )
}
