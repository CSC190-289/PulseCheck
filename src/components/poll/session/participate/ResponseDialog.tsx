import { Session } from "@/core/types"
import {
  Dialog,
  Toolbar,
  Typography,
  AppBar,
  Box,
  Stack,
  Slide,
  FormControl,
  DialogContent,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import Choice from "./Choice"

import { DocumentReference } from "firebase/firestore"
import React, { useState } from "react"

interface ResponseDialogProps {
  sref: DocumentReference<Session>
  session?: Session
}

export default function ResponseDialog(props: ResponseDialogProps) {
  // const [open, setOpen] = useState(false)
  console.debug("Props:", props)
  const currentQuestion = props.session?.question

  //for state hooks : singselect, multiselect: useState keeps track of the choices selected
  const [option, setOption] = useState<string[]>([])
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"))
  // const handleChange
  // const handleChange = (e) => {
  // const selectValues = Array.from(e.target.option)
  // if (e.isChecked)
  //   option.push(x)
  // setOption(option)
  //Bollocks : ball

  // eventually use prompt type:
  //  to display type of question + indicates what type of question can be selected
  //being dealt with in typography

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
   */
  return (
    // <React.Fragment>
    <Dialog
      fullScreen={fullScreen}
      open={currentQuestion !== null}
      disablePortal={false}
      slots={{
        transition: Slide,
      }}
      slot={""}
      slotProps={{
        transition: {
          direction: "up",
        },
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

              <Stack
                sx={{ alignItems: "center" }}
                spacing={3}
                mt={3}
                direction={"column"}>
                <FormControl>
                  {/* <FormLabel id="demo-radio-buttons-group-label"></FormLabel> */}
                  {/* <RadioGroup
                    aria-labelledby='demo-radio-buttons-group-label'
                    defaultValue='female'
                    name='radio-buttons-group'> */}
                  {currentQuestion.options.map((x) => (
                    //<FormControlLabel value={x} control={<Radio />} label={x} />
                    <Choice
                      text={x}
                      promptType={currentQuestion.prompt_type}
                      theChosenOnes={option}
                      setTheChosenOnes={setOption}
                    />
                  ))}
                  {/* </RadioGroup> */}
                </FormControl>
              </Stack>
            </Box>
          )}
        </Box>
      </DialogContent>
    </Dialog>
    // </React.Fragment>
  )
}
