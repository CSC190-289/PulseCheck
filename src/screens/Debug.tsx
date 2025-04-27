import UserAvatar from "@/components/poll/results/UserAvatar"
import api from "@/lib/api/firebase"
import { Button, Container, Typography } from "@mui/material"
import { useEffect } from "react";

export default function Debug() {

  //**PAGE REFRESH**//
      useEffect(() => {
        function handleOnBeforeUnload(event: BeforeUnloadEvent) {
          event.preventDefault();
          return (event.returnValue = '');
        }
        window.addEventListener('beforeunload', handleOnBeforeUnload, {capture:true})
      }, [])
    //**PAGE REFRESH**//

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
