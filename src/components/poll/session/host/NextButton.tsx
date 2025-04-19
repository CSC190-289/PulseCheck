import AsyncButton from "@/components/AsyncButton"
import api from "@/core/api/firebase"
import { Session } from "@/core/types"
import { DocumentReference } from "firebase/firestore"
import { useState } from "react"

interface NextButtonProps {
  sref: DocumentReference<Session>
  session?: Session | null
}

export default function NextButton(props: NextButtonProps) {
  const { sref, session } = props
  const [text, setText] = useState("Next")
  const callback = async () => {
    if (!session) throw new Error("session is null!")
    const currentQuestion = session.question
    if (currentQuestion) {
      await api.sessions.grade(sref, currentQuestion.ref)
      await api.sessions.clearQuestion(sref)
      if (!currentQuestion.anonymous) {
        await api.sessions.displayUserResponses(sref, currentQuestion)
      }
      setText("Next")
    } else {
      /* grade user responses */
      await api.sessions.nextQuestion(sref)
      setText("Show Results")
    }
  }

  return <AsyncButton callback={callback}>{text}</AsyncButton>
}
