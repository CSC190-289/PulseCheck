import { Session, SessionState } from "@/lib/types"
import StartButton from "./StartButton"
import { DocumentReference } from "firebase/firestore"
import NextButton from "./NextButton"
import FinishButton from "./FinishButton"
import { CircularProgress } from "@mui/material"

interface HostButtonProps {
  sref: DocumentReference<Session>
  session?: Session
}

export default function HostButton(props: HostButtonProps) {
  const { sref, session } = props
  if (!session) return <CircularProgress />
  if (session?.state === SessionState.OPEN) {
    return <StartButton sref={sref} />
  }
  if (session?.state === SessionState.IN_PROGRESS) {
    return <NextButton sref={sref} session={session} />
  }
  if (session?.state === SessionState.DONE) {
    return <FinishButton sref={sref} />
  }
  return <></>
}
