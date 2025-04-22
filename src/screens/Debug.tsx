import UserAvatar from "@/components/poll/submission/UserAvatar"
import api from "@/core/api/firebase"
import { Button, Container, Typography } from "@mui/material"

export default function Debug() {
  return (
    <Container>
      <Typography>Debug Here</Typography>
      <UserAvatar uid='hi' displayName='Michael' />
      <Button
        onClick={() => {
          api.submissions
            .findAllByUID("OX8UHNB3UFX1YPKDMT4RlKdSEB43")
            .then((x) => {
              const docs = x.docs
              docs.forEach((y) => console.debug(y.data()))
            })
            .catch((err) => console.error(err))
        }}>
        Find all By UID
      </Button>
      <Button
        onClick={() => {
          api.submissions
            .findAllBySID("U3ftUVwPcy7Fthulnoym")
            .then((x) => {
              const docs = x.docs
              docs.forEach((y) => console.debug(y.data()))
            })
            .catch((err) => console.error(err))
        }}>
        Find All By SID
      </Button>
    </Container>
  )
}
