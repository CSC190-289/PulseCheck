import { Container } from "@mui/material"
import React from "react"
import UserLogin from "@/components/auth/UserLogin"
//import SignInWGoogleButton from "@/components/auth/ContinueWGoogleButton"

export default function Login() {
  return (
    <React.Fragment>
      <Container maxWidth='sm'>
        {/* <Typography> Login Page Goes Here </Typography> */}
        {/* <SignInWGoogleButton /> */}
        <UserLogin />
      </Container>
    </React.Fragment>
  )
}
