import { Container, Typography } from "@mui/material"
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
    </Container>
  )
}
