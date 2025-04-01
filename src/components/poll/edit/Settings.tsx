import React from "react"
import { Typography, Grid2, Divider } from "@mui/material"
import TimerSwitch from "./TimerSwitch"

/**
 * @author VerySirias
 */

interface Props {
  pid: string /* poll id */
  anonymous: boolean | null /* when users answer this question, is it public? */
  time: number | null /* is this question timed? */
}

/**
 * @deprecated Do not use this anymore.
 */
export default function Settings(props: Props) {
  const { pid, time } = props
  // const [anonymous, setAnonymous] = useState(props.anonymous)
  // const snackbar = useSnackbar()

  // useEffect(() => {
  //   async function saveAnonymous(bool: boolean | null) {
  //     try {
  //       if (bool === props.anonymous) {
  //         return
  //       }
  //       const ref = api.polls.doc(pid)
  //       await api.polls.update(ref, {
  //         anonymous: bool,
  //       })
  //     } catch {
  //       snackbar.show({
  //         message: "Failed to update",
  //         type: "error",
  //       })
  //     }
  //   }
  //   void saveAnonymous(anonymous)
  // }, [pid, props.anonymous, anonymous, snackbar])

  return (
    <React.Fragment>
      <Divider>
        <Typography> Poll Settings</Typography>
      </Divider>
      <Grid2 container spacing={2} alignItems={"center"} display={"flex"}>
        {/* <FormControlLabel
          label='Anonymous'
          checked={Boolean(anonymous)}
          control={<Switch onChange={(e) => setAnonymous(e.target.checked)} />}
        /> */}
        <TimerSwitch pid={pid} time={time} />
      </Grid2>
      {/* </Stack> */}
    </React.Fragment>
  )
}
