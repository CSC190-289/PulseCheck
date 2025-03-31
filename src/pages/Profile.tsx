import { Card, CardContent, Button, Box, Container, Typography, TextField, Divider, Stack, Avatar} from "@mui/material"
import {RA} from "@/styles"
import { useState, useEffect } from "react"
import{useNavigate} from "react-router-dom"
import { auth } from "@/core/api/firebase"
import ThemeToggleButton from "@/core/components/ThemeToggleButton"
import useSnackbar from "@/core/hooks/useSnackbar"
import { firestore } from "@/core/api/firebase"

import { doc, serverTimestamp, setDoc, getDoc, updateDoc } from "firebase/firestore"
import { updateEmail, updateProfile } from "firebase/auth"
import { FirebaseError } from "firebase/app"

type ErrorField = "displayName" | "email"

export default function Profile() {
  const snackbar = useSnackbar()
  const navigate = useNavigate()
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
  const [notif, setNotif] = useState({show: false, message: "", type:""})


  useEffect(() => {
    // Load user data on component mount
    if (auth.currentUser) {
      setEmail(auth.currentUser.email || "")
      setOriginalEmail(auth.currentUser.email || "")
      setName(auth.currentUser.displayName || "")
      setDisplayName(auth.currentUser.displayName || "")
      setOriginalName(auth.currentUser.displayName || "")
      setPhotoURL(auth.currentUser.photoURL || "")

    } else {
      navigate('/login')}}, [navigate])


  const clearFieldError = (field: ErrorField) => {
    setError(prev => ({...prev, [field]: ""}))
  }

  const Edit = (field: string, value:string) => {
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
    if(!auth.currentUser) return 
    setSave(true)

//updates in firestore

try{
  const userRef = doc(firestore, "users", auth.currentUser.uid)
  if(field === "displayName") {
    await updateProfile(auth.currentUser, {
      displayName: tempVal
  })
  await updateDoc(userRef, {
    display_name: tempVal
  })

  setName(tempVal)
  setDisplayName(tempVal)
  setOriginalName(tempVal)
} else if (field === "email") {
  await updateEmail(auth.currentUser, tempVal)

  await updateDoc(userRef, {
    email: tempVal
  })
  setEmail(tempVal)
  setOriginalEmail(tempVal)

} 
setNotif({
  show:true,
  message: "Profile updates successfully",
  type:"success"
})

} catch (error: unknown) {
  console.error("Error updating", error)

  //error handle: got it from interweb
if (error instanceof FirebaseError) {

  if (error.code === "Email in use") {
    setError(prev => ({...prev, email: "Email already in use!"}))
  } else if (error.code === "Requires login") {
    snackbar.show({
      message: "Login again",
      type: "error"
    })

    navigate('/login', {state: {requiresReauth: true}})
    //double check if this can work
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
}
}

//didnt know what finally was but apparently used with promises regardless if resolves successfully or rejected..
//dk if this will be an issue later in thr day :D




  return (
    <Container maxWidth='xs'>
      <RA.Bounce triggerOnce>
        <Card raised sx={{ mt: 7, pb: 12 }}>
          <CardContent>
            <Typography variant='h5' textAlign='center' marginBlock={4}>
              Profile
            </Typography>

            <Box display= "flex" justifyContent="center" mb={5}>
            <Avatar
          
                src={photoURL}
                alt={displayName}
                >
                  {displayName ? displayName.charAt(0).toUpperCase(): "U"}
                </Avatar>
           </Box>
            
            <Stack
              sx={{ m: 3}}
              spacing={3}>

                <Box sx ={{ border: 1, borderColor: 'divider', borderRadius: 1, p:2}}>
                  <Box sx={{ display: 'flex', justifyContent: "center", alignItems: 'center'}}>
                    <Box>
                      <Typography variant= "body2" color="textSecondary" > Display Name</Typography>
                      {editUser === "displayName" ? (
                        <TextField
                          
                          variant="standard"
                          value={tempVal}
                          onChange={(e) => {
                            setTempVal(e.target.value)
                            clearFieldError("displayName")
                          }}
                          error={!!error.displayName}
                          />
                        ) : (
                          <Typography variant= "body1" fontWeight="medium"> {displayName}</Typography>
                        )}
                    </Box>
                  </Box>
                  {editUser === "displayName" ? (
                    <Box sx={{display: 'flex', gap:1, alignItems:'center'}}>
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
                  ):(
                    <Button
                    color="primary"
                    onClick={() => Edit("displayName", displayName)}>
                      Edit
                    </Button>
                  )}
                </Box>

                <Box sx={{ border: 1, borderColor: 'divider', borderRadius: 1, p:2}}>
                  <Box sx={{display: 'flex', justifyContent: 'space-evenly', alignItems: 'center'}}>
                  </Box>

                  <Typography variant="body2" color="textSecondary">Email</Typography>
                  {editUser === "email" ? (
                    <TextField
                    fullWidth
                    variant="standard"
                    type="email"
                    value={tempVal}
                    onChange={(e) =>{
                      setTempVal(e.target.value)
                      clearFieldError("email") 
                    }}
                    error={!!error.email}
                    />
                  ):(
                    <Typography variant="body1" fontWeight="medium">{email}</Typography>
                  )} 

                {editUser === "email" ? (
                  <Box sx={{ display: 'flex', gap: 2}}>
                  <Button
                  variant="contained"
                  size="small"
                  color="primary"
                  onClick={() => saveChanges("email")}
                  disabled={save}> Save

                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    color="error"
                    onClick={cancelEdit}>
                    
                      Cancel
                    </Button>
                  </Box>
                ):(
                  <Button
                  color="primary"
                  onClick={() => Edit("email", email)}>
                    Edit
                  </Button>
                )}
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

            </Stack>
          </CardContent>
        </Card>
      </RA.Bounce>
    </Container>
  )
}
  
            
             
             