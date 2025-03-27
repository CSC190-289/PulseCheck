import api from "@/core/api/firebase"
import { AppBar, Button, Toolbar } from "@mui/material"
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
      <AppBar color='inherit' position='relative'>
        <Toolbar>
          <Button>Finish</Button>
          <Button>Next Question</Button>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  )
}
