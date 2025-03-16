import {
  Divider,
  FormControlLabel,
  Grid2,
  Switch,
  Typography,
} from "@mui/material"
import TimerSwitch from "./TimerSwitch"
import React from "react"

interface Props {
  pid: string
  qid: string
  points: number
  anonymous: boolean
  time: number | null
}

export default function Settings(props: Props) {
  const { pid, qid, time } = props

  return (
    <React.Fragment>
      <Divider>
        <Typography>Settings</Typography>
      </Divider>
      <Grid2 container spacing={2}>
        <Grid2 size={{ xl: 3, lg: 3, md: 4, sm: 6, xs: 12 }}>
          <FormControlLabel label='Anonymous' control={<Switch />} />
        </Grid2>
        <Grid2 size={{ xl: 3, lg: 3, md: 4, sm: 6, xs: 12 }}>
          <TimerSwitch pid={pid} qid={qid} time={time} />
        </Grid2>
      </Grid2>
    </React.Fragment>
  )
}
