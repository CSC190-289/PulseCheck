import {
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material"
import { useNavigate, useSearchParams } from "react-router-dom"
import api from "@/core/api/firebase"
import { FormEvent, useState } from "react"
import useSnackbar from "@/core/hooks/useSnackbar"
import { RA } from "@/styles"

export default function GuestJoin() {
  const navigate = useNavigate()
  const [query] = useSearchParams()
  const [roomCode, setRoomCode] = useState<string>(query.get("code") ?? "")
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
        /* find session with code */
        const sref = await api.sessions.getByCode(roomCode)
        /* then sign in as a guest */
        const cred = await api.auth.loginAsGuest()
        /* add yourself to the queue */
        await api.sessions.enqueue(sref.id, cred.user.uid, {
          display_name: displayName,
          photo_url: null,
        })
        await navigate(`/poll/session/${sref.id}`)
      } catch (err: unknown) {
        console.debug(err)
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

  return (
    <Container
      maxWidth='xs' //This allow the container to fit a certain size
    >
      <RA.Bounce>
        <Card raised sx={{ mt: 8, pb: 2 }}>
          <CardContent>
            <Typography variant='h5' textAlign='center' marginBlock={4}>
              Join Poll
            </Typography>
            <Stack
              component='form'
              onSubmit={handleJoinClick}
              sx={{ m: 1 }} // margin for everything in the box
              spacing={2}
              noValidate
              autoComplete='off'>
              {/*FullWidth allows the button to extend to the xs maxwidth (styles it to match other button that have longer text or shorter)*/}
              {/* We need to add the Join Function*/}
              <TextField
                id='room-code'
                label='Room Code'
                variant='outlined'
                fullWidth
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
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
              <Divider>
                <Typography color='textSecondary'>or</Typography>
              </Divider>
              <Button
                variant='contained'
                color='primary'
                onClick={handleCreateAccount}
                fullWidth>
                CREATE AN ACCOUNT
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </RA.Bounce>
    </Container>
  )
}
