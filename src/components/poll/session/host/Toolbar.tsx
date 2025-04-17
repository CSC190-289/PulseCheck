import { AppBar, Toolbar as MUIToolbar } from "@mui/material"

// interface Props {
//   session?: Session
//   users?: QuerySnapshot<SessionUser>
//   gettingstated: boolean
//   startCallback: () => void
//   leaveCallback: () => void
// }

/**
 * @deprecated
 */
export default function Toolbar() {
  return (
    <AppBar color='inherit' position='relative'>
      <MUIToolbar>
        {/* <LeaveButton
          callback={props.leaveCallback}
          dialogTitle='Are you sure you want to end the session?'
          dialogContent='All answers submitted will eb discarded!'
        />
        <Box textAlign={"initial"}>
          <Typography>{props.session?.title}</Typography>
          <Typography variant='caption' component={"div"} color='textSecondary'>
            {ntops(props.users?.docs.length ?? 0)}
          </Typography>
        </Box>
        <Box flex={1} marginInline={2} />
        {props.gettingstated ? (
          <Button>Next</Button>
        ) : (
          <StartButton callback={props.startCallback} />
        )} */}
      </MUIToolbar>
    </AppBar>
  )
}
