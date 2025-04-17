import { Session, SessionOption } from "@/core/types"
import {
  Dialog,
  Toolbar,
  Typography,
  AppBar,
  Box,
  Stack,
  DialogContent,
  Slide,
} from "@mui/material"
import Choice from "./Choice"

import { DocumentReference } from "firebase/firestore"
import React, { useEffect, useState } from "react"
import { TransitionProps } from "@mui/material/transitions"
import api from "@/core/api/firebase"
import { useAuthContext } from "@/core/hooks"

interface ResponseDialogProps {
  sref: DocumentReference<Session>
  session?: Session
}

/**
 * User answers the current question here.
 * @author tdhillion113, Bran7tastic, Camputron
 */
export default function ResponseDialog(props: ResponseDialogProps) {
  const auth = useAuthContext()
  const { sref } = props
  const currentQuestion = props.session?.question

  const [selectedOptions, setSelectedOptions] = useState<
    DocumentReference<SessionOption>[]
  >([])

  useEffect(() => {
    if (auth.user && currentQuestion) {
      api.sessions.questions.responses.answer(
        sref.id,
        currentQuestion.ref.id,
        auth.user.uid,
        selectedOptions
      )
    }
  }, [selectedOptions])

  return (
    <Dialog
      fullScreen
      open={currentQuestion !== null}
      disablePortal={false}
      slots={{
        transition: Transition,
      }}>
      <AppBar position='relative'>
        <Toolbar>
          <Typography>{currentQuestion?.prompt}</Typography>
        </Toolbar>
      </AppBar>
      <DialogContent>
        <Box>
          {currentQuestion && (
            <Box mb={1}>
              {currentQuestion.prompt_img && (
                <Stack
                  sx={{ justifyContent: "center", alignItems: "center" }}
                  direction={"row"}
                  mb={1}>
                  <img
                    style={{
                      width: 400,
                      objectFit: "contain",
                    }}
                    src={currentQuestion.prompt_img}
                  />
                </Stack>
              )}

              <Stack spacing={3} mt={3} direction={"column"}>
                {currentQuestion.options.map((x) => (
                  <Choice
                    ref={x.ref}
                    text={x.text}
                    promptType={currentQuestion.prompt_type}
                    theChosenOnes={selectedOptions}
                    setTheChosenOnes={setSelectedOptions}
                  />
                ))}
              </Stack>
            </Box>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  )
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />
})
