import {
  Button,
  Container,
  Stack,
  TextField,
  Typography,
  Card,
  CardContent,
} from "@mui/material"
import { useNavigate, useSearchParams } from "react-router-dom"
import React, { useEffect, useRef, useState } from "react"
import api from "@/lib/api/firebase"
import useSnackbar from "@/lib/hooks/useSnackbar"
import { FormEvent } from "react"
import { RA } from "@/styles"
import { useAuthContext } from "@/lib/hooks"
import { useDocumentDataOnce } from "react-firebase-hooks/firestore"
import usePompeii from "@/lib/hooks/usePompeii"

function DisplayNameField(props: {
  uid: string
  displayName: string
  setDisplayName: React.Dispatch<React.SetStateAction<string>>
}) {
  const { uid, displayName, setDisplayName } = props
  const [user, loading] = useDocumentDataOnce(api.users.doc(uid))

  useEffect(() => {
    if (user && !loading) {
      setDisplayName(user.display_name)
    }
  }, [user, loading, setDisplayName])

  return (
    <React.Fragment>
      <TextField
        label='Display Name'
        variant='outlined'
        fullWidth
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
      />
    </React.Fragment>
  )
}

export default function PollJoin() {
  const navigate = useNavigate()
  usePompeii({ blockGuests: true })
  const ref = useRef<HTMLButtonElement>(null)
  const [query] = useSearchParams()
  const [roomCode, setRoomCode] = useState<string>(query.get("code") ?? "")
  const [displayName, setDisplayName] = useState<string>("")
  const snackbar = useSnackbar()
  const { user, loading } = useAuthContext()
  const [disable, setDisable] = useState(false)
  const [fire, setFire] = useState(true)

  useEffect(() => {
    const code = query.get("code")
    if (code && ref.current && user && displayName && fire) {
      ref.current.click()
      setFire(false)
    }
  }, [query, user, displayName, fire])

  // useEffect(() => {
  //   /* check authentication */
  //   if (!user && !loading) {
  //     void navigate("/get-started")
  //   } else if (user?.isAnonymous) {
  //     void navigate("/get-started")
  //   }
  // }, [user, loading, navigate])

  const handleJoinClick = (e: MouseEvent | FormEvent) => {
    e.preventDefault()
    const aux = async () => {
      setDisable(true)
      try {
        if (!roomCode.trim()) {
          throw new Error("Room Code cannot be blank!")
        }
        if (!displayName.trim()) {
          throw new Error("Display Name cannot be blank!")
        }
        if (!user) {
          throw new Error("How did you do this?")
        }
        const sref = await api.sessions.getByCode(roomCode)
        await api.sessions.enqueue(sref.id, user.uid, {
          display_name: displayName,
          photo_url: user.photoURL,
        })
        await navigate(`/poll/session/${sref.id}`)
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
      } finally {
        setDisable(false)
      }
    }
    void aux()
  }
  return (
    <Container maxWidth='xs'>
      <RA.Bounce triggerOnce>
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
              <TextField
                id='room-code'
                label='Room Code'
                variant='outlined'
                fullWidth
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
              />
              {user && (
                <DisplayNameField
                  uid={user.uid}
                  displayName={displayName}
                  setDisplayName={setDisplayName}
                />
              )}
              <Button
                ref={ref}
                type='submit'
                variant='contained'
                color='primary'
                onClick={handleJoinClick}
                fullWidth
                disabled={disable}>
                POLL UP
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </RA.Bounce>
    </Container>
  )
}
