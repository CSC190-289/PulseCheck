import React, { useEffect, useState } from "react"
import {
  Typography,
  Grid2,
  Switch,
  FormControlLabel,
  Stack,
} from "@mui/material"
import useSnackbar from "@/core/hooks/useSnackbar"
import api from "@/core/api/firebase"
import TimerSwitch from "./TimerSwitch"

/**
 * @todo add docs
 * @author VerySirias
 */

interface Props {
  pid: string /* poll id */
  anonymous: boolean /* when users answer this question, is it public? */
  time: number | null /* is this question timed? */
}

export default function Settings(props: Props) {
  const { pid, time } = props
  const [anonymous, setAnonymous] = useState(props.anonymous)
  const snackbar = useSnackbar()
  /* TODO - Implement Settings  
    
    */

  useEffect(() => {
    async function saveAnonymous(bool: boolean) {
      try {
        if (bool === props.anonymous) {
          return
        }
        const ref = api.polls.doc(pid)
        await api.polls.update(ref, {
          anonymous: bool,
        })
      } catch {
        snackbar.show({
          message: "Failed to update",
          type: "error",
        })
      }
    }
    void saveAnonymous(anonymous)
  }, [pid, props.anonymous, anonymous, snackbar])

  return (
    <React.Fragment>
      <Stack alignItems={"center"}>
        <Typography> Poll Settings</Typography>
        <Grid2
          container
          spacing={4}
          alignItems={"center"}
          display={"flex"}
          size={{ xl: 3, lg: 3, md: 4, sm: 6, xs: 12 }}>
          <FormControlLabel
            label='Anonymous'
            control={
              <Switch onChange={(e) => setAnonymous(e.target.checked)} />
            }
          />
          <TimerSwitch pid={pid} time={time} />
        </Grid2>
      </Stack>
    </React.Fragment>
  )
}
