import GuestJoin from "@/components/poll/join/GuestJoin"
import { useAuthContext } from "@/core/hooks"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function GetStarted() {
  const auth = useAuthContext()
  const navigate = useNavigate()

  useEffect(() => {
    if (auth.user) {
      void navigate("/poll/join")
    }
  }, [auth, navigate])

  return <GuestJoin />
}
