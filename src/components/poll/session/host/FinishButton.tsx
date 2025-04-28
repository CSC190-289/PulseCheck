import AsyncButton from "@/components/AsyncButton"
import api from "@/lib/api/firebase"
import { Session } from "@/lib/types"
import { DocumentReference } from "firebase/firestore"

interface FinishButtonProps {
  sref: DocumentReference<Session>
}

export default function FinishButton(props: FinishButtonProps) {
  const { sref } = props
  const callback = async () => {
    await api.sessions.finish(sref)
  }
  return <AsyncButton callback={callback}>Finish</AsyncButton>
}
