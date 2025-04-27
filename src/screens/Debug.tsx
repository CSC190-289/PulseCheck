import UserAvatar from "@/components/poll/results/UserAvatar"
import api, { run } from "@/lib/api/firebase"
import { Button, Container, Typography } from "@mui/material"
import { useEffect } from "react"

export default function Debug() {
  //**PAGE REFRESH**//
  useEffect(() => {
    function handleOnBeforeUnload(event: BeforeUnloadEvent) {
      event.preventDefault()
      return (event.returnValue = "")
    }
    window.addEventListener("beforeunload", handleOnBeforeUnload, {
      capture: true,
    })
  }, [])
  //**PAGE REFRESH**//

  return (
    <Container>
      <Typography>Debug Here</Typography>
      <Button
        onClick={() => {
          void run()
            .then(() => console.debug("it works!"))
            .catch((err) => console.debug(err))
        }}>
        Click me
      </Button>
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
