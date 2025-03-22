import { auth, firestore } from "@/core/api/firebase"
import {
  Typography,
  Container,
  CircularProgress,
  Box,
  Grid2,
  Toolbar,
  Button,
  Fab,
  LinearProgress,
} from "@mui/material"
import {
  arrayRemove,
  doc,
  DocumentReference,
  updateDoc,
} from "firebase/firestore"
import { useNavigate, useParams } from "react-router-dom"
import { useDocumentData } from "react-firebase-hooks/firestore"
import React from "react"
import { Session as PollSessionType } from "@/core/types"
import { useAuthState } from "react-firebase-hooks/auth"
import { Message } from "@mui/icons-material"
import useSnackbar from "@/core/hooks/useSnackbar"

export default function PollSession() {
  const params = useParams()
  const sid = params.id ?? ""
  const ref = doc(
    firestore,
    "sessions",
    sid
  ) as DocumentReference<PollSessionType>
  const [session, loading, error] = useDocumentData<PollSessionType>(ref)
  const [user] = useAuthState(auth)
  const snackbar = useSnackbar()
  const navigate = useNavigate()

  console.debug("PollLobby.session", session)
  console.debug("PollLobby.loading", loading)

  if (error) {
    return (
      <Container>
        <Typography>Error Error Error!</Typography>
      </Container>
    )
  }

  if (loading) {
    return (
      <Grid2
        container
        justifyContent={"center"}
        alignItems={"center"}
        sx={{ height: "90vh" }}>
        <CircularProgress size={40} />
      </Grid2>
    )
  }

  if (!session) {
    return (
      <Container>
        <Typography>Failed to find lobby(${sid})</Typography>
      </Container>
    )
  }

  function handleLeave() {
    /* TODO - if the user is a guest, then delete their account after deleting them from the waiting_users collection */
    async function aux() {
      if (!user) {
        return
      }
      const docRef = doc(firestore, "lobby", sid)
      try {
        await updateDoc(docRef, {
          users: arrayRemove(user.uid),
        })
        snackbar.show({
          message: `You left the lobby`,
          type: "info",
        })
        if (user.isAnonymous) {
          void navigate("/")
        } else {
          void navigate(-1)
        }
        console.debug(`User ${user.uid} removed successfully`)
      } catch (err) {
        console.debug("Error removing user:", err)
      }
    }
    void aux()
  }

  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      height={"80vh"}>
      <Box>
        <Typography variant='h6'>Joining session...</Typography>
        {/* <Typography variant='h6'>Waiting for host approval...</Typography> */}
        <LinearProgress />
      </Box>
    </Box>
  )

  return (
    <React.Fragment>
      <Toolbar
        sx={{
          justifyContent: "center",
          boxShadow: "2px 2px rgba(0,0,0,0.1)",
        }}>
        <Button onClick={handleLeave}>Leave</Button>
        <Box flexGrow={1} />
        <Box position={"absolute"}>
          <Typography variant='h6'>Poll Title Goes Here</Typography>
          {/* <Typography>{itops(session.users.length || 0)}</Typography> */}
        </Box>
      </Toolbar>
      <Container sx={{ mt: 2 }}>
        {/* <Grid2 container spacing={2}>
          {session?.users.map((x) => (
            <Grid2 key={x} size={{ lg: 3, md: 4, sm: 6, xs: 12 }}>
              <RA.Zoom triggerOnce>
                <UserSessionCard userId={x} />
              </RA.Zoom>
            </Grid2>
          ))}
        </Grid2> */}
        <Fab
          color='primary'
          onClick={() =>
            snackbar.show({ type: "error", message: "Not Yet Implemented" })
          }
          sx={{ position: "absolute", bottom: 0, right: 0, mr: 2, mb: 2 }}>
          <Message />
        </Fab>
      </Container>
    </React.Fragment>
  )
}

// function itops(size: number) {
//   if (size > 1) {
//     return `${size} Participants`
//   }
//   return `${size} Participant`
// }
