import { Session, SessionState } from "@/core/types"
import { Typography } from "@mui/material"

interface RoomTitleProps {
  session?: Session
}

/**
 * Displays the room code the session if session is open.
 */
export default function RoomTitle(props: RoomTitleProps) {
  const { session } = props
  if (session && session.state === SessionState.OPEN) {
    return (
      <Typography variant='h5' mb={2}>
        Room Code: {session.room_code}
      </Typography>
    )
  }
  return <></>
}
