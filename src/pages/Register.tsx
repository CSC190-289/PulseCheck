import { Container, Typography } from "@mui/material"
import React from "react"
import RegisterJoin from "@/components/RegisterJoin"
import SignInWGoogleButton from "@/components/auth/SignInWGoogleButton"

export default function Register() {
  return (
    <React.Fragment>
      <Container maxWidth='sm'>
        {/* <Typography> Sorry Brando he made me do it</Typography> */}

        {/* <SignInWGoogleButton /> */}
        <RegisterJoin />
      </Container>
    </React.Fragment>
  )
  // <RegisterJoin />
}
