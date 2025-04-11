import {
  Card,
  CardContent,
  // Button,
  Box,
  Container,
  Typography,
  TextField,
  Divider,
  Stack,
  Avatar,
  Skeleton,
  IconButton,
  // Link,
} from "@mui/material"
import { Edit, Check, Close } from "@mui/icons-material"
// import { styled } from "@mui/material/styles"
// import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage"
import { RA } from "@/styles"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { auth } from "@/core/api/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import useSnackbar from "@/core/hooks/useSnackbar"
import { firestore } from "@/core/api/firebase"
import { doc, Timestamp, getDoc, updateDoc } from "firebase/firestore"
import { updateEmail, updateProfile } from "firebase/auth"
import { FirebaseError } from "firebase/app"
import ThemeSelect from "@/components/ThemeSelect"

type ErrorField = "displayName" | "email"

interface UserData {
  display_name: string
  created_at: Timestamp
  email?: string
}

/**
 * Displays authenticated user's profile information
 * @author tdhillon113
 */
export default function Profile() {
  // const { uid  } = useAuthState(auth)
  const snackbar = useSnackbar()
  const navigate = useNavigate()

  const [user] = useAuthState(auth)
  const [save, setSave] = useState(false)
  const [email, setEmail] = useState<string>("")
  const [originalEmail, setOriginalEmail] = useState<string>("")
  const [name, setName] = useState("")
  const [originalName, setOriginalName] = useState("")
  const [photoURL, setPhotoURL] = useState("")
  const [displayName, setDisplayName] = useState("")
  const [createdAt, setCreatedAt] = useState<Timestamp | null>(null)
  const [error, setError] = useState({
    displayName: "",
    username: "",
    email: "",
  })
  const [editUser, setEditUser] = useState<string | null>(null)
  const [tempVal, setTempVal] = useState("")
  // const [notif, setNotif] = useState({ show: false, message: "", type: "" })

  console.debug("originalEmail", originalEmail)
  console.debug("name", name)
  console.debug("originalName", originalName)

  useEffect(() => {
    // Load user data on component mount
    const loadUserData = async () => {
      if (user) {
        // Set email and photo URL from auth
        setEmail(user.email ?? "")
        setOriginalEmail(user.email ?? "")
        setPhotoURL(user.photoURL ?? "")

        // Get display name from Firestore
        try {
          const userRef = doc(firestore, "users", user.uid)

          // interface User = {
          //   display_name : string
          //   created_at : Timestamp
          // }

          const userDoc = await getDoc(userRef)
          if (userDoc.exists()) {
            const userData = userDoc.data() as UserData
            const firestoreDisplayName = userData.display_name ?? ""
            const createdTimestamp = userData.created_at ?? null

            setCreatedAt(createdTimestamp)
            //@Michael : is null okay to use?
            setName(firestoreDisplayName)
            setDisplayName(firestoreDisplayName)
            setOriginalName(firestoreDisplayName)

            // user.created_at = joinedAt
          } else {
            // Fallback to auth display name if Firestore doc doesn't exist
            setName(user.displayName ?? "")
            setDisplayName(user.displayName ?? "")
            setOriginalName(user.displayName ?? "")
          }
        } catch (err) {
          console.error("Error fetching user data:", err)
          snackbar.show({
            message: "Failed to load profile data",
            type: "error",
          })
        }
        // } else {
        //   /* @tdhillon113 If the user refreshes the page, they will always get redirected to the login screen. Ping for more details. */
        //   navigate("/login")
        // }
      }
    }

    void loadUserData()
  }, [user, navigate, snackbar])

  const clearFieldError = (field: ErrorField) => {
    setError((prev) => ({ ...prev, [field]: "" }))
  }

  const handleEdit = (field: string, value: string) => {
    setEditUser(field)
    setTempVal(value)
  }

  const cancelEdit = () => {
    setEditUser(null)
    setTempVal("")
  }

  // const handleGoBack = () => {
  //   navigate('/dashboard')
  // }

  const saveChanges = async (field: string): Promise<void> => {
    if (!user) {
      return
    }
    setSave(true)

    try {
      const userRef = doc(firestore, "users", user.uid)

      if (field === "displayName") {
        // Update auth profile
        await updateProfile(user, {
          displayName: tempVal,
        })

        // Update Firestore
        await updateDoc(userRef, {
          display_name: tempVal,
        })

        setName(tempVal)
        setDisplayName(tempVal)
        setOriginalName(tempVal)
      } else if (field === "email") {
        await updateEmail(user, tempVal)
        await updateDoc(userRef, {
          email: tempVal,
        })
        setEmail(tempVal)
        setOriginalEmail(tempVal)
      }

      snackbar.show({
        message: "Profile updated successfully",
        type: "success",
      })
      //edit to snackbar so that message loads on top
    } catch (err: unknown) {
      console.error("Error updating", err)
      if (err instanceof FirebaseError) {
        if (err.code === "email in use <3 ") {
          setError((prev) => ({ ...prev, email: "Email already in use!" }))
        } else if (err.code === "requires login!") {
          snackbar.show({
            message: "Please login again to update your profile",
            type: "error",
          })
          void navigate("/login", { state: { requiresReauth: true } })
        } else {
          snackbar.show({
            message: `Error: ${err.message}`,
            type: "error",
          })
        }
      } else {
        snackbar.show({
          message: "Profile update unsuccessful",
          type: "error",
        })
      }
    } finally {
      setSave(false)
      setEditUser(null)
    }
  }

  const handleSaveDisplayName = (): void => {
    void saveChanges("displayName")
  }
  const handleSaveEmail = (): void => {
    void saveChanges("email")
  }
  return (
    <Container maxWidth='xs'>
      <RA.Bounce triggerOnce>
        <Card raised sx={{ mt: 8, pb: 3 }}>
          <CardContent>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}>
              <Avatar
                src={photoURL}
                alt={displayName}
                sx={{
                  mr: 1,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}>
                {displayName ? displayName.charAt(0).toUpperCase() : "U"}
              </Avatar>
              {/* <Typography variant='h4'>
                {editUser === "displayName" ? (
                  <TextField sx={{justifyContent: 'center'}}
                    variant='standard'
                    value={tempVal}
                    onChange={(e) => {
                      setTempVal(e.target.value)
                      clearFieldError("displayName")
                    }}
                    error={!!error.displayName}
                    helperText={error.displayName}
                  />
                ) : ( */}
              <Typography variant='body1' fontWeight='Bold' sx={{ mr: 1 }}>
                {displayName}
              </Typography>
              {/* //   )}
              // </Typography> */}
              {createdAt ? (
                <Typography variant='body2'>
                  Member Since: {createdAt.toDate().toLocaleDateString()}
                </Typography>
              ) : (
                <Skeleton variant='text' />
              )}
              {/* // <Typography>
              //   Member Since: {updateAt.fromDate().toLocalDateString()}
              // </Typography> */}
            </Box>
            <Divider sx={{ mb: 3 }}></Divider>
            <Stack spacing={3}>
              <Box
                sx={{
                  border: 1,
                  borderColor: "divider",
                  borderRadius: 1,
                  p: 2,
                }}>
                <Box sx={{ textAlign: "center", mb: 2 }}>
                  <Typography variant='body2' color='textSecondary'>
                    Display Name
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}>
                  <Box>
                    {editUser === "displayName" ? (
                      <TextField
                        variant='standard'
                        value={tempVal}
                        onChange={(e) => {
                          setTempVal(e.target.value)
                          clearFieldError("displayName")
                        }}
                        error={!!error.displayName}
                        helperText={error.displayName}
                        fullWidth
                      />
                    ) : (
                      <Typography variant='body1' fontWeight='medium'>
                        {displayName}
                      </Typography>
                    )}
                  </Box>
                  {editUser === "displayName" ? (
                    <Box sx={{ display: "flex", gap: 1, ml: 2 }}>
                      <IconButton
                        color='primary'
                        onClick={
                          handleSaveDisplayName
                          //needed to check an issue where a pop up window was preventing
                          //login properly
                        }
                        disabled={save}
                        size='small'>
                        <Check fontSize='small' />
                      </IconButton>
                      <IconButton
                        color='error'
                        onClick={cancelEdit}
                        size='small'>
                        <Close fontSize='small' />
                      </IconButton>
                    </Box>
                  ) : (
                    <IconButton
                      color='primary'
                      onClick={() => handleEdit("displayName", displayName)}
                      size='small'>
                      <Edit fontSize='small' />
                    </IconButton>
                  )}
                </Box>
              </Box>

              <Box
                sx={{
                  border: 1,
                  borderColor: "divider",
                  borderRadius: 1,
                  p: 2,
                }}>
                <Box sx={{ textAlign: "center", mb: 2 }}>
                  <Typography variant='body2' color='textSecondary'>
                    Email
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}>
                  <Box>
                    {editUser === "email" ? (
                      <TextField
                        variant='standard'
                        type='email'
                        value={tempVal}
                        onChange={(e) => {
                          setTempVal(e.target.value)
                          clearFieldError("email")
                        }}
                        error={!!error.email}
                        helperText={error.email}
                        fullWidth
                      />
                    ) : (
                      <Typography variant='body1' fontWeight='medium'>
                        {email}
                      </Typography>
                    )}
                  </Box>
                  {editUser === "email" ? (
                    <Box sx={{ display: "flex", gap: 1, ml: 2 }}>
                      <IconButton
                        color='primary'
                        onClick={handleSaveEmail}
                        disabled={save}
                        size='small'>
                        <Check fontSize='small' />
                      </IconButton>
                      <IconButton
                        color='error'
                        onClick={cancelEdit}
                        size='small'>
                        <Close fontSize='small' />
                      </IconButton>
                    </Box>
                  ) : (
                    <IconButton
                      color='primary'
                      onClick={() => handleEdit("email", email)}
                      size='small'>
                      <Edit fontSize='small' />
                    </IconButton>
                  )}
                </Box>
              </Box>

              <Box
                sx={{
                  border: 1,
                  borderColor: "divider",
                  borderRadius: 1,
                  p: 2,
                }}>
                <Box sx={{ textAlign: "center", mb: 2 }}>
                  <Typography variant='body2' color='textSecondary'>
                    Theme Appearance
                  </Typography>
                </Box>
                <Box>
                  <ThemeSelect fullWidth />
                </Box>
              </Box>

              <Box mt={2}></Box>
            </Stack>
          </CardContent>
        </Card>
      </RA.Bounce>
    </Container>
  )
}

//add in real time update for how long someone has been a user
//get rid of the successfully updated box and put it on top
// get rid of edit box and use the edit pencil icon on the index.ts documentation
