import { SessionState } from "@/core/types"
import StartButton from "./StartButton"
import { Button, ButtonProps } from "@mui/material"

type HostButtonProps = {
  state?: SessionState
  startCallback: () => void
  nextCallback: () => void
  doneCallback: () => void
} & ButtonProps

export default function HostButton(props: HostButtonProps) {
  const { state, startCallback, nextCallback, doneCallback, ...etc } = props
  if (state === SessionState.OPEN) {
    return <StartButton callback={startCallback} {...etc} />
  }
  if (state === SessionState.IN_PROGRESS) {
    return (
      <Button onClick={nextCallback} {...etc}>
        Next
      </Button>
    )
  }
  if (state === SessionState.DONE) {
    return (
      <Button onClick={doneCallback} {...etc}>
        Done
      </Button>
    )
  }
  return <></>
}
