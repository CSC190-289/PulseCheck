import api from "@/core/api"
import { PromptType } from "@/core/types"
import { Clear, DragIndicator } from "@mui/icons-material"
import {
  Box,
  Divider,
  IconButton,
  InputAdornment,
  Radio,
  Stack,
  TextField,
  Typography,
} from "@mui/material"
import { query } from "firebase/firestore"
import React from "react"
import { useCollection } from "react-firebase-hooks/firestore"

interface Props {
  pid: string
  qid: string
  promptType: PromptType
}

export default function PromptOptionList(props: Props) {
  const { pid, qid } = props
  const optQuery = query(api.polls.questions.options.collect(pid, qid))
  const [opts] = useCollection(optQuery)

  return (
    <React.Fragment>
      <Divider>
        <Typography>Answer Options</Typography>
      </Divider>
      <Stack spacing={1}>
        {opts?.docs.map((x, i) => (
          <Box key={x.id} display={"flex"} alignItems={"center"}>
            <Box>
              <DragIndicator color='action' />
            </Box>
            <TextField
              placeholder={`Option ${i + 1}`}
              value={x.data().text}
              fullWidth
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Radio></Radio>
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton color='error'>
                        <Clear />
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Box>
        ))}
      </Stack>
    </React.Fragment>
  )
}
