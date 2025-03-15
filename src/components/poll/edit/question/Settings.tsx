import {
  Box,
  FormControlLabel,
  FormGroup,
  Switch,
  Typography,
} from "@mui/material"
import { DocumentData, DocumentReference } from "firebase/firestore"

interface Props {
  qref: DocumentReference<DocumentData, DocumentData>
}

export default function Settings() {
  /* TODO - update form */
  return (
    <Box>
      <Typography variant='button'>Settings</Typography>
      {/* TODO - wrap in grid for dynamic layout and save space? */}
      <FormGroup>
        <FormControlLabel control={<Switch />} label='Async' />
        <FormControlLabel control={<Switch />} label='Anonymous' />
        <FormControlLabel control={<Switch />} label='Timed' />
        {/* TODO - expand to allow user to enter timer, seconds? minutes? both?  */}
      </FormGroup>
    </Box>
  )
}
