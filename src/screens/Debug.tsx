import UserAvatar from "@/components/poll/submission/UserAvatar"
import { Container, Typography } from "@mui/material"

export default function Debug() {
  return (
    <Container>
      <Typography>Debug Here</Typography>
      <UserAvatar uid='hi' displayName='Michael' />
    </Container>
  )
}
