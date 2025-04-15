import { Toolbar as MUIToolbar, Typography, Stack, AppBar } from "@mui/material"

/**
 * A toolbar component that allows users to edit the title of a poll.
 * Users can click on the edit icon next to the title to edit it inline and save changes with the Done icon.
 * Below the title it will display the last time the poll was updated.
 * @author VerySirias
 * @returns {JSX.Element}
 */
const title = "U da Best?"
const submitted_at = "somedate"
export default function Toolbar() {
  return (
    <AppBar color='inherit' position='relative'>
      <MUIToolbar>
        <Stack alignItems={"center"} flexGrow={1}>
          <Typography variant='h6'>{title}</Typography>
          <Typography variant='subtitle2'>
            Submitted at {submitted_at}
          </Typography>
        </Stack>
      </MUIToolbar>
    </AppBar>
  )
}
