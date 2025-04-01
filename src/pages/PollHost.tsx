import api from "@/core/api/firebase"
import { Button, Toolbar } from "@mui/material"
import React from "react"
import { useParams } from "react-router-dom"

export default function PollHost() {
  const params = useParams()
  const sid = params.id ?? ""
  const ref = api.polls.sessions.doc(sid)
  console.debug(ref)
  /* TODO - ensure this is the host */
  return (
    <React.Fragment>
      <Toolbar
        sx={{
          boxShadow: "2px 2px rgba(0,0,0,0.1",
        }}>
        <Button>Finish</Button>
        <Button>Next Question</Button>
      </Toolbar>
    </React.Fragment>
  )
}
