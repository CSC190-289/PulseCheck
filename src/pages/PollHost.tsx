import api from "@/core/api/firebase"
import { Container, Typography } from "@mui/material"
import { useParams } from "react-router-dom"

export default function PollHost() {
  const params = useParams()
  const sid = params.id ?? ""
  const ref = api.polls.sessions.doc(sid)
  console.debug(ref)
  return (
    <Container>
      <Typography>Host Controls Here</Typography>
    </Container>
  )
}
