import { Box, Typography } from "@mui/material"

interface Props {
  pid: string
}

/**
 * An image upload component that allows users to upload images to go
 * along with their prompt of their poll.
 * Users clicks the upload button to upload a file from their device.
 * Displays image when the user uploads.
 * @returns {JSX.Element}
 */
export default function UploadImageBox(props: Props) {
  console.debug("pe.uib.props", props)
  /**
   * @Bran7astic
   * You're going to have to use a mix of the useState and useRef hook.
   * At the moment, I have not yet received the debit card to upload the
   * firebase plan, so the most you can do is allow the user to click a
   * 'button' to upload an image. It must be an image, you can filter by
   * file extensions. Refer to UQC-B on Github Projects.
   * @see https://github.com/orgs/CSC190-289/projects/1/views/1?pane=issue&itemId=99567048&issue=CSC190-289%7CPulseCheck%7C50
   *
   * Since we don't have access to Cloud Storage yet, you can implement
   * the UI and the functions to upload an image and display it on the app.
   *
   * Ideally, I hope I can get the card by Monday (3/17), so instead of
   * display the user's image from their computer, you can upload the image
   * to the cloud and use the link to the image and display it.
   *
   * To be clear, the UI doesn't have to be 100% perfect, you may set the
   * limits of what the user can upload (e.g. file type, file size) as long
   * as it's reasonable.
   *
   * In my mind, the UI should have the following:
   * - Similar to the figma, a dotted border of where the image will be displayed
   *   if uploaded. This will act as the button to allow the user to upload their image.
   * - On click on "Link", the user's default file manager will open to allow the user
   *   to upload their image. Also, cursor should be set as a pointer when hovering over
   *   the upload box.
   * - If you're a giga-chad, allow the user to drag and drop their file.
   * - After uploading the user's image, display it where the dotted-box use to be.
   * - If the user wants to replace the uploaded image, display an edit icon over the
   *   uploaded image to indicate to the user you can upload a new image OR drag-and-drop
   *   like a giga-chad.
   */
  return (
    <Box>
      <Typography>Upload Image Here</Typography>
    </Box>
  )
}
