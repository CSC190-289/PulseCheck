import { Toolbar as MUIToolbar, Typography } from "@mui/material"
import { Timestamp } from "firebase/firestore"

interface Props {
  /* TODO - declare props here */
  pollId: string
  title: string /* poll title from firestore */
  lastUpdated: Timestamp
}

/**
 * A toolbar component that allows users to edit the title of a poll.
 * Users can click on the edit icon next to the title to edit it inline and save changes.
 * Below the title should display the last time the poll was updated.
 * @author VerySirias
 * @returns {JSX.Element}
 */
export default function Toolbar(props: Props) {
  console.debug("pe.toolbar.props", props)
  /**
   * @VerySirias
   * You're going to have to learn what a useState hook is. You're going to need it in order to
   * keep track of what the user types in the textfield. In my mind, the UI should have the
   * following:
   * - The poll title centered in the toolbar to show the user the name of their poll
   * - An edit icon button next to the title (left or right?) to notify the user they can edit their
   *    poll title.
   *  - On click of the edit icon button, the system will replace the title with a textfield that
   *    displays the title to allow the user to edit.
   *  - Here's the tricky part, if the user presses "Enter" then that will save the title to firestore
   *    for that poll, however on mobile, I won't have access to an "Enter" key. So what should I do then?
   *    I'll leave that up to you, think about what would be most convenient for the user. Maybe a button?
   *    Or something else?
   * - Below the poll title is the last time the poll was updated. Up to you how it should be formatted.
   *      - Could be `Last Updated MM:DD:YYYY` or `Last Updated 1 minute ago`, up to you!
   */
  return (
    <MUIToolbar sx={{ boxShadow: "2px 2px rgba(0,0,0,0.1)" }}>
      <Typography>VerySirias is just getting stated</Typography>
    </MUIToolbar>
  )
}
