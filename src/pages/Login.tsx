import { Typography } from "@mui/material"
import React from "react"
import SignInWGoogleButton from "@/components/auth/ContinueWGoogleButton"

export default function Login() {
  return (
    <React.Fragment>
      <Typography>Login Page Goes Here</Typography>
      <SignInWGoogleButton />
    </React.Fragment>
  )
}
