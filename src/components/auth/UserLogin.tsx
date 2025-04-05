import {
  Card,
  CardContent,
  Button,
  Container,
  Stack,
  TextField,
  Divider,
  Typography,
  Link,
  Box,
} from "@mui/material"

import { RA } from "@/styles"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { auth } from "@/core/api/firebase"
import useSnackbar from "@/core/hooks/useSnackbar"
import { signInWithEmailAndPassword } from "firebase/auth"
import SignInWGoogleButton from "@/components/auth/ContinueWGoogleButton"
import { FirebaseError } from "firebase/app"

type ErrorField = "email" | "password"

export default function UserLogin() {
  const navigate = useNavigate()
  const snackbar = useSnackbar()
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  })
  // const [displayName, setDisplayName] = useState("")

  const clearFieldError = (field: ErrorField) => {
    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }))
  }

  const setFieldError = (field: ErrorField, message: string) => {
    setErrors((prev) => ({
      ...prev,
      [field]: message,
    }))
    // throw new Error(message)
  }

  const validate = () => {
    let validated = true
    if (!email) {
      setFieldError("email", "Email required!")
      validated = false
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setFieldError("email", "Invalid email!")
      validated = false
    }
    if (!password) {
      setFieldError("password", "Password required!")
      validated = false
    }
    return validated
  }

  const handleRegClick = async () => {
    if (!validate()) {
      return
    }
    try {
      await signInWithEmailAndPassword(auth, email, password)

      snackbar.show({
        message: "Get Ready to Poll Up",
      })

      void navigate("/dashboard")
    } catch (err: unknown) {
      //error handling method used from firebase authentication page
      if (err instanceof FirebaseError) {
        // if (err.code === "auth/user-not-found" || "auth/wrong-password") {
        //   setErrors((prev) => ({ ...prev, email, password: "User not found!" }));
        // } tried both in one if statement, didn't end up working so split them up
        if (err.code === "auth/user-not-found") {
          setErrors((prev) => ({ ...prev, email: "User not found!" }))
        } else if (err.code === "auth/wrong-password") {
          setErrors((prev) => ({ ...prev, password: "Incorrect password!" }))
        } else {
          snackbar.show({
            message: "Incorrect Email or Password. Please try again.",
            type: "error",
          })
        }
      }
    }
  }

  const handleLink = () => {
    void navigate("/register")
  }

  return (
    <Container maxWidth='xs'>
      <RA.Bounce triggerOnce>
        <Card raised sx={{ mt: 8, pb: 2 }}>
          <CardContent>
            <Typography variant='h5' textAlign='center' marginBlock={4}>
              Login!
            </Typography>
            <Stack
              component={"form"}
              sx={{ m: 1 }}
              spacing={2}
              noValidate
              autoComplete='off'>
              <TextField
                id='user-email'
                label='Email'
                type='email'
                variant='outlined'
                fullWidth
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  clearFieldError("email")
                }}
                // onKeyDown={() => clearFieldError("email")}
                error={!!errors.email}
                helperText={errors.email}
              />
              <TextField
                id='input-password'
                label='Password'
                fullWidth
                value={password}
                // type={showPassword ? "text" : "password"}
                type='password'
                onChange={(e) => {
                  setPassword(e.target.value)
                  clearFieldError("password")
                }}
                // onKeyDown={() => clearFieldError("password")}
                error={!!errors.password}
                helperText={errors.password}
              />
              {/* <IconButton
                sx={{
                  position: "absolute",
                  right: 50,
                  top: 20,
                }}
                onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton> */}

              <Box display={"flex"} flex={1} justifyContent={"right"}>
                <Link
                  color='textPrimary'
                  onClick={handleLink}
                  variant='body2'
                  sx={{ cursor: "pointer" }}>
                  Don't have an account? Register
                </Link>
              </Box>

              <Button
                variant='contained'
                color='primary'
                fullWidth
                type='submit'
                onClick={(e) => {
                  /* 
                      setting the button type to submit allows you to fire 
                      the button's on click event with the 'Enter' key 🤓 
                    */
                  e.preventDefault()
                  void handleRegClick()
                }}>
                Login
              </Button>
              <Divider>
                <Typography color='textSecondary'> or </Typography>
              </Divider>

              <SignInWGoogleButton />
            </Stack>
          </CardContent>
        </Card>
      </RA.Bounce>
    </Container>
  )
}
