/* eslint-disable react-hooks/exhaustive-deps */
import api from "@/core/api/firebase"
import { useAuthContext, useSnackbar } from "@/core/hooks"
import {
  AppBar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Toolbar,
} from "@mui/material"
import React, { useEffect, useState } from "react"
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore"
import { useNavigate, useParams } from "react-router-dom"

const CHECK_INTERVAL_MS = 2000

export function PollParticipate() {
  const params = useParams()
  const sid = params.id ?? ""
  const { user, loading } = useAuthContext()
  const navigate = useNavigate()
  const snackbar = useSnackbar()
  const [session] = useDocumentData(api.polls.sessions.doc(sid))
  const [users] = useCollectionData(api.polls.sessions.users)
  const [showDialog, setShowDialog] = useState(false)

  console.debug("session", session)

  useEffect(() => {
    const int = setInterval(() => {
      const aux = async () => {
        if (!user && !loading) {
          void navigate("/")
        }
        if (!user) {
          return
        }
        const uid = user.uid
        const hasJoined = await api.polls.sessions.hasJoined(sid, uid)
        if (!hasJoined) {
          if (user.isAnonymous) {
            await user.delete()
            await navigate("/get-started")
          } else {
            await navigate("/poll/join")
          }
        }
      }
      void aux()
    }, CHECK_INTERVAL_MS)
    return () => {
      clearInterval(int)
    }
  }, [])

  function handleLeave() {
    async function aux() {
      if (!user) {
        return
      }
      try {
        const uid = user.uid
        await api.polls.sessions.leaveSession(sid, uid)
        /* TODO - confirm to leave, because this will affect their results */
        snackbar.show({
          message: "You left the session",
          type: "info",
        })
        if (user.isAnonymous) {
          await user.delete()
          void navigate("/get-started", { replace: true })
        } else {
          void navigate("/poll/join", { replace: true })
        }
      } catch (err: unknown) {
        console.error(err)
      }
    }
    void aux()
  }

  return (
    <React.Fragment>
      <AppBar color='inherit' position='relative'>
        <Toolbar>
          <Button onClick={() => setShowDialog(true)}>Leave</Button>
        </Toolbar>
      </AppBar>
      <Dialog open={showDialog}>
        <DialogTitle>Confirm</DialogTitle>
        <DialogContent>
          <DialogContentText>
            All of your answers you submitted so far will be saved.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDialog(false)}>No</Button>
          <Button onClick={handleLeave}>Yes</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}
