/* eslint-disable react-hooks/exhaustive-deps */
import GuestJoin from "@/components/poll/join/GuestJoin"
import { useAuthContext } from "@/core/hooks"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function GetStarted() {
  const auth = useAuthContext()
  const navigate = useNavigate()

  useEffect(() => {
    /* if the user is logged in and not a guest, redirect to /poll/join */
    if (auth.user && !auth.user.isAnonymous && !auth.loading) {
      void navigate("/poll/join")
    }
  }, [auth])

  return <GuestJoin />
}
