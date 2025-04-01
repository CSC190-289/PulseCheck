import { Card, CardContent, Button, Box, Container, Typography, TextField, Divider, Stack, Avatar, Link } from "@mui/material"
import { RA } from "@/styles"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { auth } from "@/core/api/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import ThemeToggleButton from "@/components/ThemeToggleButton"
import useSnackbar from "@/core/hooks/useSnackbar"
import { firestore } from "@/core/api/firebase"
import { doc, serverTimestamp, setDoc, getDoc, updateDoc } from "firebase/firestore"
import { updateEmail, updateProfile } from "firebase/auth"
import { FirebaseError } from "firebase/app"


type ErrorField = "displayName" | "email"

export default function Profile() {
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
  const [error, setError] = useState({
    displayName: "",
    username: "",
    email: ""
  })
  const [editUser, setEditUser] = useState(null);
  const [tempVal, setTempVal] = useState("");
  const [notif, setNotif] = useState({ show: false, message: "", type: "" })

  useEffect(() => {
    // Load user data on component mount
    const loadUserData = async () => {
      if (user) {
        // Set email and photo URL from auth
        setEmail(user.email || "")
        setOriginalEmail(user.email || "")
        setPhotoURL(user.photoURL || "")
        
        // Get display name from Firestore
        try {
          const userRef = doc(firestore, "users", user.uid)
          const userDoc = await getDoc(userRef)
          
          if (userDoc.exists()) {
            const userData = userDoc.data()
            const firestoreDisplayName = userData.display_name || ""
            
            setName(firestoreDisplayName)
            setDisplayName(firestoreDisplayName)
            setOriginalName(firestoreDisplayName)
          } else {
            // Fallback to auth display name if Firestore doc doesn't exist
            setName(user.displayName || "")
            setDisplayName(user.displayName || "")
            setOriginalName(user.displayName || "")
          }
        } catch (error) {
          console.error("Error fetching user data:", error)
          snackbar.show({
            message: "Failed to load profile data",
            type: "error"
          })
        }
      } else {
        navigate('/login')
      }
    }
    
    loadUserData()
  }, [user, navigate, snackbar])

  const clearFieldError = (field: ErrorField) => {
    setError(prev => ({ ...prev, [field]: "" }))
  }

  const Edit = (field: string, value: string) => {
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

  const saveChanges = async (field: string) => {
    if (!user) return
    setSave(true)
    
    try {
      const userRef = doc(firestore, "users", user.uid)
      
      if (field === "displayName") {
        // Update auth profile
        await updateProfile(user, {
          displayName: tempVal
        })
        
        // Update Firestore
        await updateDoc(userRef, {
          display_name: tempVal
        })
        
        setName(tempVal)
        setDisplayName(tempVal)
        setOriginalName(tempVal)
      } else if (field === "email") {
        await updateEmail(user, tempVal)
        await updateDoc(userRef, {
          email: tempVal
        })
        setEmail(tempVal)
        setOriginalEmail(tempVal)
      }
      
      setNotif({
        show: true,
        message: "Profile updated successfully",
        type: "success"
      })
    } catch (error: unknown) {
      console.error("Error updating", error)
      if (error instanceof FirebaseError) {
        if (error.code === "auth/email-already-in-use") {
          setError(prev => ({ ...prev, email: "Email already in use!" }))
        } else if (error.code === "auth/requires-recent-login") {
          snackbar.show({
            message: "Please login again to update your profile",
            type: "error"
          })
          navigate('/login', { state: { requiresReauth: true } })
        } else {
          snackbar.show({
            message: `Error: ${error.message}`,
            type: "error"
          })
        }
      } else {
        snackbar.show({
          message: "Profile update unsuccessful",
          type: "error"
        })
      }
    } finally {
      setSave(false)
      setEditUser(null)
    }
  }

  return (
    <Container maxWidth='xs'>
      <RA.Bounce triggerOnce>
        <Card raised sx={{ mt: 12, pb: 3 }}>
          <CardContent>
            <Box sx={{display:"flex", alignItems:"center", flexDirection: 'column'}}>
              <Avatar 
                src={photoURL}
                alt={displayName}
                sx={{ mr: 2 }}
              >
                {displayName ? displayName.charAt(0).toUpperCase() : "U"}
              </Avatar>
              <Typography variant='h4'>
              {editUser === "displayName" ? (
                      <TextField
                        variant="standard"
                        value={tempVal}
                        onChange={(e) => {
                          setTempVal(e.target.value)
                          clearFieldError("displayName")
                        }}
                        error={!!error.displayName}
                        helperText={error.displayName}
                      />
                    ) : (
                      <Typography variant="body1" fontWeight="medium">{displayName}</Typography>
                    )}
              </Typography>
            </Box>
            <Divider sx={{ mb: 3}}>
            
            </Divider>
            <Stack spacing={3}>
              <Box sx={{ border: 1, borderColor: 'divider', borderRadius: 1, p: 2 }}>
                {/* Display Name Section with centered title */}
                <Box sx={{ textAlign: 'center', mb: 2 }}>
                  <Typography variant="body2" color="textSecondary">Display Name</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    {editUser === "displayName" ? (
                      <TextField
                        variant="standard"
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
                      <Typography variant="body1" fontWeight="medium">{displayName}</Typography>
                    )}
                  </Box>
                  {editUser === "displayName" ? (
                    <Box sx={{ display: 'flex', gap: 1, ml: 2 }}>
                      <Button
                        variant="contained"
                        size="small"
                        color="primary"
                        onClick={() => saveChanges("displayName")}
                        disabled={save}>
                        Save
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        color="error"
                        onClick={cancelEdit}>
                        Cancel
                      </Button>
                    </Box>
                  ) : (
                    <Button
                      color="primary"
                      onClick={() => Edit("displayName", displayName)}>
                      Edit
                    </Button>
                  )}
                </Box>
              </Box>

              <Box sx={{ border: 1, borderColor: 'divider', borderRadius: 1, p: 2 }}>
                {/* Email Section with centered title */}
                <Box sx={{ textAlign: 'center', mb: 2 }}>
                  <Typography variant="body2" color="textSecondary">Email</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    {editUser === "email" ? (
                      <TextField
                        variant="standard"
                        type="email"
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
                      <Typography variant="body1" fontWeight="medium">{email}</Typography>
                    )}
                  </Box>
                  {editUser === "email" ? (
                    <Box sx={{ display: 'flex', gap: 1, ml: 2 }}>
                      <Button
                        variant="contained"
                        size="small"
                        color="primary"
                        onClick={() => saveChanges("email")}
                        disabled={save}>
                        Save
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        color="error"
                        onClick={cancelEdit}>
                        Cancel
                      </Button>
                    </Box>
                  ) : (
                    <Button
                      color="primary"
                      onClick={() => Edit("email", email)}>
                      Edit
                    </Button>
                  )}
                </Box>
              </Box>

              {notif.show && (
                <Box sx={{
                  p: 2,
                  borderRadius: 2,
                  bgcolor: notif.type === "success" ? "success.light" : "error.light",
                  color: notif.type === "success" ? "success.dark" : "error.dark"
                }}>
                  <Typography>{notif.message}</Typography>
                </Box>
              )}

              {/* Theme Appearance with centered title */}
              <Box sx={{ 
                border: 1, 
                borderColor: 'divider', 
                borderRadius: 1, 
                p: 2
              }}>
                <Box sx={{ textAlign: 'center', mb: 2 }}>
                  <Typography variant="body2" color="textSecondary">Theme Appearance</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <ThemeToggleButton />
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