import {
  Button,
  Container,
  Stack,
  TextField,
  Typography,
  Card,
  CardContent,
} from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { createUser, findLobbyWithCode, joinLobby } from "@/core/api"
import { auth } from "@/core/api/firebase"
import useSnackbar from "@/core/hooks/useSnackbar"
import { useAuthState } from "react-firebase-hooks/auth"
import { FormEvent } from "react"
import { RA } from "@/styles"

export default function PollJoin() {
  const navigate = useNavigate()
  const [roomCode, setRoomCode] = useState<string>("")
  const [displayName, setDisplayName] = useState<string>("")
  const snackbar = useSnackbar()
  const [user] = useAuthState(auth)

  const handleJoinClick = (e: MouseEvent | FormEvent) => {
    e.preventDefault()
    const aux = async () => {
      try {
        if (!roomCode.trim()) {
          throw new Error("Room Code cannot be blank!")
        }
        if (!displayName.trim()) {
          throw new Error("Display Name cannot be blank!")
        }
        if (!user) {
          throw new Error(
            "Please log in to join a poll! You shouldn't be here."
          )
        }
        const lobby = await findLobbyWithCode(roomCode)

        //const cred = await signInAnonymously(auth)

        console.debug("lobby", lobby)
        //console.debug("cred", cred)

        await createUser(user.uid, displayName)
        await joinLobby(lobby.id, user.uid)
        await navigate(`/poll/${lobby.id}/lobby`)
      } catch (err: unknown) {
        if (err instanceof Error) {
          snackbar.show({
            message: err.message,
            type: "error",
          })
        } else {
          snackbar.show({
            message: "An unexpected error occured.",
            type: "error",
          })
        }
      }
    }
    void aux()
  }
  return (
    <Container
      maxWidth='xs' //This allow the container to fit a certain size
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        minHeight: "90vh",
      }}>
      <RA.Bounce>
        <Card raised sx={{ paddingInline: 3, paddingBlock: 3 }}>
          <CardContent>
            <Typography
              variant='h5'
              textAlign='center'
              marginTop={3}
              marginBottom={5}>
              Join Poll
            </Typography>

            <Stack
              component='form'
              onSubmit={handleJoinClick}
              sx={{ m: 1 }} // margin for everything in the box
              spacing={3}
              noValidate
              autoComplete='off'>
              {/*FullWidth allows the button to extend to the xs maxwidth (styles it to match other button that have longer text or shorter)*/}
              {/* We need to add the Join Function*/}
              <TextField
                id='room-code'
                label='Room Code'
                variant='outlined'
                fullWidth
                onChange={(e) => setRoomCode(e.target.value)}
              />
              <TextField
                id='guest-name'
                label='Display Name'
                variant='outlined'
                fullWidth
                onChange={(e) => setDisplayName(e.target.value)}
              />
              <Button
                type='submit'
                variant='contained'
                color='primary'
                onClick={handleJoinClick}
                fullWidth>
                POLL UP
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </RA.Bounce>
    </Container>
  )
}
