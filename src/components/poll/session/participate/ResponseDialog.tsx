import { Session } from "@/core/types"
import {
  Dialog,
  Toolbar,
  Typography,
  AppBar,
  Box,
  Stack,
  Button,
  FormControlLabel,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
} from "@mui/material"

import { DocumentReference } from "firebase/firestore"
import React, {useState} from "react"

interface ResponseDialogProps {
  sref: DocumentReference<Session>
  session?: Session
}

export default function ResponseDialog(props: ResponseDialogProps) {
  // const [open, setOpen] = useState(false)
  console.debug("Props:", props)
  const currentQuestion = props.session?.question

  //for state hooks : singselect, multiselect
  const [value, setValue] = useState("null")

  // const
  /**
   * @TODO
   * @tdhillon113
   * This component should only be shown when the session's current question is not null.
   * Currently, I'm working on a way to record responses.
   * Simillar to what we have now with display questions, this dialog shows the contents
   * of the question. However, I want the question's title to be in a title bar of the dialog.
   * I'd refer to the MUI docs I sent you about Dialogs and refer to
   * @see {@link src/components/headers/AppBar.tsx} to see how I made an app bar.
   * After the prompt of the question, below the app bar is the image of question if any,
   * otherwise render nothing.
   * Then, render the possible options the user select using radio buttons. I know that
   * types of questions can either be multiple-choice, multi-select, or a ranking poll.
   * For now, just treat it as multiple choice.
   * @see https://mui.com/material-ui/react-radio-button/
   *
   * If you can get this done by Tuesday's meeting, I'll be extremely impressed.
   */
  return (
    <React.Fragment>
      <Dialog fullScreen open={currentQuestion !== null}>
        <AppBar position='relative'>
          <Toolbar>
            <Typography variant='h4'>
              Question: {currentQuestion?.prompt}
            </Typography>
          </Toolbar>
        </AppBar>
        <Box>
          {currentQuestion && (
            <Box mb={3}>
              {currentQuestion.prompt_img && (
                <Stack
                  sx={{ justifyContent: "center", alignItems: "center" }}
                  direction={"row"}
                  mb={5}>
                  <img
                    style={{
                      width: 700,
                      height: 300,
                      objectFit: "contain",
                    }}
                    src={currentQuestion.prompt_img}
                  />
                </Stack>
              )}
              <Stack spacing={3} mt={3} direction={"column"}>
                {currentQuestion.options.map((x) => (
                  <Button key={x} variant='outlined'>
                    {x}
                  </Button>
                ))}
              </Stack>
            </Box>
          )}
        </Box>
        {currentQuestion && (
          <Box mb={3}>
            {currentQuestion.prompt_img && (
              <img
                style={{ width: 700, height: 300, objectFit: "contain" }}
                src={currentQuestion.prompt_img}
              />
            )}
            <Stack  sx={{ alignItems:'cen'}}spacing={3} mt={3} direction={"column"}>
                    <FormControl>
                    {/* <FormLabel id="demo-radio-buttons-group-label"></FormLabel> */}
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="female"
                      name="radio-buttons-group"
                      >
                      
                      {currentQuestion.options.map((x) => (
                      <FormControlLabel value={x} control={<Radio />} label={x} />
                      
                  ))}
                    </RadioGroup>
                  </FormControl>
            </Stack>
          </Box>
        )}
      </Dialog>
    </React.Fragment>
  )
}
