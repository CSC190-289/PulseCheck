// import { RA } from "@/styles"
import {
  Card,
  CardContent,
  Button,
  Container,
  Stack,
  TextField,
  Divider,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material"
import { RA } from "@/styles"
// import {Stack} from "@mui/material/Stack"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
// import { createUser } from "@/core/api"
import { auth, db } from "@/core/api/firebase"
import useSnackbar from "@/core/hooks/useSnackbar"
// import React from "react"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { createUserWithEmailAndPassword } from "firebase/auth"
import SignInWGoogleButton from "@/components/auth/ContinueWGoogleButton"
import { Visibility, VisibilityOff } from "@mui/icons-material"

export default function RegisterJoin() {
  const navigate = useNavigate()
  const snackbar = useSnackbar()
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState("")
  const [retypePassword, setRetypePassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  // const [showRetypePassword, setShowRetypePassword] = useState(false)
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    retypePassword: "",
  })

  //   const snackbar = useSnackbar()

  const setFieldError = (field: string, message: string) => {
    setErrors((prev) => ({
      ...prev,
      [field]: message,
    }))
    throw new Error(message)
  }

  const validate = () => {
    setErrors({
      email: "",
      password: "",
      retypePassword: "",
    })

    try {
      if (!email) {
        setFieldError("email", "Email required!")
      }
      if (!/\S+@\S+\.\S+/.test(email)) {
        setFieldError("email", "Invalid email")
      }
      if (!password) {
        setFieldError("password", "Password required")
      }

      if (password.length < 3) {
        setFieldError("password", "Password to short")
      }

      if (password !== retypePassword) {
        setFieldError("retypePassword", "Passwords dont match")
      }
      return true
    } catch (errors) {
      return false
    }
  }

  const handleRegClick = async () => {
    try {
      if (!validate()) {
        return
      }

      //checking if users exists in firestore
      const userRef = doc(db, "users", email)
      const userSnap = await getDoc(userRef)

      //   await createUser(email, password)

      if (userSnap.exists()) {
        setErrors((prev) => ({ ...prev, email: "Email registered already" }))
        snackbar.show({ message: "Email already exists" })
        return
      }

      const UserCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )

      const user = UserCredential.user

      //saving user to firebase

      await setDoc(
        doc(db, "users", user.uid),
        {
          email: user.email,
          createdAt: new Date(),
        },
        { merge: true }
      ) //data merge

      snackbar.show({
        message: "Get Ready to Poll Up",
      })

      void navigate("/dashboard")
    } catch (error: any) {
      //error handling method used from firebase authentication page

      if (error === "auth/email-already-in-use") {
        setErrors((prev) => ({ ...prev, email: "Email is taken!" }))
        snackbar.show({
          message: "Email already in use, try logging in",
        })
        // } else {
        //   snackbar.show({
        //     message: "Email registered Try logging in!",
        //   })
      }
    }
  }
  return (
    <Container maxWidth='xs'>
      <RA.Bounce>
        <Card raised sx={{ mt: 8, pb: 2 }}>
          <CardContent>
            <Typography
              variant='h6'
              textAlign='center'
              marginTop={5}
              marginBottom={5}>
              Register!
            </Typography>
            <Stack
              component={"form"}
              sx={{ m: 1 }}
              spacing={3}
              noValidate
              autoComplete='off'>
              <TextField
                id='register-email'
                label='Email'
                variant='outlined'
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!errors.email}
                helperText={errors.email}
              />
              <TextField
                id='register-password'
                label='Password'
                fullWidth
                
                value={password}
                type={showPassword ? "text" : "password"}
                onChange={(e) => setPassword(e.target.value)}
              />
              <TextField
                id='register-retype-password'
                label='Re-type Password'
                fullWidth
                type={showPassword ? "text" : "password"}
                value={retypePassword}
                onChange={(e) => setRetypePassword(e.target.value)}
                error={!!errors.retypePassword}
                helperText={errors.retypePassword}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='toggle visibility'
                        onClick={() => setShowPassword((prev) => !prev)}
                        edge='end'
                        size='small'>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
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

              <Typography
                  textAlign ="right"
                  sx={{
                    mt:1,
                    color: 'primary.main',
                    '&:hover':{
                      textDecoration:'underline'
                    }
                  
    
                  }}
                  onClick={() => navigate('/login')}
            >
            Already Have an account? 
            </Typography>


              <Button
                variant='contained'
                color='primary'
                fullWidth
                onClick={handleRegClick}>
                Register
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
