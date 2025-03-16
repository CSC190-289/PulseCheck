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
  pid: string /* poll id */
  qid: string /* question id */
  points: number /* amount of points the question is worth  */
  anonymous: boolean /* when users answer this question, is it public? */
  time: number | null /* is this question timed? */
}

/**
 * Allows users to set the settings for a question of a poll.
 * @author VerySirias
 * @returns {JSX.Element}
 */
export default function Settings(props: Props) {
  const { pid, qid, time } = props
  /**
   * @VerySirias
   * - Currently, the anonymous switch does not save and does not have a state.
   *    Implement this.
   * - I passed a points prop, I need something that makes it easy for the user
   *    to set the points per question. Maybe a textfield number type? Maybe if
   *    I scroll up or down on the field, it increments/decrements the points
   *    respective. Unlike the rest of the props, I didn't make a grid
   *    component for this prop. Implement this.
   * - Maybe instead of `Settings`, should be `Question Settings`?
   */
  return (
    <React.Fragment>
      <Divider>
        <Typography>Settings</Typography>
      </Divider>
      {/**
       * @VerySirias By default, columns a Grid2 component has with the
       * container prop enabled is 12 columns.
       */}
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
