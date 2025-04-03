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
  Link,
  Box,
} from "@mui/material"
import { RA } from "@/styles"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import api, { auth } from "@/core/api/firebase"
import useSnackbar from "@/core/hooks/useSnackbar"
import { createUserWithEmailAndPassword } from "firebase/auth"
import SignInWGoogleButton from "@/components/auth/ContinueWGoogleButton"
import { FirebaseError } from "firebase/app"

const PASS_LEN = 6
type ErrorField = "displayName" | "email" | "password" | "retypePassword"

export default function RegisterJoin() {
  const navigate = useNavigate()
  const snackbar = useSnackbar()
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState("")
  const [retypePassword, setRetypePassword] = useState("")
  // const [showPassword, setShowPassword] = useState(false)
  // const [showRetypePassword, setShowRetypePassword] = useState(false)
  const [errors, setErrors] = useState({
    displayName: "",
    email: "",
    password: "",
    retypePassword: "",
  })
  const [displayName, setDisplayName] = useState("")

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
    // setErrors({
    //   email: "",
    //   password: "",
    //   retypePassword: "",
    // })
    let validated = true
    if (!displayName) {
      setFieldError("displayName", "Display name required!")
      validated = false
    }
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
    } else if (password.length < PASS_LEN) {
      setFieldError(
        "password",
        `Password needs to be at least ${PASS_LEN} characters.`
      )
      validated = false
    }

    if (password && password !== retypePassword) {
      setFieldError("retypePassword", "Passwords don't match")
      validated = false
    }
    return validated
    // try {
    //   if (!email) {
    //     setFieldError("email", "Email required!")
    //   }
    //   if (!/\S+@\S+\.\S+/.test(email)) {
    //     setFieldError("email", "Invalid email")
    //   }
    //   if (!password) {
    //     setFieldError("password", "Password required")
    //   }

    //   if (password.length < PASS_LEN) {
    //     setFieldError("password", "Password too short")
    //   }

    //   if (password !== retypePassword) {
    //     setFieldError("retypePassword", "Passwords don't match")
    //   }
    //   return true
    // } catch (err: unknown) {
    //   console.debug(err)
    //   return false
    // }
  }

  const handleRegClick = async () => {
    if (!validate()) {
      return
    }
    try {
      //checking if users exists in firestore
      // const userRef = doc(db, "users", email)
      // const userSnap = await getDoc(userRef)

      //   await createUser(email, password)

      /* this will never be true since you're trying to find a doc in path users/${email} */
      /* what you want to do is query or maybe firebase auth has a way to check if an email is taken */
      // if (userSnap.exists()) {
      //   setErrors((prev) => ({ ...prev, email: "Email registered already" }))
      //   snackbar.show({ message: "Email already exists" })
      //   return
      // }

      const UserCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )

      const user = UserCredential.user

      //saving user to firebase
      await api.users.create(user.uid, {
        email: user.email!,
        display_name: displayName,
        photo_url: user.photoURL,
      })

      snackbar.show({
        message: "Get Ready to Poll Up",
      })

      void navigate("/dashboard")
    } catch (err: unknown) {
      //error handling method used from firebase authentication page
      if (err instanceof FirebaseError) {
        if (err.code === "auth/email-already-in-use") {
          setErrors((prev) => ({ ...prev, email: "Email already in use!" }))
          // snackbar.show({
          //   message: "Email already in use, try logging in",
          //   type: "error",
          // })
        }
      }
      // if (error === "auth/email-already-in-use") {
      // } else {
      //   snackbar.show({
      //     message: "Email registered Try logging in!",
      //   })
      // }
    }
  }

  const handleLink = () => {
    void navigate("/login")
  }

  return (
    <Container maxWidth='xs'>
      <RA.Bounce triggerOnce>
        <Card raised sx={{ mt: 8, pb: 2 }}>
          <CardContent>
            <Typography variant='h5' textAlign='center' marginBlock={4}>
              Register!
            </Typography>
            <Stack
              component={"form"}
              sx={{ m: 1 }}
              spacing={2}
              noValidate
              autoComplete='off'>
              <TextField
                label='Display Name'
                variant='outlined'
                fullWidth
                value={displayName}
                onChange={(e) => {
                  setDisplayName(e.target.value)
                  clearFieldError("displayName")
                }}
                error={!!errors.displayName}
                helperText={errors.displayName}
              />
              <TextField
                id='register-email'
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
                id='register-password'
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
              <TextField
                id='register-retype-password'
                label='Re-Type Password'
                fullWidth
                // type={showPassword ? "text" : "password"}
                value={retypePassword}
                type='password'
                onChange={(e) => {
                  setRetypePassword(e.target.value)
                  clearFieldError("retypePassword")
                }}
                // onKeyDown={() => clearFieldError("retypePassword")}
                error={!!errors.retypePassword}
                helperText={errors.retypePassword}
                // InputProps={{
                //   endAdornment: (
                //     <InputAdornment position='end'>
                //       <IconButton
                //         aria-label='toggle visibility'
                //         onClick={() => setShowPassword((prev) => !prev)}
                //         edge='end'
                //         size='small'>
                //         {showPassword ? <VisibilityOff /> : <Visibility />}
                //       </IconButton>
                //     </InputAdornment>
                //   ),
                // }}
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
              {/* <Typography
                textAlign='right'
                sx={{
                  mt: 1,
                  color: "primary.main",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
                onClick={() => void navigate("/login")}>
                Already Have an account?
              </Typography> */}

              <Box display={"flex"} flex={1} justifyContent={"right"}>
                <Link
                  color='textPrimary'
                  onClick={handleLink}
                  variant='body2'
                  sx={{
                    cursor: "pointer",
                  }}>
                  Already have an account? Login
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
