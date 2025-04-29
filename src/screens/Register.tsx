import { Container } from "@mui/material"
import React from "react"
import RegisterJoin from "@/components/auth/RegisterJoin"
import useRedirectIfAuthenticated from "@/lib/hooks/useRedirectIfAuthenticated"
// import { useAuthContext } from "@/lib/hooks"
// import { useNavigate } from "react-router-dom"
// import SignInWGoogleButton from "@/components/auth/SignInWGoogleButton"

export default function Register() {
  useRedirectIfAuthenticated()
  // const auth = useAuthContext()
  // const navigate = useNavigate()

  // useEffect(() => {
  //   if (auth.user && !auth.user.isAnonymous && !auth.loading) {
  //     void navigate("/dashboard")
  //   }
  // }, [auth, navigate])

  return (
    <React.Fragment>
      <Container maxWidth='sm'>
        {/* <Typography> Sorry Brando he made me do it</Typography> */}
        {/* <SignInWGoogleButton /> */}
        <RegisterJoin />
      </Container>
    </React.Fragment>
  )
}
