import { useNavigate } from "react-router-dom"
import { Button } from "@mui/material"
import { Google } from "@mui/icons-material"
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import api from "@/core/api/firebase"

export default function ContinueWGoogleButton() {
  const navigate = useNavigate()
  const auth = getAuth()

  const ContinueWithGoogle = () => {
    signInWithPopup(auth, new GoogleAuthProvider())
      .then((res) => {
        console.debug("res.user.uid", res.user.uid)
        const user = res.user
        return api.users.create(user.uid, {
          email: user.email!,
          display_name: user.displayName!,
          photo_url: user.photoURL,
        })
      })
      .then(() => {
        void navigate("/dashboard")
      })
      .catch((error) => {
        console.debug(error)
      })
  }

  return (
    <Button
      variant='contained'
      color='primary'
      startIcon={<Google />}
      sx={{ mb: 1 }}
      onClick={ContinueWithGoogle}>
      CONTINUE WITH GOOGLE
    </Button>
  )
}
