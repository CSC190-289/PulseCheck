import { Button, Container, Stack, TextField, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { createUser, findLobbyWithCode, joinLobby } from "@/core/api"
import { signInAnonymously } from "firebase/auth"
import { auth } from "@/core/api/firebase"
import useSnackbar from "@/core/hooks/useSnackbar"
import { FormEvent } from "react"
//import { HelpOutline } from "@mui/icons-material"

export default function GuestJoin() {
  const navigate = useNavigate()
  const [roomCode, setRoomCode] = useState<string>("")
  const [displayName, setDisplayName] = useState<string>("")
  const snackbar = useSnackbar()

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
        const lobby = await findLobbyWithCode(roomCode)
        const cred = await signInAnonymously(auth)
        console.debug("lobby", lobby)
        console.debug("cred", cred)
        await createUser(cred.user.uid, displayName)
        await joinLobby(lobby.id, cred.user.uid)
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

  const handleCreateAccount = () => {
    void navigate("/register")
  }

  //   const getInfo = () => {
  // );
  //   }

  // const handleClickTest = () => {
  // void AddingUserToRoom(displayName, roomCode)
  // }

  return (
    <Container
      maxWidth='xs' //This allow the container to fit a certain size
    >
      <Typography
        variant='h5'
        textAlign='center'
        marginTop={5}
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
          variant='contained'
          color='primary'
          type='submit'
          onClick={handleJoinClick}
          fullWidth>
          POLL UP
        </Button>
        <Button
          variant='contained'
          color='primary'
          onClick={handleCreateAccount}
          fullWidth>
          CREATE AN ACCOUNT
        </Button>
        {/* <Button
          variant='contained'
          color='primary'
          onClick={handleClickTest}
          fullWidth>
          Testing
        </Button> */}
      </Stack>
    </Container>
  )
}
